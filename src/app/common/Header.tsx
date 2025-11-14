"use client";
import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Logo from "@/app/assets/logo.png";
import { IconMenu2, IconX, IconChevronDown } from "@tabler/icons-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Header() {
  const container = useRef<HTMLDivElement | null>(null);
  const [isTransparent, setIsTransparent] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // 🔹 Header con animación de scroll
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

  // 🔹 Menú mobile
  useEffect(() => {
    if (menuOpen) {
      gsap.fromTo(
        menuRef.current,
        { opacity: 0, y: -20, visibility: "hidden", pointerEvents: "none" },
        {
          opacity: 1,
          y: 0,
          visibility: "visible",
          pointerEvents: "auto",
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
        pointerEvents: "none",
        duration: 0.4,
        ease: "power3.in",
      });
    }
  }, [menuOpen]);

  // 🔹 Dropdown estable (sin display:none)
  useEffect(() => {
    if (dropdownRef.current) {
      if (dropdownOpen) {
        gsap.to(dropdownRef.current, {
          opacity: 1,
          y: 0,
          visibility: "visible",
          pointerEvents: "auto",
          duration: 0.35,
          ease: "power2.out",
        });
      } else {
        gsap.to(dropdownRef.current, {
          opacity: 0,
          y: -10,
          pointerEvents: "none",
          duration: 0.25,
          ease: "power2.in",
          onComplete: () => {
            if (dropdownRef.current)
              dropdownRef.current.style.visibility = "hidden";
          },
        });
      }
    }
  }, [dropdownOpen]);

  // 🔹 Cerrar menú mobile al hacer clic en enlaces
  useEffect(() => {
    const links = document.querySelectorAll(".mobile-menu__list a");
    const handleLinkClick = (_event: Event) => setMenuOpen(false);
    links.forEach((link) => link.addEventListener("click", handleLinkClick));
    return () => {
      links.forEach((link) =>
        link.removeEventListener("click", handleLinkClick)
      );
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`header ${isTransparent ? "header--transparent" : ""}`}
      ref={container}
      onMouseEnter={() => setIsTransparent(true)}
      onMouseLeave={() => setIsTransparent(false)}
    >
      {/* 🔹 Banner superior */}
      <div className="header__banner">
        <span>
          ¿Está listo para recibir consultoría empresarial gratuita hoy?{" "}
          <a href="#contacto">Contáctenos</a>
        </span>
        <span>
          Llámanos ahora: <a href="tel:+18099657909">+1 (809) 965-7909</a>
        </span>
      </div>

      {/* 🔹 Navegación principal */}
      <div className="header__navegation">
        <div className="header__logo">
          <img src={Logo.src} alt="JW & Asociados Logo" />
        </div>

        <nav className="header__nav">
          <ul className="header__nav-list">
            <li>
              <a href="#inicio">Inicio</a>
            </li>
            <li>
              <a href="#nosotros">Nosotros</a>
            </li>

            {/* Dropdown MegaMenu */}
            <li
              className="nav__dropdown"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button className="nav__dropdown-btn">
                Servicios <IconChevronDown size={18} />
              </button>

              <div className="mega-menu" ref={dropdownRef}>
                {/* Columna 1 */}
                <div className="mega-menu__column">
                  <h4>Consultoría y Estrategia</h4>
                  <ul>
                    <li>
                      <a href="#consultoria">Consultoría Empresarial</a>
                    </li>
                    <li>
                      <a href="#institucional">Fortalecimiento Institucional</a>
                    </li>
                    <li>
                      <a href="#calidad">
                        Gestión de Calidad (ISO 9001, 45001)
                      </a>
                    </li>
                    <li>
                      <a href="#riesgos">Gestión de Riesgos y Cumplimiento</a>
                    </li>
                  </ul>
                </div>

                {/* Columna 2 */}
                <div className="mega-menu__column">
                  <h4>Gestión Pública</h4>
                  <ul>
                    <li>
                      <a href="#compras">Compras y Contrataciones Públicas</a>
                    </li>
                    <li>
                      <a href="#etica">Ética, Transparencia y Buen Gobierno</a>
                    </li>
                    <li>
                      <a href="#planificacion">
                        Planificación Estratégica (PEI/POA)
                      </a>
                    </li>
                  </ul>

                  <h4 style={{ marginTop: "1rem" }}>
                    Desarrollo Organizacional
                  </h4>
                  <ul>
                    <li>
                      <a href="#procesos">Optimización de Procesos</a>
                    </li>
                    <li>
                      <a href="#clima">Clima Laboral y Cultura</a>
                    </li>
                  </ul>
                </div>

                {/* Columna 3 */}
                <div className="mega-menu__column">
                  <h4>Formación y Talento</h4>
                  <ul>
                    <li>
                      <a href="#capacitaciones">Capacitaciones Profesionales</a>
                    </li>
                    <li>
                      <a href="#liderazgo">Liderazgo y Trabajo en Equipo</a>
                    </li>
                    <li>
                      <a href="#evaluacion">Evaluación de Desempeño</a>
                    </li>
                    <li>
                      <a href="#reclutamiento">Reclutamiento y Headhunting</a>
                    </li>
                  </ul>

                  <h4 style={{ marginTop: "1rem" }}>Innovación</h4>
                  <ul>
                    <li>
                      <a href="#emprendimiento">Emprendimiento e Innovación</a>
                    </li>
                    <li>
                      <a href="#productividad">Productividad Empresarial</a>
                    </li>
                  </ul>
                </div>

                {/* Columna 4 (destacada) */}
                <div className="mega-menu__column highlight contact-card">
                  <h4>Contacto</h4>
                  <div className="contact-card__content">
                    <img
                      src="https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=600&q=80"
                      alt="Equipo JW & Asociados"
                      className="contact-card__image"
                    />
                    <p>
                      Hablemos sobre cómo podemos acompañarte en tu crecimiento
                      empresarial.
                    </p>
                    <a href="#contacto" className="contact-card__link">
                      Contactar ahora →
                    </a>
                  </div>
                </div>
              </div>
            </li>

            <li>
              <a href="#testimonios">Testimonios</a>
            </li>
            <li>
              <a href="#equipo">Equipo</a>
            </li>
          </ul>
        </nav>

        <div className="header__menu">
          <a href="#contacto" className="btn__primary">
            Contáctanos
          </a>
          <div className="btn__menu" onClick={() => setMenuOpen(true)}>
            <IconMenu2 color="var(--primary)" size={32} />
          </div>
        </div>
      </div>

      {/* 🔹 Menú Mobile */}
      <div
        className={`mobile-menu ${menuOpen ? "is-open" : ""}`}
        ref={menuRef}
        aria-hidden={!menuOpen}
      >
        <button className="mobile-menu__close" onClick={closeMenu}>
          <IconX size={36} color="var(--primary)" />
        </button>
        <ul className="mobile-menu__list">
          <li>
            <a href="#inicio">Inicio</a>
          </li>
          <li>
            <a href="#nosotros">Nosotros</a>
          </li>
          <li>
            <a href="#consultoria">Servicios</a>
          </li>
          <li>
            <a href="#testimonios">Testimonios</a>
          </li>
          <li>
            <a href="#equipo">Equipo</a>
          </li>
          <li>
            <a href="#contacto">Contáctanos</a>
          </li>
        </ul>
      </div>
    </header>
  );
}
