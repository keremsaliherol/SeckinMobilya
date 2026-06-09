"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const mobile =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsMobile(mobile);
    if (mobile) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.08;
      ringY += (mouseY - ringY) * 0.08;
      if (ringRef.current) {
        ringRef.current.style.left = ringX + "px";
        ringRef.current.style.top = ringY + "px";
      }
      rafId = requestAnimationFrame(animate);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as Element;
      setIsHovering(!!target.closest("a, button, [data-cursor-hover]"));
    };

    const onLeave = () => setIsVisible(false);
    const onEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onMouseOver);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onMouseOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (isMobile) return null;

  return (
    <div
      ref={ringRef}
      className="fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{
        width: isHovering ? "52px" : "36px",
        height: isHovering ? "52px" : "36px",
        border: `1.5px solid ${isHovering ? "rgba(92,61,46,0.7)" : "rgba(92,61,46,0.35)"}`,
        opacity: isVisible ? 1 : 0,
        transition: "width 0.4s ease, height 0.4s ease, border-color 0.3s, opacity 0.3s",
      }}
    />
  );
}
