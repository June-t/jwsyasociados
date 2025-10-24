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

  // 🔹 Mostrar / ocultar menú con animación
  useEffect(() => {
    if (menuOpen) {
      gsap.fromTo(
        menuRef.current,
        { y: -20, opacity: 0, display: "none" },
        {
          y: 0,
          opacity: 1,
          display: "block",
          duration: 0.5,
          ease: "power3.out",
        }
      );
    } else {
      gsap.to(menuRef.current, {
        y: -20,
        opacity: 0,
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
          <div
            className='btn__menu'
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? (
              <IconX color='var(--primary)' size={30} />
            ) : (
              <IconMenu2 color='var(--primary)' size={30} />
            )}
          </div>
        </div>
      </div>

      {/* 🔹 Menú desplegable */}
      <div className='mobile-menu' ref={menuRef}>
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
            <button className='btn__primary'>Contact Us</button>
          </li>
        </ul>
      </div>
    </header>
  );
}
