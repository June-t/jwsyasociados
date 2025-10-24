"use client";
import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Logo from "@/app/assets/logo.png";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Header() {
  const container = useRef<HTMLDivElement | null>(null);
  const [isTransparent, setIsTransparent] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useGSAP(
    () => {
      let lastScroll = 0;
      let ticking = false;

      const updateHeader = () => {
        const current = window.scrollY;
        const goingDown = current > lastScroll && current > 150;

        if (goingDown !== isHidden) {
          setIsHidden(goingDown);

          gsap.to(".header", {
            y: goingDown ? -120 : 0,
            opacity: goingDown ? 0 : 1,
            duration: 0.8,
            ease: "power3.out",
            overwrite: "auto",
          });
        }

        lastScroll = current;
        ticking = false;
      };

      const handleScroll = () => {
        if (!ticking) {
          window.requestAnimationFrame(updateHeader);
          ticking = true;
        }
      };

      window.addEventListener("scroll", handleScroll);

      // Animación inicial
      gsap.from(".header__banner, .header__navegation", {
        opacity: 0,
        y: -40,
        duration: 1,
        ease: "power2.out",
        stagger: 0.15,
      });

      return () => window.removeEventListener("scroll", handleScroll);
    },
    { scope: container }
  );

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
          <div className='btn__menu'></div>
        </div>
      </div>
    </header>
  );
}
