import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("home tem conteúdo, imagem local e navegação responsiva", async ({
  page,
  isMobile,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Sua essência.",
  );
  await expect(
    page.getByRole("heading", { name: "Microagulhamento", exact: true }),
  ).toBeVisible();
  await expect(
    page
      .getByText("Mestra em Ciências Farmacêuticas pela UFG.", { exact: false })
      .first(),
  ).toBeVisible();
  expect(
    await page
      .locator(".hero-image")
      .evaluate(
        (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
      ),
  ).toBe(true);
  if (isMobile)
    await page.getByRole("button", { name: "Abrir menu", exact: true }).click();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Dúvidas", exact: true })
    .click();
  await expect(page).toHaveURL(/#duvidas$/);
  if (isMobile)
    await expect(
      page.getByRole("button", { name: "Abrir menu", exact: true }),
    ).toHaveAttribute("aria-expanded", "false");
  expect(
    await page.evaluate(
      () =>
        document.documentElement.scrollWidth <=
        document.documentElement.clientWidth,
    ),
  ).toBe(true);
  expect(errors).toEqual([]);
});

test("tratamentos e FAQ expandem os detalhes", async ({ page }) => {
  await page.goto("/");
  const card = page.locator(".treatment-card").first();
  await card.getByRole("button", { name: "Conhecer o tratamento" }).click();
  await expect(card.getByText(/queda temporária da pálpebra/)).toBeVisible();
  await card.getByRole("button", { name: "Fechar detalhes" }).click();
  await expect(card.locator(".treatment-detail")).toBeHidden();
  const faq = page
    .locator("details")
    .filter({ hasText: "Quanto tempo dura a toxina botulínica?" });
  await faq.locator("summary").click();
  await expect(faq.getByText(/3 a 4 meses/)).toBeVisible();
  await faq.locator("summary").click();
  await expect(faq.locator("p")).toBeHidden();
});

test("CTA abre WhatsApp confirmado com mensagem pronta", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => {
    (window as unknown as { capturedUrl: string }).capturedUrl = "";
    window.open = (url) => {
      (window as unknown as { capturedUrl: string }).capturedUrl = String(url);
      return null;
    };
  });
  await page
    .getByRole("button", { name: "Agendar minha avaliação", exact: true })
    .click();
  const captured = await page.evaluate(
    () => (window as unknown as { capturedUrl: string }).capturedUrl,
  );
  const url = new URL(captured);
  expect(url.hostname).toBe("wa.me");
  expect(url.pathname).toBe("/5562999106886");
  expect(url.searchParams.get("text")).toContain("agendar uma avaliação");
  await page
    .getByRole("button", {
      name: "Vamos conversar? Agendar avaliação pelo WhatsApp",
      exact: true,
    })
    .click();
  expect(
    await page.evaluate(
      () => (window as unknown as { capturedUrl: string }).capturedUrl,
    ),
  ).toBe(captured);
});

test("formulário valida e transfere nome e interesse para WhatsApp", async ({
  page,
}) => {
  let captured = "";
  await page.exposeFunction("captureWhatsApp", (url: string) => {
    captured = url;
  });
  await page.addInitScript(() => {
    window.open = (url) => {
      void (
        window as unknown as { captureWhatsApp: (url: string) => Promise<void> }
      ).captureWhatsApp(String(url));
      return null;
    };
  });
  await page.goto("/");
  const form = page.locator("#agendar form");
  await form.getByRole("button", { name: "Continuar no WhatsApp" }).click();
  await expect(page).not.toHaveURL(/obrigado/);
  await form.getByLabel("Como podemos chamar você?").fill("Ana");
  await form
    .getByLabel("O que você gostaria de cuidar?")
    .selectOption("Peeling químico");
  await form.getByRole("button", { name: "Continuar no WhatsApp" }).click();
  await expect(page).not.toHaveURL(/obrigado/);
  await form.getByRole("checkbox").check();
  await form.getByRole("button", { name: "Continuar no WhatsApp" }).click();
  await expect(page).toHaveURL(/\/obrigado$/);
  await expect.poll(() => captured).toContain("wa.me/5562999106886");
  const message = new URL(captured).searchParams.get("text");
  expect(message).toContain("Ana");
  expect(message).toContain("Peeling químico");
  await expect(
    page.getByText("Finalize sua mensagem no WhatsApp.", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText(
      "Esta página não confirma o envio da mensagem nem um agendamento.",
    ),
  ).toBeVisible();
});

test("rotas estáticas têm SEO e 404 real", async ({ request, page }) => {
  const home = await request.get("/");
  const html = await home.text();
  expect(html).toContain("Estética Farmacêutica em Rubiataba e Ceres");
  expect(html).toContain("<h1");
  expect(html).toContain('name="description"');
  expect((await request.get("/privacidade")).status()).toBe(200);
  expect((await request.get("/obrigado")).status()).toBe(200);
  const notFound = await request.get("/pagina-inexistente");
  expect(notFound.status()).toBe(404);
  expect(await notFound.text()).toContain("noindex,follow");
  await page.goto("/pagina-inexistente");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Essa página se perdeu.",
  );
  await page
    .getByRole("link", { name: "Voltar à página inicial", exact: true })
    .click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Sua essência.",
  );
});

test("sem violações automáticas WCAG A/AA na página principal e extras", async ({
  page,
}) => {
  for (const path of [
    "/",
    "/privacidade",
    "/obrigado",
    "/pagina-inexistente",
  ]) {
    await page.goto(path);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(
      results.violations.map((v) => v.id),
      `${path}: ${JSON.stringify(
        results.violations.map((v) => ({
          id: v.id,
          nodes: v.nodes.map((n) => ({
            html: n.html,
            summary: n.failureSummary,
          })),
        })),
        null,
        2,
      )}`,
    ).toEqual([]);
  }
});
