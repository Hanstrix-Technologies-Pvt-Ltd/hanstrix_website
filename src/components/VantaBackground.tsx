"use client";

import { useState, useEffect, useRef } from 'react';

declare global {
  interface Window {
    VANTA: unknown;
    THREE: unknown;
  }
}

export const VantaBackground = () => {
  const [vantaEffect, setVantaEffect] = useState<unknown>(null);
  const vantaRef = useRef<HTMLDivElement>(null);

  // This useEffect handles the initial setup of the animation
  useEffect(() => {
    const loadScript = (src: string, onReady: () => void) => {
      let script = document.querySelector(`script[src="${src}"]`) as HTMLScriptElement;
      if (script) {
        if (script.dataset.loaded) onReady();
        else script.addEventListener('load', onReady);
        return;
      }
      script = document.createElement('script');
      script.src = src;
      script.async = true;
      document.body.appendChild(script);
      script.onload = () => {
        script.dataset.loaded = 'true';
        onReady();
      };
    };

    loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js', () => {
      loadScript('https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.halo.min.js', () => {
        if (vantaRef.current && !vantaEffect && window.VANTA) {
          const timer = setTimeout(() => {
            const effect = ((window.VANTA as { HALO: (config: {
              el: HTMLDivElement | null;
              THREE: unknown;
              mouseControls: boolean;
              touchControls: boolean;
              gyroControls: boolean;
              minHeight: number;
              minWidth: number;
              baseColor: number;
              backgroundColor: number;
              amplitudeFactor: number;
              size: number;
            }) => unknown }).HALO)({
              el: vantaRef.current,
              THREE: window.THREE,
              mouseControls: true,
              touchControls: true,
              gyroControls: false,
              minHeight: 200.00,
              minWidth: 200.00,
              baseColor: 0x0,
              backgroundColor: 0x20202,
              amplitudeFactor: 1.20,
              size: 3.50
            });
            setVantaEffect(effect);
          }, 0);

          return () => clearTimeout(timer);
        }
      });
    });

    return () => {
      if (vantaEffect) {
        (vantaEffect as { destroy: () => void }).destroy();
      }
    };
  }, [vantaEffect]);
  
  // NEW: This useEffect handles resizing the animation when the window changes size
  useEffect(() => {
    if (vantaEffect) {
      const handleResize = () => {
        (vantaEffect as { resize: () => void }).resize();
      };
      
      window.addEventListener('resize', handleResize);
      
      // Cleanup the event listener when the component unmounts
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [vantaEffect]);

  return (
    <div
      ref={vantaRef}
      className="fixed inset-0 z-0"
    >
    <div className="absolute inset-0 bg-black/30" />
    </div>
  );
};