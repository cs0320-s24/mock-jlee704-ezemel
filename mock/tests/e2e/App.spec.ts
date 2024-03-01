import { expect, test } from "@playwright/test";


/**
  The general shapes of tests in Playwright Test are:
    1. Navigate to a URL
    2. Interact with the page
    3. Assert something about the page against your expectations
  Look for this pattern in the tests below!
 */

// If you needed to do something before every test case...
test.beforeEach(async ({ page }) => {
    // ... you'd put it here.
    // TODO: Is there something we need to do before every test case to avoid repeating code?
    await page.goto('http://localhost:8000/');
    // await expect(page.getByLabel('Login')).toBeVisible()
    // await page.getByLabel('Login').click();
  });

/**
 * Don't worry about the "async" yet. We'll cover it in more detail
 * for the next sprint. For now, just think about "await" as something 
 * you put before parts of your test that might take time to run, 
 * like any interaction with the page.
 */
test('on page load, i see a login button', async ({ page }) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  // await page.goto('http://localhost:8000/');
  await expect(page.getByLabel('Login')).toBeVisible()
})

test('on page load, i dont see the input box until login', async ({ page }) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  // await page.goto('http://localhost:8000/');
  await expect(page.getByLabel('Sign Out')).not.toBeVisible()
  await expect(page.getByLabel('Command input')).not.toBeVisible()
  
  // click the login button
  await page.getByLabel('Login').click();
  await expect(page.getByLabel('Sign Out')).toBeVisible()
  await expect(page.getByLabel('Command input')).toBeVisible()
})

test('after I type into the input box, its text changes', async ({ page }) => {
  // Step 1: Navigate to a URL
  // await page.goto('http://localhost:8000/');
  await page.getByLabel('Login').click();

  // Step 2: Interact with the page
  // Locate the element you are looking for
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('Awesome command');

  // Step 3: Assert something about the page
  // Assertions are done by using the expect() function
  const mock_input = `Awesome command`
  await expect(page.getByLabel('Command input')).toHaveValue(mock_input)
});

test('on page load, i see a button', async ({ page }) => {
  // CHANGED
  // await page.goto('http://localhost:8000/');
  await page.getByLabel('Login').click();
  await expect(page.getByRole('button', {name: 'Submitted 0 times'})).toBeVisible()
});

test('after I click the button, its label increments', async ({ page }) => {
  // CHANGED
  // await page.goto('http://localhost:8000/');
  await page.getByLabel('Login').click();
  await expect(page.getByRole('button', {name: 'Submitted 0 times'})).toBeVisible()
  await page.getByRole('button', {name: 'Submitted 0 times'}).click()
  await expect(page.getByRole('button', {name: 'Submitted 1 times'})).toBeVisible()
});

/**
 * Tests mode changing in conjunction with loading a malformed CSV
 */
test('mode changing', async ({ page }) => {
  await page.getByLabel('Login').click();
  await page.getByLabel('Command input').fill('mode');
  await page.getByRole('button', {name: 'Submitted 0 times'}).click()

  // you can use page.evaulate to grab variable content from the page for more complex assertions
  const firstChild = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[0]?.textContent;
  });

  expect(firstChild).toEqual("verbose mode");

  await page.getByLabel('Command input').fill('load malformed y');
  await page.getByRole('button', {name: 'Submitted 1 times'}).click()

  const r2 = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[0]?.textContent;
  });

  expect(r2).toContain("Command: load");
  expect(r2).toContain("Output:");
  expect(r2).toContain("load success!");

  await page.getByLabel('Command input').fill('mode');
  await page.getByRole('button', {name: 'Submitted 2 times'}).click()

  const r3 = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[0]?.textContent;
  });
 
  expect(r3).toContain("Command: modeOutput:brief mode!");

  await page.getByLabel('Command input').fill('load malformed n');
  await page.getByRole('button', {name: 'Submitted 3 times'}).click()

  const r4 = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[0]?.textContent;
  });
 
  expect(r4).toContain("verbose mode");
});

/**
 * Tests load syntax checking, view, and ability to switch between different CSVs
 */
test.only('load and view', async ({ page }) => {
  await page.getByLabel('Login').click();
  await page.getByLabel('Command input').fill('load isudfh y');
  await page.getByRole('button', {name: 'Submitted 0 times'}).click()

  // you can use page.evaulate to grab variable content from the page for more complex assertions
  const firstChild = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[0]?.textContent;
  });

  expect(firstChild).toEqual("file not found");

  await page.getByLabel('Command input').fill('load mock/search.csv');
  await page.getByRole('button', {name: 'Submitted 1 times'}).click()

  const r2 = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[0]?.textContent;
  });

  expect(r2).toContain("invalid syntax: load <filepath> <has column headers? (y/n)>");

  await page.getByLabel('Command input').fill('load mock/search.csv y');
  await page.getByRole('button', {name: 'Submitted 2 times'}).click()

  const r3 = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[0]?.textContent;
  });
 
  expect(r3).toContain("load success!");

  await page.getByLabel('Command input').fill('view');
  await page.getByRole('button', {name: 'Submitted 3 times'}).click()

  const r4 = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[0]?.textContent;
  });
 
  expect(r4).toContain("searchsearchsearchsearchsearchsearch");

  await page.getByLabel('Command input').fill('load valid y');
  await page.getByRole('button', {name: 'Submitted 4 times'}).click()
  await page.getByLabel('Command input').fill('view');
  await page.getByRole('button', {name: 'Submitted 5 times'}).click()

  const r5 = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[0]?.textContent;
  });
 
  expect(r5).toContain("validsearchrow");
});