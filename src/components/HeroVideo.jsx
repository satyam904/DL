import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import heroVideo from "../assets/video.mp4";

const HeroVideo = () => {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // 🔹 SMALL → BIG
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.85, 1.35]);

  // 🔹 ROUNDED → FLAT
  const radius = useTransform(scrollYProgress, [0, 0.5], [24, 0]);

  // 🔹 SIZE CONTROL
  const width = useTransform(scrollYProgress, [0, 0.5], ["55vw", "60vw"]);
  const height = useTransform(scrollYProgress, [0, 0.5], ["50vw", "75vh"]);

  // 🔥 BOTTOM TEXT FADE (20% scroll ke baad)
  const bottomTextOpacity = useTransform(
    scrollYProgress,
    [0.4, 0.5],
    [1, 0]
  );

  return (
    <section
      ref={sectionRef}
      className="relative h-[180vh] px-4 pt-0 overflow-visible"
    >
      {/* BACKGROUND SHADE */}
      <div className="pointer-events-none absolute inset-x-0 top-32 mx-auto h-[420px] max-w-6xl rounded-full bg-gradient-to-r from-purple-400/40 via-pink-400/40 to-indigo-400/40 blur-[120px] z-0" />

      {/* TOP TEXT (ALWAYS VISIBLE) */}
      <div className="relative z-20 mx-auto max-w-5xl">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-900 sm:text-3xl">
          Launching DelightLoop 2.0!
        </h2>
      </div>

      {/* STICKY VIDEO */}
      <div className="sticky top-0 h-screen flex items-center justify-center z-10">
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

      {/* 🔥 BOTTOM TEXT (AUTO HIDE) */}
      <motion.div
        style={{ opacity: bottomTextOpacity }}
        className="relative z-20 mt-12 text-center"
      >
        <h1 className="text-xl md:text-2xl font-medium text-gray-600">
          <b>Sales, Marketing & Revenue teams who trust{" "}</b>
          <span className="font-semibold text-gray-800">DelightLoop</span>
        </h1>
      </motion.div>
    </section>
  );
};

export default HeroVideo;
