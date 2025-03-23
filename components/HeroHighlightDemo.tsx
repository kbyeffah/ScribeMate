"use client";
import { motion } from "framer-motion";
import { HeroHighlight } from "../components/ui/hero-highlight";

export function HeroHighlightDemo() {
  return (
    <HeroHighlight>
      <div className="relative w-full h-full overflow-hidden">
        {/* Gradient Background */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 bg-gradient-to-br from-navy-50 via-navy-200 to-navy-600 dark:from-navy-900 dark:via-navy-700 dark:to-navy-400"
        />

        {/* Floating Circles */}
        <motion.div
          initial={{ scale: 0, x: "-50%", y: "-50%" }}
          animate={{ scale: [1, 1.2, 1], x: "-50%", y: "-50%" }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-navy-300 dark:bg-navy-600 rounded-full opacity-30 blur-xl"
        />

        <motion.div
          initial={{ scale: 0, x: "50%", y: "50%" }}
          animate={{ scale: [1, 1.3, 1], x: "50%", y: "50%" }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: 0.5,
          }}
          className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-navy-400 dark:bg-navy-500 rounded-full opacity-20 blur-2xl"
        />

        {/* Subtle Pulse Effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: [0.1, 0.3, 0.1], scale: [0.8, 1.1, 0.8] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 bg-navy-200 dark:bg-navy-800 rounded-full opacity-10 blur-3xl"
        />

        {/* Floating Lines */}
        <motion.div
          initial={{ y: "-100%", opacity: 0 }}
          animate={{ y: "100%", opacity: [0, 0.5, 0] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear",
            delay: 1,
          }}
          className="absolute left-1/3 w-1 h-full bg-navy-400 dark:bg-navy-300 opacity-20"
        />

        <motion.div
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: "100%", opacity: [0, 0.4, 0] }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/3 w-full h-1 bg-navy-300 dark:bg-navy-400 opacity-15"
        />
      </div>
    </HeroHighlight>
  );
}