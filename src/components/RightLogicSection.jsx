import { motion, useScroll, useTransform } from "framer-motion";
import { Check } from "lucide-react";
import { useRef } from "react";

import img1 from "../assets/1.png";
import img2 from "../assets/2.png";
import img3 from "../assets/3.png";

const DATA = [
  {
    title: "Right Time",
    sub:
      "Sending the right nudge at the right time can unlock and unblock revenue opportunities so Timing is Everything!",
    desc:
      "Integrate with your favorite AI-SDR, current campaign workflows or leverage DelightSense to automate gifting.",
    bullets: [
      "Job Changes in Key Accounts",
      "Champion Identification",
      "Rotting Leads (Lack of Activity)",
      "TakeOut Campaigns",
      "Pre/Post Event Activations",
    ],
    image: img1,
  },
  {
    title: "Right Gift",
    sub:
      "Our AI ✦ Agent will match the perfect gift, find the right address to deliver & make them feel special.",
    desc:
      "Leveraging CRM activities, call records, Linkedin etc.",
    image: img2,
  },
  {
    title: "Right Person",
    sub:
      "DelightDiscover AI✦ Agent will find the ideal customer personas.",
    desc:
      "The AI agent prioritizes highest Gift ROI personas.",
    image: img3,
  },
];

const RightLogicAnimated = () => {
  const scrollRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end start"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${(DATA.length - 1) * 100}%`]
  );

  return (
    <section className="bg-white">
      {/* ===== HEADING ===== */}
      <div className="max-w-5xl mx-auto text-center py-12 px-6">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Automated Gifting Portals are so <br className="hidden sm:block" />
          2024..
        </h1>
        <p className="text-xl text-gray-700">
          Replace Spray & Pray models with a cost effective way to close deals
          with <b> Predictable ROI</b>
        </p>
      </div>

      {/* ================= DESKTOP (ANIMATED) ================= */}
      <div
        ref={scrollRef}
        className="relative hidden md:block"
        style={{ height: `${(DATA.length - 1) * 100}vh` }}
      >
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <motion.div style={{ x }} className="flex w-[300vw]">
            {DATA.map((item, index) => (
              <div
                key={index}
                className="w-screen flex items-center justify-center px-20"
              >
                <Content item={item} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ================= MOBILE (STATIC) ================= */}
      <div className="md:hidden px-6 space-y-24">
        {DATA.map((item, index) => (
          <Content key={index} item={item} />
        ))}
      </div>
    </section>
  );
};

/* ===== REUSABLE CONTENT ===== */
const Content = ({ item }) => (
  <div className="grid md:grid-cols-2 gap-12 max-w-7xl mx-auto items-center">
    {/* TEXT */}
    <div>
      <h2 className="text-4xl md:text-5xl font-bold mb-6">
        {item.title}
      </h2>

      <p className="text-xl font-semibold text-gray-800 mb-4">
        {item.sub}
      </p>

      <p className="text-lg text-gray-700 mb-6 max-w-xl">
        {item.desc}
      </p>

      {item.bullets && (
        <ul className="space-y-3">
          {item.bullets.map((b, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-lg text-gray-700"
            >
              <Check className="mt-1 h-5 w-5 text-indigo-600" />
              {b}
            </li>
          ))}
        </ul>
      )}
    </div>

    {/* IMAGE */}
    <div className="flex justify-center">
      <img
        src={item.image}
        alt={item.title}
        className="w-full max-w-md drop-shadow-xl"
      />
    </div>
  </div>
);

export default RightLogicAnimated;
