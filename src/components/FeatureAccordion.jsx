import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import img1 from "../assets/image1.avif";
import img2 from "../assets/image2.avif";
import img3 from "../assets/image3.avif";
import img4 from "../assets/image4.avif";
import img5 from "../assets/image5.avif";
import img6 from "../assets/image6.avif";

const SECTION_1 = [
  {
    title: "Automated Gifting Operations",
    subtitle: "Sending gifts is cool, managing its operations is not!",
    desc: "We run everything for you so you can focus on generating more revenue.",
    image: img1,
  },
  {
    title: "Improve Deliverability by 3x",
    subtitle: "Global warehouses & smart logistics",
    desc: "AI based address validation & accuracy improves success rate.",
    image: img2,
  },
  {
    title: "Gifting ROI with CTA Tracking",
    subtitle: "Track acknowledgement & impact",
    desc: "Track CTA acknowledgements & ROI inside CRM.",
    image: img3,
  },
];

const SECTION_2 = [
  {
    title: "Human + AI ✨",
    subtitle: "Hyper personalization with human touch",
    desc: "From handwritten notes to custom gift packs – we handle everything.",
    image: img4,
  },
  {
    title: "Launch Campaigns",
    subtitle: "Perfect giveaways at perfect time",
    desc: "Launch new products & campaigns with curated gifting.",
    image: img5,
  },
  {
    title: "We've got you!",
    subtitle: "End-to-end execution",
    desc: "From digital gifts to physical kits — GOT team handles all.",
    image: img6,
  },
];

const AUTO_TIME = 5000;

const AccordionBlock = ({ data, reverse }) => {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);
    const step = 100 / (AUTO_TIME / 100);

    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          setActive((a) => (a + 1) % data.length);
          return 0;
        }
        return p + step;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [active, data.length]);

  return (
    <div
      className={`grid md:grid-cols-2 gap-16 items-center mb-40 ${
        reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* TEXT */}
      <div className={reverse ? "md:order-2" : ""}>
        {data.map((item, i) => (
          <div
            key={i}
            onClick={() => setActive(i)}
            className="cursor-pointer border-b py-6"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-semibold">{item.title}</h3>
              <span>{active === i ? "−" : "+"}</span>
            </div>

            <AnimatePresence>
              {active === i && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="mt-4"
                >
                  <p className="text-gray-600">{item.subtitle}</p>
                  <p className="mt-2 text-gray-500">{item.desc}</p>

                  {/* 🔥 TIMER LINE (KEY ADDED) */}
                  <div className="mt-4 h-[3px] bg-gray-200 overflow-hidden rounded">
                    <motion.div
                      key={active}
                      className="h-full bg-purple-600"
                      animate={{ width: `${progress}%` }}
                      transition={{ ease: "linear" }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* IMAGE */}
      <div className={`sticky top-28 ${reverse ? "md:order-1" : ""}`}>
        <AnimatePresence mode="wait">
          <motion.img
            key={data[active].image}
            src={data[active].image}
            className="rounded-2xl shadow-xl w-full max-w-[420px] mx-auto"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
          />
        </AnimatePresence>
      </div>
    </div>
  );
};

const FeatureAccordion = () => {
  return (
    <section className="relative overflow-hidden pt-20 pb-1">
      {/* WHITE GRID BACKGROUND */}
      <div className="absolute inset-0 bg-white" />
      <div
        className="absolute inset-0 opacity-[0.25]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)",
          backgroundSize: "90px 90px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* HEADING */}
        <div className="text-center mb-32">
          <h2 className="text-4xl md:text-5xl font-bold">
            Fill up Your Sales Pipeline & <br />
            Accelerate Closure Predictably
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Our Gifting Platform is packed with features customers love.
          </p>
        </div>

        {/* SECTION 1 */}
        <AccordionBlock data={SECTION_1} />

        {/* SECTION 2 */}
        <AccordionBlock data={SECTION_2} reverse />
      </div>
    </section>
  );
};

export default FeatureAccordion;
