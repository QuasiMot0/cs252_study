#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const RATIO_LIMIT = 1.2;
const questionsPath = path.join(__dirname, "..", "questions.json");
const questions = JSON.parse(fs.readFileSync(questionsPath, "utf8"));

const violations = [];

for (const q of questions) {
  if (!Array.isArray(q.options) || q.options.length === 0) continue;
  const lengths = q.options.map((o) => o.trim().length);
  const min = Math.min(...lengths);
  const max = Math.max(...lengths);
  const ratio = max / min;
  if (ratio > RATIO_LIMIT) {
    violations.push({ q, lengths, min, max, ratio });
  }
}

if (violations.length === 0) {
  console.log("No violations found.");
  process.exit(0);
}

console.log(`Found ${violations.length} violation(s):\n`);
for (const { q, lengths, min, max, ratio } of violations) {
  console.log(`[${q.id}] ratio=${ratio.toFixed(3)}  min=${min}  max=${max}`);
  for (let i = 0; i < q.options.length; i++) {
    const marker = i === q.answer_index ? " ✓" : "  ";
    console.log(`  ${marker} (${lengths[i].toString().padStart(3)}) ${q.options[i]}`);
  }
  console.log();
}

process.exit(violations.length > 0 ? 1 : 0);
