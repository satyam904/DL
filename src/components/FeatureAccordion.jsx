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
      title: "We run everything for you so you can focus on generating more revenue.",
      desc: "",
    },
    {
      title: "Improve Deliverability by 3x.",
      desc:
        "AI Agent not only does Address verification & Accuracy but will initiate a conversational bot with the customer in case of missing address and low delivery confidence score.",
    },
    {
      title: "Gifting ROI with CTA Tracking",
      desc: "",
    },
  ],
};

const SECTION_2 = {
  heading: "Human + AI ✨",
  subheading: "Hyper personalization with human touch",
  imageList: [img4, img5, img6],
  items: [
    {
      title: "From hand written notes to creating custom gift packs – you are covered!",
      desc: "",
    },
    {
      title: "Launch Campaigns",
      desc:
        "Whether you are launching a new product or a new business, we will find the perfect giveaway.",
    },
    {
      title: "We've got you!",
      desc: "",
    },
  ],
};

const AUTO_TIME = 5000;

/* ================= BLOCK ================= */

const AccordionBlock = ({ data, reverse }) => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((a) => (a + 1) % data.items.length);
    }, AUTO_TIME);

    return () => clearInterval(timer);
  }, [data.items.length]);

  return (
    <div className="grid md:grid-cols-2 gap-16 items-start mb-0">
      {/* TEXT */}
      <div className={reverse ? "md:order-2" : ""}>
        {/* BIG HEADING */}
        <h2 className="text-5xl font-bold text-gray-900 leading-tight">
          {data.heading}
        </h2>

        {/* SUB HEADING */}
        <p className="mt-4 text-xl text-gray-500">
          {data.subheading}
        </p>

        {/* ACCORDION */}
        <div className="mt-10">
          {data.items.map((item, i) => (
            <div
              key={i}
              onClick={() => setActive(i)}
              className="cursor-pointer border-t py-6"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900 max-w-[90%]">
                  {item.title}
                </h3>
                <span className="text-3xl text-gray-400">
                  {active === i ? "−" : "+"}
                </span>
              </div>

              <AnimatePresence>
                {active === i && item.desc && (
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
    <section className="relative overflow-hidden pt-24 pb-10">
      {/* GRID BACKGROUND */}
      <div className="absolute inset-0 bg-white" />
      <div
        className="absolute inset-0 opacity-[0.2]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)",
          backgroundSize: "90px 90px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-2">
        {/* TOP HEADING */}
        <div className="text-center mb-32">
          <h2 className="text-4xl md:text-5xl font-bold">
            Fill up Your Sales Pipeline & <br />
            Accelerate Closure Predictably
          </h2>
          <p className="mt- text-gray-600">
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
