#!/usr/bin/env python3
"""
Batch-fixes answer-length ratio violations in questions.json.

For each question where max_option_len / min_option_len > 1.2, sends the
question to Claude (haiku) asking it to tighten the long options.  Questions
that cannot be fixed without breaking meaning are written to length-exceptions.md.
"""

import json, os, sys, textwrap, time
from pathlib import Path
import anthropic

RATIO_LIMIT = 1.2
BATCH_SIZE = 15
QUESTIONS_PATH = Path(__file__).parent.parent / "questions.json"
EXCEPTIONS_PATH = Path(__file__).parent.parent / "length-exceptions.md"

client = anthropic.Anthropic()


def ratio(options):
    lengths = [len(o.strip()) for o in options]
    if not lengths or min(lengths) == 0:
        return 0, 0, 0
    mn, mx = min(lengths), max(lengths)
    return mx / mn, mn, mx


def violations(questions):
    out = []
    for q in questions:
        if not isinstance(q.get("options"), list) or len(q["options"]) == 0:
            continue
        r, mn, mx = ratio(q["options"])
        if r > RATIO_LIMIT:
            out.append(q)
    return out


SYSTEM = textwrap.dedent("""
You are a CS quiz editor. Your only job is to rewrite multiple-choice answer
options so that:
  - max_char_length / min_char_length <= 1.2  (measured after .strip())
  - Every option remains factually correct or a plausible distractor
  - The CORRECT answer (identified by answer_index) stays correct
  - DO NOT pad short options with filler words like "simply", "just", "basically"
  - PREFER tightening long options over expanding short ones
  - Do NOT change answer_index

You will receive a JSON array of question objects.  Return a JSON object:
{
  "results": [
    {
      "id": "q-XXXX",
      "action": "fix",
      "options": ["...", "...", "...", "..."]
    },
    ... OR for questions that cannot be fixed within 1.2x without breaking meaning:
    {
      "id": "q-XXXX",
      "action": "exception",
      "options": ["...", "...", "...", "..."],
      "reason": "one-sentence explanation"
    }
  ]
}

Rules:
- For "fix": options MUST satisfy max/min <= 1.2 after stripping whitespace.
- For "exception": options should be as close to 1.2x as possible, even if
  they can't reach it.  Include a clear reason.
- Output ONLY the JSON object — no markdown fences, no extra text.
""").strip()


def build_batch_prompt(batch):
    items = []
    for q in batch:
        lens = [len(o.strip()) for o in q["options"]]
        items.append({
            "id": q["id"],
            "question": q["question"],
            "answer_index": q["answer_index"],
            "options": [
                f"{o.strip()}  [{l}ch]"
                for o, l in zip(q["options"], lens)
            ],
        })
    return json.dumps(items, ensure_ascii=False, indent=2)


def call_api(batch, attempt=0):
    prompt = build_batch_prompt(batch)
    try:
        msg = client.messages.create(
            model="claude-haiku-4-5-20251001",
            max_tokens=4096,
            system=SYSTEM,
            messages=[{"role": "user", "content": prompt}],
        )
        raw = msg.content[0].text.strip()
        # strip accidental markdown fences
        if raw.startswith("```"):
            raw = raw.split("\n", 1)[1].rsplit("```", 1)[0].strip()
        return json.loads(raw)
    except (json.JSONDecodeError, anthropic.RateLimitError) as e:
        if attempt < 3:
            wait = 10 * (attempt + 1)
            print(f"  retry in {wait}s ({e})", flush=True)
            time.sleep(wait)
            return call_api(batch, attempt + 1)
        raise


def verify_fix(result_item, q):
    opts = result_item["options"]
    r, mn, mx = ratio(opts)
    if r <= RATIO_LIMIT:
        return True, r
    return False, r


def main():
    questions = json.loads(QUESTIONS_PATH.read_text())
    viols = violations(questions)
    print(f"Violations to fix: {len(viols)}", flush=True)

    # index for fast lookup
    q_index = {q["id"]: i for i, q in enumerate(questions)}

    exceptions = []
    modified = 0
    failed_verify = []

    batches = [viols[i:i+BATCH_SIZE] for i in range(0, len(viols), BATCH_SIZE)]
    for b_idx, batch in enumerate(batches):
        print(f"Batch {b_idx+1}/{len(batches)} ({len(batch)} questions)…", flush=True)
        try:
            resp = call_api(batch)
        except Exception as e:
            print(f"  FATAL batch error: {e}", flush=True)
            continue

        results_map = {r["id"]: r for r in resp.get("results", [])}

        for q in batch:
            r = results_map.get(q["id"])
            if r is None:
                print(f"  MISSING response for {q['id']}", flush=True)
                continue

            new_opts = [o.strip() for o in r["options"]]
            ok, final_ratio = verify_fix(r, q)

            idx = q_index[q["id"]]

            if r["action"] == "exception":
                exceptions.append({
                    "id": q["id"],
                    "ratio": round(final_ratio, 3),
                    "reason": r.get("reason", "(no reason given)"),
                    "options": new_opts,
                    "answer_index": q["answer_index"],
                    "question": q["question"],
                })
                # still apply the best-effort options
                questions[idx]["options"] = new_opts
                modified += 1
            elif ok:
                questions[idx]["options"] = new_opts
                modified += 1
            else:
                # model claimed fix but ratio still violated — log it
                failed_verify.append({
                    "id": q["id"],
                    "ratio": round(final_ratio, 3),
                    "reason": f"Model claimed fix but ratio={final_ratio:.3f}",
                    "options": new_opts,
                    "answer_index": q["answer_index"],
                    "question": q["question"],
                })
                exceptions.append(failed_verify[-1])
                questions[idx]["options"] = new_opts
                modified += 1

    # save updated questions
    QUESTIONS_PATH.write_text(
        json.dumps(questions, ensure_ascii=False, indent=2) + "\n"
    )
    print(f"\nSaved {QUESTIONS_PATH}", flush=True)
    print(f"Modified: {modified}  |  Exceptions: {len(exceptions)}", flush=True)

    # write exceptions file
    if exceptions:
        lines = [
            "# Answer-Length Exceptions",
            "",
            "These questions could not be brought within the 1.2× ratio without",
            "breaking factual correctness or plausibility. Reviewed manually.",
            "",
        ]
        for ex in exceptions:
            lens = [len(o.strip()) for o in ex["options"]]
            mn, mx = min(lens), max(lens)
            r = mx / mn
            lines.append(f"## {ex['id']}  (ratio {r:.3f})")
            lines.append(f"**Reason:** {ex['reason']}")
            lines.append(f"**Question:** {ex['question']}")
            lines.append("**Options:**")
            for i, (o, l) in enumerate(zip(ex["options"], lens)):
                marker = " ✓" if i == ex["answer_index"] else "  "
                lines.append(f"- {marker} ({l}ch) {o}")
            lines.append("")
        EXCEPTIONS_PATH.write_text("\n".join(lines))
        print(f"Exceptions written to {EXCEPTIONS_PATH}", flush=True)
    else:
        print("No exceptions.", flush=True)

    # final audit
    remaining = violations(questions)
    non_exception_ids = {ex["id"] for ex in exceptions}
    clean_remaining = [q for q in remaining if q["id"] not in non_exception_ids]
    print(f"\nFinal violations (excl. exceptions): {len(clean_remaining)}", flush=True)
    if clean_remaining:
        for q in clean_remaining[:10]:
            r, mn, mx = ratio(q["options"])
            print(f"  {q['id']}  ratio={r:.3f}", flush=True)


if __name__ == "__main__":
    main()
