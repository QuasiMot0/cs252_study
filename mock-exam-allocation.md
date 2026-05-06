# CS252 Mock Exam — 60-Question Allocation

Allocation method: proportional base with manual adjustment (Malloc boosted; Memory & Pointers and Software Dev reduced)
Total content slides: 678  |  Questions: 60

---

## Proportional Calculation

| # | Topic | Slides | Proportional | Adjusted | Notes |
|---|-------|--------|-------------|----------|-------|
| 1 | x86-64 Assembly Language | 50 | 4 | **4** | — |
| 2 | Program Build Pipeline + Libraries | 30 | 3 | **3** | — |
| 3 | Memory & Pointers in C | 50 | 4 | **2** | −2 (reduced per request) |
| 4 | Malloc / Explicit Heap Management | 25 | 2 | **5** | +3 (boosted per request) |
| 5 | GDB Debugger | 10 | 1 | **1** | — |
| 6 | UNIX OS History & Intro | 10 | 1 | **1** | — |
| 7 | UNIX File System | 32 | 3 | **3** | — |
| 8 | Processes: fork / exec / pipe / signals | 12 | 1 | **1** | — |
| 9 | UNIX Commands + Shell Scripting | 19 | 2 | **2** | — |
| 10 | Shell Project (lex/yacc, built-ins, wildcards, subshells) | 99 | 9 | **9** | — |
| 11 | User Mode / Kernel / Interrupts / System Calls | 20 | 2 | **2** | — |
| 12 | Processes & OS Scheduling | 38 | 3 | **3** | — |
| 13 | Threads & Thread Synchronization | 122 | 11 | **11** | — |
| 14 | Internet & Socket Programming | 86 | 7 | **7** | — |
| 15 | SQL & Relational Databases | 19 | 2 | **2** | — |
| 16 | Software Development in Teams | 47 | 4 | **3** | −1 (reduced per request) |
| 17 | Program Optimization & Profiling | 9 | 1 | **1** | — |
| | **TOTAL** | **678** | **60** | **60** | |

---

## Question Plan by Topic

### 1 · x86-64 Assembly Language — 4 questions (slides ~1–50)
| Q# | Focus | Difficulty |
|----|-------|-----------|
| 1 | Register roles in calling convention (%rdi/%rsi/… for args, %rax for return, callee-saved %rbx/%r12…) | Medium |
| 2 | Code trace: given 5–6 assembly instructions, determine final value in a register | Hard |
| 3 | Instruction semantics: leaq vs. movq vs. addq, operand order (src, dst) | Hard |
| 4 | Stack frame: what happens to %rsp and %rbp across a call; where locals live | Hard |

### 2 · Program Build Pipeline + Libraries — 3 questions (slides ~51–80)
| Q# | Focus | Difficulty |
|----|-------|-----------|
| 5 | Pipeline stages: which tool handles #include expansion vs. .o generation vs. symbol resolution | Medium |
| 6 | Static vs. shared library: when code is copied into executable vs. loaded at runtime | Hard |
| 7 | Linker behavior: undefined symbol error, duplicate symbol, strip of unused code | Hard |

### 3 · Memory & Pointers in C — 2 questions (slides ~81–130)
| Q# | Focus | Difficulty |
|----|-------|-----------|
| 8 | Pointer arithmetic: given `int *p`, what does `p+3` evaluate to in bytes; sizeof(array) vs. sizeof(pointer) | Hard |
| 9 | Function pointers: declaration syntax, calling through a pointer, passing a function pointer as an argument | Hard |

### 4 · Malloc / Explicit Heap Management — 5 questions (slides ~131–155)
| Q# | Focus | Difficulty |
|----|-------|-----------|
| 10 | ObjectHeader structure: _objectSize, _allocated (0=free, 1=allocated, 2=sentinel), _next, _prev; ObjectFooter fields | Hard |
| 11 | Boundary tags and coalescing: how the allocator uses header+footer of adjacent blocks to merge free blocks; coalescing cases | Very Hard |
| 12 | Free list policy: first fit vs. best fit trade-offs; segregated free lists vs. single free list; external vs. internal fragmentation | Hard |
| 13 | Debugging allocator: magic numbers 0xF7EEF7EE (free) and 0xA10CA7ED (allocated); fence posts; what DL Malloc adds | Hard |
| 14 | Memory error identification: given a code snippet using malloc/free, classify the bug (leak / double free / wild free / premature free / memory smashing) | Very Hard |

### 5 · GDB Debugger — 1 question (slides ~156–165)
| Q# | Focus | Difficulty |
|----|-------|-----------|
| 15 | Which GDB command/flag does what: -g flag, `where`/`backtrace`, `set follow-fork-mode`, `next` vs. `step` | Medium |

### 6 · UNIX OS History & Intro — 1 question (slides ~166–175)
| Q# | Focus | Difficulty |
|----|-------|-----------|
| 16 | UNIX origin: year (1969), lab (Bell Labs), key figures, what problem it solved | Medium |

### 7 · UNIX File System — 3 questions (slides ~176–207)
| Q# | Focus | Difficulty |
|----|-------|-----------|
| 17 | Inode block indirection capacity: given 1 KB blocks and 256 entries/block, compute max file size through triple-indirect | Very Hard |
| 18 | Hard link vs. soft link: which can cross partitions, what happens when source is deleted, ref count behavior | Hard |
| 19 | Superblock contents: what information lives in superblock vs. inode vs. directory entry | Hard |

### 8 · Processes: fork / exec / pipe / signals — 1 question (slides ~208–219)
| Q# | Focus | Difficulty |
|----|-------|-----------|
| 20 | Sequence of calls to redirect a child's stdout before exec: fork → dup2 → exec ordering and what each does | Very Hard |

### 9 · UNIX Commands + Shell Scripting — 2 questions (slides ~220–238)
| Q# | Focus | Difficulty |
|----|-------|-----------|
| 21 | Shell script control flow: given a for/if script, predict output or identify the bug | Hard |
| 22 | grep/find/awk: given a one-liner, predict what it matches or outputs | Hard |

### 10 · Shell Project — 9 questions (slides ~239–337)
| Q# | Focus | Difficulty |
|----|-------|-----------|
| 23 | lex/yacc: which part of the grammar handles a specific construct (pipe_list, cmd_and_args, io_modifier) | Hard |
| 24 | Pipe implementation: which fd pair to close in parent vs. child after fork | Very Hard |
| 25 | I/O redirection: given `cmd > file`, which syscalls are called and in what order | Hard |
| 26 | Built-in vs. external commands: why `cd` and `setenv` must run in the parent process | Hard |
| 27 | Wildcard expansion: how `*` maps to a regex and what `regcomp`/`regexec` do; opendir/readdir role | Hard |
| 28 | SIGCHLD handling: why `waitpid(-1, WNOHANG)` is used inside the SIGCHLD handler | Very Hard |
| 29 | Subshell execution via `$(...)`: how the shell creates pipes and forks to capture output | Very Hard |
| 30 | Background processes: what `&` means for the shell; which process group collects SIGCHLD | Hard |
| 31 | Environment API: `getenv` / `setenv` / `unsetenv` signatures and when the shell uses each | Medium |

### 11 · User Mode / Kernel Mode / Interrupts / System Calls — 2 questions (slides ~338–357)
| Q# | Focus | Difficulty |
|----|-------|-----------|
| 32 | Why kernel mode is necessary: what user-mode code cannot do and what protection it provides | Medium |
| 33 | Interrupt types and system call mechanism: synchronous vs. asynchronous; software interrupt; how libc wrappers invoke the kernel | Hard |

### 12 · Processes & OS Scheduling — 3 questions (slides ~358–395)
| Q# | Focus | Difficulty |
|----|-------|-----------|
| 34 | Process state machine: which transitions are valid (New→Ready, Ready→Running, Running→Waiting, etc.) | Hard |
| 35 | Round Robin: given a time quantum and a set of CPU bursts, compute turnaround time or identify starvation risk | Hard |
| 36 | MLFQ / CPU-bound vs. I/O-bound: how a process moves between queues; which class benefits from shorter quantum | Very Hard |

### 13 · Threads & Thread Synchronization — 11 questions (slides ~396–517)
| Q# | Focus | Difficulty |
|----|-------|-----------|
| 37 | Thread vs. process: what each thread has independently (stack/PC/registers) vs. what is shared (heap/globals/FDs) | Medium |
| 38 | Race condition: given a two-thread snippet with a shared counter, identify why the result is non-deterministic | Hard |
| 39 | Mutex lock: what `pthread_mutex_lock` guarantees; what happens if a second thread calls lock while it is held | Hard |
| 40 | Spin lock (test_and_set): what the atomic instruction does; when spin locks are inappropriate vs. mutex | Hard |
| 41 | Semaphore semantics: distinguish n=1 (mutex), n>1 (N resources), n=0 (event-wait); sema_wait / sema_post behavior | Hard |
| 42 | Synchronized List: why sema_wait must be called OUTSIDE the mutex; what deadlock results if order is swapped | Very Hard |
| 43 | Bounded Buffer: given _head/_tail/_n and full/empty semaphores, trace enqueue or dequeue across a blocking case | Very Hard |
| 44 | Read/Write locks: how multiple simultaneous readers are allowed but writers are exclusive; writer starvation condition | Hard |
| 45 | Deadlock detection via graph: given a thread→mutex / mutex→thread graph, identify whether a deadlock exists | Hard |
| 46 | Deadlock prevention: lock ordering rule — given two threads acquiring two mutexes in different orders, show which ordering is safe | Very Hard |
| 47 | Condition variables: how cond_wait / cond_signal work at the semantic level; how they compare to semaphores | Hard |

### 14 · Internet & Socket Programming — 7 questions (slides ~518–603)
| Q# | Focus | Difficulty |
|----|-------|-----------|
| 48 | TCP/IP layering: which protocol lives at which layer; what each layer adds (Application/Transport/Internet/Network Interface) | Medium |
| 49 | IP addressing: what a subnet mask determines; why an IP identifies a network interface, not a host | Hard |
| 50 | ARP vs. DNS vs. DHCP: what each resolves (IP→MAC, hostname→IP, auto-configure local IP) and when each is used | Hard |
| 51 | TCP reliability features: adaptive retransmission formula (RTT + 4×RTTSTDDEV); what triggers fast retransmission | Very Hard |
| 52 | UDP vs. TCP: given a use case (VoIP / file download / broadcast), justify which protocol is appropriate | Hard |
| 53 | NAT: how the NAT table uses the 4-tuple `<src-ip, src-port, dest-ip, dest-port>`; what port forwarding achieves | Very Hard |
| 54 | Socket API call sequence: given a partial client or server code, identify the missing or mis-ordered syscall | Hard |

### 15 · SQL & Relational Databases — 2 questions (slides ~604–622)
| Q# | Focus | Difficulty |
|----|-------|-----------|
| 55 | SELECT with WHERE and JOIN: given a schema, predict query result or identify a query that produces a given result | Hard |
| 56 | DML: distinguish INSERT / UPDATE / DELETE / CREATE TABLE syntax and purpose; LIKE wildcard (% and _) semantics | Medium |

### 16 · Software Development in Teams — 3 questions (slides ~623–669)
| Q# | Focus | Difficulty |
|----|-------|-----------|
| 57 | XP Programming: iterative vs. waterfall; which XP rule (Planning/Coding/Designing/Testing) applies to a scenario | Hard |
| 58 | Source control: centralized (SVN) vs. distributed (Git/Mercurial) — when each is preferred; trade-offs for long-running branches | Hard |
| 59 | Test types and design patterns: classify a test as unit / system / regression / acceptance; OR identify which GoF pattern (Proxy/Command/Observer/Visitor) matches a description | Hard |

### 17 · Program Optimization & Profiling — 1 question (slides ~670–678)
| Q# | Focus | Difficulty |
|----|-------|-----------|
| 60 | Statistical profiling vs. code instrumentation: how each works, relative overhead, what gprof / VTune does | Hard |

---

## Summary

| Difficulty | Count | % |
|-----------|-------|---|
| Medium | 9 | 15% |
| Hard | 36 | 60% |
| Very Hard | 15 | 25% |
| **Total** | **60** | **100%** |

Difficulty is within spec (target: ~20% medium / ~60% hard / ~20% very hard). Medium is slightly low because the dropped Joel's Test question was Medium; this is acceptable.

**Java-excluded topics:** Condition variables (Q47) uses POSIX semantics only. Bounded buffer (Q43) uses the C/pthread implementation from slides ~480–495, not the Java BoundedBuffer.
