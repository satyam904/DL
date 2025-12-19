import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import img1 from "../assets/image1.avif";
import img2 from "../assets/image2.avif";
import img3 from "../assets/image3.avif";
import img4 from "../assets/image4.avif";
import img5 from "../assets/image5.avif";
import img6 from "../assets/image6.avif";

/* ================= DATA ================= */

const SECTION_1 = {
  heading: "Automated Gifting Operations",
  subheading: "Sending gifts is cool, managing its operations is not!",
  imageList: [img1, img2, img3],
  items: [
    {
      title:
        "We run everything for you so you can focus on generating more revenue.",
      desc:
        "We source, store and deliver gifts globally using our warehouse network.",
    },
    {
      title: "Improve Deliverability by 3x.",
      desc:
        "AI validates addresses and starts conversations if delivery confidence is low.",
    },
    {
      title: "Gifting ROI with CTA Tracking",
      desc:
        "Track acknowledgements and update CRM lead scores for better ROI decisions.",
    },
  ],
};

const SECTION_2 = {
  heading: "Human + AI ✨",
  subheading: "Hyper personalization with human touch",
  imageList: [img4, img5, img6],
  items: [
    {
      title:
        "From hand written notes to creating custom gift packs – you are covered!",
      desc:
        "We manage sourcing, packing and execution end-to-end.",
    },
    {
      title: "Launch Campaigns",
      desc:
        "Launch new products or campaigns with curated gifting experiences.",
    },
    {
      title: "We've got you!",
      desc:
        "Our Gift Operations Team handles everything from digital to physical gifts.",
    },
  ],
};

const AUTO_TIME = 5000;

/* ================= PURPLE GRID BACKGROUND ================= */

const AnimatedPurpleGrid = () => {
  return (
    <motion.div
      className="absolute inset-0 -z-10"
      animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
      transition={{
        duration: 40,
        ease: "linear",
        repeat: Infinity,
      }}
      style={{
        backgroundColor: "#faf7ff",
        backgroundImage: `
          linear-gradient(to right, rgba(124,58,237,0.12) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(124,58,237,0.12) 1px, transparent 1px)
        `,
        backgroundSize: "80px 80px",
      }}
    />
  );
};

/* ================= ACCORDION BLOCK ================= */

const AccordionBlock = ({ data, reverse }) => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((a) => (a + 1) % data.items.length);
    }, AUTO_TIME);

    return () => clearInterval(timer);
  }, [data.items.length]);

  return (
    <div className="grid md:grid-cols-2 gap-16 items-start mb-28">
      {/* TEXT */}
      <div className={reverse ? "md:order-2" : ""}>
        <h2 className="text-5xl font-bold text-gray-900 leading-tight">
          {data.heading}
        </h2>

        <p className="mt-4 text-xl text-gray-600">
          {data.subheading}
        </p>

        <div className="mt-10">
          {data.items.map((item, i) => (
            <div
              key={i}
              onClick={() => setActive(i)}
              className="cursor-pointer border-t border-purple-200 py-6"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900 max-w-[90%]">
                  {item.title}
                </h3>
                <span className="text-3xl text-purple-400">
                  {active === i ? "−" : "+"}
                </span>
              </div>

              <AnimatePresence>
                {active === i && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 text-gray-600 leading-relaxed"
                  >
                    {item.desc}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* IMAGE */}
      <div className={`sticky top-28 ${reverse ? "md:order-1" : ""}`}>
        <AnimatePresence mode="wait">
          <motion.img
            key={data.imageList[active]}
            src={data.imageList[active]}
            className="rounded-2xl shadow-xl w-full max-w-[420px] mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          />
        </AnimatePresence>
      </div>
    </div>
  );
};

/* ================= MAIN ================= */

const FeatureAccordion = () => {
  return (
    <section className="relative overflow-hidden pt-24 pb-16">
      {/* 💜 PURPLE GRID BACKGROUND */}
      <AnimatedPurpleGrid />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* TOP HEADING */}
        <div className="text-center mb-28">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Fill up Your Sales Pipeline & <br />
            Accelerate Closure Predictably
          </h2>
          <p className="mt-4 text-gray-700">
            Our Gifting Platform is packed with features customers love.
          </p>
        </div>

        <AccordionBlock data={SECTION_1} />
        <AccordionBlock data={SECTION_2} reverse />
      </div>
    </section>
  );
};

export default FeatureAccordion;
