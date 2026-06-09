"use client";

import { useScroll, motion } from "framer-motion";

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[10001] h-[2px] origin-left"
      style={{
        scaleX: scrollYProgress,
        background: "var(--color-primary)",
      }}
    />
  );
}
