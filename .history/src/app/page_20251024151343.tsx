"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  IconArrowUpRight,
  IconCircleCheckFilled,
  IconShieldCheckFilled,
} from "@tabler/icons-react";

// 👇 REGISTRA LOS PLUGINS SOLO UNA VEZ (fuera del componente)
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);

const HERO_AUTOPLAY_DELAY = 6000;

export default function Main() {
  const container = useRef<HTMLDivElement | null>(null);
  const heroImageRef = useRef<HTMLDivElement | null>(null);
  const heroSliderRef = useRef<HTMLDivElement | null>(null);
  const heroProgressRef = useRef<HTMLDivElement | null>(null);
  const [content, setContent] = useState<any>(null);
  const [activeSlide, setActiveSlide] = useState(0);

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
    (context) => {
      if (!content) return;

      // 🔹 Reinicia triggers previos si el contenido cambia
      ScrollTrigger.getAll().forEach((t) => t.kill());

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
        .toArray<HTMLElement>(".btn__primary--search")
        .forEach((btn, i) => {
          gsap.from(btn, {
            opacity: 0,
            y: 25,
            scale: 0.95,
            duration: 0.4,
            ease: "back.out(1.7)",
            delay: i * 0.1,
            scrollTrigger: {
              trigger: btn,
              start: "top 80%",
              once: true,
            },
          });
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

  return (
    <div ref={container}>
      {/* 🔹 HERO */}
      <section className='main__hero'>
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
          <a href='#' className='btn__primary--search'>
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
      <section className='main__about'>
        <div className='about__image'></div>
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
          <a href='#' className='btn__primary--search btn__primary--dark'>
            <div className='btn__icon'>
              <IconArrowUpRight />
            </div>
            {content.about.buttonText}
          </a>
        </div>
      </section>

      {/* 🔹 SERVICES */}
      <section className='main__services'>
        <div className='services__content'>
          <span>{content.services.tagline}</span>
          <h2>{content.services.title}</h2>
          <a href='#' className='btn__primary--search btn__primary--dark'>
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
                <IconShieldCheckFilled />
              </div>
              <h3>{srv.title}</h3>
              <p>{srv.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 🔹 CLIENTS */}
      <section className='main__clients'>
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
          <div className='clients__brand'>
            {content.clients.brands.map((b: string, i: number) => (
              <div className='brand__item' key={i} title={b} />
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
      <section className='main__team'>
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
      {/* <section className='main__contact'>
        <div className='contact__content'>
          <span>{content.contactHeader.tagline}</span>
          <h2>{content.contactHeader.title}</h2>
        </div>
        <div className='contact__form'>
          <div className='form__section'>
            <h3>{content.contactInfo.title}</h3>
            <p>{content.contactInfo.description}</p>
            <form>
              {content.contact.fields.map((f: any, i: number) =>
                f.type === "textarea" ? (
                  <textarea
                    key={i}
                    name={f.name}
                    placeholder={f.placeholder}
                  ></textarea>
                ) : (
                  <input
                    key={i}
                    type={f.type}
                    name={f.name}
                    placeholder={f.placeholder}
                  />
                )
              )}
              <button type='submit' className='btn__primary--search'>
                <div className='btn__icon'>
                  <IconArrowUpRight />
                </div>
                {content.contact.buttonText}
              </button>
            </form>
          </div>
          <div className='form__aside'>
            {content.contactInfo.aside.map((a: any, i: number) => (
              <div
                className={`aside__item${a.highlight ? " bg-amber-600" : ""}`}
                key={i}
              >
                <div className='aside__item--icon'>
                  <IconShieldCheckFilled color='var(--white)' />
                </div>
                <div className='aside__item--info'>
                  <h4>{a.title}</h4>
                  <a href={a.href}>{a.text}</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}
    </div>
  );
}
