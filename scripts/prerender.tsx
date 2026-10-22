import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { renderToString } from "react-dom/server";
import { App } from "../src/App";
import { clinic } from "../src/config";

const template = readFileSync("dist/index.html", "utf8");
const escape = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ]!,
  );
const origin = clinic.siteUrl.replace(/\/+$/, "");
if (origin && !/^https:\/\/[^/]+$/.test(origin))
  throw new Error(
    "clinic.siteUrl deve conter apenas a origem HTTPS, por exemplo https://seudominio.com.br",
  );
const pages = [
  {
    path: "/",
    file: "index.html",
    title: "Dra. Ianca Gontijo | Estética Farmacêutica em Rubiataba e Ceres",
    description:
      "Cuidado estético personalizado com Ianca Gontijo, farmacêutica esteta e mestra em Ciências Farmacêuticas pela UFG. Atendimento em Rubiataba e Ceres, Goiás. Agende sua avaliação.",
    index: true,
  },
  {
    path: "/obrigado",
    file: "obrigado/index.html",
    title: "Obrigada pelo seu interesse | Ianca Gontijo",
    description:
      "Confira os próximos passos para conversar com a equipe e agendar sua avaliação.",
    index: false,
  },
  {
    path: "/privacidade",
    file: "privacidade/index.html",
    title: "Política de Privacidade | Ianca Gontijo",
    description:
      "Entenda como suas informações são utilizadas no contato e agendamento com Ianca Gontijo.",
    index: true,
  },
  {
    path: "/404",
    file: "404.html",
    title: "Página não encontrada | Ianca Gontijo",
    description:
      "Encontre o caminho de volta ao cuidado. Conheça a estética farmacêutica da Dra. Ianca Gontijo.",
    index: false,
  },
];

for (const page of pages) {
  const canonical = origin
    ? `${origin}${page.path === "/" ? "/" : page.path}`
    : "";
  const head = [
    `<title>${escape(page.title)}</title>`,
    `<meta name="description" content="${escape(page.description)}" />`,
    `<meta name="robots" content="${page.index ? "index,follow" : "noindex,follow"}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="pt_BR" />`,
    `<meta property="og:site_name" content="Dra. Ianca Gontijo" />`,
    `<meta property="og:title" content="${escape(page.title)}" />`,
    `<meta property="og:description" content="${escape(page.description)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    canonical
      ? `<link rel="canonical" href="${escape(canonical)}" /><meta property="og:url" content="${escape(canonical)}" /><meta property="og:image" content="${escape(origin + clinic.heroImage)}" /><meta property="og:image:alt" content="${escape(clinic.heroImageAlt)}" />`
      : "",
  ].join("\n    ");
  const structured =
    origin && page.path === "/"
      ? `<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@type": "WebSite", name: clinic.displayName, url: origin, inLanguage: "pt-BR", description: page.description }).replace(/</g, "\\u003c")}</script>`
      : "";
  const html = template
    .replace("<!--app-head-->", head + structured)
    .replace("<!--app-html-->", renderToString(<App path={page.path} />));
  const directory = page.file.split("/").slice(0, -1).join("/");
  if (directory) mkdirSync(`dist/${directory}`, { recursive: true });
  writeFileSync(`dist/${page.file}`, html);
  console.log(`Pré-renderizado: ${page.path}`);
}

writeFileSync(
  "dist/robots.txt",
  `User-agent: *\nAllow: /\nDisallow: /obrigado\nDisallow: /404\n${origin ? `Sitemap: ${origin}/sitemap.xml\n` : ""}`,
);
if (origin)
  writeFileSync(
    "dist/sitemap.xml",
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages
      .filter((p) => p.index)
      .map(
        (p) =>
          `<url><loc>${escape(origin + (p.path === "/" ? "/" : p.path))}</loc></url>`,
      )
      .join("")}</urlset>`,
  );
else
  console.log(
    "Domínio definitivo pendente: canonical, sitemap e JSON-LD serão gerados ao preencher clinic.siteUrl.",
  );
