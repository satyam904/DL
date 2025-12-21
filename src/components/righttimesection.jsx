import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const cards = [
  {
    title: "Events Manager",
    desc:
      "Boost Event & Webinar Registrations, Gamify Participation & Post Event CTA Rates",
    stat: "100%",
    statText:
      "ROI for online & offline events. 200 Hours saved on average",
  },
  {
    title: "Demand Gen Manager",
    desc: "Faster Activations in ABM & Field Marketing Campaigns",
    stat: "4X",
    statText:
      "Growth of high qualified leads in the funnel through Automations",
  },
  {
    title: "Sales Account Executive",
    desc:
      "Increase in booked meetings, deal velocity & close rates",
    stat: "20%",
    statText:
      "Increase in Conversion Rates and 4x Returned Calls & CTAs",
  },
  {
    title: "Customer Success Manager",
    desc:
      "Increase in Customer Satisfaction & Referrals. Reduced Churn through Proactive Relationship Repairing",
    stat: "2–5%",
    statText: "Churn Avoidance",
  },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// Counter component
const CounterStat = ({ finalValue, duration = 2 }) => {
  const [count, setCount] = useState(0);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    let numValue = parseFloat(finalValue);
    const isPercentage = finalValue.includes("%");
    const isMultiplier = finalValue.includes("X");
    
    if (isPercentage) numValue = parseFloat(finalValue);
    if (isMultiplier) numValue = parseFloat(finalValue);

    const increment = numValue / (duration * 60);
    let current = 0;

    const interval = setInterval(() => {
      current += increment;
      if (current >= numValue) {
        setCount(numValue);
        clearInterval(interval);
      } else {
        setCount(current);
      }
    }, 1000 / 60);

    return () => clearInterval(interval);
  }, [finalValue, duration]);

  if (finalValue.includes("%")) {
    return `${Math.round(count)}%`;
  }
  if (finalValue.includes("X")) {
    return `${count.toFixed(1)}X`;
  }
  if (finalValue.includes("–")) {
    return finalValue; // Keep ranges as-is
  }
  return Math.round(count);
};

const RightTeamSection = () => {
  const sectionRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "start 20%"],
  });
    
  return (
    <section ref={sectionRef} className="relative overflow-hidden px-4 py-28">

      <div className="absolute inset-0 animated-pink-grid" />
      <div className="absolute inset-0 grid-light-flow" />

      <div className="relative z-10 mx-auto max-w-7xl text-center">

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-6 text-4xl md:text-5xl font-extrabold text-[#1F2937]"
        >
          Equip every team to bring back the <br />
          <span className="text-[#6D28D9]">
            Relationship (“R” in CRM!)
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto mb-20 max-w-3xl text-lg text-[#4B5563]"
        >
          HyperPersonalized Gifts demonstrate a thoughtful gesture which is
          the fastest way of building real relationships, goodwill & brand recall.
        </motion.p>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
        >
          {cards.map((card, index) => {
            const yOffset = useTransform(
              scrollYProgress,
              [0, 1],
              [0, -30 * (index % 2 === 0 ? 1 : -1)]
            );
            const [isTouched, setIsTouched] = useState(false);

            return (
              <motion.div
                key={index}
                variants={item}
                style={{ y: yOffset }}
                whileHover={{ 
                  y: -12, 
                  scale: 1.03,
                  boxShadow: "0 20px 40px rgba(109, 40, 217, 0.3)"
                }}
                onTouchStart={() => setIsTouched(true)}
                onTouchEnd={() => setIsTouched(false)}
                className={`group rounded-2xl border-2 border-[#E9D5FF] bg-white p-6 text-left shadow-sm transition-all relative overflow-hidden ${
                  isTouched ? "shadow-2xl" : "hover:shadow-2xl"
                }`}
              >
                {/* Glow effect on hover / touch */}
                <div className={`absolute inset-0 transition-opacity duration-300 bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-transparent ${
                  isTouched ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                }`} />
                
                {/* Icon indicator */}
                <div className="mb-4 inline-flex p-2 rounded-lg bg-gradient-to-br from-purple-100 to-pink-100">
                  <span className="text-2xl">
                    {index === 0 && "📅"}
                    {index === 1 && "🎯"}
                    {index === 2 && "🤝"}
                    {index === 3 && "💎"}
                  </span>
                </div>

                <h3 className="mb-3 text-lg font-semibold text-[#111827] relative z-10">
                  {card.title}
                </h3>

                <p className="mb-6 text-sm text-[#6B7280] relative z-10">
                  {card.desc}
                </p>

                <div className="text-[#5B21B6] text-4xl font-extrabold relative z-10">
                  {card.stat}
                </div>

                <p className="mt-2 text-sm font-medium text-[#5B21B6] relative z-10">
                  {card.statText}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default RightTeamSection;
