import { motion } from "framer-motion";
import { Check } from "lucide-react";

import img1 from "../assets/1.png";
import img2 from "../assets/2.png";
import img3 from "../assets/3.png";

const DATA = [
  {
    title: "Right Time",
    sub:
      "Sending the right nudge at the right time can unlock and unblock revenue opportunities so Timing is Everything!",
    desc:
      "Integrate with your favorite AI-SDR, current campaign workflows or leverage DelightSense to automate gifting. Popular triggers are –",
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
      "Our AI ✦ Agent will match the perfect gift, find the right address to deliver & make them feel special, so you can monetize that delight!",
    desc:
      "Leveraging all CRM activities, call records, external information from Linkedin etc. our AI agent will continuously build a psychographic profile using 14+ signals and suggest the perfect gift within your catalog and budget",
    image: img2,
  },
  {
    title: "Right Person",
    sub:
      "DelightDiscover AI✦ Agent will find the ideal customer personas in desired target accounts who have high intent to buy. No Guesswork or wasted resources",
    desc:
      "While every lead, prospect & customer could use a special nudge with a physical gift, the AI agent will prioritize the ones who will yield the highest Gift ROI.",
    image: img3,
  },
];

const textAnim = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const imageAnim = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const RightLogicAnimated = () => {
  return (
    <section className="bg-white py-28">
      
      {/* 🔥 TOP HEADING */}
      <div className="max-w-4xl mx-auto px-6 text-center mb-28">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
        >
          Automated Gifting Portals are so <br className="hidden sm:block" />
          2024..
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-xl text-gray-700 leading-relaxed"
        >
          Replace Spray & Pray models of generic interactions with a cost
          effective way to close deals with <b>Predictable ROI</b>
        </motion.p>
      </div>

      {/* 🔥 EXISTING CONTENT */}
      <div className="space-y-32">
        {DATA.map((item, index) => (
          <motion.div
            key={index}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-start"
          >
            {/* TEXT */}
            <motion.div variants={textAnim}>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                {item.title}
              </h2>

              <p className="text-xl font-semibold text-gray-800 mb-4">
                {item.sub}
              </p>

              <p className="text-lg text-gray-700 mb-6 max-w-xl">
                {item.desc}
              </p>

              {/* BULLETS (ONLY FOR FIRST) */}
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
            </motion.div>

            {/* IMAGE */}
            <motion.div variants={imageAnim} className="flex justify-center">
              <img
                src={item.image}
                alt={item.title}
                className="w-full max-w-md drop-shadow-xl"
              />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default RightLogicAnimated;
