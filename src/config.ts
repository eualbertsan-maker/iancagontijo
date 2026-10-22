/** Preencha somente com dados reais e confirmados antes de publicar. */
export const clinic = {
  name: "Ianca Gontijo",
  displayName: "Dra. Ianca Gontijo",
  specialty: "Estética Farmacêutica",
  whatsapp: "5562999106886", // Confirmado: +55 (62) 99910-6886.
  email: "",
  address: "", // Rua, número, complemento, bairro, cidade, UF e CEP.
  locations: "Rubiataba e Ceres · Goiás",
  hours: "",
  crf: "", // Número e UF.
  cnpj: "",
  education: "Farmacêutica Esteta. Mestra em Ciências Farmacêuticas pela UFG.",
  specializations: "Especialista em harmonização facial.",
  instagram: "https://www.instagram.com/dra.iancagontijo/",
  facebook: "",
  siteUrl: "", // URL definitiva em HTTPS; ativa canonical, sitemap e dados estruturados.
  professionalPhoto: "", // Ex.: /images/ianca-gontijo.webp (foto real e autorizada).
  heroImage: "/images/essencia.webp",
  heroImageAlt:
    "Composição ilustrativa com frasco de cosmético, pedra natural e ramo de oliveira.",
  whatsappMessage:
    "Olá, Dra. Ianca! Vim pelo site e gostaria de agendar uma avaliação estética. Poderia me informar os horários disponíveis?",
};

export function whatsappUrl(message = clinic.whatsappMessage): string | null {
  const phone = clinic.whatsapp.replace(/\D/g, "");
  return /^55\d{10,11}$/.test(phone)
    ? `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
    : null;
}
