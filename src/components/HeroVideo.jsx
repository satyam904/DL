import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import heroVideo from "../assets/video.mp4";

const HeroVideo = () => {
  const sectionRef = useRef(null);
  const mobileVideoRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Mobile scroll animations
  const { scrollYProgress: mobileScrollProgress } = useScroll({
    target: mobileVideoRef,
    offset: ["start 65%", "end 35%"],
  });

  /* =====================================================
     PHASED SCROLL ANIMATION
  ===================================================== */

  const width = useTransform(
    scrollYProgress,
    [0, 0, 0.7],
    ["55vw", "70vw", "100vw"]
  );

  const height = useTransform(
    scrollYProgress,
    [0, 0, 0.7],
    ["38vw", "38vw", "100vh"]
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0, 0.7],
    [0.9, 1, 1.05]
  );

  const radius = useTransform(
    scrollYProgress,
    [0, 0, 0.7],
    [34, 26, 0]
  );

  // ✅ FIXED: opacity + move text UNDER video
  const bottomTextOpacity = useTransform(
    scrollYProgress,
    [0.3, 0.5],
    [1, 0]
  );

  const bottomTextY = useTransform(
    scrollYProgress,
    [0.3, 0.5],
    [0, -60]
  );

  // MOBILE VIDEO SMOOTH POPUP ANIMATION
  const mobileVideoScale = useTransform(
    mobileScrollProgress,
    [0, 0.35, 0.5, 1],
    [0.6, 0.95, 1.15, 1.05]
  );

  const mobileVideoY = useTransform(
    mobileScrollProgress,
    [0, 0.35, 0.5, 1],
    [60, 0, -15, -80]
  );

  const mobileVideoRotateX = useTransform(
    mobileScrollProgress,
    [0, 0.35, 0.5, 1],
    [0, 8, 0, -15]
  );

  const mobileVideoRotateZ = useTransform(
    mobileScrollProgress,
    [0, 0.35, 0.5, 1],
    [0, 2, 0, -8]
  );

  const mobileVideoOpacity = useTransform(
    mobileScrollProgress,
    [0, 0.25, 0.5, 1],
    [0.6, 1, 1, 0.75]
  );

  const mobileVideoBorderRadius = useTransform(
    mobileScrollProgress,
    [0, 0.35, 0.5, 1],
    ["28px", "22px", "14px", "0px"]
  );

  const mobileVideoMarginTop = useTransform(
    mobileScrollProgress,
    [0, 0.35, 0.5, 1],
    [-80, -40, 0, 20]
  );

  const topTextOpacity = useTransform(
    mobileScrollProgress,
    [0, 0.4, 0.6, 1],
    [1, 0.8, 0.3, 0]
  );

  const topTextY = useTransform(
    mobileScrollProgress,
    [0, 0.6, 1],
    [0, -30, -80]
  );

  return (
    <section
      ref={sectionRef}
      className="relative px-4 overflow-visible md:h-[220vh]"
    >
      {/* BACKGROUND GLOW */}
      <div className="pointer-events-none absolute inset-x-0 top-32 mx-auto h-[420px] max-w-6xl rounded-full bg-gradient-to-r from-purple-400/40 via-pink-400/40 to-indigo-400/40 blur-[120px] z-0" />

      {/* TOP TEXT */}
      <motion.h2
        initial={{ opacity: 0.6 }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        style={{
          opacity: topTextOpacity,
          y: topTextY,
        }}
        className="mb-2 md:mb-0 pt-28 text-center text-2xl font-bold sm:text-3xl text-[#6A41C6] relative z-10 md:z-0 hidden md:block md:!opacity-100 md:mt-2"
      >
        Launching DelightLoop 2.0!
      </motion.h2>

      {/* MOBILE TOP TEXT */}
      <motion.h2
        initial={{ opacity: 0.6 }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        style={{
          opacity: topTextOpacity,
          y: topTextY,
        }}
        className="pt-2 mb-6 text-center text-2xl font-bold sm:text-3xl text-[#6A41C6] relative z-10 md:hidden"
      >
        Launching DelightLoop 2.0!
      </motion.h2>

      {/* ================= MOBILE ================= */}
      <motion.div
        ref={mobileVideoRef}
        className="md:hidden relative z-10"
        style={{
          marginTop: mobileVideoMarginTop,
        }}
      >
        <motion.div
          className="aspect-video overflow-hidden shadow-2xl max-w-2xl mx-auto"
          style={{
            scale: mobileVideoScale,
            y: mobileVideoY,
            rotateX: mobileVideoRotateX,
            rotateZ: mobileVideoRotateZ,
            opacity: mobileVideoOpacity,
            borderRadius: mobileVideoBorderRadius,
          }}
        >
          <video
            className="h-full w-full object-cover"
            src={heroVideo}
            autoPlay
            muted
            loop
            playsInline
          />
        </motion.div>
      </motion.div>

      {/* ================= DESKTOP (SCROLL TAKEOVER) ================= */}
      <div className="hidden md:flex sticky top-0 h-screen items-center justify-center z-20">
        <motion.div
          style={{ width, height, scale, borderRadius: radius }}
          className="bg-black overflow-hidden shadow-2xl ring-1 ring-black/10"
        >
          <video
            className="h-full w-full object-cover"
            src={heroVideo}
            autoPlay
            muted
            loop
            playsInline
          />
        </motion.div>
      </div>

      {/* ✅ BOTTOM TEXT (STAYS BELOW, HIDES UNDER VIDEO) */}
      <motion.div
        style={{
          opacity: bottomTextOpacity,
          y: bottomTextY,
        }}
        className="relative z-10 mt-12 text-center hidden md:block"
      >
        <h1 className="text-2xl md:text-2xl font-medium text-black-600">
          <b>Sales, Marketing & Revenue teams who trust </b>
          <span className="font-semibold text-black-800">DelightLoop</span>
        </h1>
      </motion.div>

      {/* MOBILE TEXT */}
      <div className="mt-15 text-center md:hidden">
        <h1 className="text-lg font-medium text-gray-600">
          <b>Sales, Marketing & Revenue teams who trust </b>
          <span className="font-semibold text-gray-800">DelightLoop</span>
        </h1>
      </div>
    </section>
  );
};

export default HeroVideo;
