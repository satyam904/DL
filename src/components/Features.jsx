import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";

// ✅ IMAGES
import pipelineImg from "../assets/pipeline.avif";
import dealsImg from "../assets/deals-faster.avif";
import churnImg from "../assets/reduce-churn.avif";

/* ================= DATA ================= */

const TABS = [
  {
    id: "pipeline",
    label: "Create More Pipeline",
    reverse: false,
    title: (
      <>
        Find & Engage Prospects <br />
        with Relevant Gifts
      </>
    ),
    subtitle: "instead of Digital Spam!",
    desc:
      "Leverage Gifty the AI Agent to orchestrate everything from identifying Ideal Customer Profile (ICP), delivering hyper-personalized gifts aligned with your brand and campaign theme, and following up to execute your CTA. Augment digital campaigns with physical gifts to get attention & engage faster.",
    bullets: ["More Attendees", "More Leads", "Deeper Engagement"],
    image: pipelineImg,
  },
  {
    id: "deals",
    label: "Close Deals Faster",
    reverse: true,
    title: (
      <>
        Build deeper relationships <br />
        with Account Stakeholders that matter
      </>
    ),
    subtitle: "instead of Spray & Pray",
    desc:
      "Optimize ABM by sending AI-curated, personalized gifts at key moments to key influencers & decision makers throughout the buying journey.",
    bullets: ["Emotional Connect", "Brand Recall", "Ice Breaker"],
    image: dealsImg,
  },
  {
    id: "referrals",
    label: "Improve Referrals, Reduce Churn",
    reverse: false,
    title: (
      <>
        De-Risk Opportunities in <br />
        Pipeline & Protect Renewals
      </>
    ),
    subtitle: "instead of Last-minute Rush",
    desc:
      "Identify at-risk opportunities and engage decision makers with thoughtful gifting to build goodwill and proactively protect renewals.",
    bullets: ["Customer Loyalty", "Lower Renewal Risk", "Stronger Referrals"],
    image: churnImg,
  },
];

const AUTO_CHANGE_TIME = 5000;

/* ================= COMPONENT ================= */

const Features = () => {
  const [active, setActive] = useState(0);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "start 20%"],
  });

  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const textY = useTransform(scrollYProgress, [0, 0.3], [40, 0]);
  const imageOpacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);
  const imageScale = useTransform(scrollYProgress, [0.2, 0.5], [0.92, 1]);

  // 🔁 AUTO TAB ROTATION
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % TABS.length);
    }, AUTO_CHANGE_TIME);

    return () => clearInterval(interval);
  }, []);

  const current = TABS[active];

  return (
    <section ref={sectionRef} className="bg-white px-4 py-24">
      <div className="mx-auto max-w-7xl">

        {/* ================= TOP HEADER ================= */}
        <div className="mb-24 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-6 text-4xl md:text-5xl font-extrabold text-gray-900"
          >
            Guarantee your GTM Success
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto mb-16 max-w-3xl text-lg md:text-xl text-gray-600"
          >
            Outstanding Results without spending more
          </motion.p>

          <div className="mx-auto flex max-w-xl justify-between text-center">
  <div>
    <p className="text-5xl font-extrabold text-[#6A41C6] leading-none">4X</p>
    <p className="mt-2 text-lg font-semibold">Qualified Pipeline</p>
  </div>

  <div>
    <p className="text-5xl font-extrabold text-[#6A41C6] leading-none">2X</p>
    <p className="mt-2 text-lg font-semibold">Deals Closed</p>
  </div>

  <div>
    <p className="text-5xl font-extrabold text-[#6A41C6] leading-none">10%</p>
    <p className="mt-2 text-lg font-semibold">Churn Reduction</p>
  </div>
</div>

        </div>

        {/* ================= TABS ================= */}
        <div className="mb-20 flex flex-wrap justify-center gap-4">
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

        {/* ================= CONTENT ================= */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center"
          >

            {/* TEXT */}
            <motion.div
              className={current.reverse ? "md:order-2" : "md:order-1"}
              style={{ opacity: textOpacity, y: textY }}
            >
              <h2 className="mb-4 text-3xl font-extrabold text-[#6A41C6]">
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
            </motion.div>

            {/* IMAGE */}
            <motion.div
              className={`rounded-2xl border bg-white p-6 shadow-xl ${
                current.reverse ? "md:order-1" : "md:order-2"
              }`}
              style={{ opacity: imageOpacity, scale: imageScale }}
            >
              <img
                src={current.image}
                alt={current.label}
                className="h-[360px] w-full object-contain rounded-xl"
              />
            </motion.div>

          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Features;
