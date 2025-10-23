"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Logo from "@/app/assets/logo.png";

gsap.registerPlugin(useGSAP);

export default function Header() {
  const container = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      // === Banner superior ===
      tl.from(".header__banner", {
        opacity: 0,
        y: -30,
        duration: 0.6,
      });

      // === Logo ===
      tl.from(
        ".header__logo img",
        {
          opacity: 0,
          y: -20,
          duration: 0.5,
        },
        "-=0.2"
      );

      // === Navegación ===
      tl.from(
        ".header__nav-item",
        {
          opacity: 0,
          y: -15,
          duration: 0.4,
          stagger: 0.08,
        },
        "-=0.2"
      );

      // === Botón principal ===
      tl.from(
        ".header__menu .btn__primary",
        {
          opacity: 0,
          y: -10,
          scale: 0.95,
          duration: 0.4,
          ease: "back.out(1.7)",
        },
        "-=0.2"
      );

      // === Icono menú ===
      tl.from(
        ".header__menu .btn__menu",
        {
          opacity: 0,
          scale: 0.8,
          duration: 0.3,
        },
        "-=0.3"
      );
    },
    { scope: container }
  );

  return (
    <header className='header' ref={container}>
      <div className='header__banner'>
        <span>
          Are you Ready to Free Business Consulting Today?
          <a href='#'>Contact Us</a>
        </span>
        <span>
          Call Us Now: <a>+1 (829) 456-7890</a>
        </span>
      </div>

      <div className='header__navegation'>
        <div className='header__logo'>
          <img src={Logo.src} alt='JWS Y Asociados Logo' />
        </div>

        <div className='header__nav'>
          <ul className='header__nav-list'>
            <li className='header__nav-item'>
              <a href='#'>Industries</a>
            </li>
            <li className='header__nav-item'>
              <a href='#'>Consulting Services</a>
            </li>
            <li className='header__nav-item'>
              <a href='#'>Digital</a>
            </li>
            <li className='header__nav-item'>
              <a href='#'>Insights</a>
            </li>
            <li className='header__nav-item'>
              <a href='#'>About</a>
            </li>
            <li className='header__nav-item'>
              <a href='#'>Careers</a>
            </li>
          </ul>
        </div>

        <div className='header__menu'>
          <button className='btn__primary'>Contact Us</button>
          <div className='btn__menu'></div>
        </div>
      </div>
    </header>
  );
}
