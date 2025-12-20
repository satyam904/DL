import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const WORDS = ["Trials", "Demos", "Deals", "Growth", "Leads", "Results"];

const Hero = () => {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState("enter"); // enter | exit

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase("exit");

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % WORDS.length);
        setPhase("enter");
      }, 450);
    }, 2200);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden px-4 pt-16 pb-8">
      {/* background blobs */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-purple-300/30 blur-3xl" />
      <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-pink-300/30 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-6xl text-center">

        {/* 🔥 BADGE — animated */}
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-6 flex justify-center"
        >
          <div className="rounded-full border border-white/40 bg-white/70 px-6 py-2 backdrop-blur-md shadow-sm">
            <span className="hero-wave-text text-sm font-bold">
              Increase Pipeline & Retain Customers through AI Powered Gifting
            </span>
          </div>
        </motion.div>

        {/* 🔥 HEADING — animated */}
        <motion.h1
  initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
  transition={{ duration: 0.8, ease: "easeOut" }}
  viewport={{ once: true }}
  className="mx-auto w-fit mb-6 text-4xl font-bold tracking-tight text-gray-900 leading-[1.02] sm:text-5xl md:text-6xl lg:text-7xl"
>
  <span className="inline-flex items-center">
    <span>Get More</span>

    <span
  className="
    relative ml-2 inline-flex items-center
    h-[1.1em] w-[6.5ch]          /* 📱 mobile safe */
    sm:h-[1.1em] sm:w-[6ch]     /* tablet */
    lg:h-[1.07em] lg:w-[5ch]    /* desktop (original) */
    overflow-hidden
  "
>

      <span
        className={`absolute left-0 top-0 inline-block
          bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent
          whitespace-nowrap
          transition-transform transition-opacity duration-500
          ease-[cubic-bezier(0.16,1,0.3,1)]
          ${
            phase === "enter"
              ? "translate-y-0 opacity-100"
              : "-translate-y-full opacity-0"
          }`}
      >
        {WORDS[index]}
      </span>
    </span>
  </span>
</motion.h1>


        {/* 🔥 DESCRIPTION — animated */}
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mx-auto mb-14 max-w-3xl text-gray-700"
        >
          <p className="mb-3 text-lg md:text-xl font-medium">
            Deliver Delight Across the Customer Journey Continuously.
          </p>
          <p className="text-lg md:text-xl font-medium">
            Increase Pipeline & Retain Customers through AI ✨ Powered Gifting
          </p>
        </motion.div>

        {/* 🔥 CTA — animated */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <button className="inline-flex items-center gap-2 rounded-full bg-[#6A41C6] px-10 py-4 text-lg font-semibold text-white transition hover:-translate-y-1 hover:shadow-xl hover:bg-[#5b37ad]">
  Book a Demo
  <svg
    className="h-6 w-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 7l5 5-5 5M18 12H6"
    />
  </svg>
</button>

        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
