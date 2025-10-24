"use client";
import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  IconArrowUpRight,
  IconShieldCheckFilled,
  IconCircleCheckFilled,
} from "@tabler/icons-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Main() {
  const container = useRef(null);
  const [content, setContent] = useState<any>(null);

  // Cargar JSON dinámicamente
  useEffect(() => {
    import("@/data/content.json").then((module) => {
      setContent(module.default);
    });
  }, []);

  // GSAP Animaciones
  useGSAP(
    () => {
      const sections = [
        ".main__about .about__content > *",
        ".main__services .service__item",
        ".main__clients .clients__item",
        ".main__team .team__item",
        ".main__contact .contact__content",
        ".main__contact .form__section",
      ];
      sections.forEach((selector) => {
        const elements = gsap.utils.toArray(selector);
        elements.forEach((el, i) => {
          gsap.from(el, {
            opacity: 0,
            y: 60,
            duration: 0.3,
            ease: "power3.out",
            delay: i * 0.08,
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              end: "bottom 40%",
              toggleActions: "play none none none",
              once: true,
            },
          });
        });
      });
    },
    { scope: container }
  );

  if (!content) return null;

  const { hero, about, services, clients, team, contact } = content;

  return (
    <div ref={container}>
      {/* 🔹 HERO SECTION (múltiples héroes) */}
      {hero.map((slide: any, index: number) => (
        <section className='main__hero' key={index}>
          <div className='hero__image'>
            <img src={slide.image} alt={`hero-${index}`} />
          </div>
          <div className='hero__slider'>
            <span>{slide.tagline}</span>
            <h1>{slide.title}</h1>
            <p>{slide.description}</p>
            <a href='#' className='btn__primary--search'>
              <div className='btn__icon'>
                <IconArrowUpRight />
              </div>
              {slide.buttonText}
            </a>
          </div>
        </section>
      ))}

      {/* 🔹 ABOUT */}
      <section className='main__about'>
        <div className='about__content'>
          <span>{about.title}</span>
          <h2>{about.headline}</h2>
          <p>{about.description}</p>
          <div className='about__content--dips'>
            {about.bullets.map((text: string, i: number) => (
              <div key={i} className='dips__item'>
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
            {about.buttonText}
          </a>
        </div>
      </section>

      {/* 🔹 SERVICES */}
      <section className='main__services'>
        <div className='services__content'>
          <span>{services.title}</span>
          <h2>{services.headline}</h2>
          <a href='#' className='btn__primary--search btn__primary--dark'>
            <div className='btn__icon'>
              <IconArrowUpRight />
            </div>
            {services.buttonText}
          </a>
          <div className='services__paragraph'>
            <p>{services.paragraph}</p>
          </div>
        </div>

        <div className='services__grid'>
          {services.list.map((srv: any, i: number) => (
            <div className='service__item' key={i}>
              <div className='services__item--icon'>
                <IconShieldCheckFilled />
              </div>
              <h3>{srv.title}</h3>
              <p>{srv.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 🔹 CLIENTS */}
      <section className='main__clients'>
        <div className='clients'>
          <span>{clients.title}</span>
          <h2>{clients.headline}</h2>
        </div>
        <div className='clients__grid'>
          {clients.testimonials.map((client: any, i: number) => (
            <div className='clients__item' key={i}>
              <div className='clients__item--icon' />
              <h4>{client.name}</h4>
              <span>{client.position}</span>
              <p>“{client.quote}”</p>
            </div>
          ))}
        </div>
      </section>

      {/* 🔹 TEAM */}
      <section className='main__team'>
        <div className='team__content'>
          <span>{team.title}</span>
          <h2>{team.headline}</h2>
        </div>
        <div className='team__grid'>
          {team.members.map((m: any, i: number) => (
            <div className='team__item' key={i}>
              <div className='team__item--image'>
                <img src={m.image} alt={m.name} />
              </div>
              <div className='item__content'>
                <h4>{m.name}</h4>
                <span>{m.position}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🔹 CONTACT (solo fields + botón) */}
      <section className='main__contact'>
        <div className='contact__form'>
          <div className='form__section'>
            <form>
              {contact.fields.map((placeholder: string, i: number) =>
                placeholder === "Your Message" ? (
                  <textarea key={i} placeholder={placeholder}></textarea>
                ) : (
                  <input key={i} type='text' placeholder={placeholder} />
                )
              )}
              <button type='submit' className='btn__primary--search'>
                <div className='btn__icon'>
                  <IconArrowUpRight />
                </div>
                {contact.buttonText}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
