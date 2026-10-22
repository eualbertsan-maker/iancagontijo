# Ianca Gontijo — Estética Farmacêutica

Landing page em português, inspirada na referência visual do Instagram enviada pela cliente: vinho, nude, marfim e dourado suave, tipografia editorial e linguagem acolhedora. React + TypeScript + Vite, com HTML pré-renderizado para SEO e hospedagem estática na Vercel. Fontes e imagens servidas localmente.

## Desenvolvimento

Requisitos: Node.js 22 ou superior e npm.

```sh
npm ci
npm run dev
```

Build e validação da versão estática:

```sh
npm run build
npm run preview
```

O servidor de preview usa a porta 4173, responde com status 404 real e reproduz as rotas públicas. Cada tarefa na nuvem já é isolada: use o checkout existente em `/workspace/iancagontijo`; não crie um worktree sem solicitação explícita.

## Arquitetura

- `src/config.ts`: dados da profissional, telefone, redes sociais, imagens e domínio.
- `src/content.ts`: copy dos seis tratamentos, cinco perguntas frequentes e três depoimentos ilustrativos.
- `src/App.tsx`: Header, Hero, Treatments, About, Difference, Testimonials, FAQ, Appointment, Footer e páginas adicionais.
- `src/styles.css`: design responsivo, foco de teclado, menu móvel, animação do WhatsApp e respeito à preferência por movimento reduzido.
- `scripts/prerender.tsx`: gera HTML com conteúdo completo e metadados específicos por rota.
- `scripts/serve.mjs`: servidor local de validação do build; não é necessário na Vercel.
- `public/images/`: imagens locais. `essencia.webp` é uma imagem conceitual gerada, não uma fotografia do consultório.
- `tests/site.spec.ts`: testes funcionais e verificações automáticas de acessibilidade.

## Rotas

| Rota                         | Finalidade                                                           |
| ---------------------------- | -------------------------------------------------------------------- |
| `/`                          | Landing page completa                                                |
| `/obrigado`                  | Próximos passos após abrir WhatsApp; não confirma envio nem consulta |
| `/privacidade`               | Política correspondente ao funcionamento atual                       |
| Qualquer caminho inexistente | Página personalizada e status HTTP 404                               |

## Dados confirmados

- Ianca Gontijo, Farmacêutica Esteta.
- Mestra em Ciências Farmacêuticas pela UFG.
- Especialista em harmonização facial.
- Atendimento em Rubiataba e Ceres, Goiás.
- WhatsApp confirmado: **+55 (62) 99910-6886**.
- Instagram da referência: `@dra.iancagontijo`.

O formulário monta a mensagem com primeiro nome e interesse. O usuário revisa e envia no WhatsApp. Não há API, banco de dados de leads, armazenamento de nomes ou envio automático. Os botões de CTA abrem o WhatsApp diretamente. Se o número for removido da configuração, abre-se um diálogo com a alternativa de contato por Instagram.

O evento local `ianca:whatsapp-start` indica apenas intenção de abrir WhatsApp. Não mede mensagem recebida, agendamento confirmado ou venda. Não há pixels ou analytics instalados. Integrá-los exige atualizar a política e avaliar consentimento. O formulário abre uma aba e segue para `/obrigado`; se o navegador bloquear a aba, a página de obrigado oferece outro botão de abertura.

## Completar antes de publicar

Preencha os campos reais em `src/config.ts`:

- CRF/UF e confirmação da habilitação aplicável a cada procedimento.
- CNPJ, e-mail, endereço completo dos atendimentos e horários.
- Facebook, caso exista. Nenhum perfil foi inventado.
- URL definitiva em `siteUrl`. Ela ativa canonical, sitemap, Open Graph com URL absoluta e JSON-LD no build.
- Foto autorizada da profissional em `professionalPhoto`, por exemplo `/images/ianca-gontijo.webp`.

Os dados ainda ausentes aparecem como **a confirmar**. Revise a identificação e as práticas reais de retenção na política de privacidade. Os tratamentos descritos precisam corresponder aos serviços efetivamente oferecidos e à habilitação da responsável.

Os três depoimentos são exemplos explicitamente identificados, não relatos reais. Substitua por textos autorizados e então ajuste a identificação de exemplos em `Testimonials`. Os ícones de biossegurança e ciência são princípios, não selos de certificação. Não foram criados CRF, selos, quantidade de pacientes, avaliações, promessas ou resultados clínicos fictícios.

A seção Sobre reserva espaço para a foto real. A imagem conceitual da hero não representa a clínica e está identificada como tal. Fotos de resultados ainda não foram recebidas; ao adicioná-las, utilize apenas imagens autorizadas, sem expor dados identificáveis desnecessários e com contextualização individual, sem prometer resultados.

## Identidade visual

- Vinho principal: `#68343c`.
- Vinho escuro: `#512830`.
- Marfim: `#fbf9f5`.
- Nude: `#f1ebe2`.
- Dourado suave para detalhes: `#a08364`.
- Texto: `#443c37`.
- Títulos: Cormorant Garamond; textos: Manrope. Fontes hospedadas no próprio site.

## Testes

```sh
npx playwright install chromium
npm run build
npm test
```

Neste ambiente o Chromium já está instalado:

```sh
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm test
```

Os testes simulam a abertura do WhatsApp e não enviam mensagens. Verificam o número e a copy, validação do formulário, redirecionamento, menu móvel, FAQ, detalhes dos tratamentos, imagens, SEO pré-renderizado, HTTP 404, ausência de overflow e regras automáticas WCAG A/AA. Testes automáticos não substituem revisão manual completa de acessibilidade.

## Deploy na Vercel

1. Envie este projeto para o repositório GitHub desejado.
2. Importe o repositório na Vercel.
3. Use `npm run build` como comando de build e `dist` como diretório de saída; `vercel.json` já declara ambos e as rotas.
4. Configure o domínio definitivo em `src/config.ts` e gere um novo deploy.
5. Revise dados profissionais e contatos e teste o WhatsApp em um dispositivo real.

Nenhum segredo ou variável de ambiente é necessário. A publicação não é feita automaticamente por este projeto.
