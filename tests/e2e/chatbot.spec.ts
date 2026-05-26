import { test, expect } from "@playwright/test";

test.describe("MeliCat AI chatbot", () => {
  test("opens, sends a message and receives an assistant reply", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const cookieReject = page.getByRole("button", { name: /tout refuser/i });
    if (await cookieReject.isVisible().catch(() => false)) {
      await cookieReject.click();
      await cookieReject.waitFor({ state: "detached", timeout: 5000 }).catch(() => {});
    }

    const trigger = page.locator("button:has-text('Bonjour')").first();
    await trigger.click({ force: true });

    const input = page.locator('input[placeholder="Votre message…"]');
    await input.waitFor({ state: "visible", timeout: 5000 });
    await input.fill("Bonjour, je veux 6 slides pour une présentation.");
    await input.press("Enter");

    await expect(
      page.locator("text=Bonjour, je veux 6 slides pour une présentation."),
    ).toBeVisible();

    const reply = page.locator('[data-melicat-bot], div:has-text("slide")').last();
    await expect(reply).toBeVisible({ timeout: 25000 });
  });

  test("api/chat endpoint returns a 200 with a reply field", async ({ request }) => {
    const res = await request.post("/api/chat", {
      data: {
        messages: [{ role: "user", content: "Quels sont vos tarifs pour 5 pages ?" }],
      },
    });
    expect(res.status()).toBe(200);
    const body = (await res.json()) as { reply?: string };
    expect(body.reply).toBeDefined();
    expect(body.reply?.length ?? 0).toBeGreaterThan(10);
  });

  test("api/chat rejects invalid payloads", async ({ request }) => {
    const res = await request.post("/api/chat", { data: { foo: "bar" } });
    expect(res.status()).toBe(400);
  });
});
