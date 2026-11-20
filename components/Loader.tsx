"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { ease } from "./ui/Reveal";

/** Brief curtain-style page loading transition. Locks scroll while visible. */
export default function Loader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShow(false), 1500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = show ? "hidden" : "";
    return () => { document.documentElement.style.overflow = ""; };
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-burgundy text-ivory"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease }}
          role="status"
          aria-label="Loading"
        >
          <div className="overflow-hidden">
            <motion.p
              initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.8, ease }}
              className="font-serif text-4xl italic sm:text-6xl"
            >
              Dena Marizan
            </motion.p>
          </div>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.6 }}
            className="eyebrow mt-4 text-champagne"
          >
            Chapter two begins
          </motion.p>
          <motion.span
            className="absolute bottom-0 left-0 h-[3px] bg-cherry"
            initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 1.3, ease: "easeInOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
