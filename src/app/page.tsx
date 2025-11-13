"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  IconArrowUpRight,
  IconCircleCheckFilled,
  IconShieldCheckFilled,
  IconMapPin,
  IconDeviceMobileMessage,
  IconMailFilled,
  IconBriefcase,
  IconSchool,
  IconChartBar,
  IconUsers,
  IconBuilding,
  IconTarget,
  IconRotate360,
  IconBulb,
  IconFileCertificate,
  IconNorthStar,
  IconArrowLeft,
  IconArrowRight,
} from "@tabler/icons-react";
import Footer from "./common/Footer";

// 👇 REGISTRA LOS PLUGINS SOLO UNA VEZ (fuera del componente)
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);

const HERO_AUTOPLAY_DELAY = 6000;
const TEAM_AUTOPLAY_DELAY = 5000;

const gradients = [
  ["#FF6B6B", "#FFD93D"],
  ["#6BCB77", "#4D96FF"],
  ["#845EC2", "#D65DB1"],
  ["#00C9A7", "#92FE9D"],
  ["#FF9671", "#FFC75F"],
  ["#0081CF", "#00C9A7"],
  ["#F9D923", "#FF6B6B"],
  ["#845EC2", "#FF9671"],
];

export default function Main() {
  const container = useRef<HTMLDivElement | null>(null);
  const heroImageRef = useRef<HTMLDivElement | null>(null);
  const heroSliderRef = useRef<HTMLDivElement | null>(null);
  const heroProgressRef = useRef<HTMLDivElement | null>(null);
  const [content, setContent] = useState<any>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [teamActiveSlide, setTeamActiveSlide] = useState(0);
  const [isDesktopTeamLayout, setIsDesktopTeamLayout] = useState(true);
  const [sending, setSending] = useState(false);
  const [sentStatus, setSentStatus] = useState<null | {
    ok: boolean;
    message: string;
  }>(null);

  // 📦 Cargar JSON dinámico
  useEffect(() => {
    import("@/data/content.json")
      .then((m) => setContent(m.default))
      .catch((e) => console.error("Error al cargar content.json", e));
  }, []);

  useEffect(() => {
    if (!content?.team?.members?.length) return;
    setTeamActiveSlide(0);
  }, [content?.team?.members?.length]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => {
      setIsDesktopTeamLayout(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ⏱️ Autoplay para hero
  useEffect(() => {
    if (!content?.hero?.length) return;
    const id = setInterval(
      () => setActiveSlide((p) => (p + 1) % content.hero.length),
      HERO_AUTOPLAY_DELAY
    );
    return () => clearInterval(id);
  }, [content]);

  useEffect(() => {
    if (!content?.hero?.length) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "cubic-bezier(0.85, 0, 0.15, 1)" },
      });

      const heroImage = heroImageRef.current?.querySelector("img");
      if (heroImage) {
        tl.fromTo(
          heroImage,
          { opacity: 0, scale: 1.05 },
          { opacity: 1, scale: 1, duration: 0.8 },
          0
        );
      }

      if (heroSliderRef.current) {
        const sliderChildren = Array.from(
          heroSliderRef.current.children
        ) as HTMLElement[];

        sliderChildren.forEach((element, index) => {
          tl.fromTo(
            element,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.5 },
            index * 0.1 + 0.1
          );
        });
      }

      if (heroProgressRef.current) {
        const progressLine = heroProgressRef.current.querySelector(
          ".progress__line"
        ) as HTMLElement | null;

        if (progressLine) {
          tl.fromTo(
            progressLine,
            { "--progress-width": "0%" },
            {
              "--progress-width": "100%",
              duration: HERO_AUTOPLAY_DELAY / 1000,
              ease: "none",
            },
            0
          );
        }

        tl.fromTo(
          heroProgressRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.4 },
          0.2
        );
      }
    }, container);

    return () => ctx.revert();
  }, [activeSlide, content]);

  useEffect(() => {
    if (!content?.team?.members?.length) return;
    const id = setInterval(() => {
      setTeamActiveSlide((prev) => {
        const total = content.team.members.length;
        return (prev + 1) % total;
      });
    }, TEAM_AUTOPLAY_DELAY);

    return () => clearInterval(id);
  }, [content?.team?.members]);

  const getTeamOffset = (index: number) => {
    if (!content?.team?.members?.length || !isDesktopTeamLayout) return 0;
    const total = content.team.members.length;
    let offset = index - teamActiveSlide;
    if (offset > total / 2) offset -= total;
    if (offset < -total / 2) offset += total;
    return offset;
  };

  // 🎬 Animaciones GSAP
  useGSAP(
    () => {
      if (!content) return;

      const fadeUpSections = [
        ".main__about .about__content > *",
        ".main__services .service__item",
        ".main__clients .clients__item",
        ".main__team .team__slide-media",
        ".main__contact .contact__content",
        ".main__contact .form__section",
        ".main__contact .form__aside",
      ];

      fadeUpSections.forEach((selector) => {
        gsap.utils.toArray<HTMLElement>(selector).forEach((el, i) => {
          gsap.from(el, {
            opacity: 0,
            y: 60,
            duration: 0.4,
            ease: "power3.out",
            delay: i * 0.08,
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              once: true,
            },
          });
        });
      });

      // ✨ Botones con rebote
      gsap.utils
        .toArray<HTMLElement>(".clients__item--icon")
        .forEach((icon) => {
          // Elegir un gradiente random
          const [start, end] =
            gradients[Math.floor(Math.random() * gradients.length)];

          // Aplicar gradiente y sombra dinámica
          gsap.set(icon, {
            background: `linear-gradient(135deg, ${start}, ${end})`,
            boxShadow: `0 0 15px 2px ${start}40`, // 40 = 25% opacidad
            width: "50px",
            height: "50px",
          });

          // Añadir animación de aparición suave
          gsap.fromTo(
            icon,
            { opacity: 0, scale: 0.6, y: 20 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.6,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: icon,
                start: "top 90%",
                once: true,
              },
            }
          );
        });
    },
    { scope: container, dependencies: [content] }
  );

  // ✨ Botones con aparición fluida y sin delay visual
  useEffect(() => {
    if (!content) return;

    let rafId: number | null = null;
    const ctx = gsap.context(() => {
      // 1️⃣ Oculta todos los botones inmediatamente al montar (sin esperar GSAP)
      gsap.set(".btn__primary--search", { opacity: 0, y: 20, scale: 0.97 });

      // 2️⃣ Espera al siguiente frame para asegurar que el DOM está listo
      rafId = requestAnimationFrame(() => {
        gsap.utils
          .toArray<HTMLElement>(".btn__primary--search")
          .forEach((btn, i) => {
            gsap.to(btn, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.5,
              ease: "power2.out",
              delay: i * 0.1,
              scrollTrigger: {
                trigger: btn,
                start: "top 95%",
                toggleActions: "play none none none",
                once: true,
              },
            });
          });
      });
    }, container);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      ctx.revert();
    };
  }, [content, container]);

  if (!content) return null;

  // 🧠 Variables reutilizables
  const hero = content.hero ?? [];
  const slide = hero[activeSlide] ?? {};
  const slideTitleLines = slide.title ?? [];
  const progressCurrent = String(activeSlide + 1).padStart(2, "0");
  const progressTotal = String(hero.length).padStart(2, "0");

  const firstTestimonials = content.clients.testimonials.slice(0, 4);
  const remainingTestimonials = content.clients.testimonials.slice(4);
  const trainingCategories = [
    "Gestión de la Calidad y Mejora Continua",
    "Gestión de Riesgos, Ética y Cumplimiento",
    "Gestión Pública y Transparencia",
    "Planificación y Estrategia Institucional",
    "Gestión del Talento Humano y Liderazgo",
    "Desarrollo Organizacional y Productividad",
    "Seguridad, Salud y Medio Ambiente (SSMA)",
    "Emprendimiento, Innovación y Negocios",
    "Competencias Blandas y Habilidades Directivas",
    "Gestión de Proyectos y Procesos (PMBOK / BPM)",
  ];

  const trainingPrograms = [
    {
      title: "Gestión de la Calidad y Mejora Continua",
      description:
        "Fortalece las capacidades técnicas para asegurar la eficiencia, la satisfacción del cliente y la mejora continua.",
      courses: [
        "Fundamentos de la Norma ISO 9001:2015",
        "Auditor Interno ISO 9001",
        "Gestión de Indicadores de Desempeño (KPI)",
        "Control de Procesos y Mejora Continua (Kaizen / 5S / Lean)",
        "Metodología Lean Six Sigma (Nivel Yellow/Green Belt)",
      ],
    },
    {
      title: "Gestión de Riesgos, Ética y Cumplimiento",
      description:
        "Diseñado para fortalecer la cultura ética y la integridad institucional en organizaciones públicas y privadas.",
      courses: [
        "Introducción a la Norma ISO 31000",
        "Implementación del Sistema Antisoborno ISO 37001",
        "Programa de Cumplimiento ISO 37301",
        "Ética e Integridad Institucional",
        "Debida Diligencia y Cultura de Cumplimiento",
      ],
    },
    {
      title: "Gestión Pública y Transparencia",
      description:
        "Fortalece las competencias del personal público conforme a la Ley 340-06 y el Decreto 36-21.",
      courses: [
        "Gestión Ética y Transparencia en las Contrataciones Públicas",
        "Manual de Compras y Procedimientos Administrativos",
        "Planificación, Monitoreo y Evaluación del Desempeño Institucional (MEPyD)",
        "Control Interno y Buenas Prácticas de Gobierno",
        "Normativas de Cumplimiento y Responsabilidad Administrativa",
      ],
    },
    {
      title: "Planificación y Estrategia Institucional",
      description:
        "Fortalece la capacidad técnica para formular, ejecutar y evaluar estrategias organizacionales.",
      courses: [
        "Formulación del Plan Estratégico Institucional (PEI)",
        "Diseño de Planes Operativos Anuales (POA)",
        "Gestión por Resultados e Indicadores de Desempeño",
        "Balanced Scorecard (Cuadro de Mando Integral)",
        "Taller de Planificación Estratégica Participativa",
      ],
    },
    {
      title: "Gestión del Talento Humano y Liderazgo",
      description:
        "Desarrolla competencias directivas y técnicas para una gestión moderna del talento.",
      courses: [
        "Gestión por Competencias y Evaluación de Desempeño",
        "Selección y Evaluación de Talento (Entrevista por Competencias)",
        "Gestión Estratégica del Talento Humano",
        "Clima Organizacional y Motivación Laboral",
        "Liderazgo Situacional y Equipos de Alto Desempeño",
      ],
    },
    {
      title: "Desarrollo Organizacional y Productividad",
      description:
        "Promueve la eficiencia operativa y la alineación del talento con los objetivos institucionales.",
      courses: [
        "Gestión del Cambio Organizacional",
        "Diseño de Procesos y Estructuras Organizativas",
        "Gestión del Tiempo y Productividad Personal",
        "Reingeniería de Procesos (BPM)",
        "Gestión de la Innovación Interna",
      ],
    },
    {
      title: "Seguridad, Salud y Medio Ambiente (SSMA)",
      description:
        "Fomenta la cultura preventiva y el cumplimiento normativo en salud y seguridad ocupacional.",
      courses: [
        "Introducción a la Norma ISO 45001:2018",
        "Gestión de Seguridad e Higiene Industrial",
        "Prevención de Riesgos Laborales",
        "Gestión Ambiental ISO 14001:2015",
        "Gestión Integral de Residuos y Cumplimiento Ambiental",
      ],
    },
    {
      title: "Emprendimiento, Innovación y Negocios",
      description:
        "Dirigido a emprendedores y equipos que buscan desarrollar modelos de negocio sostenibles.",
      courses: [
        "Diseño del Modelo de Negocio (Canvas / Lean Startup)",
        "Elaboración del Plan de Empresa",
        "Estudio de Mercado y Análisis de Competencia",
        "Marketing Digital y Posicionamiento de Marca",
        "Innovación Empresarial y Emprendimiento Sostenible",
      ],
    },
    {
      title: "Competencias Blandas y Habilidades Directivas",
      description:
        "Fortalece las capacidades interpersonales y de comunicación para el éxito profesional.",
      courses: [
        "Comunicación Asertiva y Escucha Activa",
        "Negociación Estratégica (Método Harvard)",
        "Trabajo en Equipo y Colaboración Efectiva",
        "Resolución de Conflictos y Gestión Emocional",
        "Inteligencia Emocional y Liderazgo Personal",
      ],
    },
    {
      title: "Gestión de Proyectos y Procesos (PMBOK / BPM)",
      description:
        "Capacita en metodologías modernas para la planificación, ejecución y control de proyectos.",
      courses: [
        "Gestión de Proyectos bajo Enfoque PMBOK (6ª y 7ª edición)",
        "Elaboración del WBS, Cronograma y Ruta Crítica",
        "Análisis de Riesgos en Proyectos",
        "Gestión de Procesos de Negocio (BPM)",
        "Herramientas Digitales para la Gestión de Proyectos",
      ],
    },
  ];

  const serviceAnchorMap: Record<string, string[]> = {
    "Consultoría y Asesoría Institucional": ["consultoria", "institucional"],
    "Gestión de la Calidad y Mejora Continua": ["calidad"],
    "Gestión de Riesgos, Ética y Cumplimiento": ["riesgos", "etica"],
    "Planificación y Desarrollo Organizacional": ["planificacion", "procesos"],
    "Gestión Pública y Compras Estatales": ["compras", "publica"],
    "Formación y Capacitación Profesional": ["formacion"],
    "Headhunting y Talento Humano": ["talento", "reclutamiento"],
    "Diagnósticos Organizacionales y Clima Laboral": ["clima"],
    "Actividades de Integración y Team Building": [],
    "Emprendimiento e Innovación Empresarial": ["emprendimiento", "innovacion"],
    "Servicios Técnicos Especializados": [],
  };

  const courseAnchorMap: Record<string, string[]> = {
    "Gestión del Talento Humano y Liderazgo": ["liderazgo", "evaluacion"],
    "Desarrollo Organizacional y Productividad": ["productividad"],
  };

  const slugify = (value: string) =>
    value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const getIcon = (name: string) => {
    switch (name) {
      case "map":
        return <IconMapPin color="var(--white)" />;
      case "phone":
        return <IconDeviceMobileMessage color="var(--white)" />;
      case "mail":
        return <IconMailFilled color="var(--white)" />;
      default:
        return <IconShieldCheckFilled color="var(--white)" />;
    }
  };

  const getServiceIcon = (name: string) => {
    switch (name) {
      case "briefcase":
        return <IconBriefcase color="var(--white)" />;
      case "school":
        return <IconSchool color="var(--white)" />;
      case "chart":
        return <IconChartBar color="var(--white)" />;
      case "users":
        return <IconUsers color="var(--white)" />;
      case "building":
        return <IconBuilding color="var(--white)" />;
      case "target":
        return <IconTarget color="var(--white)" />;
      case "IconRotate360":
        return <IconRotate360 color="var(--white)" />;
      case "IconBulb":
        return <IconBulb color="var(--white)" />;
      case "IconFileCertificate":
        return <IconFileCertificate color="var(--white)" />;
      case "IconNorthStar":
        return <IconNorthStar color="var(--white)" />;
      default:
        return <IconShieldCheckFilled color="var(--white)" />;
    }
  };

  return (
    <div ref={container}>
      {/* 🔹 HERO */}
      <section id="inicio" className="main__hero">
        <div className="hero__image" ref={heroImageRef}>
          <img src={slide.image} alt={slide.tagline} />
        </div>
        <div className="hero__slider" ref={heroSliderRef}>
          <span>{slide.tagline}</span>
          <h1>
            {slideTitleLines.map((line: string, i: number) => (
              <React.Fragment key={i}>
                {line}
                {i < slideTitleLines.length - 1 && <br />}
              </React.Fragment>
            ))}
          </h1>
          <a href="#contacto" className="btn__primary--search">
            <div className="btn__icon">
              <IconArrowUpRight />
            </div>
            {slide.buttonText}
          </a>
        </div>
        <div className="hero__progress" ref={heroProgressRef}>
          <div className="progress__status">
            <span>{progressCurrent}</span>
          </div>
          <div className="progress__line" />
          <div className="progress__total">
            <span>/{progressTotal}</span>
          </div>
        </div>
      </section>

      {/* 🔹 ABOUT */}
      <section id="nosotros" className="main__about">
        <div className="about__image">
          <img src="./images/intro.jpeg" />
        </div>
        <div className="about__content">
          <span>{content.about.tagline}</span>
          <h2>{content.about.title}</h2>
          <p>
            {content.about.description.map((text: string, i: number) => (
              <React.Fragment key={i}>
                {text}
                {i < content.about.description.length - 1 && (
                  <>
                    <br />
                    <br />
                  </>
                )}
              </React.Fragment>
            ))}
          </p>
          <div className="about__content--dips">
            {content.about.dips.map((text: string, i: number) => (
              <div className="dips__item" key={i}>
                <span>
                  <IconCircleCheckFilled />
                </span>
                <h4>{text}</h4>
              </div>
            ))}
          </div>
          <a
            href="#contacto"
            className="btn__primary--search btn__primary--dark"
          >
            <div className="btn__icon">
              <IconArrowUpRight />
            </div>
            {content.about.buttonText}
          </a>
        </div>
      </section>

      {/* 🔹 SERVICES */}
      <section id="servicios" className="main__services">
        <div className="services__content">
          <span>{content.services.tagline}</span>
          <h2>{content.services.title}</h2>
          <a
            href="#contacto"
            className="btn__primary--search btn__primary--dark"
          >
            <div className="btn__icon">
              <IconArrowUpRight />
            </div>
            {content.services.buttonText}
          </a>
          <div className="services__paragraph">
            <p>{content.services.description}</p>
          </div>
        </div>

        <div className="services__grid">
          {content.services.items.map((srv: any) => {
            const anchors = serviceAnchorMap[srv.title] ?? [];
            return (
              <div className="service__item" key={srv.title}>
                {anchors.map((anchor) => (
                  <span
                    key={anchor}
                    id={anchor}
                    className="anchor-target"
                    aria-hidden="true"
                  />
                ))}
                <div className="services__item--icon">
                  {getServiceIcon(srv.icon)}
                </div>
                <h3>{srv.title}</h3>
                <p>{srv.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 🔹 COURSE */}
      <section id="course" className="main__course">
        <span
          id="capacitaciones"
          className="anchor-target"
          aria-hidden="true"
        />
        <div className="course__intro">
          <span>Capacitaciones estratégicas</span>
          <h2>
            Diseñamos rutas formativas por categorías, programas y metodologías
            activas.
          </h2>
          <p>
            Nuestros contenidos mezclan teoría, práctica y simulaciones para que
            cada equipo implemente mejoras reales desde el primer día.
          </p>
        </div>

        <div className="course__grid">
          <article className="course__card course__categories">
            <header>
              <p className="course__eyebrow">I. Categorías agregadas</p>
              <h3>Cobertura integral de formación</h3>
              <p>
                Ordenamos las necesidades institucionales en diez pilares para
                asegurar profundidad técnica y consistencia estratégica.
              </p>
            </header>
            <ul>
              {trainingCategories.map((category, index) => (
                <li key={category}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{category}</p>
                </li>
              ))}
            </ul>
          </article>

          <article className="course__card course__programs">
            <header>
              <p className="course__eyebrow">II. Programas y cursos</p>
              <h3>Trayectos especializados con foco en resultados</h3>
              <p>
                Cada programa incluye descripción, objetivos y un set curado de
                cursos operativos.
              </p>
            </header>

            <div className="course__programs__list">
              {trainingPrograms.map((program, index) => {
                const programId = `program-${slugify(program.title)}`;
                const anchors = courseAnchorMap[program.title] ?? [];
                return (
                  <div
                    className="course__program"
                    key={program.title}
                    id={programId}
                  >
                    {anchors.map((anchor) => (
                      <span
                        key={anchor}
                        id={anchor}
                        className="anchor-target"
                        aria-hidden="true"
                      />
                    ))}
                    <div className="course__program__header">
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <div>
                        <h4>{program.title}</h4>
                        <p>{program.description}</p>
                      </div>
                    </div>
                    <ul>
                      {program.courses.map((course) => (
                        <li key={course}>{course}</li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </article>
        </div>
      </section>

      {/* 🔹 CLIENTS */}
      <section id="testimonios" className="main__clients">
        <div className="clients">
          <span>{content.clients.tagline}</span>
          <h2>{content.clients.title}</h2>
        </div>
        <div className="clients__grid">
          <div className="clients__grid--item">
            {firstTestimonials.map((t: any, i: number) => (
              <div className="clients__item" key={i}>
                <div className="clients__item--icon" />
                <h4>{t.name}</h4>
                <span>{t.role}</span>
                <p>"{t.quote}"</p>
              </div>
            ))}
          </div>
          <div className="clients__grid--item">
            {remainingTestimonials.map((t: any, i: number) => (
              <div className="clients__item" key={i}>
                <div className="clients__item--icon" />
                <h4>{t.name}</h4>
                <span>{t.role}</span>
                <p>"{t.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔹 TEAM */}
      <section id="equipo" className="main__team">
        <div className="team__content">
          <span>{content.team.tagline}</span>
          <h2>{content.team.title}</h2>
          {content.team.description && <p>{content.team.description}</p>}
        </div>

        <div className="team__slider">
          <div
            className={`team__slides ${
              isDesktopTeamLayout
                ? "team__slides--desktop"
                : "team__slides--mobile"
            }`}
            style={
              isDesktopTeamLayout
                ? undefined
                : {
                    transform: `translateX(-${teamActiveSlide * 100}%)`,
                  }
            }
          >
            {content.team.members.map((m: any, i: number) => {
              // 🔹 MOBILE
              if (!isDesktopTeamLayout) {
                return (
                  <div
                    key={i}
                    className={`team__slide ${
                      i === teamActiveSlide ? "is-active" : ""
                    }`}
                  >
                    <div className="team__slide-media">
                      <img
                        src={m.image}
                        alt={`Equipo JW & Asociados ${i + 1}`}
                        loading="lazy"
                      />
                    </div>
                  </div>
                );
              }

              // 🔹 DESKTOP
              const offset = getTeamOffset(i);
              const isActive = offset === 0;
              const visibilityThreshold =
                content.team.members.length > 4 ? 2 : 1;
              const isVisible = Math.abs(offset) <= visibilityThreshold;
              const distanceFactor = 35;
              const translateX = offset * distanceFactor;
              const scale = isActive ? 1 : 0.85;

              return (
                <div
                  key={i}
                  className={`team__slide team__slide--desktop 
              ${isVisible ? "is-visible" : ""} 
              ${isActive ? "is-active" : ""}`}
                  style={{
                    transform: `translate(-50%, -50%) translateX(${translateX}%) scale(${scale})`,
                    opacity: isVisible ? 1 : 0,
                    zIndex: 10 - Math.abs(offset),
                  }}
                >
                  <div className="team__slide-media">
                    <img
                      src={m.image}
                      alt={`Equipo JW & Asociados ${i + 1}`}
                      loading="lazy"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="team__controls">
            <button
              type="button"
              className="team__control team__control--prev"
              onClick={() =>
                setTeamActiveSlide((prev) =>
                  prev === 0 ? content.team.members.length - 1 : prev - 1
                )
              }
              aria-label="Imagen anterior del equipo"
            >
              <IconArrowLeft />
            </button>

            <button
              type="button"
              className="team__control team__control--next"
              onClick={() =>
                setTeamActiveSlide(
                  (prev) => (prev + 1) % content.team.members.length
                )
              }
              aria-label="Siguiente imagen del equipo"
            >
              <IconArrowRight />
            </button>
          </div>

          <div className="team__dots">
            {content.team.members.map((_: any, index: number) => (
              <button
                key={index}
                type="button"
                className={`team__dot ${
                  index === teamActiveSlide ? "team__dot--active" : ""
                }`}
                aria-label={`Ir a la imagen ${index + 1}`}
                onClick={() => setTeamActiveSlide(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 🔹 CONTACT */}
      <section id="contacto" className="main__contact">
        <div className="contact__content">
          <span>{content.contactHeader.tagline}</span>
          <h2>{content.contactHeader.title}</h2>
        </div>
        <div className="contact__form">
          <div className="form__section">
            <h3>{content.contactInfo.title}</h3>
            <p>{content.contactInfo.description}</p>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setSentStatus(null);
                setSending(true);
                try {
                  const form = e.currentTarget as HTMLFormElement;
                  const fd = new FormData(form);

                  const nombre = (fd.get("nombre") || fd.get("name") || "")
                    .toString()
                    .trim();
                  const correo = (fd.get("correo") || fd.get("email") || "")
                    .toString()
                    .trim();
                  const servicio = (
                    fd.get("servicio") ||
                    fd.get("service") ||
                    "No especificado"
                  )
                    .toString()
                    .trim();
                  const mensaje = (fd.get("mensaje") || fd.get("message") || "")
                    .toString()
                    .trim();

                  const res = await fetch("/api/contact", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ nombre, correo, servicio, mensaje }),
                  });
                  const data = await res.json();
                  if (!res.ok || !data?.ok) {
                    throw new Error(
                      data?.error || "No se pudo enviar el mensaje."
                    );
                  }
                  setSentStatus({
                    ok: true,
                    message:
                      "¡Mensaje enviado con éxito! Te responderemos pronto.",
                  });
                  form.reset();
                } catch (err: any) {
                  setSentStatus({
                    ok: false,
                    message: err?.message || "Ocurrió un error al enviar.",
                  });
                } finally {
                  setSending(false);
                }
              }}
            >
              {/* Campos de nombre y correo */}
              {content.contact.fields
                .filter((f: any) => f.type !== "textarea")
                .map((f: any, i: number) => (
                  <input
                    key={i}
                    type={f.type}
                    name={f.name}
                    placeholder={f.placeholder}
                  />
                ))}

              {/* 🔹 Campo adicional para Servicio (antes del mensaje) */}
              <select name="servicio" defaultValue="">
                <option value="" disabled>
                  Selecciona un servicio
                </option>
                {content.services.items.map((srv: any, idx: number) => (
                  <option key={idx} value={srv.title}>
                    {srv.title}
                  </option>
                ))}
              </select>

              {/* Campo de mensaje */}
              {content.contact.fields
                .filter((f: any) => f.type === "textarea")
                .map((f: any, i: number) => (
                  <textarea
                    key={i}
                    name={f.name}
                    placeholder={f.placeholder}
                  ></textarea>
                ))}

              {/* Feedback del envío */}
              {sentStatus && (
                <div
                  className={`form__feedback ${
                    sentStatus.ok ? "success" : "error"
                  }`}
                  aria-live="polite"
                >
                  {sentStatus.message}
                </div>
              )}

              {/* Botón de envío */}
              <button
                type="submit"
                className="btn__primary--search"
                disabled={sending}
              >
                <div className="btn__icon">
                  <IconArrowUpRight />
                </div>
                {sending ? "Enviando..." : content.contact.buttonText}
              </button>
            </form>
          </div>
          <div className="form__aside">
            {content.contactInfo.aside.map((a: any, i: number) => (
              <a href={a.href} key={i}>
                <div className="aside__item">
                  <div className="aside__item--icon">{getIcon(a.icon)}</div>
                  <div className="aside__item--info">
                    <h4>{a.title}</h4>
                    <a>{a.text}</a>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 🔹 FOOTER */}
      <Footer />
    </div>
  );
}
