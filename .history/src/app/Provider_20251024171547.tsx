"use client";
import { useEffect } from "react";
import Lenis from "lenis";

export default function ProviderLenis({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Asegura que el código solo se ejecute en el cliente
    if (typeof window === "undefined") return;

    const lenis = new Lenis({
      duration: 1.2,
      lerp: 0.1,
      anchors: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy(); // Limpieza segura
    };
  }, []);

  return <>{children}</>;
}
