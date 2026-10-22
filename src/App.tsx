import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Clock3,
  Flower2,
  Heart,
  Instagram,
  Leaf,
  Mail,
  MapPin,
  Menu,
  Microscope,
  MoveUpRight,
  Plus,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { clinic, whatsappUrl } from "./config";
import { faqs, testimonials, treatments } from "./content";

function WhatsApp({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path
        d="M20.4 3.6A11.7 11.7 0 0 0 2 17.7L.6 23.4l5.8-1.5A11.7 11.7 0 0 0 20.4 3.6Z"
        transform="translate(1 0) scale(.92)"
      />
      <path d="m8.1 6.6 1.7 3-1.1 1.3c.7 1.5 1.9 2.7 3.5 3.4l1.2-1.1 3 1.5c.1 2-1 2.6-2.5 2.4-4.2-.6-7.4-3.7-8-7.6-.2-1.4.7-2.8 2.2-2.9Z" />
    </svg>
  );
}

function Logo({ light = false }: { light?: boolean }) {
  return (
    <a
      className={`logo ${light ? "logo-light" : ""}`}
      href="/"
      title="Voltar à página inicial"
    >
      <span className="monogram" aria-hidden="true">
        ig<span>✦</span>
      </span>
      <span className="logo-type">
        Ianca Gontijo<small>ESTÉTICA FARMACÊUTICA</small>
      </span>
    </a>
  );
}

function SectionLabel({
  children,
  light = false,
}: {
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <p className={`eyebrow ${light ? "eyebrow-light" : ""}`}>
      <span />
      {children}
    </p>
  );
}

type Booking = (treatment?: string) => void;

function Header({ onBook, home }: { onBook: Booking; home: boolean }) {
  const [open, setOpen] = useState(false);
  const prefix = home ? "" : "/";
  return (
    <>
      <div className="announcement">
        <span>Ciência no cuidado. Naturalidade na beleza.</span>
        <span className="announcement-detail">
          Um olhar único para você <Sparkles size={12} />
        </span>
      </div>
      <header className="header">
        <div className="container header-inner">
          <Logo />
          <nav
            className={open ? "navigation is-open" : "navigation"}
            id="main-navigation"
            aria-label="Navegação principal"
          >
            {[
              ["Sobre", "sobre"],
              ["Tratamentos", "tratamentos"],
              ["Dúvidas", "duvidas"],
              ["Contato", "contato"],
            ].map(([label, id]) => (
              <a
                href={`${prefix}#${id}`}
                key={id}
                onClick={() => setOpen(false)}
              >
                {label}
              </a>
            ))}
            <button
              className="button button-outline mobile-nav-cta"
              onClick={() => {
                setOpen(false);
                onBook();
              }}
            >
              Agendar avaliação <ArrowUpRight size={15} />
            </button>
          </nav>
          <button
            className="button button-outline header-cta"
            onClick={() => onBook()}
          >
            Agendar avaliação <ArrowUpRight size={15} />
          </button>
          <button
            className="menu-toggle"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-controls="main-navigation"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </header>
    </>
  );
}

function Hero({ onBook }: { onBook: Booking }) {
  return (
    <section className="hero container" aria-labelledby="hero-title">
      <div className="hero-copy">
        <SectionLabel>BELEZA COM CIÊNCIA E PROPÓSITO</SectionLabel>
        <h1 id="hero-title">
          Sua essência.
          <br />
          Sua beleza.
          <br />
          <em>Seu melhor cuidado.</em>
        </h1>
        <p className="hero-description">
          Realce o que faz você ser única. Um cuidado estético individualizado,
          que une conhecimento, escuta e respeito à sua naturalidade.
        </p>
        <button className="button button-primary" onClick={() => onBook()}>
          <WhatsApp /> Agendar minha avaliação <ArrowUpRight size={17} />
        </button>
        <p className="hero-note">
          <ShieldCheck size={15} /> O primeiro passo é uma conversa, sem pressa.
        </p>
        <p className="hero-location">
          <MapPin size={13} />
          {clinic.locations}
        </p>
        <a className="discover" href="#tratamentos">
          <span>
            <ArrowDown size={15} />
          </span>{" "}
          Descubra um cuidado para você
        </a>
      </div>
      <div className="hero-visual">
        <div className="hero-image-wrap">
          <img
            className="hero-image"
            src={clinic.professionalPhoto || clinic.heroImage}
            alt={
              clinic.professionalPhoto
                ? "Dra. Ianca Gontijo"
                : clinic.heroImageAlt
            }
            width="1086"
            height="1448"
            fetchPriority="high"
          />
          <div className="image-shade" />
          <span className="image-overline">
            UM NOVO OLHAR PARA O SEU CUIDADO
          </span>
          <div className="image-caption">
            A beleza está
            <br />
            em ser <em>você.</em>
            <span>ESTÉTICA • EQUILÍBRIO • BEM-ESTAR</span>
          </div>
        </div>
        <div className="hero-seal">
          <Flower2 size={28} strokeWidth={1} />
          <span>
            CUIDADO
            <br />
            QUE RESPEITA
            <br />
            <strong>sua essência</strong>
          </span>
        </div>
        {!clinic.professionalPhoto && (
          <small className="image-disclaimer">
            Imagem conceitual de inspiração.
          </small>
        )}
        <span className="hero-vertical">
          DRA. IANCA GONTIJO — ESTÉTICA FARMACÊUTICA
        </span>
      </div>
    </section>
  );
}

function ValuesStrip() {
  return (
    <div className="values-strip">
      <div className="container values-inner">
        {[
          [ShieldCheck, "Segurança em cada escolha"],
          [Microscope, "Um olhar baseado em ciência"],
          [Heart, "Cuidado de pessoa para pessoa"],
          [Leaf, "Sua naturalidade em primeiro lugar"],
        ].map(([Icon, text]) => {
          const Symbol = Icon as typeof Heart;
          return (
            <div key={String(text)}>
              <Symbol size={23} strokeWidth={1.2} />
              <span>{String(text)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const treatmentIcons = [
  Sparkles,
  Flower2,
  Leaf,
  MoveUpRight,
  Sparkles,
  Flower2,
];

function Treatments({ onBook }: { onBook: Booking }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  return (
    <section
      className="section treatments"
      id="tratamentos"
      aria-labelledby="treatments-title"
    >
      <div className="container">
        <div className="section-heading">
          <div>
            <SectionLabel>TRATAMENTOS</SectionLabel>
            <h2 id="treatments-title">
              Pequenos cuidados.
              <br />
              <em>Novas possibilidades.</em>
            </h2>
          </div>
          <div className="section-intro">
            <p>
              Cada rosto conta uma história. Conheça possibilidades de cuidado
              que começam com a sua, sempre após avaliação individual.
            </p>
            <a className="text-link" href="#agendar">
              Encontre o seu cuidado <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
        <div className="treatment-grid">
          {treatments.map((t, index) => {
            const Icon = treatmentIcons[index];
            const isOpen = expanded === t.id;
            return (
              <article
                className={`treatment-card ${isOpen ? "expanded" : ""}`}
                key={t.id}
              >
                <div className="treatment-top">
                  <span className="treatment-icon">
                    <Icon size={30} strokeWidth={1} />
                  </span>
                  <span className="treatment-number">{t.number}</span>
                </div>
                <span className="micro-label">{t.tag}</span>
                <h3>{t.name}</h3>
                <p>{t.description}</p>
                <button
                  className="treatment-more"
                  aria-expanded={isOpen}
                  aria-controls={`detail-${t.id}`}
                  onClick={() => setExpanded(isOpen ? null : t.id)}
                >
                  {isOpen ? "Fechar detalhes" : "Conhecer o tratamento"}
                  <span>
                    {isOpen ? <X size={16} /> : <ArrowUpRight size={17} />}
                  </span>
                </button>
                <div
                  id={`detail-${t.id}`}
                  hidden={!isOpen}
                  className="treatment-detail"
                >
                  <p>{t.detail}</p>
                  <button className="text-link" onClick={() => onBook(t.name)}>
                    Conversar sobre este cuidado <ArrowRight size={14} />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
        <p className="section-footnote">
          <ShieldCheck size={15} /> A indicação depende da avaliação clínica e
          da habilitação aplicável. Resultados e recuperação variam de pessoa
          para pessoa.
        </p>
      </div>
    </section>
  );
}

function About({ onBook }: { onBook: Booking }) {
  return (
    <section className="section about" id="sobre" aria-labelledby="about-title">
      <div className="container about-grid">
        <div className="about-portrait">
          {clinic.professionalPhoto ? (
            <img
              src={clinic.professionalPhoto}
              width="700"
              height="850"
              alt="Dra. Ianca Gontijo"
              loading="lazy"
            />
          ) : (
            <div className="portrait-placeholder">
              <span className="portrait-corner">
                IG / ESTÉTICA FARMACÊUTICA
              </span>
              <svg
                className="face-art"
                viewBox="0 0 300 380"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M73 340c-9-63 4-104 44-131M126 218c-20-21-32-46-28-83 3-44 30-82 77-86 51-4 79 27 78 77-1 39-15 72-29 94-18 28-35 41-59 29-27-12-50-36-58-61m37 60c4 26-5 53-18 70m90-87c-7 27 1 45 17 63 17 17 32 39 36 64M96 150c-16-17-24 7-14 26 3 6 9 12 17 14m14-45c12-7 23-6 33-1m39-2c13-5 24-3 32 2m-54 6c1 17-7 34-13 43 8 5 16 6 22 1m-36 24c16 8 31 10 43-1m-61-65c6 5 14 5 21 1m49-2c6 4 13 4 20 1M88 143c-6-42 19-90 62-103 37-11 74-1 93 30m-141 56c10-31 34-45 59-60 10 29 44 40 83 42M35 367c19-31 39-48 69-60m125-13c-28 24-57 32-91 15"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
              <div className="portrait-signature">
                Ianca Gontijo<span>UM OLHAR ATENTO. UM CUIDADO SÓ SEU.</span>
              </div>
              <small>Espaço reservado para a foto da profissional.</small>
            </div>
          )}
          <div className="about-tag">
            <Heart size={19} strokeWidth={1.3} />
            <span>
              Antes de qualquer procedimento,
              <br />
              <strong>uma pessoa que escuta você.</strong>
            </span>
          </div>
        </div>
        <div className="about-copy">
          <SectionLabel>QUEM VAI CUIDAR DE VOCÊ</SectionLabel>
          <h2 id="about-title">
            Ciência nas escolhas.
            <br />
            <em>Sensibilidade no olhar.</em>
          </h2>
          <p className="about-name">Conheça a Dra. Ianca Gontijo</p>
          <p>
            A estética começa muito antes de um procedimento: começa na escuta.
            A proposta da Ianca é entender o que incomoda você, acolher suas
            expectativas e conversar com clareza sobre as possibilidades de
            cuidado.
          </p>
          <p>
            O planejamento considera a anatomia, a saúde da pele e o histórico
            individual. Biossegurança, conhecimento técnico e respeito aos
            limites de cada organismo são fundamentais para uma escolha
            consciente.
          </p>
          <div className="credentials">
            <div>
              <span>01</span>
              <p>
                <strong>Formação & especializações</strong>
                {clinic.education || "Formação acadêmica a confirmar."}{" "}
                {clinic.specializations || "Especializações a confirmar."}
              </p>
            </div>
            <div>
              <span>02</span>
              <p>
                <strong>Registro profissional</strong>
                {clinic.crf
                  ? `CRF ${clinic.crf}`
                  : "CRF/UF e habilitação a confirmar antes da publicação."}
              </p>
            </div>
          </div>
          <button className="text-link" onClick={() => onBook()}>
            Vamos conversar sobre você? <ArrowUpRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}

function Difference() {
  const values = [
    {
      icon: Microscope,
      title: "Ciência que orienta",
      text: "Uma avaliação individual e uma conversa transparente sobre indicações, limites e evidências de cada cuidado.",
    },
    {
      icon: ShieldCheck,
      title: "Segurança que importa",
      text: "Regularização dos produtos na Anvisa, rastreabilidade e biossegurança são critérios essenciais a conferir no atendimento.",
    },
    {
      icon: Heart,
      title: "Escuta que acolhe",
      text: "Suas dúvidas, seu tempo e suas expectativas fazem parte do processo. Você participa de cada decisão.",
    },
    {
      icon: Leaf,
      title: "Beleza que é sua",
      text: "Um planejamento que respeita suas características, sem padrões impostos ou promessas de resultados.",
    },
  ];
  return (
    <section className="difference section">
      <div className="container">
        <div className="difference-heading">
          <SectionLabel light>A ESSÊNCIA DO NOSSO CUIDADO</SectionLabel>
          <h2>
            Você merece se cuidar.
            <br />
            <em>E se sentir segura em cada escolha.</em>
          </h2>
        </div>
        <div className="difference-grid">
          {values.map(({ icon: Icon, title, text }) => (
            <article key={title}>
              <Icon size={29} strokeWidth={1} />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <div className="trust-line">
          <ShieldCheck size={16} />
          <span>
            Converse sobre habilitação, produtos e protocolos na sua avaliação.
          </span>
          <span className="trust-separator" />
          <span>Segurança se constrói com informação.</span>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section
      className="section testimonials"
      aria-labelledby="testimonials-title"
    >
      <div className="container">
        <div className="center-heading">
          <SectionLabel>EXPERIÊNCIAS QUE IMPORTAM</SectionLabel>
          <h2 id="testimonials-title">
            O cuidado também está
            <br />
            <em>em como você se sente.</em>
          </h2>
          <p className="sample-notice">
            Depoimentos ilustrativos — exemplos de texto, não relatos de
            pacientes reais.
          </p>
        </div>
        <div className="testimonial-grid">
          {testimonials.map((t) => (
            <figure className="testimonial" key={t.name}>
              <span className="quote-mark" aria-hidden="true">
                “
              </span>
              <blockquote>{t.text}</blockquote>
              <figcaption>
                <span className="avatar">{t.initials}</span>
                <span>
                  <strong>
                    {t.name} <small>· exemplo</small>
                  </strong>
                  <span>{t.treatment}</span>
                </span>
                <span className="quote-flower" aria-hidden="true">
                  <Flower2 size={23} strokeWidth={1} />
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="standards">
          <span>
            <ShieldCheck size={18} /> Biossegurança
          </span>
          <span>
            <Microscope size={18} /> Informação baseada em ciência
          </span>
          <span>
            <Heart size={18} /> Atendimento humanizado
          </span>
        </div>
        <p className="standards-note">
          Princípios de cuidado; estes ícones não representam certificações ou
          selos oficiais.
        </p>
      </div>
    </section>
  );
}

function FAQ({ onBook }: { onBook: Booking }) {
  return (
    <section className="section faq" id="duvidas">
      <div className="container faq-grid">
        <div className="faq-intro">
          <SectionLabel>SEM DÚVIDAS. COM CONFIANÇA.</SectionLabel>
          <h2>
            Vamos conversar
            <br />
            <em>sobre o seu cuidado?</em>
          </h2>
          <p>
            Informação também é uma forma de acolher. Aqui estão algumas
            respostas para começar.
          </p>
          <button className="text-link" onClick={() => onBook()}>
            Tenho outra dúvida <WhatsApp size={17} />
          </button>
        </div>
        <div className="faq-list">
          {faqs.map((faq, i) => (
            <details key={faq.question}>
              <summary>
                <span className="faq-number">0{i + 1}</span>
                <span>{faq.question}</span>
                <Plus size={18} className="faq-plus" />
              </summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function BookingForm({
  initialTreatment = "",
  compact = false,
}: {
  initialTreatment?: string;
  compact?: boolean;
}) {
  const [name, setName] = useState("");
  const [treatment, setTreatment] = useState(initialTreatment);
  const [consent, setConsent] = useState(false);
  const available = Boolean(whatsappUrl());
  const id = compact ? "dialog" : "page";
  function submit(event: FormEvent) {
    event.preventDefault();
    if (!available || !consent || !name.trim()) return;
    const message = `Olá, Dra. Ianca! Meu nome é ${name.trim()}. Vim pelo site e gostaria de agendar uma avaliação${treatment ? ` para conversar sobre ${treatment}` : ""}. Poderia me informar os horários disponíveis?`;
    const url = whatsappUrl(message);
    if (!url) return;
    // Os dados ficam na URL do WhatsApp. Não há banco de dados nem envio automático.
    window.open(url, "_blank", "noopener,noreferrer");
    try {
      sessionStorage.setItem("ianca_whatsapp_started", "true");
    } catch {
      /* O fluxo funciona também sem armazenamento disponível. */
    }
    window.dispatchEvent(
      new CustomEvent("ianca:whatsapp-start", { detail: { source: id } }),
    );
    window.location.assign("/obrigado");
  }
  return (
    <form className="booking-form" onSubmit={submit}>
      <div className="field">
        <label htmlFor={`${id}-name`}>Como podemos chamar você?</label>
        <input
          id={`${id}-name`}
          name="name"
          autoComplete="given-name"
          placeholder="Seu primeiro nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={60}
          required
          pattern=".*\S.*"
        />
      </div>
      <div className="field">
        <label htmlFor={`${id}-treatment`}>
          O que você gostaria de cuidar? <span>(opcional)</span>
        </label>
        <div className="select-wrap">
          <select
            id={`${id}-treatment`}
            name="treatment"
            value={treatment}
            onChange={(e) => setTreatment(e.target.value)}
          >
            <option value="">Quero descobrir na avaliação</option>
            {treatments.map((t) => (
              <option key={t.id}>{t.name}</option>
            ))}
          </select>
          <ChevronDown size={16} />
        </div>
      </div>
      <label className="consent">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          required
        />
        <span>
          Li a{" "}
          <a href="/privacidade" target="_blank" rel="noopener noreferrer">
            Política de Privacidade
          </a>{" "}
          e concordo em usar os dados acima para iniciar meu atendimento pelo
          WhatsApp.
        </span>
      </label>
      <button
        className="button button-primary"
        type="submit"
        disabled={!available}
      >
        <WhatsApp />
        Continuar no WhatsApp
        <ArrowUpRight size={16} />
      </button>
      {available ? (
        <p className="form-note">
          Você revisa e envia a mensagem no WhatsApp. O agendamento será
          confirmado pela equipe.
        </p>
      ) : (
        <div className="availability-note">
          <p>O agendamento pelo WhatsApp estará disponível em breve.</p>
          <a href={clinic.instagram} target="_blank" rel="noopener noreferrer">
            Enquanto isso, fale com a Ianca no Instagram{" "}
            <ArrowUpRight size={14} />
          </a>
        </div>
      )}
    </form>
  );
}

function Appointment() {
  return (
    <section className="section appointment" id="agendar">
      <div className="container appointment-panel">
        <div className="appointment-copy">
          <SectionLabel>SEU MOMENTO COMEÇA AQUI</SectionLabel>
          <h2>
            Um primeiro passo
            <br />
            para cuidar
            <br />
            <em>mais de você.</em>
          </h2>
          <p>
            Conte o que você procura. Vamos conversar sobre suas expectativas e
            encontrar um horário para a sua avaliação.
          </p>
          <div className="appointment-note">
            <span>
              <Check size={15} />
            </span>
            Avaliação individual. Decisões compartilhadas.
            <br />
            Cuidado no seu tempo.
          </div>
          <Flower2
            className="appointment-flower"
            size={160}
            strokeWidth={0.6}
          />
        </div>
        <div className="appointment-form">
          <h3>Vamos começar uma conversa?</h3>
          <p>Um cuidado pensado para você começa com a escuta.</p>
          <BookingForm />
        </div>
      </div>
    </section>
  );
}

function Footer({ onBook }: { onBook: Booking }) {
  return (
    <footer className="footer" id="contato">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Logo />
            <p>
              Ciência, cuidado e sensibilidade
              <br />
              para valorizar a sua essência.
            </p>
            <div className="social-links">
              <a
                href={clinic.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram da Dra. Ianca Gontijo"
              >
                <Instagram size={19} />
              </a>
              {clinic.facebook ? (
                <a
                  href={clinic.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook da clínica"
                >
                  f
                </a>
              ) : (
                <span className="social-pending">Facebook · a confirmar</span>
              )}
            </div>
          </div>
          <div>
            <h3>Vamos conversar</h3>
            <button className="footer-contact" onClick={() => onBook()}>
              <WhatsApp size={17} />
              {clinic.whatsapp
                ? clinic.whatsapp.replace(
                    /^55(\d{2})(\d{4,5})(\d{4})$/,
                    "+55 ($1) $2-$3",
                  )
                : "WhatsApp · em breve"}
              <ArrowUpRight size={13} />
            </button>
            {clinic.email ? (
              <a className="footer-contact" href={`mailto:${clinic.email}`}>
                <Mail size={17} />
                {clinic.email}
              </a>
            ) : (
              <p className="footer-contact">
                <Mail size={17} />
                E-mail · a confirmar
              </p>
            )}
            <a
              className="footer-instagram"
              href={clinic.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              @dra.iancagontijo <ArrowUpRight size={13} />
            </a>
          </div>
          <div>
            <h3>Seu espaço de cuidado</h3>
            <p className="footer-contact">
              <MapPin size={17} />
              <span>
                {clinic.locations}
                <br />
                {clinic.address || "Endereço do consultório a confirmar."}
              </span>
            </p>
            <p className="footer-contact">
              <Clock3 size={17} />
              <span>
                {clinic.hours || "Horários de atendimento a confirmar."}
              </span>
            </p>
          </div>
        </div>
        <div className="footer-professional">
          <span>
            Responsável técnica: {clinic.displayName} ·{" "}
            {clinic.crf ? `CRF ${clinic.crf}` : "CRF/UF a confirmar"}
          </span>
          <span>CNPJ: {clinic.cnpj || "a confirmar"}</span>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Ianca Gontijo. Todos os direitos
            reservados.
          </span>
          <a href="/privacidade">Política de Privacidade</a>
          <a href="/#top" className="back-top">
            Voltar ao topo <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
}

function BookingDialog({
  selection,
  close,
}: {
  selection: string | null;
  close: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (selection !== null) {
      dialog.current?.showModal();
      const previous = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previous;
      };
    }
    dialog.current?.close();
  }, [selection]);
  return (
    <dialog
      ref={dialog}
      className="booking-dialog"
      aria-labelledby="booking-title"
      onCancel={close}
      onClick={(e) => {
        if (e.target === dialog.current) {
          const r = dialog.current.getBoundingClientRect();
          if (
            e.clientX < r.left ||
            e.clientX > r.right ||
            e.clientY < r.top ||
            e.clientY > r.bottom
          )
            close();
        }
      }}
    >
      <button
        className="dialog-close"
        onClick={close}
        aria-label="Fechar agendamento"
      >
        <X size={20} />
      </button>
      <SectionLabel>UM CUIDADO SÓ SEU</SectionLabel>
      <h2 id="booking-title">Vamos conversar?</h2>
      <p className="dialog-description">
        O primeiro passo é entender o que você procura.
      </p>
      {selection !== null && (
        <BookingForm key={selection} compact initialTreatment={selection} />
      )}
    </dialog>
  );
}

function Privacy() {
  return (
    <main className="legal-page container" id="main-content">
      <SectionLabel>TRANSPARÊNCIA & CUIDADO</SectionLabel>
      <h1>
        Política de <em>Privacidade</em>
      </h1>
      <p className="legal-intro">
        Seu cuidado começa com o respeito às suas informações.
      </p>
      <div className="legal-content">
        <h2>1. Sobre este site</h2>
        <p>
          Este site apresenta informações sobre a atuação e os cuidados
          estéticos de {clinic.displayName}. A identificação legal do
          responsável pelo tratamento de dados e o canal para solicitações devem
          ser completados antes da ativação do atendimento.
        </p>
        <p>
          Responsável: {clinic.displayName}. CNPJ:{" "}
          {clinic.cnpj || "a confirmar"}. Contato:{" "}
          {clinic.email || "e-mail a confirmar"}.
        </p>
        <h2>2. Quais informações são utilizadas</h2>
        <p>
          O formulário solicita primeiro nome e, opcionalmente, o tratamento de
          interesse. Essas informações servem apenas para compor uma mensagem
          que você poderá revisar e enviar pelo WhatsApp. O site não possui
          banco de dados de leads e não envia o formulário a um servidor
          próprio. Evite informar dados de saúde sensíveis por este formulário.
        </p>
        <h2>3. WhatsApp e redes sociais</h2>
        <p>
          Ao continuar para o WhatsApp ou acessar o Instagram, você passa a usar
          um serviço de terceiro, sujeito às suas próprias condições e políticas
          de privacidade. O conteúdo da mensagem integra a URL de abertura do
          WhatsApp e poderá constar do histórico do navegador. O número do seu
          telefone será compartilhado com o atendimento se você enviar a
          mensagem.
        </p>
        <h2>4. Finalidade e base legal</h2>
        <p>
          As informações fornecidas voluntariamente são utilizadas para
          responder ao seu pedido de contato e tomar providências de agendamento
          solicitadas por você, conforme aplicável à LGPD. A autorização no
          formulário não abrange publicidade, tratamentos clínicos ou uso de
          imagem. Essas finalidades exigem informação e análise próprias.
        </p>
        <h2>5. Armazenamento e cookies</h2>
        <p>
          Este site não instala cookies publicitários, ferramentas de análise ou
          pixels. Um indicador temporário na sessão do navegador registra apenas
          se o botão de abertura do WhatsApp foi acionado; ele não contém seu
          nome nem o tratamento escolhido. A hospedagem pode processar registros
          técnicos, como IP e horário de acesso, para operação e segurança. Após
          o contato, a retenção das mensagens e de eventuais dados de
          atendimento deve seguir as obrigações aplicáveis e a política da
          responsável.
        </p>
        <h2>6. Seus direitos</h2>
        <p>
          Nos termos da LGPD, você pode solicitar informações sobre o
          tratamento, acesso, correção, eliminação quando cabível e demais
          direitos aplicáveis, pelo canal de contato da responsável. Algumas
          informações poderão ser mantidas quando houver obrigação legal.
        </p>
        <h2>7. Atualizações</h2>
        <p>
          Esta política descreve a implementação atual. Antes da publicação, a
          responsável deve completar sua identificação, os canais de contato e
          as práticas efetivas de retenção. Qualquer inclusão de analytics,
          pixel ou banco de dados requer atualização desta política e avaliação
          da necessidade de consentimento.
        </p>
      </div>
      <a href="/" className="button button-outline">
        Voltar à página inicial <ArrowRight size={17} />
      </a>
    </main>
  );
}

function ThankYou({ onBook }: { onBook: Booking }) {
  const [started, setStarted] = useState(false);
  useEffect(() => {
    try {
      setStarted(sessionStorage.getItem("ianca_whatsapp_started") === "true");
    } catch {
      /* Armazenamento opcional. */
    }
  }, []);
  const url = whatsappUrl();
  return (
    <main className="status-page container" id="main-content">
      <div className="status-symbol">
        <Heart size={36} strokeWidth={1} />
      </div>
      <SectionLabel>QUE BOM TER VOCÊ AQUI</SectionLabel>
      <h1>
        Seu cuidado começa
        <br />
        <em>com essa conversa.</em>
      </h1>
      <p>
        Obrigada pelo interesse, vamos cuidar desse primeiro passo com atenção.
      </p>
      <div className="next-steps">
        <span>01</span>
        <p>
          <strong>
            {started
              ? "Finalize sua mensagem no WhatsApp."
              : "Inicie uma conversa com a equipe."}
          </strong>
          Revise e toque em enviar no aplicativo. Só assim a equipe receberá seu
          pedido.
        </p>
        <span>02</span>
        <p>
          <strong>Aguarde a confirmação do atendimento.</strong>A
          disponibilidade e o horário da avaliação serão combinados durante a
          conversa.
        </p>
      </div>
      <div className="status-actions">
        {url ? (
          <a
            className="button button-primary"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsApp />
            Abrir WhatsApp
          </a>
        ) : (
          <button className="button button-primary" onClick={() => onBook()}>
            Ver opções de contato <ArrowUpRight size={17} />
          </button>
        )}
        <a href="/" className="text-link">
          Voltar ao início <ArrowRight size={16} />
        </a>
      </div>
      <p className="status-note">
        Esta página não confirma o envio da mensagem nem um agendamento.
      </p>
    </main>
  );
}

function NotFound({ onBook }: { onBook: Booking }) {
  return (
    <main className="status-page error-page container" id="main-content">
      <div className="error-art" aria-hidden="true">
        4<Flower2 size={106} strokeWidth={0.6} />4
      </div>
      <SectionLabel>UM PEQUENO DESVIO NO CAMINHO</SectionLabel>
      <h1>
        Essa página se perdeu.
        <br />
        <em>Seu cuidado, não.</em>
      </h1>
      <p>
        Não encontramos o endereço que você procurou.
        <br />
        Mas o próximo passo para cuidar de você está bem aqui.
      </p>
      <div className="status-actions">
        <a className="button button-primary" href="/">
          Voltar à página inicial <ArrowRight size={17} />
        </a>
        <button className="button button-outline" onClick={() => onBook()}>
          <WhatsApp />
          Falar pelo WhatsApp
        </button>
      </div>
    </main>
  );
}

export function App({ path = "/" }: { path?: string }) {
  const [selection, setSelection] = useState<string | null>(null);
  const cleanPath = path.replace(/\/+$/, "") || "/";
  const onBook: Booking = (treatment = "") => {
    const url = whatsappUrl(
      treatment
        ? `Olá, Dra. Ianca! Vim pelo site e gostaria de agendar uma avaliação para conversar sobre ${treatment}. Poderia me informar os horários disponíveis?`
        : undefined,
    );
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
      window.dispatchEvent(
        new CustomEvent("ianca:whatsapp-start", { detail: { source: "cta" } }),
      );
    } else setSelection(treatment);
  };
  useEffect(() => {
    const titles: Record<string, string> = {
      "/": "Dra. Ianca Gontijo | Estética Farmacêutica em Rubiataba e Ceres",
      "/privacidade": "Política de Privacidade | Ianca Gontijo",
      "/obrigado": "Obrigada pelo seu interesse | Ianca Gontijo",
    };
    document.title =
      titles[cleanPath] || "Página não encontrada | Ianca Gontijo";
  }, [cleanPath]);
  return (
    <>
      <a className="skip-link" href="#main-content">
        Pular para o conteúdo
      </a>
      <div id="top" />
      <Header onBook={onBook} home={cleanPath === "/"} />
      {cleanPath === "/" ? (
        <main id="main-content">
          <Hero onBook={onBook} />
          <ValuesStrip />
          <Treatments onBook={onBook} />
          <About onBook={onBook} />
          <Difference />
          <Testimonials />
          <FAQ onBook={onBook} />
          <Appointment />
        </main>
      ) : cleanPath === "/privacidade" ? (
        <Privacy />
      ) : cleanPath === "/obrigado" ? (
        <ThankYou onBook={onBook} />
      ) : (
        <NotFound onBook={onBook} />
      )}
      <Footer onBook={onBook} />
      <button
        className="floating-whatsapp"
        onClick={() => onBook()}
        aria-label="Vamos conversar? Agendar avaliação pelo WhatsApp"
      >
        <WhatsApp size={26} />
        <span>Vamos conversar?</span>
      </button>
      <BookingDialog selection={selection} close={() => setSelection(null)} />
    </>
  );
}
