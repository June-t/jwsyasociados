import Lenis from "lenis";

export default function ProviderLenis({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenis = new Lenis();

  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  return <>{children}</>;
}
