"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function OpeningAnimation() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Animation 2.5 seconds baad hide ho jayegi
    const timer = setTimeout(() => {
      setShow(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
        >
          {/* Background Glow - Blue */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 0.6 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute w-[500px] h-[500px] bg-blue-600/30 blur-[120px] rounded-full"
          />

          {/* Background Glow - Purple */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 0.4 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
            className="absolute w-[400px] h-[400px] bg-purple-600/20 blur-[120px] rounded-full"
          />

          {/* Main Content */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Logo Animation */}
            <motion.div
              initial={{ scale: 0, rotate: -30, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
                delay: 0.2,
              }}
              className="w-28 h-28 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-5xl font-bold shadow-2xl shadow-blue-500/30"
            >
              O
            </motion.div>

            {/* Title Animation */}
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-4xl font-bold mt-6"
            >
              Opti<span className="text-blue-500">webx</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="text-gray-400 mt-2 text-sm tracking-wider"
            >
              AI-POWERED DIGITAL SOLUTIONS
            </motion.p>

            {/* Loading Dots */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex gap-2 mt-6"
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1 + i * 0.2 }}
                  className="w-2.5 h-2.5 rounded-full bg-blue-500"
                  style={{
                    animation: `pulse-dot 1.2s ease-in-out infinite ${i * 0.2}s`,
                  }}
                />
              ))}
            </motion.div>
          </div>

          {/* Keyframes Animation */}
          <style>{`
            @keyframes pulse-dot {
              0%, 100% {
                transform: scale(1);
                opacity: 0.3;
              }
              50% {
                transform: scale(1.5);
                opacity: 1;
              }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}