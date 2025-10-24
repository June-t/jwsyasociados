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
  const container = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      if (!container.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top bottom", // espera a que el footer toque la parte inferior del viewport
          end: "bottom center",
          toggleActions: "play none none none",
          once: true,
        },
      });

      // === CABECERA ===
      tl.from(".footer__head p", {
        opacity: 0,
        y: 40,
        duration: 0.5,
        ease: "power2.out",
      });

      // === BLOQUE PRINCIPAL (LOGO + NAV) ===
      tl.from(
        [".footer__main .main__logo", ".footer__main .main__nav"],
        {
          opacity: 0,
          y: 60,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.2, // 🔸 ambos suben uno tras otro
        },
        "-=0.2"
      );

      // === ICONOS ===
      tl.fromTo(
        ".main__logo--links a",
        {
          y: 30,
          opacity: 0,
          scale: 0.85,
          duration: 0.1,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.2,
          ease: "power3.out",
          stagger: {
            amount: 0.4, // distribuye el efecto de forma más uniforme
            from: "start", // comienza desde el primer elemento
          },
        },
        "-=0.2"
      );

      // === NAV ITEMS ===
      tl.from(
        ".main__nav--item",
        {
          opacity: 0,
          y: 35,
          duration: 0.45,
          ease: "power2.out",
          stagger: 0.08,
        },
        "-=0.4"
      );

      // === BOTON ===
      tl.from(
        ".main__nav--item .btn__primary--search",
        {
          opacity: 1,
          y: 20,
          scale: 0.96,
          duration: 0.4,
          ease: "back.out(2)",
        },
        "-=0.2"
      );

      // === PARTE INFERIOR ===
      tl.from(
        ".footer__down span",
        {
          opacity: 0,
          y: 20,
          duration: 0.4,
          ease: "power1.out",
          stagger: 0.1,
        },
        "-=0.3"
      );
    },
    { scope: container }
  );

  return (
    <footer className='footer' ref={container}>
      {/* <div className='footer__head'>
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
        <span>© 2025 JW&Asociados Consulting Inc. All rights reserved</span>
        <span>Privacy Policy</span>
      </div> */}
    </footer>
  );
}
