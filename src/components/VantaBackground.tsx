"use client";

import { useEffect, useRef, useState } from "react";

/* ---------- Minimal types for Vanta FOG ---------- */
interface VantaEffect {
  destroy(): void;
  resize(): void;
}

interface VantaFogConfig {
  el: HTMLElement;
  THREE?: unknown;
  mouseControls: boolean;
  touchControls: boolean;
  gyroControls: boolean;
  minHeight: number;
  minWidth: number;
  highlightColor: number;
  midtoneColor: number;
  lowlightColor: number;
  baseColor: number;
  blurFactor: number;
  zoom?: number;
  speed?: number;
}

interface VantaNamespace {
  FOG?: (config: VantaFogConfig) => VantaEffect;
}

declare global {
  interface Window {
    VANTA?: VantaNamespace;
    THREE?: unknown;
  }
}

export const VantaBackground = () => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const [vantaEffect, setVantaEffect] = useState<VantaEffect | null>(null);

  // load a script once and call onReady after it loads
  const loadScript = (src: string, onReady: () => void) => {
    let script = document.querySelector(`script[src="${src}"]`) as
      | HTMLScriptElement
      | null;

    if (script) {
      if (script.dataset.loaded === "true") onReady();
      else script.addEventListener("load", onReady, { once: true });
      return;
    }

    script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => {
      script!.dataset.loaded = "true";
      onReady();
    };
    document.body.appendChild(script);
  };

  useEffect(() => {
    // Respect reduced motion
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) return;

    loadScript(
      "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js",
      () => {
        loadScript(
          "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.fog.min.js",
          () => {
            if (!vantaRef.current || vantaEffect) return;

            const VANTA = window.VANTA;
            if (!VANTA?.FOG) return;

            const effect = VANTA.FOG({
              el: vantaRef.current,
              THREE: window.THREE,
              mouseControls: true,
              touchControls: true,
              gyroControls: false,
              minHeight: 200,
              minWidth: 200,
              // colors from your snippet (using full 24-bit hex)
              highlightColor: 0xf2ff,
              midtoneColor: 0x000000,
              lowlightColor: 0xffff,
              baseColor: 0x000000,
              blurFactor: 0.56,
              zoom: 1,
              speed: 1,
            });

            setVantaEffect(effect);
          }
        );
      }
    );

    return () => {
      vantaEffect?.destroy();
    };
  }, [vantaEffect]);

  // keep canvas sized on resize
  useEffect(() => {
    if (!vantaEffect) return;
    const onResize = () => vantaEffect.resize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [vantaEffect]);

  return (
    <div ref={vantaRef} className="fixed inset-0 -z-10">
      {/* overlay for readability */}
      <div className="absolute inset-0 bg-black/30" />
    </div>
  );
};
