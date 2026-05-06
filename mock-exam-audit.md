# Mock Exam Audit

## Summary
- Total questions reviewed: 60
- Questions with zero issues: 11
- Questions with minor issues (fix options/distractors): 30
- Questions with major issues (recommend rewrite): 19

The dominant problem is **pervasive answer-length tell**: in 35 of 60 questions the correct option is also the longest option, with max/min ratios from 1.4× to 2.5×. This is the single most actionable finding — a student who knows nothing can improve their score just by picking the longest answer. Three questions are near-duplicates of existing questions.json entries. All 60 answers are factually correct; explanation quality is generally good.

---

## Issue counts by category
- Triviality: 1
- Pure memorization (no reasoning step): 5
- Weak distractors (obviously wrong / fictional option): 5
- Length tells — major (correct is longest, ratio ≥ 1.9): 19
- Length tells — minor (correct is longest, ratio 1.4–1.9): 16
- Correctness concerns: 0
- Ambiguity: 0
- Duplication (definitive same-concept overlap with questions.json): 3
- Conceptual overlap (same mechanism, different scenario): 1
- Shallow explanations: 0
- Difficulty miscalibration: 2

---

## Per-question flags (metadata only)

| Question ID | Topic | Difficulty | Issues |
|-------------|-------|------------|--------|
| m-0001 | x86-64 Assembly Language | medium | pure_memo, duplication (q-0283) |
| m-0002 | x86-64 Assembly Language | hard | none |
| m-0003 | x86-64 Assembly Language | hard | length_tell_minor (1.29×) |
| m-0004 | x86-64 Assembly Language | hard | length_tell_minor (1.69×) |
| m-0005 | Program Build Pipeline + Libraries | medium | none |
| m-0006 | Program Build Pipeline + Libraries | hard | weak_dist (option D) |
| m-0007 | Program Build Pipeline + Libraries | hard | none |
| m-0008 | Memory & Pointers in C | hard | length_tell_minor (1.73×) |
| m-0009 | Memory & Pointers in C | hard | none |
| m-0010 | Malloc / Explicit Heap Management | hard | pure_memo (mild) |
| m-0011 | Malloc / Explicit Heap Management | hard | length_tell_minor (1.77×) |
| m-0012 | Malloc / Explicit Heap Management | hard | length_tell_major (2.54×) |
| m-0013 | Malloc / Explicit Heap Management | hard | length_tell_major (1.97×), pure_memo (mild) |
| m-0014 | Malloc / Explicit Heap Management | hard | length_tell_major (2.06×) |
| m-0015 | GDB Debugger | medium | length_tell_minor (1.86×, inherent to command-name format) |
| m-0016 | UNIX OS History & Intro | medium | pure_memo, trivial, diff_low |
| m-0017 | UNIX File System | hard | none |
| m-0018 | UNIX File System | hard | length_tell_minor (1.36×) |
| m-0019 | UNIX File System | hard | length_tell_major (2.36×) |
| m-0020 | Processes: fork / exec / pipe / signals | hard | length_tell_minor (1.40×) |
| m-0021 | UNIX Commands + Shell Scripting | hard | none |
| m-0022 | UNIX Commands + Shell Scripting | hard | length_tell_major (1.91×) |
| m-0023 | Shell Project | hard | pure_memo, weak_dist (option D) |
| m-0024 | Shell Project | hard | length_tell_minor (1.69×) |
| m-0025 | Shell Project | hard | length_tell_minor (1.48×) |
| m-0026 | Shell Project | hard | length_tell_minor (1.46×), weak_dist (option D) |
| m-0027 | Shell Project | hard | length_tell_major (1.92×) |
| m-0028 | Shell Project | hard | length_tell_major (2.45×) |
| m-0029 | Shell Project | hard | length_tell_major (1.93×) |
| m-0030 | Shell Project | hard | length_tell_major (1.97×) |
| m-0031 | Shell Project | medium | length_tell_major (2.12×), diff_low (closer to hard) |
| m-0032 | User Mode / Kernel Mode / Interrupts / System Calls | medium | length_tell_minor (1.69×) |
| m-0033 | User Mode / Kernel Mode / Interrupts / System Calls | hard | length_tell_major (2.07×) |
| m-0034 | Processes & OS Scheduling | hard | length_tell_minor (1.60×), weak_dist (option A) |
| m-0035 | Processes & OS Scheduling | hard | none |
| m-0036 | Processes & OS Scheduling | hard | length_tell_minor (1.39×), weak_dist (option D) |
| m-0037 | Threads & Thread Synchronization | medium | length_tell_minor (1.22×) |
| m-0038 | Threads & Thread Synchronization | hard | overlap (q-0681, same mechanism different variable) |
| m-0039 | Threads & Thread Synchronization | hard | duplication (q-0691) |
| m-0040 | Threads & Thread Synchronization | hard | length_tell_minor (1.41×) |
| m-0041 | Threads & Thread Synchronization | hard | length_tell_major (2.00×) |
| m-0042 | Threads & Thread Synchronization | hard | length_tell_major (2.16×) |
| m-0043 | Threads & Thread Synchronization | hard | length_tell_minor (1.39×) |
| m-0044 | Threads & Thread Synchronization | hard | length_tell_major (2.10×) |
| m-0045 | Threads & Thread Synchronization | hard | length_tell_minor (1.34×) |
| m-0046 | Threads & Thread Synchronization | hard | length_tell_minor (1.86×) |
| m-0047 | Threads & Thread Synchronization | hard | length_tell_major (2.14×) |
| m-0048 | Internet & Socket Programming | medium | none |
| m-0049 | Internet & Socket Programming | hard | length_tell_major (1.98×) |
| m-0050 | Internet & Socket Programming | hard | length_tell_minor (1.56×) |
| m-0051 | Internet & Socket Programming | hard | length_tell_major (1.91×) |
| m-0052 | Internet & Socket Programming | hard | length_tell_major (2.42×) |
| m-0053 | Internet & Socket Programming | hard | length_tell_minor (1.20×) |
| m-0054 | Internet & Socket Programming | hard | duplication (q-0820) |
| m-0055 | SQL & Relational Databases | hard | length_tell_major (2.33×) |
| m-0056 | SQL & Relational Databases | medium | none |
| m-0057 | Software Development in Teams | hard | none |
| m-0058 | Software Development in Teams | hard | length_tell_minor (1.72×) |
| m-0059 | Software Development in Teams | hard | length_tell_minor (1.53×) |
| m-0060 | Program Optimization & Profiling | hard | length_tell_minor (1.62×) |

**Questions with zero issues:** m-0002, m-0005, m-0007, m-0009, m-0017, m-0021, m-0035, m-0048, m-0056, m-0057 — and m-0037 / m-0043 are borderline clean (ratio ≤ 1.4).

---

## Topic-level observations

**x86-64 Assembly Language**: The code-trace question (m-0002) and function-pointer question (m-0009) are the strongest in the exam — numeric or code options eliminate length tells naturally. The register-role question (m-0001) is a duplicate of existing material. The stack-frame question (m-0004) could be strengthened.

**Program Build Pipeline + Libraries**: Three clean questions conceptually; m-0006 has one implausible distractor that a knowledgeable student would dismiss immediately.

**Memory & Pointers in C**: Both questions are good in concept. m-0008 has a moderate length tell.

**Malloc / Explicit Heap Management**: This topic has the worst length-tell cluster in the exam. Four of five questions (m-0012 through m-0014, m-0011) have the correct answer dramatically longer than alternatives. Conceptually these are among the best questions in the exam — the length issue is a fixable presentation problem. m-0010 and m-0013 lean toward recall rather than application.

**GDB Debugger**: m-0015's length tell is partly structural (a GDB command string is naturally longer than invented alternatives) — but the ratio is still fixable by padding wrong options.

**UNIX OS History**: m-0016 is below the quality bar. The date is given in the question stem, leaving only name/institution recall. Trivially answered by anyone who attended lecture once. The only question in the exam that a student could answer correctly with zero understanding.

**UNIX File System**: m-0017 (calculation) is excellent with no tell. m-0018 and m-0019 have varying tell severity — m-0019 is the most egregious in this topic group.

**Processes**: m-0020 is a well-constructed scenario; mild tell is the only concern.

**Shell Scripting**: m-0021 (loop trace) is clean. m-0022 has a moderate tell but the concept is solid.

**Shell Project**: This topic has nine questions and most have some length-tell issue — five of nine have major tells (ratio > 1.9). The correct answers in this topic require multi-step explanations that naturally run longer. m-0023 leans toward recall of a grammar rule name. The other eight questions are conceptually strong.

**User Mode / Kernel Mode**: m-0033 has the worst tell in this section; m-0032 is borderline on being too straightforward for a "medium" label.

**Processes & OS Scheduling**: m-0035 (Round Robin trace) is the cleanest in the section — equal-length numeric options. m-0036 has a weak "random priority" distractor that no serious student would select.

**Threads & Thread Synchronization**: The 11-question block is conceptually the strongest in the exam. The three deadlock/synchronization reasoning questions (m-0042, m-0044, m-0047) are excellent conceptually but all have major length tells. m-0039 duplicates q-0691. m-0038 covers the same race-condition mechanism as q-0681 though from a different angle.

**Internet & Socket Programming**: m-0054 duplicates q-0820 (both ask for the exact server socket call sequence). m-0052 (UDP vs. TCP for games) has the second-largest tell ratio in the exam (2.42×). m-0048, m-0053, m-0056 are among the cleaner questions in the batch.

**SQL**: m-0056 is clean. m-0055 has a significant tell but is conceptually solid.

**Software Development in Teams**: m-0057 is one of only three questions in the exam where the correct answer is NOT the longest option — making it one of the cleaner questions. m-0058 and m-0059 have moderate tells.

**Program Optimization**: m-0060 has a mild tell; concept and distractors are good.

---

## Recommended actions

**Rewrites (concept-level change, cannot fix by length adjustment alone):**
1. **m-0001** — Replace with a different Assembly question that requires reasoning (e.g., given a calling-convention violation, what breaks?). The current question is a known duplicate of q-0283 in questions.json.
2. **m-0016** — The question gives the date in the stem, leaving only name/institution recall. Rewrite to require one reasoning step (e.g., what architectural decision enabled UNIX's portability?).
3. **m-0039** — Duplicate of q-0691 (mutex blocking behavior). Replace with a different thread scenario — e.g., livelock, trylock semantics, or priority inversion.
4. **m-0054** — Duplicate of q-0820 (TCP server sequence). Replace with a question about a specific ordering error in the sequence, or about client-side vs. server-side differences.

**Priority length-tell fixes (trim wrong options and/or expand correct option's alternatives; no concept change):**
These 19 questions have major tells (ratio ≥ 1.9) — fixing them would most improve exam integrity:
m-0012, m-0013, m-0014, m-0019, m-0022, m-0027, m-0028, m-0029, m-0030, m-0031, m-0033, m-0041, m-0042, m-0044, m-0047, m-0049, m-0051, m-0052, m-0055

Fix approach: expand the three wrong options to be comparable in length to the correct option by adding a plausible-sounding justification clause. This preserves the concept entirely.

**Minor fixes (distractor quality):**
- m-0006: Strengthen option D to be a more believable misconception.
- m-0023: Replace option D with a plausible but wrong mechanism (e.g., `wildcard_list`).
- m-0026: Replace option D with a more believable misconception about CWD inheritance.
- m-0034: Replace option A with a less obviously wrong state transition.
- m-0036: Replace option D ("random priority") with a specific wrong MLFQ behavior (e.g., always demotes after every I/O call).

**Optional (low priority):**
- m-0010 and m-0013: Consider adding a reasoning hook to reduce the pure-recall feel.
- m-0031: Consider re-labeling from "medium" to "hard" — the question requires understanding parent-vs-child environment inheritance, which is application-level reasoning.
- m-0038: The concept is valid and distinct enough from q-0681 to keep; no action required unless you want to maximize uniqueness.
