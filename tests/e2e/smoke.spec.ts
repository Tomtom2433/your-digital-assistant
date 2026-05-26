import { test, expect, type Page, type ConsoleMessage } from "@playwright/test";

const routes = [
  { path: "/", label: "Accueil" },
  { path: "/prestations", label: "Prestations" },
  { path: "/a-propos", label: "À propos" },
  { path: "/faq", label: "FAQ" },
  { path: "/contact", label: "Contact" },
  { path: "/simulateur", label: "Simulateur" },
  { path: "/mentions-legales", label: "Mentions légales" },
  { path: "/inspirations", label: "Inspirations" },
] as const;

/**
 * Collect real JS errors from the page (filter out React DevTools / harmless warnings).
 */
function collectErrors(page: Page): string[] {
  const errors: string[] = [];

  page.on("pageerror", (err) => {
    errors.push(`[pageerror] ${err.message}`);
  });

  page.on("console", (msg: ConsoleMessage) => {
    if (msg.type() === "error") {
      const text = msg.text();
      // Ignore known harmless browser noise
      const ignored =
        text.includes("favicon") ||
        text.includes("net::ERR_") ||
        text.includes("Download the React DevTools");
      if (!ignored) {
        errors.push(`[console.error] ${text}`);
      }
    }
  });

  return errors;
}

for (const route of routes) {
  test.describe(`Page ${route.label} (${route.path})`, () => {
    test(`should load successfully when navigating to ${route.path}`, async ({ page }) => {
      const errors = collectErrors(page);

      const response = await page.goto(route.path);

      // Status 200
      expect(response?.status()).toBe(200);

      // Body visible
      await expect(page.locator("body")).toBeVisible();

      // No JS errors
      expect(errors).toHaveLength(0);
    });

    test(`should have a non-empty h1 when visiting ${route.path}`, async ({ page }) => {
      await page.goto(route.path);

      // The home page uses an <img alt="MELIYA"> logo as its hero — no text h1.
      // For all other pages an h1 must be present and non-empty.
      if (route.path === "/") {
        // Verify the hero image with alt "MELIYA" is present as the primary heading equivalent
        await expect(page.getByAltText("MELIYA")).toBeVisible();
      } else {
        const h1 = page.locator("h1").first();
        await expect(h1).toBeVisible();
        const text = await h1.innerText();
        expect(text.trim().length).toBeGreaterThan(0);
      }
    });

    test(`should display the site header when on ${route.path}`, async ({ page }) => {
      await page.goto(route.path);

      const header = page.locator("header").first();
      await expect(header).toBeVisible();
    });

    test(`should display the site footer when on ${route.path}`, async ({ page }) => {
      await page.goto(route.path);

      const footer = page.locator("footer").first();
      await expect(footer).toBeVisible();
    });

    test(`should have navigation links in the header on ${route.path}`, async ({ page }) => {
      await page.goto(route.path);

      // All five main nav links must be present (desktop nav is hidden on mobile, so use first matching)
      await expect(page.getByRole("link", { name: /accueil/i }).first()).toBeVisible();
      await expect(page.getByRole("link", { name: /qui est m[eé]liya/i }).first()).toBeVisible();
      await expect(page.getByRole("link", { name: /mes prestations/i }).first()).toBeVisible();
      await expect(page.getByRole("link", { name: /faq/i }).first()).toBeVisible();
      await expect(page.getByRole("link", { name: /contact/i }).first()).toBeVisible();
    });
  });
}
