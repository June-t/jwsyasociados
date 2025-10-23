import Lenis from "lenis";

export default function ProviderLenis({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenis = new Lenis();

  // Use requestAnimationFrame to continuously update the scroll
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  return <>{children}</>;
}
