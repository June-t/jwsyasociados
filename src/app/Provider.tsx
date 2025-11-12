"use client";
import { useEffect } from "react";
import Lenis from "lenis";

export default function ProviderLenis({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
