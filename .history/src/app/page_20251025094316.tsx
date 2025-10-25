"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  IconArrowUpRight,
  IconCircleCheckFilled,
  IconShieldCheckFilled,
  IconMapPin,
  IconDeviceMobileMessage,
  IconMailFilled,
  IconBriefcase,
  IconSchool,
  IconChartBar,
  IconUsers,
  IconBuilding,
  IconTarget,
} from "@tabler/icons-react";
import Footer from "./common/Footer";

// 👇 REGISTRA LOS PLUGINS SOLO UNA VEZ (fuera del componente)
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);

const HERO_AUTOPLAY_DELAY = 6000;

const gradients = [
  ["#FF6B6B", "#FFD93D"],
  ["#6BCB77", "#4D96FF"],
  ["#845EC2", "#D65DB1"],
  ["#00C9A7", "#92FE9D"],
  ["#FF9671", "#FFC75F"],
  ["#0081CF", "#00C9A7"],
  ["#F9D923", "#FF6B6B"],
  ["#845EC2", "#FF9671"],
];

export default function Main() {
  const container = useRef<HTMLDivElement | null>(null);
  const heroImageRef = useRef<HTMLDivElement | null>(null);
  const heroSliderRef = useRef<HTMLDivElement | null>(null);
  const heroProgressRef = useRef<HTMLDivElement | null>(null);
  const [content, setContent] = useState<any>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [sending, setSending] = useState(false);
  const [sentStatus, setSentStatus] = useState<null | {
    ok: boolean;
    message: string;
  }>(null);

  // 📦 Cargar JSON dinámico
  useEffect(() => {
    import("@/data/content.json")
      .then((m) => setContent(m.default))
      .catch((e) => console.error("Error al cargar content.json", e));
  }, []);

  // ⏱️ Autoplay para hero
  useEffect(() => {
    if (!content?.hero?.length) return;
    const id = setInterval(
      () => setActiveSlide((p) => (p + 1) % content.hero.length),
      HERO_AUTOPLAY_DELAY
    );
    return () => clearInterval(id);
  }, [content]);

  useEffect(() => {
    if (!content?.hero?.length) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "cubic-bezier(0.85, 0, 0.15, 1);" },
      });

      const heroImage = heroImageRef.current?.querySelector("img");
      if (heroImage) {
        tl.fromTo(
          heroImage,
          { opacity: 0, scale: 1.05 },
          { opacity: 1, scale: 1, duration: 0.8 },
          0
        );
      }

      if (heroSliderRef.current) {
        const sliderChildren = Array.from(
          heroSliderRef.current.children
        ) as HTMLElement[];

        sliderChildren.forEach((element, index) => {
          tl.fromTo(
            element,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.5 },
            index * 0.1 + 0.1
          );
        });
      }

      if (heroProgressRef.current) {
        const progressLine = heroProgressRef.current.querySelector(
          ".progress__line"
        ) as HTMLElement | null;

        if (progressLine) {
          tl.fromTo(
            progressLine,
            { "--progress-width": "0%" },
            {
              "--progress-width": "100%",
              duration: HERO_AUTOPLAY_DELAY / 1000,
              ease: "none",
            },
            0
          );
        }

        tl.fromTo(
          heroProgressRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.4 },
          0.2
        );
      }
    }, container);

    return () => ctx.revert();
  }, [activeSlide, content]);

  // 🎬 Animaciones GSAP
  useGSAP(
    () => {
      if (!content) return;

      const fadeUpSections = [
        ".main__about .about__content > *",
        ".main__services .service__item",
        ".main__clients .clients__item",
        ".main__team .team__item",
        ".main__contact .contact__content",
        ".main__contact .form__section",
        ".main__contact .form__aside",
      ];

      fadeUpSections.forEach((selector) => {
        gsap.utils.toArray<HTMLElement>(selector).forEach((el, i) => {
          gsap.from(el, {
            opacity: 0,
            y: 60,
            duration: 0.4,
            ease: "power3.out",
            delay: i * 0.08,
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              once: true,
            },
          });
        });
      });

      // ✨ Botones con rebote
      gsap.utils
        .toArray<HTMLElement>(".clients__item--icon")
        .forEach((icon) => {
          // Elegir un gradiente random
          const [start, end] =
            gradients[Math.floor(Math.random() * gradients.length)];

          // Aplicar gradiente y sombra dinámica
          gsap.set(icon, {
            background: `linear-gradient(135deg, ${start}, ${end})`,
            boxShadow: `0 0 15px 2px ${start}40`, // 40 = 25% opacidad
            width: "50px",
            height: "50px",
          });

          // Añadir animación de aparición suave
          gsap.fromTo(
            icon,
            { opacity: 0, scale: 0.6, y: 20 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.6,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: icon,
                start: "top 90%",
                once: true,
              },
            }
          );
        });
    },
    { scope: container, dependencies: [content] }
  );

  if (!content) return null;

  // 🧠 Variables reutilizables
  const hero = content.hero ?? [];
  const slide = hero[activeSlide] ?? {};
  const slideTitleLines = slide.title ?? [];
  const progressCurrent = String(activeSlide + 1).padStart(2, "0");
  const progressTotal = String(hero.length).padStart(2, "0");

  const firstTestimonials = content.clients.testimonials.slice(0, 4);
  const remainingTestimonials = content.clients.testimonials.slice(4);

  const getIcon = (name: string) => {
    switch (name) {
      case "map":
        return <IconMapPin color='var(--white)' />;
      case "phone":
        return <IconDeviceMobileMessage color='var(--white)' />;
      case "mail":
        return <IconMailFilled color='var(--white)' />;
      default:
        return <IconShieldCheckFilled color='var(--white)' />;
    }
  };

  const getServiceIcon = (name: string) => {
    switch (name) {
      case "briefcase":
        return <IconBriefcase color='var(--white)' />;
      case "school":
        return <IconSchool color='var(--white)' />;
      case "chart":
        return <IconChartBar color='var(--white)' />;
      case "users":
        return <IconUsers color='var(--white)' />;
      case "building":
        return <IconBuilding color='var(--white)' />;
      case "target":
        return <IconTarget color='var(--white)' />;
      default:
        return <IconShieldCheckFilled color='var(--white)' />;
    }
  };

  return (
    <div ref={container}>
      {/* 🔹 HERO */}
      <section id='inicio' className='main__hero'>
        <div className='hero__image' ref={heroImageRef}>
          <img src={slide.image} alt={slide.tagline} />
        </div>
        <div className='hero__slider' ref={heroSliderRef}>
          <span>{slide.tagline}</span>
          <h1>
            {slideTitleLines.map((line: string, i: number) => (
              <React.Fragment key={i}>
                {line}
                {i < slideTitleLines.length - 1 && <br />}
              </React.Fragment>
            ))}
          </h1>
          <a href='#contacto' className='btn__primary--search'>
            <div className='btn__icon'>
              <IconArrowUpRight />
            </div>
            {slide.buttonText}
          </a>
        </div>
        <div className='hero__progress' ref={heroProgressRef}>
          <div className='progress__status'>
            <span>{progressCurrent}</span>
          </div>
          <div className='progress__line' />
          <div className='progress__total'>
            <span>/{progressTotal}</span>
          </div>
        </div>
      </section>

      {/* 🔹 ABOUT */}
      <section id='nosotros' className='main__about'>
        <div className='about__image'>
          <img src='https://plus.unsplash.com/premium_photo-1684769160713-eb143a5f1b11?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687' />
        </div>
        <div className='about__content'>
          <span>{content.about.tagline}</span>
          <h2>{content.about.title}</h2>
          <p>
            {content.about.description.map((text: string, i: number) => (
              <React.Fragment key={i}>
                {text}
                {i < content.about.description.length - 1 && (
                  <>
                    <br />
                    <br />
                  </>
                )}
              </React.Fragment>
            ))}
          </p>
          <div className='about__content--dips'>
            {content.about.dips.map((text: string, i: number) => (
              <div className='dips__item' key={i}>
                <span>
                  <IconCircleCheckFilled />
                </span>
                <h4>{text}</h4>
              </div>
            ))}
          </div>
          <a
            href='#contacto'
            className='btn__primary--search btn__primary--dark'
          >
            <div className='btn__icon'>
              <IconArrowUpRight />
            </div>
            {content.about.buttonText}
          </a>
        </div>
      </section>

      {/* 🔹 SERVICES */}
      <section id='servicios' className='main__services'>
        <div className='services__content'>
          <span>{content.services.tagline}</span>
          <h2>{content.services.title}</h2>
          <a
            href='#contacto'
            className='btn__primary--search btn__primary--dark'
          >
            <div className='btn__icon'>
              <IconArrowUpRight />
            </div>
            {content.services.buttonText}
          </a>
          <div className='services__paragraph'>
            <p>{content.services.description}</p>
          </div>
        </div>

        <div className='services__grid'>
          {content.services.items.map((srv: any, i: number) => (
            <div className='service__item' key={i}>
              <div className='services__item--icon'>
                {getServiceIcon(srv.icon)}
              </div>
              <h3>{srv.title}</h3>
              <p>{srv.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 🔹 CLIENTS */}
      <section id='testimonios' className='main__clients'>
        <div className='clients'>
          <span>{content.clients.tagline}</span>
          <h2>{content.clients.title}</h2>
        </div>
        <div className='clients__grid'>
          <div className='clients__grid--item'>
            {firstTestimonials.map((t: any, i: number) => (
              <div className='clients__item' key={i}>
                <div className='clients__item--icon' />
                <h4>{t.name}</h4>
                <span>{t.role}</span>
                <p>"{t.quote}"</p>
              </div>
            ))}
          </div>
          <div className='clients__grid--item'>
            {remainingTestimonials.map((t: any, i: number) => (
              <div className='clients__item' key={i}>
                <div className='clients__item--icon' />
                <h4>{t.name}</h4>
                <span>{t.role}</span>
                <p>"{t.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔹 TEAM */}
      <section id='equipo' className='main__team'>
        <div className='team__content'>
          <span>{content.team.tagline}</span>
          <h2>{content.team.title}</h2>
        </div>
        <div className='team__grid'>
          <div className='team__grid--item'>
            {content.team.members.map((m: any, i: number) => (
              <div className='team__item' key={i}>
                <div className='team__item--image'>
                  <img src={m.image} alt={m.name} />
                </div>
                <div className='item__content'>
                  <h4>{m.name}</h4>
                  <span>{m.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔹 CONTACT */}
      <section id='contacto' className='main__contact'>
        <div className='contact__content'>
          <span>{content.contactHeader.tagline}</span>
          <h2>{content.contactHeader.title}</h2>
        </div>
        <div className='contact__form'>
          <div className='form__section'>
            <h3>{content.contactInfo.title}</h3>
            <p>{content.contactInfo.description}</p>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setSentStatus(null);
                setSending(true);
                try {
                  const form = e.currentTarget as HTMLFormElement;
                  const fd = new FormData(form);

                  const nombre = (fd.get("nombre") || fd.get("name") || "")
                    .toString()
                    .trim();
                  const correo = (fd.get("correo") || fd.get("email") || "")
                    .toString()
                    .trim();
                  const servicio = (
                    fd.get("servicio") ||
                    fd.get("service") ||
                    "No especificado"
                  )
                    .toString()
                    .trim();
                  const mensaje = (fd.get("mensaje") || fd.get("message") || "")
                    .toString()
                    .trim();

                  const res = await fetch("/api/contact", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ nombre, correo, servicio, mensaje }),
                  });
                  const data = await res.json();
                  if (!res.ok || !data?.ok) {
                    throw new Error(
                      data?.error || "No se pudo enviar el mensaje."
                    );
                  }
                  setSentStatus({
                    ok: true,
                    message:
                      "¡Mensaje enviado con éxito! Te responderemos pronto.",
                  });
                  form.reset();
                } catch (err: any) {
                  setSentStatus({
                    ok: false,
                    message: err?.message || "Ocurrió un error al enviar.",
                  });
                } finally {
                  setSending(false);
                }
              }}
            >
              {/* Campos de nombre y correo */}
              {content.contact.fields
                .filter((f: any) => f.type !== "textarea")
                .map((f: any, i: number) => (
                  <input
                    key={i}
                    type={f.type}
                    name={f.name}
                    placeholder={f.placeholder}
                  />
                ))}

              {/* 🔹 Campo adicional para Servicio (antes del mensaje) */}
              <select name='servicio' defaultValue=''>
                <option value='' disabled>
                  Selecciona un servicio
                </option>
                {content.services.items.map((srv: any, idx: number) => (
                  <option key={idx} value={srv.title}>
                    {srv.title}
                  </option>
                ))}
              </select>

              {/* Campo de mensaje */}
              {content.contact.fields
                .filter((f: any) => f.type === "textarea")
                .map((f: any, i: number) => (
                  <textarea
                    key={i}
                    name={f.name}
                    placeholder={f.placeholder}
                  ></textarea>
                ))}

              {/* Feedback del envío */}
              {sentStatus && (
                <div
                  className={`form__feedback ${
                    sentStatus.ok ? "success" : "error"
                  }`}
                  aria-live='polite'
                >
                  {sentStatus.message}
                </div>
              )}

              {/* Botón de envío */}
              <button
                type='submit'
                className='btn__primary--search'
                disabled={sending}
              >
                <div className='btn__icon'>
                  <IconArrowUpRight />
                </div>
                {sending ? "Enviando..." : content.contact.buttonText}
              </button>
            </form>
          </div>
          <div className='form__aside'>
            {content.contactInfo.aside.map((a: any, i: number) => (
              <a href={a.href}>
                <div className='aside__item' key={i}>
                  <div className='aside__item--icon'>{getIcon(a.icon)}</div>
                  <div className='aside__item--info'>
                    <h4>{a.title}</h4>
                    <a>{a.text}</a>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 🔹 FOOTER */}
      <Footer />
    </div>
  );
}
