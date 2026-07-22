"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function OpeningAnimation() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
        >
          {/* Blue Glow - Centered Behind Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="absolute w-[600px] h-[600px] bg-blue-500 blur-[180px] rounded-full"
          />

          {/* Main Content - Centered */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: 0.3,
              }}
              className="flex items-center justify-center"
            >
              <Image
                src="/iconbkr.png"
                alt="OptiWebx"
                width={280}
                height={280}
                priority
                className="w-[180px] md:w-[280px] h-auto"
              />
            </motion.div>

            {/* Loading Dots */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
                delay: 0.7,
              }}
              className="flex items-center gap-2 mt-6"
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0.3, scale: 0.8 }}
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    scale: [0.8, 1, 0.8],
                  }}
                  transition={{
                    duration: 1.2,
                    ease: "easeInOut",
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                  className="w-[6px] h-[6px] rounded-full bg-blue-500"
                />
              ))}
            </motion.div>

            {/* Subtle Loading Text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.4,
                ease: "easeOut",
                delay: 0.9,
              }}
              className="text-[12px] text-gray-500 tracking-[0.2em] mt-3 font-light"
            >
              Initializing Experience
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}