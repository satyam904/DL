import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

// ✅ IMPORT IMAGES (NO SPACES IN FILE NAMES)
import pipelineImg from "../assets/pipeline.avif";
import dealsImg from "../assets/deals-faster.avif";
import churnImg from "../assets/reduce-churn.avif";

const TABS = [
  {
    id: "pipeline",
    label: "Create More Pipeline",
    reverse: false, // TEXT ➜ IMAGE
    title: (
      <>
        Find & Engage Prospects <br />
        with Relevant Gifts
      </>
    ),
    subtitle: "instead of Digital Spam!",
    desc:
      "Leverage Gifty the AI Agent to orchestrate everything from identifying Ideal Customer Profile (ICP), deliver a hyperpersonalized gift that connects with your brand & campaign theme and followup to successfully execute your Call to Action (CTA).Augment your digital campaigns with pysical gifts to get attention & engage faster",
    bullets: ["More Attendees", "More Leads", "Deeper Engagement"],
    image: pipelineImg,
  },
  {
    id: "deals",
    label: "Close Deals Faster",
    reverse: true, // IMAGE ➜ TEXT
    title: (
      <>
        Build deeper relationships <br />
        with Account Stakeholders that matter
      </>
    ),
    subtitle: "instead of Spray & Pray",
    desc:
      "Optimize ABM (Account Based Marketing) by sending AI-curated, personalised gifts at key moments to key influencers & decision makers throughout the buying journey.",
    bullets: ["Emotional Connect", "Brand Recall", "IceBreaker"],
    image: dealsImg,
  },
  {
    id: "referrals",
    label: "Improve Referrals, Reduce Churn",
    reverse: false, // TEXT ➜ IMAGE
    title: (
      <>
        DeRisk Opportunities in <br />
        Pipeline & Proactively Protect Renewals
      </>
    ),
    subtitle: "instead of Last minute Rush",
    desc:
      "Identify opportunities at risk and engage decision makers with thoughtful gifts to build goodwill and accelerate deal closures.",
    bullets: ["Customer Loyalty", "Reduced Renewal Risk", "Stronger Referrals"],
    image: churnImg,
  },
];

const AUTO_CHANGE_TIME = 5000;

const Features = () => {
  const [active, setActive] = useState(0);

  // 🔁 AUTO TAB ROTATION
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % TABS.length);
    }, AUTO_CHANGE_TIME);

    return () => clearInterval(interval);
  }, []);

  const current = TABS[active];

  return (
    <section className="bg-white px-4 py-24">
      <div className="mx-auto max-w-7xl">

        {/* 🔘 TABS */}
        <div className="mb-20 flex flex-wrap justify-center gap-4 text-lg">
          {TABS.map((tab, index) => (
            <button
  key={tab.id}
  onClick={() => setActive(index)}
  className={`rounded-full px-7 py-3.5 text-base md:text-lg font-semibold transition-all duration-300
    ${
      active === index
        ? "bg-[#6A41C6] text-white shadow-lg"
        : "text-[#6A41C6] hover:bg-purple-50"
    }`}
>
  {tab.label}
</button>

          ))}
        </div>

        {/* 🧠 CONTENT */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 gap-14 md:grid-cols-2 md:items-center"
          >

            {/* 📝 TEXT */}
            <div className={current.reverse ? "md:order-2" : "md:order-1"}>
              <h2 className="mb-4 text-3xl font-extrabold leading-tight text-[#6A41C6]">
                {current.title}
              </h2>

              <h3 className="mb-6 text-2xl font-bold text-gray-900">
                {current.subtitle}
              </h3>

              <p className="mb-8 text-lg text-gray-600">
                {current.desc}
              </p>

              <ul className="space-y-4 text-lg text-gray-700">
                {current.bullets.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="text-purple-600 text-xl">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* 🖼️ IMAGE */}
            <div
              className={`rounded-2xl border bg-white p-6 shadow-xl ${
                current.reverse ? "md:order-1" : "md:order-2"
              }`}
            >
              <img
                src={current.image}
                alt={current.label}
                className="h-[360px] w-full rounded-xl object-contain"
              />
            </div>

          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Features;
