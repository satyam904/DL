import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
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
      "DelightDiscover AI✦ Agent will find the ideal customer personas in desired target accounts who have high intent to buy. No GuessWork or wasted resources",
    desc:
      "While every lead, prospect & customer could use a special nudge with a physical gift, the AI agent will prioritize the ones who will yield the highest Gift ROI.",
    image: img3,
  },
];

const listVariant = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.06 } },
};

const liVariant = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.32 } },
};

export default function RightLogicAnimatedResponsive() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const refs = useRef([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentIndex(Number(entry.target.dataset.index));
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );

    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateY = useTransform(mouseX, [-0.5, 0.5], [12, -12]);
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [-8, 8]);

  const smoothRotateY = useSpring(rotateY, { stiffness: 200, damping: 25 });
  const smoothRotateX = useSpring(rotateX, { stiffness: 200, damping: 25 });

  function handleMouseMove(e, container) {
    const rect = container.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <section ref={sectionRef} className="bg-white relative">
      {/* Heading */}
      <div className="max-w-4xl mx-auto px-6 text-center pt-24 pb-6 -mb-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Automated Gifting Portals are so <br className="hidden sm:block" />
          <motion.span
            className="inline-block origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.55 }}
          >
            2024..
          </motion.span>
        </h1>
        <p className="text-xl text-gray-700">
          Replace Spray & Pray with <b>Predictable ROI</b>
        </p>
      </div>

      <div className="relative">
        <div
          className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16"
          onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
          onMouseLeave={handleMouseLeave}
        >
          {/* LEFT TEXT */}
          <div>
            {DATA.map((item, i) => (
              <div
                key={i}
                ref={(el) => (refs.current[i] = el)}
                data-index={i}
                className="min-h-screen flex items-start md:items-center pt-6 md:pt-0"
              >
                <div className="w-full">
                  {/* TEXT */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={
                      currentIndex === i
                        ? { opacity: 1, x: 0 }
                        : { opacity: 0, x: -20 }
                    }
                    transition={{ duration: 0.45 }}
                  >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                      {item.title}
                    </h2>
                    <p className="text-lg font-semibold mb-3">{item.sub}</p>
                    <p className="text-base mb-4 max-w-xl">{item.desc}</p>

                    {item.bullets && (
                      <motion.ul
                        className="space-y-3"
                        variants={listVariant}
                        initial="hidden"
                        animate={currentIndex === i ? "visible" : "hidden"}
                      >
                        {item.bullets.map((b, idx) => (
                          <motion.li
                            key={idx}
                            variants={liVariant}
                            className="flex gap-3 text-base items-start"
                          >
                            <Check className="mt-1 h-5 w-5 text-indigo-600" />
                            <span>{b}</span>
                          </motion.li>
                        ))}
                      </motion.ul>
                    )}
                  </motion.div>

                  {/* MOBILE IMAGE — NOW BELOW TEXT */}
                  <motion.img
                    src={item.image}
                    alt={item.title}
                    className="w-full max-w-sm mx-auto mt-8 rounded-lg shadow-lg block md:hidden"
                    initial={{
                      opacity: 0,
                      scale: 0.96,
                      clipPath: "inset(18% 0% 18% 0%)",
                    }}
                    animate={
                      currentIndex === i
                        ? {
                            opacity: 1,
                            scale: 1,
                            clipPath: "inset(0% 0% 0% 0%)",
                          }
                        : {
                            opacity: 0,
                            scale: 0.96,
                            clipPath: "inset(18% 0% 18% 0%)",
                          }
                    }
                    transition={{ duration: 0.45 }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT DESKTOP IMAGE */}
          <div className="hidden md:block">
            <div className="sticky top-28 h-screen flex items-center justify-center pointer-events-none">
              {DATA.map((item, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <motion.img
                    key={idx}
                    src={item.image}
                    alt={item.title}
                    animate={
                      isActive
                        ? { opacity: 1, scale: 1, y: 0 }
                        : { opacity: 0, scale: 0.9, y: 12 }
                    }
                    style={
                      isActive
                        ? {
                            rotateY: smoothRotateY,
                            rotateX: smoothRotateX,
                            transformPerspective: 900,
                          }
                        : {}
                    }
                    className="absolute w-full max-w-md shadow-2xl rounded-lg"
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
