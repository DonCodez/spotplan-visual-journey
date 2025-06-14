
import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import { useBgTransition } from "@/contexts/BackgroundTransitionContext";

const bgColors: Record<string, string> = {
  "to-dark": "bg-white",
  "to-light": "bg-black"
};

const animateToColors: Record<string, string> = {
  "to-dark": "bg-black",
  "to-light": "bg-white"
};

export default function BgTransitionOverlay() {
  const { transition, setTransition } = useBgTransition();

  return (
    <AnimatePresence>
      {transition && (
        <motion.div
          key={transition}
          className={`fixed inset-0 z-[9999] pointer-events-none ${bgColors[transition]}`}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { duration: 0.15 }
          }}
          exit={{
            opacity: 0,
            transition: { duration: 0.3 }
          }}
          onAnimationComplete={() => {
            // Staged color fade (white -> black or black -> white)
            setTimeout(() => setTransition(null), 500);
          }}
          style={{ transition: "background 0.5s" }}
        >
          <motion.div
            className={`w-full h-full absolute top-0 left-0 ${animateToColors[transition]}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.5 } }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
