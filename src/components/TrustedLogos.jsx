import React from "react";

import accio from "../assets/accio.avif";
import rapid from "../assets/graohite.avif";
import indiq from "../assets/indiqus.avif";
import incubate from "../assets/incubate.avif";
import ipl from "../assets/product leadership.avif";
import graphite from "../assets/rapid.avif";

const logos = [accio, rapid, indiq, incubate, ipl, graphite];

const TrustedLogos = () => {
  return (
    <section className="relative mt-32 overflow-hidden py-6">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100" />

      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />

      <div className="relative flex overflow-hidden">
  <div className="flex min-w-full animate-marquee items-center gap-20 px-10">
    {[...logos, ...logos].map((logo, i) => (
      <img
        key={i}
        src={logo}
        alt="trusted brand"
        className="h-10 md:h-12"
      />
    ))}
  </div>
</div>

    </section>
  );
};

export default TrustedLogos;
