"use client";
import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Logo from "@/app/assets/logo.png";
import { IconMenu2 } from "@tabler/icons-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Header() {
  const container = useRef<HTMLDivElement | null>(null);
  const [isTransparent, setIsTransparent] = useState(false);

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
            duration: 0.75, // ⏳ más suave
            ease: "power4.out",
            overwrite: "auto",
          });

          lastScroll = current;
        },
      });

      // Animación de entrada del header (inicio)
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
          <div className='btn__menu'>
            <IconMenu2 />
          </div>
        </div>
      </div>
    </header>
  );
}
