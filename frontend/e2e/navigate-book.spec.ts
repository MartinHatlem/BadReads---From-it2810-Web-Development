import { test, expect } from "@playwright/test";

test("User can search, filter, open a book, log in and add a review", async ({
  page,
}) => {
  await page.goto("/project2/");

  const bookButtons = page.getByRole("button", { name: /view details/i });
  await page.waitForSelector('[role="button"][aria-label*="View details"]', {
    timeout: 5000,
  });

  // 1) SEARCH BAR
  const booksBeforeSearch = await bookButtons.count();

  const searchInput = page.getByPlaceholder(/search books/i);
  await searchInput.fill("Garden");

  await page.waitForTimeout(800);

  const bookCardsAfterSearch = page.getByRole("button", {
    name: /view details/i,
  });
  const searchCount = await bookCardsAfterSearch.count();

  expect(searchCount).toBeGreaterThan(0);
  expect(searchCount).toBeLessThanOrEqual(booksBeforeSearch);

  const firstSearchTitle =
    (await bookCardsAfterSearch.first().locator("h3").textContent()) ?? "";
  expect(firstSearchTitle.toLowerCase()).toContain("garden");

  await searchInput.fill("asdhaskdhajksdhajksdhajksdh"); // nonsense term to check search with no results

  await page.waitForTimeout(500);

  await expect(
    page.getByText("No results for your search", { exact: true }),
  ).toBeVisible();

  await searchInput.fill("");
  await page.waitForTimeout(500);

  // 2) FILTERING
  await page.click('button:has-text("Filters")');

  const drawer = page.getByTestId("filtering-drawer-presentation");

  await expect(drawer.getByText(/filter by genre/i)).toBeVisible();

  await drawer.getByRole("button", { name: "Romance" }).click();

  await page.keyboard.press("Escape");

  await page.waitForTimeout(500);

  const bookCards = page.locator('[role="button"][aria-label*="View details"]');
  const count = await bookCards.count();

  expect(count).toBeGreaterThan(0);

  const firstBookGenre = await bookCards
    .first()
    .locator('p:has-text("Romance")')
    .textContent();
  expect(firstBookGenre).toContain("Romance");

  // 3) OPEN A BOOK AND GO BACK
  await page
    .locator('[role="button"][aria-label*="View details"]')
    .first()
    .click();

  await expect(page).toHaveURL(/\/aboutBook\/\d+/);

  await page.click('button:has-text("BACK")');

  await expect(page).toHaveURL("/project2");

  // 4) LOG IN AND ADD A REVIEW
  await page.click('button:has-text("Log in")');

  const uniqueEmail = `playwright+${Date.now()}@example.com`;

  await page.fill('input[name="email"]', uniqueEmail);

  await page.waitForSelector('button:has-text("Log in / Register")', {
    state: "visible",
  });

  await page.locator('button:has-text("Log in / Register")').click();

  await page
    .locator('[role="button"][aria-label*="View details"]')
    .first()
    .click();

  await expect(page).toHaveURL(/\/aboutBook\/\d+/);

  await page.locator("label").filter({ hasText: "5 Stars" }).click();

  await page.fill('textarea[name="comment"]', "Great read, would recommend!");

  await page.click('button:has-text("Publish review")');

  await expect(
    page.getByText(/you have added a review for this book/i),
  ).toBeVisible();
});
