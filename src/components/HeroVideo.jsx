import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import heroVideo from "../assets/video.mp4";

const HeroVideo = () => {
  const sectionRef = useRef(null);
  const mobileVideoRef = useRef(null);
  const desktopWrapRef = useRef(null);

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

  // bottom text opacity + basic move
  const bottomTextOpacity = useTransform(scrollYProgress, [0.55, 0.72, 0.85], [0, 1, 0.95]);
  const bottomTextY = useTransform(scrollYProgress, [0.55, 0.72, 0.85], [28, 0, -12]);

  // Extra small offset so text sits right under the video end
  // when video expands to full height (around 0.7)
  const bottomTextOffset = useTransform(scrollYProgress, [0.6, 0.7, 0.85], [60, 0, -20]);

  // Combine with a spring for very smooth motion
  const smoothBottomY = useSpring(useMotionValue(0));
  // We'll compute a composed translateY value inside style below using bottomTextY + bottomTextOffset

  /* =====================================================
     MOBILE VIDEO SMOOTH POPUP ANIMATION (unchanged)
  ===================================================== */

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

  const topTextY = useTransform(mobileScrollProgress, [0, 0.6, 1], [0, -30, -80]);

  return (
    <section ref={sectionRef} className="relative px-4 overflow-visible md:h-[220vh]">
      {/* BACKGROUND GLOW */}
      <div className="pointer-events-none absolute inset-x-0 top-32 mx-auto h-[420px] max-w-6xl rounded-full bg-gradient-to-r from-purple-400/40 via-pink-400/40 to-indigo-400/40 blur-[120px] z-0" />

      {/* TOP TEXT (desktop + mobile) */}
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

      {/* ================= MOBILE (unchanged) ================= */}
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

      {/* DESKTOP: bottom text fixed visually under the video when scroll takeover ends */}
      <motion.div
        className="hidden md:flex items-center justify-center z-30"
        style={{
          // position relative so it flows under the sticky block
          opacity: bottomTextOpacity,
          transform: `translateY(${/* combine two motion values by approximation */ "0px"})`,
        }}
      >
        {/* We use another motion wrapper to animate precise y using the transforms */}
        <motion.div
          className="relative z-30 max-w-3xl mx-auto mt-8"
          style={{
            y: bottomTextY, // primary vertical movement
            // small offset so the text sits right below the expanded video region
            translateY: bottomTextOffset,
          }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-2xl font-medium text-black-600 text-center"
          >
            <b>Sales, Marketing & Revenue teams who trust </b>{" "}
            <span className="font-semibold text-black-800">DelightLoop</span>
          </motion.h1>

          {/* underline reveal */}
          <motion.span
            className="block h-1 bg-[#6A41C6] mt-4 origin-left rounded mx-auto"
            style={{ width: "160px" }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, ease: [0.2, 0.85, 0.25, 1], delay: 0.08 }}
          />
        </motion.div>
      </motion.div>

      {/* MOBILE TEXT (unchanged) */}
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