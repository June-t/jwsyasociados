"use client";
import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  IconArrowUpRight,
  IconCircleCheckFilled,
  IconShieldCheckFilled,
} from "@tabler/icons-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Main() {
  const container = useRef(null);
  const [content, setContent] = useState<any>(null);

  // 🔹 Cargar JSON dinámicamente
  useEffect(() => {
    import("@/data/content.json").then((module) => setContent(module.default));
  }, []);

  // 🔹 Animaciones GSAP
  useGSAP(
    () => {
      const sections = [
        ".main__about .about__content > *",
        ".main__services .service__item",
        ".main__clients .clients__item",
        ".main__team .team__item",
        ".main__contact .contact__content",
        ".main__contact .form__section",
        ".main__contact .form__aside",
      ];

      sections.forEach((selector) => {
        const elements = gsap.utils.toArray(selector);
        elements.forEach((el, i) => {
          gsap.from(el, {
            opacity: 0,
            y: 60,
            duration: 0.3,
            ease: "cubic-bezier(0.85, 0, 0.15, 1)",
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

      gsap.utils.toArray(".btn__primary--search").forEach((btn, i) => {
        gsap.from(btn, {
          opacity: 0,
          y: 20,
          scale: 0.96,
          duration: 0.4,
          ease: "cubic-bezier(0.85, 0, 0.15, 1)",
          delay: i * 0.1,
          scrollTrigger: {
            trigger: btn,
            start: "top 60%",
            end: "bottom 40%",
            once: true,
          },
        });
      });
    },
    { scope: container }
  );

  if (!content) return null;
  const { hero, about, services, clients, team, contact } = content;

  return (
    <div ref={container}>
      {/* 🔹 HERO SECTION - dinámico con múltiples slides */}
      {hero.map((slide: any, i: number) => (
        <section className='main__hero' key={i}>
          <div className='hero__image'>
            <img src={slide.image} alt={`hero-${i}`} />
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

      {/* 🔹 ABOUT SECTION */}
      <section className='main__about'>
        <div className='about__image'></div>
        <div className='about__content'>
          <span>{about.title}</span>
          <h2>{about.headline}</h2>
          <p>{about.description}</p>

          <div className='about__content--dips'>
            {about.bullets.map((item: string, i: number) => (
              <div className='dips__item' key={i}>
                <span>
                  <IconCircleCheckFilled />
                </span>
                <h4>{item}</h4>
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

      {/* 🔹 SERVICES SECTION */}
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

      {/* 🔹 CLIENTS SECTION */}
      <section className='main__clients'>
        <div className='clients'>
          <span>{clients.title}</span>
          <h2>{clients.headline}</h2>
        </div>

        <div className='clients__grid'>
          <div className='clients__grid--item'>
            {clients.testimonials.slice(0, 4).map((client: any, i: number) => (
              <div className='clients__item' key={i}>
                <div className='clients__item--icon' />
                <h4>{client.name}</h4>
                <span>{client.position}</span>
                <p>“{client.quote}”</p>
              </div>
            ))}
          </div>

          <div className='clients__grid--item'>
            {clients.testimonials.slice(4).map((client: any, i: number) => (
              <div className='clients__item' key={i}>
                <div className='clients__item--icon' />
                <h4>{client.name}</h4>
                <span>{client.position}</span>
                <p>“{client.quote}”</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔹 TEAM SECTION */}
      <section className='main__team'>
        <div className='team__content'>
          <span>{team.title}</span>
          <h2>{team.headline}</h2>
        </div>
        <div className='team__grid'>
          <div className='team__grid--item'>
            {team.members.map((member: any, i: number) => (
              <div className='team__item' key={i}>
                <div className='team__item--image'>
                  <img src={member.image} alt={member.name} />
                </div>
                <div className='item__content'>
                  <h4>{member.name}</h4>
                  <span>{member.position}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔹 CONTACT SECTION */}
      <section className='main__contact'>
        <div className='contact__content'>
          <span>Contact</span>
          <h2>Get in Touch With Us</h2>
        </div>
        <div className='contact__form'>
          <div className='form__section'>
            <form action=''>
              {contact.fields.map((field: string, i: number) =>
                field === "Your Message" ? (
                  <textarea key={i} placeholder={field}></textarea>
                ) : (
                  <input key={i} type='text' placeholder={field} />
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
