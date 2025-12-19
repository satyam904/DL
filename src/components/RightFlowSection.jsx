import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import g1 from "../assets/image1.avif";
import g2 from "../assets/image2.avif";
import g3 from "../assets/image3.avif";

const FEATURES = [
  {
    title: "Automated Gifting Operations",
    subtitle: "Sending gifts is cool, managing its operations is not!",
    description:
      "We run everything for you so you can focus on generating more revenue. We can source, negotiate, procure and store gifts globally.",
    image: g1,
  },
  {
    title: "Improve Deliverability by 3x",
    subtitle: "Global warehouses & smart logistics",
    description:
      "We store your collection in US, Asia & Europe warehouses for faster delivery and better success rates.",
    image: g2,
  },
  {
    title: "Gifting ROI with CTA Tracking",
    subtitle: "Track acknowledgement & impact",
    description:
      "Track CTA acknowledgements, update lead scores and measure ROI directly inside your CRM.",
    image: g3,
  },
];

const FeaturesAccordion = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % FEATURES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden py-32">
      <div className="absolute inset-0 bg-white" />
      <div
        className="absolute inset-0 opacity-[0.25]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)",
          backgroundSize: "90px 90px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mb-20 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Fill up Your Sales Pipeline & <br />
            Accelerate Closure Predictably
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Our Gifting Platform is packed with features, here are the top 5 that
            customers love.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            {FEATURES.map((item, index) => (
              <div
                key={index}
                onClick={() => setActive(index)}
                className="cursor-pointer border-b py-6"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-semibold text-gray-900">
                    {item.title}
                  </h3>
                  <span className="text-xl text-gray-400">
                    {active === index ? "−" : "+"}
                  </span>
                </div>

                <AnimatePresence>
                  {active === index && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="mt-4"
                    >
                      <p className="text-gray-600 mb-3">{item.subtitle}</p>
                      <p className="text-gray-500">{item.description}</p>
                      <div className="mt-4 h-[2px] w-20 bg-purple-600" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <div className="sticky top-32">
            <AnimatePresence mode="wait">
              <motion.img
                key={active}
                src={FEATURES[active].image}
                alt={FEATURES[active].title}
                className="rounded-2xl shadow-xl w-full"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45 }}
              />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesAccordion;
