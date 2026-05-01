const { test, expect } = require('@playwright/test');

// Helper: wait for the app to finish loading questions
async function waitForApp(page) {
  await page.goto('/');
  await expect(page.locator('#filter-screen')).toBeVisible({ timeout: 8000 });
}

// Helper: start a quiz with the "All Questions" button
async function startAllQuestions(page) {
  await page.click('#all-btn');
  await expect(page.locator('#card')).toBeVisible();
}

// Helper: pick the first option and submit
async function answerQuestion(page) {
  await page.locator('.opt').first().click();
  await page.click('#submit-btn');
  await expect(page.locator('#explanation')).toBeVisible();
}

// ─────────────────────────────────────────
// LOADING
// ─────────────────────────────────────────

test('page loads and shows filter screen', async ({ page }) => {
  await waitForApp(page);
  await expect(page.locator('#all-btn')).toBeVisible();
  await expect(page.locator('#unit-list .unit-item')).not.toHaveCount(0);
});

test('questions and topics data load without errors', async ({ page }) => {
  const errors = [];
  page.on('pageerror', err => errors.push(err.message));
  await waitForApp(page);
  expect(errors).toHaveLength(0);
});

test('all questions count is shown', async ({ page }) => {
  await waitForApp(page);
  const count = await page.locator('#all-count').textContent();
  expect(count).toMatch(/\d+ questions/);
});

// ─────────────────────────────────────────
// NAVIGATION
// ─────────────────────────────────────────

test('sidebar tabs switch panes', async ({ page }) => {
  await waitForApp(page);

  await page.click('#tab-weak');
  await expect(page.locator('#weak-pane')).toBeVisible();
  await expect(page.locator('#quiz-pane')).not.toBeVisible();

  await page.click('#tab-exam');
  await expect(page.locator('#exam-pane')).toBeVisible();
  await expect(page.locator('#weak-pane')).not.toBeVisible();

  await page.click('#tab-study');
  await expect(page.locator('#study-pane')).toBeVisible();

  await page.click('#tab-quiz');
  await expect(page.locator('#quiz-pane')).toBeVisible();
});

// ─────────────────────────────────────────
// QUIZ FLOW
// ─────────────────────────────────────────

test('can start all-questions quiz', async ({ page }) => {
  await waitForApp(page);
  await startAllQuestions(page);
  await expect(page.locator('#question')).not.toBeEmpty();
  await expect(page.locator('.opt')).toHaveCount(4);
});

test('question counter shows correct position', async ({ page }) => {
  await waitForApp(page);
  await startAllQuestions(page);
  const num = await page.locator('#q-number').textContent();
  expect(num).toMatch(/^Question 1 \/ \d+/);
});

test('selecting an option enables submit button', async ({ page }) => {
  await waitForApp(page);
  await startAllQuestions(page);
  await expect(page.locator('#submit-btn')).not.toBeVisible();
  await page.locator('.opt').first().click();
  await expect(page.locator('#submit-btn')).toBeVisible();
});

test('submitting reveals explanation and next button', async ({ page }) => {
  await waitForApp(page);
  await startAllQuestions(page);
  await answerQuestion(page);
  await expect(page.locator('#next-btn')).toBeVisible();
});

test('options are disabled after submitting', async ({ page }) => {
  await waitForApp(page);
  await startAllQuestions(page);
  await answerQuestion(page);
  const opts = page.locator('.opt');
  for (let i = 0; i < await opts.count(); i++) {
    await expect(opts.nth(i)).toBeDisabled();
  }
});

test('next button advances to next question', async ({ page }) => {
  await waitForApp(page);
  await startAllQuestions(page);
  await answerQuestion(page);
  await page.click('#next-btn');
  const num = await page.locator('#q-number').textContent();
  expect(num).toMatch(/^Question 2 \/ \d+/);
});

test('back button returns to filter screen', async ({ page }) => {
  await waitForApp(page);
  await startAllQuestions(page);
  await page.click('#back-btn');
  await expect(page.locator('#filter-screen')).toBeVisible();
  await expect(page.locator('#card')).not.toBeVisible();
});

test('browser back button returns to filter screen', async ({ page }) => {
  await waitForApp(page);
  await startAllQuestions(page);
  await page.goBack();
  await expect(page.locator('#filter-screen')).toBeVisible();
  await expect(page.locator('#card')).not.toBeVisible();
});

test('can start quiz from a specific unit', async ({ page }) => {
  await waitForApp(page);
  await page.locator('.unit-item .start-btn').first().click();
  await expect(page.locator('#card')).toBeVisible();
});

test('can start quiz from a specific subtopic', async ({ page }) => {
  await waitForApp(page);
  // Open first unit dropdown
  await page.locator('.unit-header').first().click();
  await expect(page.locator('.unit-subs.open').first()).toBeVisible();
  await page.locator('.unit-subs.open .start-btn').first().click();
  await expect(page.locator('#card')).toBeVisible();
});

// ─────────────────────────────────────────
// DONE SCREEN
// ─────────────────────────────────────────

test('done screen appears after finishing all questions', async ({ page }) => {
  await waitForApp(page);
  // Use a small subtopic to avoid answering hundreds of questions
  await page.locator('.unit-header').first().click();
  await page.locator('.unit-subs.open .start-btn').first().click();
  await expect(page.locator('#card')).toBeVisible();

  const totalText = await page.locator('#q-number').textContent();
  const total = parseInt(totalText.match(/\/ (\d+)/)[1]);

  for (let i = 0; i < total; i++) {
    await page.locator('.opt').first().click();
    await page.click('#submit-btn');
    await page.click('#next-btn');
  }
  await expect(page.locator('#done')).toBeVisible();
  await expect(page.locator('.done-pct')).not.toBeEmpty();
});

test('retry same set restarts the quiz', async ({ page }) => {
  await waitForApp(page);
  await page.locator('.unit-header').first().click();
  await page.locator('.unit-subs.open .start-btn').first().click();

  const totalText = await page.locator('#q-number').textContent();
  const total = parseInt(totalText.match(/\/ (\d+)/)[1]);
  for (let i = 0; i < total; i++) {
    await page.locator('.opt').first().click();
    await page.click('#submit-btn');
    await page.click('#next-btn');
  }

  await expect(page.locator('#done')).toBeVisible();
  await page.getByRole('button', { name: 'Retry Same Set' }).click();
  await expect(page.locator('#card')).toBeVisible();
  const newNum = await page.locator('#q-number').textContent();
  expect(newNum).toMatch(/^Question 1 \//);
});

// ─────────────────────────────────────────
// UNIT DROPDOWNS
// ─────────────────────────────────────────

test('unit dropdown expands and collapses', async ({ page }) => {
  await waitForApp(page);
  const firstHeader = page.locator('.unit-header').first();
  const firstSubs   = page.locator('.unit-subs').first();

  await expect(firstSubs).not.toHaveClass(/open/);
  await firstHeader.click();
  await expect(firstSubs).toHaveClass(/open/);
  await firstHeader.click();
  await expect(firstSubs).not.toHaveClass(/open/);
});

test('multiple units can be open simultaneously', async ({ page }) => {
  await waitForApp(page);
  const headers = page.locator('.unit-header');
  await headers.nth(0).click();
  await headers.nth(1).click();
  await expect(page.locator('.unit-subs.open')).toHaveCount(2);
});

// ─────────────────────────────────────────
// REPORT MODAL
// ─────────────────────────────────────────

test('report modal opens and closes', async ({ page }) => {
  await waitForApp(page);
  await startAllQuestions(page);
  await page.click('#report-btn');
  await expect(page.locator('#report-modal')).toHaveClass(/open/);
  await page.click('#report-cancel-btn');
  await expect(page.locator('#report-modal')).not.toHaveClass(/open/);
});

test('report modal closes when clicking backdrop', async ({ page }) => {
  await waitForApp(page);
  await startAllQuestions(page);
  await page.click('#report-btn');
  await expect(page.locator('#report-modal')).toHaveClass(/open/);
  await page.mouse.click(5, 5); // click outside the modal box
  await expect(page.locator('#report-modal')).not.toHaveClass(/open/);
});

test('report submit is blocked without a reason selected', async ({ page }) => {
  await waitForApp(page);
  await startAllQuestions(page);
  await page.click('#report-btn');
  page.on('dialog', d => d.accept());
  await page.click('#report-submit-btn');
  await expect(page.locator('#report-modal')).toHaveClass(/open/); // still open
});

test('report submit is blocked without a description', async ({ page }) => {
  await waitForApp(page);
  await startAllQuestions(page);
  await page.click('#report-btn');
  await page.locator('input[name="report-reason"]').first().check();
  await page.click('#report-submit-btn');
  await expect(page.locator('#report-desc-hint')).toBeVisible();
  await expect(page.locator('#report-modal')).toHaveClass(/open/);
});

// ─────────────────────────────────────────
// TIMER
// ─────────────────────────────────────────

test('timer toggle enables and disables timer', async ({ page }) => {
  await waitForApp(page);
  // Enable timer before starting so it activates on quiz start
  await page.click('#timer-toggle');
  await expect(page.locator('#timer-toggle')).toHaveClass(/on/);
  await startAllQuestions(page);
  await expect(page.locator('#timer-wrap')).toBeVisible();
  // Disable timer
  await page.click('#timer-toggle');
  await expect(page.locator('#timer-toggle')).not.toHaveClass(/on/);
});

// ─────────────────────────────────────────
// WEAK AREAS
// ─────────────────────────────────────────

test('weak areas pane renders without crashing', async ({ page }) => {
  await waitForApp(page);
  await page.click('#tab-weak');
  await expect(page.locator('#weak-pane')).toBeVisible();
  // Should show either the empty state or content — not a blank/crashed page
  const hasEmpty   = await page.locator('.weak-empty').isVisible();
  const hasContent = await page.locator('.summary-unit-card').count() > 0;
  expect(hasEmpty || hasContent).toBeTruthy();
});

test('weak areas dot appears after getting a question wrong', async ({ page }) => {
  await waitForApp(page);
  await startAllQuestions(page);

  // Pick the first option and submit — check whether it was wrong
  await page.locator('.opt').first().click();
  await page.click('#submit-btn');
  const wasWrong = await page.locator('.opt.wrong').count() > 0;
  if (wasWrong) {
    await expect(page.locator('#weak-dot')).toBeVisible();
  } else {
    // Correct on first try — dot should stay hidden
    await expect(page.locator('#weak-dot')).not.toBeVisible();
  }
});

// ─────────────────────────────────────────
// PRACTICE EXAM
// ─────────────────────────────────────────

test('exam setup renders difficulty chips and sections', async ({ page }) => {
  await waitForApp(page);
  await page.click('#tab-exam');
  await expect(page.locator('.chip.diff-easy')).toBeVisible();
  await expect(page.locator('.chip.diff-med')).toBeVisible();
  await expect(page.locator('.chip.diff-hard')).toBeVisible();
  await expect(page.locator('.unit-check')).not.toHaveCount(0);
});

test('exam can be started and first question is shown', async ({ page }) => {
  await waitForApp(page);
  await page.click('#tab-exam');
  await page.click('#start-exam-btn');
  await expect(page.locator('#exam-in-progress')).toBeVisible();
  await expect(page.locator('#exam-question')).not.toBeEmpty();
});

test('exam question grid has correct count', async ({ page }) => {
  await waitForApp(page);
  await page.click('#tab-exam');
  // Default is 20 questions
  await page.click('#start-exam-btn');
  const dots = await page.locator('.egdot').count();
  expect(dots).toBe(20);
});

test('can navigate between exam questions with prev/next', async ({ page }) => {
  await waitForApp(page);
  await page.click('#tab-exam');
  await page.click('#start-exam-btn');

  await expect(page.locator('#exam-prev-btn')).toBeDisabled();
  await page.click('#exam-next-nav');
  await expect(page.locator('#exam-prev-btn')).not.toBeDisabled();
  await page.click('#exam-prev-btn');
  const meta = await page.locator('#exam-q-meta').textContent();
  expect(meta).toMatch(/1/);
});

test('can flag and unflag an exam question', async ({ page }) => {
  await waitForApp(page);
  await page.click('#tab-exam');
  await page.click('#start-exam-btn');

  await page.click('#exam-flag-btn');
  await expect(page.locator('#exam-flag-btn')).toHaveClass(/flagged/);
  await page.click('#exam-flag-btn');
  await expect(page.locator('#exam-flag-btn')).not.toHaveClass(/flagged/);
});

test('exam submit button triggers confirmation', async ({ page }) => {
  await waitForApp(page);
  await page.click('#tab-exam');
  await page.click('#start-exam-btn');

  let dialogSeen = false;
  page.on('dialog', async d => { dialogSeen = true; await d.dismiss(); });
  await page.click('#submit-exam-btn');
  expect(dialogSeen).toBeTruthy();
});

// ─────────────────────────────────────────
// TEXTBOOK
// ─────────────────────────────────────────

test('textbook nav lists units', async ({ page }) => {
  await waitForApp(page);
  await page.click('#tab-study');
  await expect(page.locator('#study-nav .unit-item')).not.toHaveCount(0);
});

test('textbook unit expands to show subtopics', async ({ page }) => {
  await waitForApp(page);
  await page.click('#tab-study');
  await page.locator('#study-nav .unit-header').first().click();
  await expect(page.locator('#study-nav .unit-subs.open .sub-item').first()).toBeVisible();
});

test('clicking a textbook subtopic loads content', async ({ page }) => {
  await waitForApp(page);
  await page.click('#tab-study');
  await page.locator('#study-nav .unit-header').first().click();
  await page.locator('#study-nav .unit-subs.open .sub-item').first().click();
  await expect(page.locator('#study-content')).toBeVisible();
  await expect(page.locator('#study-nav')).not.toBeVisible();
});

test('textbook back button returns to nav', async ({ page }) => {
  await waitForApp(page);
  await page.click('#tab-study');
  await page.locator('#study-nav .unit-header').first().click();
  await page.locator('#study-nav .unit-subs.open .sub-item').first().click();
  await expect(page.locator('#study-content')).toBeVisible();
  await page.getByRole('button', { name: /All Topics/ }).first().click();
  await expect(page.locator('#study-nav')).toBeVisible();
  await expect(page.locator('#study-content')).not.toBeVisible();
});
