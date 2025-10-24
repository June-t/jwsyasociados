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

gsap.registerPlugin(ScrollTrigger, useGSAP);

type HeroSlide = {
  image: string;
  tagline: string;
  title: string[];
  description: string;
  buttonText: string;
};

type AboutContent = {
  tagline: string;
  title: string;
  description: string[];
  dips: string[];
  buttonText: string;
};

type ServiceItem = {
  title: string;
  description: string;
};

type ServicesContent = {
  tagline: string;
  title: string;
  buttonText: string;
  description: string;
  items: ServiceItem[];
};

type Testimonial = {
  name: string;
  role: string;
  quote: string;
};

type ClientsContent = {
  tagline: string;
  title: string;
  testimonials: Testimonial[];
  brands: string[];
};

type TeamMember = {
  name: string;
  role: string;
  image: string;
};

type TeamContent = {
  tagline: string;
  title: string;
  members: TeamMember[];
};

type ContactField = {
  name: string;
  type: string;
  placeholder: string;
};

type ContactContent = {
  fields: ContactField[];
  buttonText: string;
};

type ContactHeader = {
  tagline: string;
  title: string;
};

type ContactInfoItem = {
  title: string;
  href: string;
  text: string;
  highlight: boolean;
};

type ContactInfo = {
  title: string;
  description: string;
  aside: ContactInfoItem[];
};

type PageContent = {
  hero: HeroSlide[];
  about: AboutContent;
  services: ServicesContent;
  clients: ClientsContent;
  team: TeamContent;
  contact: ContactContent;
  contactHeader: ContactHeader;
  contactInfo: ContactInfo;
};

const HERO_AUTOPLAY_DELAY = 6000;

export default function Main() {
  const container = useRef<HTMLDivElement | null>(null);
  const [content, setContent] = useState<PageContent | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    let isMounted = true;

    import("@/data/content.json")
      .then((module) => {
        if (isMounted) {
          setContent(module.default as PageContent);
        }
      })
      .catch((error) => {
        console.error("Failed to load content.json", error);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!content || content.hero.length <= 1) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % content.hero.length);
    }, HERO_AUTOPLAY_DELAY);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [content]);

  useEffect(() => {
    if (!content) {
      return;
    }

    if (activeSlide >= content.hero.length) {
      setActiveSlide(0);
    }
  }, [content, activeSlide]);

  useGSAP(
    () => {
      if (!content) {
        return;
      }

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
        const elements = gsap.utils.toArray<HTMLElement>(selector);
        elements.forEach((el, i) => {
          gsap.from(el, {
            opacity: 0,
            y: 60,
            duration: 0.3,
            ease: "cubic-bezier(0.85, 0, 0.15, 1);",
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

      gsap.utils.toArray<HTMLElement>(".btn__primary--search").forEach((btn, i) => {
        gsap.from(btn, {
          opacity: 0,
          y: 20,
          scale: 0.96,
          duration: 0.4,
          ease: "cubic-bezier(0.85, 0, 0.15, 1);",
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
    { scope: container },
    [content]
  );

  if (!content) {
    return null;
  }

  const heroSlides = content.hero;
  const hasHeroSlides = heroSlides.length > 0;
  const currentSlideIndex = hasHeroSlides
    ? activeSlide % heroSlides.length
    : 0;
  const currentSlide = hasHeroSlides
    ? heroSlides[currentSlideIndex]
    : null;
  const slideTitleLines = currentSlide?.title ?? [];
  const progressCurrent = hasHeroSlides
    ? String(currentSlideIndex + 1).padStart(2, "0")
    : "00";
  const progressTotal = hasHeroSlides
    ? String(heroSlides.length).padStart(2, "0")
    : "00";

  const firstTestimonials = content.clients.testimonials.slice(0, 4);
  const remainingTestimonials = content.clients.testimonials.slice(4);

  return (
    <div ref={container}>
      <section className='main__hero'>
        <div className='hero__image'>
          {currentSlide && (
            <img src={currentSlide.image} alt={currentSlide.tagline} />
          )}
        </div>
        <div className='hero__slider'>
          <span>{currentSlide?.tagline}</span>
          <h1>
            {slideTitleLines.map((line, index) => (
              <React.Fragment key={`${line}-${index}`}>
                {line}
                {index < slideTitleLines.length - 1 && <br />}
              </React.Fragment>
            ))}
          </h1>
          <p>{currentSlide?.description}</p>
          <a href='#' className='btn__primary--search'>
            <div className='btn__icon'>
              <IconArrowUpRight />
            </div>
            {currentSlide?.buttonText}
          </a>
        </div>
        <div className='hero__progress'>
          <div className='progress__status'>
            <span>{progressCurrent}</span>
          </div>
          <div className='progress__line' />
          <div className='progress__total'>
            <span>/{progressTotal}</span>
          </div>
        </div>
      </section>
      <section className='main__about'>
        <div className='about__image'></div>
        <div className='about__content'>
          <span>{content.about.tagline}</span>
          <h2>{content.about.title}</h2>
          <p>
            {content.about.description.map((paragraph, index) => (
              <React.Fragment key={`${paragraph}-${index}`}>
                {paragraph}
                {index < content.about.description.length - 1 && (
                  <>
                    <br />
                    <br />
                  </>
                )}
              </React.Fragment>
            ))}
          </p>
          <div className='about__content--dips'>
            {content.about.dips.map((item) => (
              <div className='dips__item' key={item}>
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
            {content.about.buttonText}
          </a>
        </div>
      </section>
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
          {content.services.items.map((service, index) => (
            <div className='service__item' key={`${service.title}-${index}`}>
              <div className='services__item--icon'>
                <IconShieldCheckFilled />
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </section>
      <section className='main__clients'>
        <div className='clients'>
          <span>{content.clients.tagline}</span>
          <h2>{content.clients.title}</h2>
        </div>
        <div className='clients__grid'>
          <div className='clients__grid--item'>
            {firstTestimonials.map((testimonial, index) => (
              <div className='clients__item' key={`${testimonial.name}-${index}`}>
                <div className='clients__item--icon' />
                <h4>{testimonial.name}</h4>
                <span>{testimonial.role}</span>
                <p>"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
          <div className='clients__brand'>
            {content.clients.brands.map((brand) => (
              <div className='brand__item' key={brand} title={brand} />
            ))}
          </div>
          <div className='clients__grid--item'>
            {remainingTestimonials.map((testimonial, index) => (
              <div
                className='clients__item'
                key={`${testimonial.name}-${index + firstTestimonials.length}`}
              >
                <div className='clients__item--icon' />
                <h4>{testimonial.name}</h4>
                <span>{testimonial.role}</span>
                <p>"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className='main__team'>
        <div className='team__content'>
          <span>{content.team.tagline}</span>
          <h2>{content.team.title}</h2>
        </div>
        <div className='team__grid'>
          <div className='team__grid--item'>
            {content.team.members.map((member, index) => (
              <div className='team__item' key={`${member.name}-${index}`}>
                <div className='team__item--image'>
                  <img src={member.image} alt={member.name} />
                </div>
                <div className='item__content'>
                  <h4>{member.name}</h4>
                  <span>{member.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className='main__contact'>
        <div className='contact__content'>
          <span>{content.contactHeader.tagline}</span>
          <h2>{content.contactHeader.title}</h2>
        </div>
        <div className='contact__form'>
          <div className='form__section'>
            <h3>{content.contactInfo.title}</h3>
            <p>{content.contactInfo.description}</p>
            <form action=''>
              {content.contact.fields.map((field) =>
                field.type === "textarea" ? (
                  <textarea
                    key={field.name}
                    name={field.name}
                    placeholder={field.placeholder}
                  ></textarea>
                ) : (
                  <input
                    key={field.name}
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
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
            {content.contactInfo.aside.map((item, index) => (
              <div
                className={`aside__item${item.highlight ? " bg-amber-600" : ""}`}
                key={`${item.title}-${index}`}
              >
                <div className='aside__item--icon'>
                  <IconShieldCheckFilled color='var(--white)' />
                </div>
                <div className='aside__item--info'>
                  <h4>{item.title}</h4>
                  <a href={item.href}>{item.text}</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
