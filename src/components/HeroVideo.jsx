import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import heroVideo from "../assets/video.mp4";

const HeroVideo = () => {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // 🔹 DESKTOP ANIMATIONS
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.85, 1.35]);
  const radius = useTransform(scrollYProgress, [0, 0.5], [24, 0]);
  const width = useTransform(scrollYProgress, [0, 0.5], ["55vw", "60vw"]);
  const height = useTransform(scrollYProgress, [0, 0.5], ["50vw", "75vh"]);

  const bottomTextOpacity = useTransform(
    scrollYProgress,
    [0.4, 0.5],
    [1, 0]
  );

  return (
    <section
      ref={sectionRef}
      className="relative px-4 pt-0 overflow-visible md:h-[180vh]"
    >
      {/* BACKGROUND SHADE */}
      <div className="pointer-events-none absolute inset-x-0 top-32 mx-auto h-[420px] max-w-6xl rounded-full bg-gradient-to-r from-purple-400/40 via-pink-400/40 to-indigo-400/40 blur-[120px] z-0" />

      {/* TOP TEXT */}
      <div className="relative z-20 mx-auto max-w-5xl">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-900 sm:text-3xl">
          Launching DelightLoop 2.0!
        </h2>
      </div>

      {/* ================= MOBILE VIDEO (NO ANIMATION) ================= */}
      <div className="md:hidden relative z-10">
        <div className="aspect-video overflow-hidden rounded-2xl shadow-xl">
          <video
            className="h-full w-full object-cover"
            src={heroVideo}
            autoPlay
            muted
            loop
            playsInline
          />
        </div>
      </div>

      {/* ================= DESKTOP VIDEO (SCROLL ANIMATION) ================= */}
      <div className="hidden md:flex sticky top-0 h-screen items-center justify-center z-10">
        <motion.div
          style={{
            scale,
            width,
            height,
            borderRadius: radius,
          }}
          className="bg-white overflow-hidden shadow-2xl ring-1 ring-black/5"
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

      {/* BOTTOM TEXT (DESKTOP ONLY – AUTO HIDE) */}
      <motion.div
        style={{ opacity: bottomTextOpacity }}
        className="relative z-20 mt-12 text-center hidden md:block"
      >
        <h1 className="text-xl md:text-2xl font-medium text-gray-600">
          <b>Sales, Marketing & Revenue teams who trust </b>
          <span className="font-semibold text-gray-800">DelightLoop</span>
        </h1>
      </motion.div>

      {/* MOBILE BOTTOM TEXT (STATIC) */}
      <div className="mt-10 text-center md:hidden">
        <h1 className="text-lg font-medium text-gray-600">
          <b>Sales, Marketing & Revenue teams who trust </b>
          <span className="font-semibold text-gray-800">DelightLoop</span>
        </h1>
      </div>
    </section>
  );
};

export default HeroVideo;
