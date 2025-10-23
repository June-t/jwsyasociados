"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Logo from "@/app/assets/logo.png";
import {
  IconArrowUpRight,
  IconBrandLinkedin,
  IconBrandMeta,
  IconBrandX,
  IconBrandYoutubeFilled,
} from "@tabler/icons-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Footer() {
  const container = useRef(null);

  useGSAP(
    () => {
      // === CABECERA DEL FOOTER ===
      gsap.from(".footer__head p", {
        opacity: 0,
        y: 40,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".footer__head",
          start: "top 60%",
          end: "bottom 40%",
          toggleActions: "play none none none",
          once: true,
        },
      });

      // === BLOQUE PRINCIPAL ===
      const footerMainItems = gsap.utils.toArray(
        ".footer__main .main__logo, .footer__main .main__nav"
      );
      footerMainItems.forEach((el, i) => {
        gsap.from(el, {
          opacity: 0,
          y: 50,
          duration: 0.45,
          delay: i * 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 60%",
            end: "bottom 40%",
            once: true,
          },
        });
      });

      // === ICONOS DE REDES SOCIALES ===
      gsap.utils.toArray(".main__logo--links a").forEach((icon, i) => {
        gsap.from(icon, {
          opacity: 0,
          y: 20,
          scale: 0.9,
          duration: 0.4,
          ease: "back.out(2)",
          delay: i * 0.05,
          scrollTrigger: {
            trigger: icon,
            start: "top 60%",
            end: "bottom 40%",
            once: true,
          },
        });
      });

      // === NAV ITEMS ===
      gsap.utils.toArray(".main__nav--item").forEach((item, i) => {
        gsap.from(item, {
          opacity: 0,
          y: 40,
          duration: 0.4,
          ease: "power2.out",
          delay: i * 0.06,
          scrollTrigger: {
            trigger: item,
            start: "top 60%",
            end: "bottom 40%",
            once: true,
          },
        });
      });

      // === BOTÓN FINAL ===
      gsap.from(".main__nav--item .btn__primary--search", {
        opacity: 0,
        y: 25,
        scale: 0.95,
        duration: 0.4,
        ease: "back.out(2)",
        scrollTrigger: {
          trigger: ".main__nav--item .btn__primary--search",
          start: "top 60%",
          end: "bottom 40%",
          once: true,
        },
      });

      // === PARTE INFERIOR DEL FOOTER ===
      gsap.from(".footer__down span", {
        opacity: 0,
        y: 25,
        duration: 0.4,
        ease: "power1.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: ".footer__down",
          start: "top 10%",
          end: "bottom 10%",
          once: true,
        },
      });
    },
    { scope: container }
  );

  return (
    <footer className='footer' ref={container}>
      <div className='footer__head'>
        <p>
          Smart Strategy Meets the <br /> Human Insight That's How
        </p>
      </div>

      <div className='footer__main'>
        <div className='main__logo'>
          <img src={Logo.src} alt='JWS Y Asociados Logo' />
          <p>
            When a buyer is interested in one of your listings, they will
            contact you through the information you provided when you set up
            your account.
          </p>
          <div className='main__logo--links'>
            <a href='#'>
              <IconBrandMeta />
            </a>
            <a href='#'>
              <IconBrandYoutubeFilled />
            </a>
            <a href='#'>
              <IconBrandX />
            </a>
            <a href='#'>
              <IconBrandLinkedin />
            </a>
          </div>
        </div>

        <div className='main__nav'>
          <div className='main__group'>
            <div className='main__nav--item'>
              <h4>Company</h4>
              <a href='#'>About Us</a>
              <a href='#'>Pricing Plan</a>
              <a href='#'>FAQ</a>
            </div>
            <div className='main__nav--item'>
              <h4>Navegation</h4>
              <a href='#'>Industries</a>
              <a href='#'>Consulting Services</a>
              <a href='#'>Digital</a>
              <a href='#'>Insights</a>
              <a href='#'>About</a>
              <a href='#'>Careers</a>
            </div>
          </div>

          <div className='main__group'>
            <div className='main__nav--item'>
              <h4>Phone</h4>
              <a href='#'>+1 (829) 374-9960</a>
            </div>
            <div className='main__nav--item'>
              <h4>Email</h4>
              <a href='#'>name@email.com</a>
            </div>
            <div className='main__nav--item'>
              <a href='#' className='btn__primary--search'>
                <div className='btn__icon'>
                  <IconArrowUpRight />
                </div>
                A Free Consulting
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className='footer__down'>
        <span>© 2025 JW&Asociados Consulting Group | All rights reserved</span>
        <span>Privacy Policy</span>
      </div>
    </footer>
  );
}
