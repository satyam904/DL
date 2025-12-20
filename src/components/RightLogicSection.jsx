import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useState, useRef, useEffect } from "react";

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
      "Our AI ✦ Agent will match the perfect gift, find the right address to deliver & make them feel special, so you can monetize that delight!",
    desc:
      "Leveraging all CRM activities, call records, external information from Linkedin etc. our AI agent will continuously build a pscychographic profile using 14+ signals and suggest the perfect gift within your catalog and budget",
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

const RightLogicAnimated = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const refs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentIndex(Number(entry.target.dataset.index));
          }
        });
      },
      {
        rootMargin: "-50% 0px -50% 0px", // 👈 perfect center
      }
    );

    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-white">
      {/* ---------- HEADING ---------- */}
      <div className="max-w-4xl mx-auto px-6 text-center pt-24 pb-0 -mb-19">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Automated Gifting Portals are so <br className="hidden sm:block" />
          2024..
        </h1>
        <p className="text-xl text-gray-700">
          Replace Spray & Pray with <b>Predictable ROI</b>
        </p>
      </div>

      {/* ---------- SCROLL WRAPPER ---------- */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16">

          {/* ---------- LEFT TEXT ---------- */}
          <div>
            {DATA.map((item, i) => (
              <div
                key={i}
                ref={(el) => (refs.current[i] = el)}
                data-index={i}
                className="min-h-screen flex items-center"
              >
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-6">
                    {item.title}
                  </h2>
                  <p className="text-xl font-semibold mb-4">{item.sub}</p>
                  <p className="text-lg mb-6 max-w-xl">{item.desc}</p>

                  {item.bullets && (
                    <ul className="space-y-3">
                      {item.bullets.map((b, idx) => (
                        <li key={idx} className="flex gap-3 text-lg">
                          <Check className="mt-1 h-5 w-5 text-indigo-600" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* ---------- RIGHT IMAGE ---------- */}
          <div className="hidden md:block">
            <div className="sticky top-28 h-screen flex items-center justify-center">
              {DATA.map((item, idx) => (
                <motion.img
                  key={idx}
                  src={item.image}
                  animate={{
                    opacity: currentIndex === idx ? 1 : 0,
                    scale: currentIndex === idx ? 1 : 0.9,
                  }}
                  transition={{ duration: 0.4 }}
                  className="absolute w-full max-w-md"
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default RightLogicAnimated;
