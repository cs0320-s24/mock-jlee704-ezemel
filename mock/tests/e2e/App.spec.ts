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
  await expect(page.getByLabel('Login')).toBeVisible()
})

test('on page load, i dont see the input box until login', async ({ page }) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
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
  await page.getByLabel('Login').click();
  await expect(page.getByRole('button', {name: 'Submitted 0 times'})).toBeVisible()
});

test('after I click the button, its label increments', async ({ page }) => {
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
 
  expect(r4).toContain("brief mode!load success!");
});

/**
 * Tests load syntax checking, view, and ability to switch between different CSVs
 */
test('load and view', async ({ page }) => {
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

/**
 * Test search by value, search by column name, search by column index.
 * Test incorrect search syntax handling.
 * Test search before view.
 * Test one column, one row, and malformed csv.
 */
test('search', async ({ page }) => {
  await page.getByLabel('Login').click();
  await page.getByLabel('Command input').fill('load malformed y');
  await page.getByRole('button', {name: 'Submitted 0 times'}).click()
  await page.getByLabel('Command input').fill('view');
  await page.getByRole('button', {name: 'Submitted 1 times'}).click()

  const r1 = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[0]?.textContent;
  });

  expect(r1).toContain("12123");

  await page.getByLabel('Command input').fill('search 1');
  await page.getByRole('button', {name: 'Submitted 2 times'}).click()

  const r2 = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[0]?.textContent;
  });

  expect(r2).toContain("1212312123");

  await page.getByLabel('Command input').fill('load one_column n');
  await page.getByRole('button', {name: 'Submitted 3 times'}).click()
  await page.getByLabel('Command input').fill('view');
  await page.getByRole('button', {name: 'Submitted 4 times'}).click()

  const r3 = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[0]?.textContent;
  });

  expect(r3).toContain("one columnone column");

  await page.getByLabel('Command input').fill('search one one_column');
  await page.getByRole('button', {name: 'Submitted 5 times'}).click()

  const r4 = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[0]?.textContent;
  });

  expect(r4).toContain("one columnone columnone columnone column");

  //search before view
  await page.getByLabel('Command input').fill('load valid n');
  await page.getByRole('button', {name: 'Submitted 6 times'}).click()
  await page.getByLabel('Command input').fill('searchindex valid 5');
  await page.getByRole('button', {name: 'Submitted 7 times'}).click()

  const r5 = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[0]?.textContent;
  });

  expect(r5).toContain("validsearchrow");

  //invalid syntax
  await page.getByLabel('Command input').fill('searchindex valid 5 fg');
  await page.getByRole('button', {name: 'Submitted 8 times'}).click()

  const r6 = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[0]?.textContent;
  });

  expect(r6).toContain("invalid syntax: searchindex <value> <columnIndex>");
  
  await page.getByLabel('Command input').fill('searchindex valid');
  await page.getByRole('button', {name: 'Submitted 9 times'}).click()

  const r7 = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[0]?.textContent;
  });

  expect(r7).toContain("invalid syntax: searchindex <value> <columnIndex>invalid syntax: searchindex <value> <columnIndex>");
  
  await page.getByLabel('Command input').fill('search valid 5 fg');
  await page.getByRole('button', {name: 'Submitted 10 times'}).click()

  const r8 = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[0]?.textContent;
  });

  expect(r8).toContain("invalid syntax: search <value> <columnName (optional)>");

  await page.getByLabel('Command input').fill('search');
  await page.getByRole('button', {name: 'Submitted 11 times'}).click()

  const r9 = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[0]?.textContent;
  });

  expect(r9).toContain("invalid syntax: search <value> <columnName (optional)>invalid syntax: search <value> <columnName (optional)>");

});

/**
 * Tests loading and viewing an empty csv
 */
test('empty csv', async ({ page }) => {
  await page.getByLabel('Login').click();
  await page.getByLabel('Command input').fill('load empty y');
  await page.getByRole('button', {name: 'Submitted 0 times'}).click()

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[0]?.textContent;
  });

  expect(firstChild).toEqual("load success!");

  await page.getByLabel('Command input').fill('view');
  await page.getByRole('button', {name: 'Submitted 1 times'}).click()
  await page.getByLabel('Command input').fill('load mock/search.csv y');
  await page.getByRole('button', {name: 'Submitted 2 times'}).click()

  const secondChild = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[0]?.textContent;
  });

  expect(secondChild).toEqual("load success!load success!");
});

/**
 * Tests the output of view and search when no csv has been loaded
 */
test('file not loaded', async ({ page }) => {
  await page.getByLabel('Login').click();
  await page.getByLabel('Command input').fill('view');
  await page.getByRole('button', {name: 'Submitted 0 times'}).click()

  const r1 = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[0]?.textContent;
  });

  expect(r1).toContain("file must be loaded before view");

  await page.getByLabel('Command input').fill('search dsouf');
  await page.getByRole('button', {name: 'Submitted 1 times'}).click()

  const r2 = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[0]?.textContent;
  });

  expect(r2).toContain("must load file first");
});

/**
 * Tests error message for trying a command that does not exist.
 */
test('command not found', async ({ page }) => {
  await page.getByLabel('Login').click();
  await page.getByLabel('Command input').fill('sdfghjk');
  await page.getByRole('button', {name: 'Submitted 0 times'}).click()

  const r1 = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[0]?.textContent;
  });

  expect(r1).toContain("Command not found");
});

/**
 * Test for the 'help' command
 */
test('help', async ({ page }) => {
  await page.getByLabel('Login').click();
  await page.getByLabel('Command input').fill('help');
  await page.getByRole('button', {name: 'Submitted 0 times'}).click()

  const r1 = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[0]?.textContent;
  });

  expect(r1).toContain("available functions: {view}, {search <value> <column name (optional)>}, {searchindex <value> <column index>}, {load <filepath> <has column headers (y/n)>}, {mode}");
});

/**
 * Tests ability to login, sign out, login again.
 * Tests that the loaded data from the previous user session does not stay for the next.
 */
test('login/sign out/login', async ({ page }) => {
  await expect(page.getByLabel('Sign Out')).not.toBeVisible()
  await expect(page.getByLabel('Command input')).not.toBeVisible()
  
  // click the login button
  await page.getByLabel('Login').click();
  await expect(page.getByLabel('Sign Out')).toBeVisible()
  await expect(page.getByLabel('Command input')).toBeVisible()
  
  // load
  await page.getByLabel('Command input').fill('load valid n');
  await page.getByRole('button', {name: 'Submitted 0 times'}).click()
  await page.getByLabel('Sign out').click();

  // sign out
  await expect(page.getByLabel('Sign Out')).not.toBeVisible()
  await expect(page.getByLabel('Command input')).not.toBeVisible()
  await expect(page.getByLabel('Login')).toBeVisible()
  
  // log back in
  await page.getByLabel('Login').click();
  await page.getByLabel('Command input').fill('view');
  await page.getByRole('button', {name: 'Submitted 0 times'}).click()

  // confirm previously loaded data is not still loaded
  const r1 = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[0]?.textContent;
  });

  expect(r1).toContain("file must be loaded before view");
})

//test addcommand - reload page?
//test search for different csvs
  //search by index, by name, by value
//sign out button
//test triggering all argument errors - syntax, params, csv not loaded yet
//test help function
//invalid command

//empty csv - issue?
//shortcuts?