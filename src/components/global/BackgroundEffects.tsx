"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import NET from "vanta/dist/vanta.net.min";

export default function VantaBackground() {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);

  useEffect(() => {
    if (!vantaEffect.current) {
      vantaEffect.current = NET({
        el: vantaRef.current!,
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0xaca4a8,
        backgroundColor: 0x060506, // careful: your "0x60506" was invalid hex, I fixed it
        points: 15.0,
        maxDistance: 22.0,
        spacing: 16.0,
      });
    }

    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, []);

  return (
  <div ref={vantaRef} className="fixed inset-0 -z-10">
    <div className="absolute inset-0 bg-black/90" /> {/* dim overlay */}
  </div>
);

}
