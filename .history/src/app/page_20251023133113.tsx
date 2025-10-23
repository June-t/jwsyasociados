"use client";
import React, { useRef } from "react";
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

  useGSAP(
    () => {
      // === ABOUT SECTION ===
      const aboutTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".main__about",
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      aboutTl
        .from(".main__about .about__content span", {
          opacity: 0,
          y: 30,
          duration: 0.4,
          ease: "power2.out",
        })
        .from(".main__about .about__content h2", {
          opacity: 0,
          y: 40,
          duration: 0.5,
          ease: "power2.out",
        })
        .from(".main__about .about__content p", {
          opacity: 0,
          y: 30,
          duration: 0.4,
          ease: "power1.out",
        })
        .from(".main__about .dips__item", {
          opacity: 0,
          y: 40,
          duration: 0.4,
          ease: "power1.out",
          stagger: 0.1,
        })
        .from(".main__about .btn__primary--search", {
          opacity: 0,
          y: 15,
          scale: 0.97,
          duration: 0.4,
          ease: "back.out(2)",
        });

      // === SERVICES SECTION ===
      gsap.from(".main__services .service__item", {
        opacity: 0,
        y: -40,
        duration: 0.45,
        ease: "power1.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: ".main__services",
          start: "top 75%",
        },
      });

      // === CLIENTS / PORTFOLIO SECTION ===
      gsap.from(".main__clients .clients__item", {
        opacity: 0,
        y: -35,
        duration: 0.45,
        ease: "power1.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: ".main__clients",
          start: "top 80%",
        },
      });

      // === TEAM SECTION ===
      const teamTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".main__team",
          start: "top 80%",
        },
      });
      teamTl
        .from(".main__team .team__content span", {
          opacity: 0,
          y: 25,
          duration: 0.4,
        })
        .from(".main__team .team__content h2", {
          opacity: 0,
          y: 35,
          duration: 0.5,
        })
        .from(".main__team .team__item", {
          opacity: 0,
          y: 30,
          stagger: 0.08,
          duration: 0.4,
        });

      // === CONTACT SECTION ===
      const contactTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".main__contact",
          start: "top 80%",
        },
      });
      contactTl
        .from(".main__contact .contact__content span", {
          opacity: 0,
          y: 25,
          duration: 0.4,
        })
        .from(".main__contact .contact__content h2", {
          opacity: 0,
          y: 35,
          duration: 0.5,
        })
        .from(".main__contact .form__section", {
          opacity: 0,
          y: 40,
          duration: 0.45,
        })
        .from(".main__contact .btn__primary--search", {
          opacity: 0,
          y: 15,
          scale: 0.96,
          ease: "back.out(2)",
          duration: 0.4,
        });
    },
    { scope: container }
  );

  return (
    <div ref={container}>
      <section className='main__hero'>
        <div className='hero__slider'>
          <span>Smarter Strategies Stronger Businesses</span>
          <h1>
            Experience Driven <br /> Consulting Results <br /> You Can Count On
          </h1>
          <p>
            Whether you're Icmng to streamline operations, scale sustainably, or
            navigate complex challenges, our consulting services are built to
            deliver measurable results and long-term impact & hands support.
          </p>
          <a href='#' className='btn__primary--search'>
            <div className='btn__icon'>
              <IconArrowUpRight />
            </div>
            A Free Consulting
          </a>
        </div>
        <div className='hero__progress'>
          <div className='progress__status'>
            <span>01</span>
          </div>
          <div className='progress__line' />
          <div className='progress__total'>
            <span>/04</span>
          </div>
        </div>
      </section>
      <section className='main__about'>
        <div className='about__image'></div>
        <div className='about__content'>
          <span>About Us</span>
          <h2>
            Smart Strategy Meets the Human Insight That's How We Help You Grow
          </h2>
          <p>
            Whether you're Icmng to streamline operations, scale sustainably, or
            navigate complex challenges, our consulting services are built to
            deliver measurable results and long-term impact & hands support.
            <br />
            <br />
            Consulting services are built to deliver measurable results and
            long-term impact & hands support.
          </p>
          <div className='about__content--dips'>
            <div className='dips__item'>
              <span>
                <IconCircleCheckFilled />
              </span>
              <h4>Partner First Consultant Second</h4>
            </div>
            <div className='dips__item'>
              <span>
                <IconCircleCheckFilled />
              </span>
              <h4>Your Growth is Our Business</h4>
            </div>
            <div className='dips__item'>
              <span>
                <IconCircleCheckFilled />
              </span>
              <h4>Behind the Strategy</h4>
            </div>
          </div>
          <a href='#' className='btn__primary--search btn__primary--dark'>
            <div className='btn__icon'>
              <IconArrowUpRight />
            </div>
            A Free Consulting
          </a>
        </div>
      </section>
      <section className='main__services'>
        <div className='services__content'>
          <span>Our Services</span>
          <h2>Smart Strategy Meets the Human Insight That's Ho</h2>
          <a href='#' className='btn__primary--search'>
            <div className='btn__icon'>
              <IconArrowUpRight />
            </div>
            A Free Consulting
          </a>
          <div className='services__paragraph'>
            <p>
              Whether you're Icmng to streamline operations, scale sustainably,
              or navigate complex challenges, our consulting services are built
              to deliver.
            </p>
          </div>
        </div>
        <div className='services__grid'>
          <div className='service__item'>
            <div className='services__item--icon'>
              <IconShieldCheckFilled />
            </div>
            <h3>Business Consulting</h3>
            <p>
              Whether you're Icmng to streamline operations, scale sustainably,
              or navigate complex challenges, our consulting services are built
              to deliver.
            </p>
          </div>
          <div className='service__item'>
            <div className='services__item--icon'>
              <IconShieldCheckFilled />
            </div>
            <h3>Business Consulting</h3>
            <p>
              Whether you're Icmng to streamline operations, scale sustainably,
              or navigate complex challenges, our consulting services are built
              to deliver.
            </p>
          </div>
          <div className='service__item'>
            <div className='services__item--icon'>
              <IconShieldCheckFilled />
            </div>
            <h3>Business Consulting</h3>
            <p>
              Whether you're Icmng to streamline operations, scale sustainably,
              or navigate complex challenges, our consulting services are built
              to deliver.
            </p>
          </div>
          <div className='service__item'>
            <div className='services__item--icon'>
              <IconShieldCheckFilled />
            </div>
            <h3>Business Consulting</h3>
            <p>
              Whether you're Icmng to streamline operations, scale sustainably,
              or navigate complex challenges, our consulting services are built
              to deliver.
            </p>
          </div>
          <div className='service__item'>
            <div className='services__item--icon'>
              <IconShieldCheckFilled />
            </div>
            <h3>Business Consulting</h3>
            <p>
              Whether you're Icmng to streamline operations, scale sustainably,
              or navigate complex challenges, our consulting services are built
              to deliver.
            </p>
          </div>
          <div className='service__item'>
            <div className='services__item--icon'>
              <IconShieldCheckFilled />
            </div>
            <h3>Business Consulting</h3>
            <p>
              Whether you're Icmng to streamline operations, scale sustainably,
              or navigate complex challenges, our consulting services are built
              to deliver.
            </p>
          </div>
        </div>
      </section>
      <section className='main__clients'>
        <div className='clients'>
          <span>Our Portfolio</span>
          <h2>Client Wins & Case Studies</h2>
        </div>
        <div className='clients__grid'>
          <div className='clients__grid--item'>
            <div className='clients__item'>
              <div className='clients__item--icon' />
              <h4>John Smith</h4>
              <span>Founder of EcoGods</span>
              <p>
                "The consulting services provided were transformative for our
                business. Their insights and strategies helped us achieve
                significant growth and operational efficiency."
              </p>
            </div>
            <div className='clients__item'>
              <div className='clients__item--icon' />
              <h4>John Smith</h4>
              <span>Founder of EcoGods</span>
              <p>
                "The consulting services provided were transformative for our
                business. Their insights and strategies helped us achieve
                significant growth and operational efficiency."
              </p>
            </div>
            <div className='clients__item'>
              <div className='clients__item--icon' />
              <h4>John Smith</h4>
              <span>Founder of EcoGods</span>
              <p>
                "The consulting services provided were transformative for our
                business. Their insights and strategies helped us achieve
                significant growth and operational efficiency."
              </p>
            </div>
            <div className='clients__item'>
              <div className='clients__item--icon' />
              <h4>John Smith</h4>
              <span>Founder of EcoGods</span>
              <p>
                "The consulting services provided were transformative for our
                business. Their insights and strategies helped us achieve
                significant growth and operational efficiency."
              </p>
            </div>
          </div>
          <div className='clients__brand'>
            <div className='brand__item' />
            <div className='brand__item' />
            <div className='brand__item' />
            <div className='brand__item' />
            <div className='brand__item' />
            <div className='brand__item' />
            <div className='brand__item' />
          </div>
          <div className='clients__grid--item'>
            <div className='clients__item'>
              <div className='clients__item--icon' />
              <h4>John Smith</h4>
              <span>Founder of EcoGods</span>
              <p>
                "The consulting services provided were transformative for our
                business. Their insights and strategies helped us achieve
                significant growth and operational efficiency."
              </p>
            </div>
            <div className='clients__item'>
              <div className='clients__item--icon' />
              <h4>John Smith</h4>
              <span>Founder of EcoGods</span>
              <p>
                "The consulting services provided were transformative for our
                business. Their insights and strategies helped us achieve
                significant growth and operational efficiency."
              </p>
            </div>
            <div className='clients__item'>
              <div className='clients__item--icon' />
              <h4>John Smith</h4>
              <span>Founder of EcoGods</span>
              <p>
                "The consulting services provided were transformative for our
                business. Their insights and strategies helped us achieve
                significant growth and operational efficiency."
              </p>
            </div>
            <div className='clients__item'>
              <div className='clients__item--icon' />
              <h4>John Smith</h4>
              <span>Founder of EcoGods</span>
              <p>
                "The consulting services provided were transformative for our
                business. Their insights and strategies helped us achieve
                significant growth and operational efficiency."
              </p>
            </div>
            <div className='clients__item'>
              <div className='clients__item--icon' />
              <h4>John Smith</h4>
              <span>Founder of EcoGods</span>
              <p>
                "The consulting services provided were transformative for our
                business. Their insights and strategies helped us achieve
                significant growth and operational efficiency."
              </p>
            </div>
            <div className='clients__item'>
              <div className='clients__item--icon' />
              <h4>John Smith</h4>
              <span>Founder of EcoGods</span>
              <p>
                "The consulting services provided were transformative for our
                business. Their insights and strategies helped us achieve
                significant growth and operational efficiency."
              </p>
            </div>
            <div className='clients__item'>
              <div className='clients__item--icon' />
              <h4>John Smith</h4>
              <span>Founder of EcoGods</span>
              <p>
                "The consulting services provided were transformative for our
                business. Their insights and strategies helped us achieve
                significant growth and operational efficiency."
              </p>
            </div>
            <div className='clients__item'>
              <div className='clients__item--icon' />
              <h4>John Smith</h4>
              <span>Founder of EcoGods</span>
              <p>
                "The consulting services provided were transformative for our
                business. Their insights and strategies helped us achieve
                significant growth and operational efficiency."
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className='main__team'>
        <div className='team__content'>
          <span>Meet The Team</span>
          <h2>Our Experts Who Make Things Happen</h2>
        </div>
        <div className='team__grid'>
          <div className='team__grid--item'>
            <div className='team__item'>
              <div className='team__item--image'>
                <img
                  src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWFsZSUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D&fm=jpg&q=60&w=3000'
                  alt=''
                />
              </div>
              <div className='item__content'>
                <h4>Emmy Rosum</h4>
                <span>Co-Founder and CEO</span>
              </div>
            </div>
            <div className='team__item'>
              <div className='team__item--image'>
                <img
                  src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWFsZSUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D&fm=jpg&q=60&w=3000'
                  alt=''
                />
              </div>
              <div className='item__content'>
                <h4>Emmy Rosum</h4>
                <span>Co-Founder and CEO</span>
              </div>
            </div>
            <div className='team__item'>
              <div className='team__item--image'>
                <img
                  src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWFsZSUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D&fm=jpg&q=60&w=3000'
                  alt=''
                />
              </div>
              <div className='item__content'>
                <h4>Emmy Rosum</h4>
                <span>Co-Founder and CEO</span>
              </div>
            </div>
            <div className='team__item'>
              <div className='team__item--image'>
                <img
                  src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWFsZSUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D&fm=jpg&q=60&w=3000'
                  alt=''
                />
              </div>
              <div className='item__content'>
                <h4>Emmy Rosum</h4>
                <span>Co-Founder and CEO</span>
              </div>
            </div>
            <div className='team__item'>
              <div className='team__item--image'>
                <img
                  src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWFsZSUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D&fm=jpg&q=60&w=3000'
                  alt=''
                />
              </div>
              <div className='item__content'>
                <h4>Emmy Rosum</h4>
                <span>Co-Founder and CEO</span>
              </div>
            </div>
            <div className='team__item'>
              <div className='team__item--image'>
                <img
                  src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWFsZSUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D&fm=jpg&q=60&w=3000'
                  alt=''
                />
              </div>
              <div className='item__content'>
                <h4>Emmy Rosum</h4>
                <span>Co-Founder and CEO</span>
              </div>
            </div>
            <div className='team__item'>
              <div className='team__item--image'>
                <img
                  src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWFsZSUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D&fm=jpg&q=60&w=3000'
                  alt=''
                />
              </div>
              <div className='item__content'>
                <h4>Emmy Rosum</h4>
                <span>Co-Founder and CEO</span>
              </div>
            </div>
            <div className='team__item'>
              <div className='team__item--image'>
                <img
                  src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWFsZSUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D&fm=jpg&q=60&w=3000'
                  alt=''
                />
              </div>
              <div className='item__content'>
                <h4>Emmy Rosum</h4>
                <span>Co-Founder and CEO</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='main__contact'>
        <div className='contact__content'>
          <span>Meet The Team</span>
          <h2>Our Experts Who Make Things Happen</h2>
        </div>
        <div className='contact__form'>
          <div className='form__section'>
            <h3>Get In Touch</h3>
            <p>Our team is always here to help</p>
            <form action=''>
              <input type='text' placeholder='Your Name' />
              <input type='email' placeholder='Your Email' />
              <textarea placeholder='Your Message'></textarea>
              <button type='submit' className='btn__primary--search'>
                <div className='btn__icon'>
                  <IconArrowUpRight />
                </div>
                Send Message
              </button>
            </form>
          </div>
          <div className='form__aside'>
            <div className='aside__item'>
              <div className='aside__item--icon'>
                <IconShieldCheckFilled color='var(--white)' />
              </div>
              <div className='aside__item--info'>
                <h4>Our Location</h4>
                <a href='#'>1234 Street Name, City, State, 12345</a>
              </div>
            </div>
            <div className='aside__item bg-amber-600'>
              <div className='aside__item--icon'>
                <IconShieldCheckFilled color='var(--white)' />
              </div>
              <div className='aside__item--info'>
                <h4>Our Location</h4>
                <a href='#'>1234 Street Name, City, State, 12345</a>
              </div>
            </div>
            <div className='aside__item'>
              <div className='aside__item--icon'>
                <IconShieldCheckFilled color='var(--white)' />
              </div>
              <div className='aside__item--info'>
                <h4>Our Location</h4>
                <a href='#'>1234 Street Name, City, State, 12345</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
