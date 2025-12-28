import { test, expect } from "@playwright/test";

test.describe("App Rendering Tests", () => {
  test("should load homepage without errors", async ({ page }) => {
    // Listen for console errors
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push(msg.text());
      }
    });

    // Navigate to homepage
    await page.goto("/");

    // Check that page loaded (check for body element)
    await expect(page.locator("body")).toBeVisible();

    // Wait for page to stabilize
    await page.waitForLoadState("networkidle");

    // Check for any console errors (excluding favicon issues)
    const seriousErrors = errors.filter(e =>
      !e.includes("favicon") &&
      !e.includes("404") &&
      !e.includes("manifest")
    );
    expect(seriousErrors).toHaveLength(0);
  });

  test("should render main content", async ({ page }) => {
    await page.goto("/");

    // Check that the page has content
    await expect(page.locator("body")).toBeVisible();
    await page.waitForLoadState("networkidle");

    // Check for any h1 or main content
    const content = page.locator("h1, main, div").first();
    await expect(content).toBeVisible({ timeout: 5000 });
  });

  test("should have no console errors", async ({ page }) => {
    const errors: string[] = [];

    // Listen for console errors
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push(msg.text());
      }
    });

    // Navigate to homepage
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Wait a bit to catch any delayed errors
    await page.waitForTimeout(2000);

    // Filter out non-critical errors
    const seriousErrors = errors.filter(e =>
      !e.includes("favicon") &&
      !e.includes("404") &&
      !e.includes("manifest")
    );

    // Check for serious errors
    expect(seriousErrors).toHaveLength(0);
  });
});
