"use client";
import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Logo from "@/app/assets/logo.png";
import { IconMenu2, IconX } from "@tabler/icons-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Header() {
  const container = useRef<HTMLDivElement | null>(null);
  const [isTransparent, setIsTransparent] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      let lastScroll = 0;

      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const current = self.scroll();
          const goingDown = current > lastScroll && current > 100;

          gsap.to(".header", {
            y: goingDown ? -120 : 0,
            opacity: goingDown ? 0 : 1,
            duration: 0.75,
            ease: "power4.out",
            overwrite: "auto",
          });

          lastScroll = current;
        },
      });

      gsap.from(".header__banner, .header__navegation", {
        opacity: 0,
        y: -50,
        duration: 1,
        ease: "power4.out",
        stagger: 0.15,
      });
    },
    { scope: container }
  );

  // 🔹 Menú animado con GSAP
  useEffect(() => {
    if (menuOpen) {
      gsap.fromTo(
        menuRef.current,
        { opacity: 0, y: -20, display: "none" },
        {
          opacity: 1,
          y: 0,
          display: "flex",
          duration: 0.5,
          ease: "power3.out",
        }
      );
      gsap.from(".mobile-menu__list li", {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.2,
      });
    } else {
      gsap.to(menuRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.4,
        ease: "power3.in",
        onComplete: () => {
          if (menuRef.current) menuRef.current.style.display = "none";
        },
      });
    }
  }, [menuOpen]);

  return (
    <header
      className={`header ${isTransparent ? "header--transparent" : ""}`}
      ref={container}
      onMouseEnter={() => setIsTransparent(true)}
      onMouseLeave={() => setIsTransparent(false)}
    >
      <div className='header__banner'>
        <span>
          Are you Ready to Free Business Consulting Today?
          <a href='#'> Contact Us</a>
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
            <li>
              <a href='#'>Industries</a>
            </li>
            <li>
              <a href='#'>Consulting Services</a>
            </li>
            <li>
              <a href='#'>Digital</a>
            </li>
            <li>
              <a href='#'>Insights</a>
            </li>
            <li>
              <a href='#'>About</a>
            </li>
            <li>
              <a href='#'>Careers</a>
            </li>
          </ul>
        </div>

        <div className='header__menu'>
          <button className='btn__primary'>Contact Us</button>
          <div className='btn__menu' onClick={() => setMenuOpen(true)}>
            <IconMenu2 color='var(--primary)' size={32} />
          </div>
        </div>
      </div>

      {/* 🔹 Menú fullscreen con X interna */}
      <div className='mobile-menu' ref={menuRef}>
        <button
          className='mobile-menu__close'
          onClick={() => setMenuOpen(false)}
        >
          <IconMenu2 color='var(--primary)' size={32} />
        </button>

        <ul className='mobile-menu__list'>
          <li>
            <a href='#'>Industries</a>
          </li>
          <li>
            <a href='#'>Consulting Services</a>
          </li>
          <li>
            <a href='#'>Digital</a>
          </li>
          <li>
            <a href='#'>Insights</a>
          </li>
          <li>
            <a href='#'>About</a>
          </li>
          <li>
            <a href='#'>Careers</a>
          </li>
          <li>
            <a href='#'>Contact Us</a>
          </li>
        </ul>
      </div>
    </header>
  );
}
