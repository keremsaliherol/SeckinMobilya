"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const shown = sessionStorage.getItem("sm-preloader");
    if (!shown) {
      setVisible(true);
      document.body.style.overflow = "hidden";
      const t = setTimeout(() => {
        setVisible(false);
        document.body.style.overflow = "";
        sessionStorage.setItem("sm-preloader", "1");
      }, 1500);
      return () => clearTimeout(t);
    }
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: "var(--color-surface)" }}
          exit={{
            y: "-100%",
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            className="w-16 h-16 rounded-xl flex items-center justify-center mb-5"
            style={{ background: "var(--color-primary)" }}
          >
            <span
              className="font-heading font-bold text-3xl text-white leading-none"
            >
              S
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p
              className="font-heading font-semibold tracking-widest uppercase text-sm"
              style={{ color: "var(--color-foreground)" }}
            >
              Se\u00e7kin Mimarl\u0131k
            </p>
          </motion.div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="mt-8 h-0.5 w-32 origin-left rounded-full"
            style={{ background: "var(--color-primary)" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
