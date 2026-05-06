# CS252 Mock Exam — Style Calibration Notes

Source: Fall 2025 Midterm Exam Solutions (20 MC + programming Q21–Q23)
Scope: Spring 2026 slides, pages 1–691 (complete deck)

---

## 1. Question Format

- **Multiple choice, 4 options (A/B/C/D)** — no true/false, no free-response in MC section
- One definitively correct answer; three distractors that each represent a real misconception
- **"None of the above" and "All of the above" never appear as the correct answer** (they appear occasionally as a distractor, but the right answer is always one of A–D that states a specific claim)
- Stem is a complete sentence or code snippet, never a fill-in-the-blank
- Answer options are roughly **1.2× the length of the question stem** — explanations are short phrases or code fragments, not paragraphs

---

## 2. Difficulty Distribution (target for 60-question mock)

| Difficulty | Description | Target % | Count |
|-----------|-------------|----------|-------|
| Medium | Conceptual recall + one inference step | ~20% | 12 |
| Hard | Multi-step reasoning, code tracing, subtle API behavior | ~60% | 36 |
| Very Hard | Interaction of two concepts, deliberate edge case, tricky distractor | ~20% | 12 |

Midterm observations: ~3 questions were straightforward definition recall, ~13 required applying concepts to a new scenario, ~4 required tracing code or evaluating what happens at runtime given specific inputs. Zero questions were purely "what does this acronym stand for."

---

## 3. Question Types Observed

### Type A — "What happens when…" (behavioral prediction)
Given a code snippet or scenario, predict the outcome. The most common type.

Example pattern: "A process calls fork(). In the child, what does fork() return?"
- Distractors: the parent PID, –1, the child's own PID, or -1 on error
- Correct: 0

### Type B — Code trace / output prediction
Given a small assembly or C snippet, identify the final value of a register or variable.

Example pattern: Show 5 lines of x86-64 assembly. "What value is in %rax after execution?"
- Distractors: off-by-one, wrong register, misread operand order

### Type C — Concept application
A situation is described; which mechanism/API best addresses it?

Example pattern: "A shell needs to redirect stdout of a child process before exec. Which syscall accomplishes this?"
- Distractors: plausible alternatives that are either wrong or incomplete

### Type D — "Why" / design justification
Asks why a system works a particular way, testing conceptual understanding rather than memorization.

Example pattern: "Why must sema_wait() be called outside the mutex in the Synchronized List?"
- Distractors target partial understanding (e.g., "to improve performance")

### Type E — Error identification
Given code with a bug, identify what goes wrong.

Example pattern: malloc-related error, race condition, missing NULL terminator in execvp argv

---

## 4. Distractor Patterns (common wrong answers the exam uses)

- **Off-by-one on return values**: e.g., confusing 0 vs. 1 for success/failure, or which end of pipe[] is read vs. write
- **Parent vs. child confusion**: swap what fork() returns in parent vs. child
- **Wrong register**: use %rbx instead of %rax, or argument reg instead of return reg
- **Missing step**: answer that would be right if one required call were omitted (e.g., no NULL terminator in argv)
- **Opposite behavior**: claiming shared library code IS copied vs. shared, or that `exit()` does NOT flush buffers
- **Plausible but incorrect**: semaphore initialized to 1 (mutex) when question asks about n=0 (event-wait) semantics
- **Confusing similar concepts**: deadlock vs. starvation; hard link vs. soft link; inode vs. directory entry; fork vs. exec
- **API confusion**: using write() when dup2() is needed, or connect() instead of bind() for servers

---

## 5. Topics and Testability Assessment

Based on midterm coverage and Final Review slide (pages 679–691):

| Topic | Slide Count | Mock Exam Priority | Notes |
|-------|------------|-------------------|-------|
| x86-64 Assembly | ~50 | HIGH — appeared on both midterm and Spring graded exam | Focus: register roles, calling convention, instruction semantics |
| Build Pipeline + Libraries | ~30 | MEDIUM | Preprocessor → compiler → assembler → linker; .a vs .so |
| Memory & Pointers | ~50 | HIGH | Pointer arithmetic, sizeof, function pointers, 2D arrays |
| Malloc / Heap | ~25 | MEDIUM | ObjectHeader layout, coalescing, fragmentation types |
| GDB | ~10 | LOW-MEDIUM | -g flag, breakpoints, where, set follow-fork-mode |
| UNIX OS History | ~10 | LOW | 1969, Ken Thompson, Dennis Ritchie — trivia at best |
| UNIX File System | ~32 | HIGH | Inode structure, block indirection, superblock, hard/soft links |
| Processes Intro | ~12 | HIGH | fork/exec/wait/dup2/pipe — heavily tested |
| UNIX Commands + Shell Scripting | ~19 | MEDIUM | grep, find, awk/sed patterns; shebang; variables |
| Shell Project | ~99 | HIGH | lex/yacc, pipe_list grammar, built-ins, signals, subshells |
| User Mode / Kernel / Interrupts / Syscalls | ~20 | HIGH | Why kernel mode; interrupt vector; strace; errno |
| Processes & Scheduling | ~38 | HIGH | Process states; Round Robin; CPU-burst distribution; MLFQ |
| Threads & Synchronization | ~122 | VERY HIGH — confirmed final exam topic | Mutex, spin locks, semaphores, bounded buffer, RW locks, deadlock, condition vars |
| Internet & Sockets | ~86 | VERY HIGH — confirmed final exam topic | TCP/UDP, ARP, DNS, DHCP, NAT, socket API (client+server) |
| SQL | ~19 | MEDIUM | SELECT/WHERE/JOIN/INSERT/UPDATE/DELETE; primary keys; B-tree |
| Software Dev in Teams | ~47 | MEDIUM | Joel's Test, XP rules, source control types, test types, design patterns (Proxy/Command/Observer/Visitor) |
| Program Optimization | ~9 | LOW-MEDIUM | Premature optimization; profiling (instrumentation vs. statistical); gprof |

**EXCLUDED per user instruction:** Any Java-specific content — `synchronized` keyword, Java condition variables, Java BoundedBuffer, Java threads. Use POSIX/C equivalents only.

---

## 6. Key Style Rules for Question Generation

1. **No trivial memorization questions** — every question must require applying a concept, not just reciting a definition.
2. **Grounded in code or concrete scenarios** — the best questions either show a code snippet or describe a real situation (shell running a pipe, two threads accessing shared data, a packet traversing a NAT).
3. **Exactly one unambiguously correct answer** — before finalizing, verify the other three options are actually wrong under all interpretations.
4. **Distractors target real CS252 misconceptions** — not random wrong answers; each distractor should be something a student who almost understands the topic might believe.
5. **Cite the source slide range** in the question metadata (e.g., "slide ~420–430") for traceability.
6. **1.2× answer length rule** — if the question stem is 20 words, answers average ~24 words. Avoid one-word answers and avoid paragraph-length answers.
7. **"None of the above" / "All of the above" are never the correct answer.**

---

## 7. Complete Topic Boundary Map (slide counts)

| # | Topic | Approx Pages | Slides |
|---|-------|-------------|--------|
| 1 | x86-64 Assembly Language | 1–50 | ~50 |
| 2 | Program Build Pipeline + Libraries | 51–80 | ~30 |
| 3 | Memory & Pointers in C | 81–130 | ~50 |
| 4 | Malloc / Explicit Heap Management | 131–155 | ~25 |
| 5 | GDB Debugger | 156–165 | ~10 |
| 6 | UNIX OS History & Intro | 166–175 | ~10 |
| 7 | UNIX File System | 176–207 | ~32 |
| 8 | Processes: fork/exec/pipe/signals | 208–219 | ~12 |
| 9 | UNIX Commands + Shell Scripting | 220–238 | ~19 |
| 10 | Shell Project (lex/yacc, built-ins, wildcards, subshells, signals) | 239–337 | ~99 |
| 11 | User Mode, Kernel Mode, Interrupts, System Calls | 338–357 | ~20 |
| 12 | Processes & OS Scheduling | 358–395 | ~38 |
| 13 | Threads & Thread Synchronization | 396–517 | ~122 |
| 14 | Internet & Socket Programming | 518–603 | ~86 |
| 15 | SQL & Relational Databases | 604–622 | ~19 |
| 16 | Software Development in Teams | 623–669 | ~47 |
| 17 | Program Optimization & Profiling | 670–678 | ~9 |
| — | Final Review + Lab examples (not content) | 679–691 | — |
| **Total content slides** | | | **~678** |
