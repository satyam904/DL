import { motion, useScroll, useTransform, useSpring, useInView, useReducedMotion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

/* =============== DATA =============== */
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

/* =============== ANIM VARIANTS =============== */
const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16, scale: 0.996 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.2, 0.9, 0.3, 1] },
  },
};

/* =============== CounterStat (DOM-updates via rAF to avoid re-renders) =============== */
const CounterStat = ({ finalValue, duration = 1.4, start = false, reduced = false }) => {
  const spanRef = useRef(null);
  const rafRef = useRef(null);
  const startRef = useRef(null);

  // compute final numeric value and formatting flags
  const isRange = /–|-/.test(finalValue);
  const isPct = finalValue.includes("%");
  const isX = /X/i.test(finalValue);
  const numeric = isRange ? null : parseFloat(finalValue.replace(/[^\d.]/g, "")) || 0;

  useEffect(() => {
    const el = spanRef.current;
    if (!el) return;

    // reserve width to prevent layout shift: use ch units based on final text length
    const finalText = finalValue;
    el.style.minWidth = `${Math.max(3, finalText.length)}ch`;
    el.style.display = "inline-block";
    el.style.textAlign = "left";

    if (reduced) {
      el.textContent = finalText;
      return;
    }

    if (!start) {
      if (isRange) el.textContent = finalText;
      else if (isPct) el.textContent = `0%`;
      else if (isX) el.textContent = `0.0X`;
      else el.textContent = `0`;
      return;
    }

    if (isRange) {
      el.textContent = finalText;
      return;
    }

    // animate using rAF and an ease (smooth)
    startRef.current = performance.now();
    const durMs = Math.max(120, duration * 1000);

    const step = (time) => {
      const elapsed = time - startRef.current;
      const t = Math.min(elapsed / durMs, 1);
      const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      const current = numeric * eased;

      if (isPct) el.textContent = `${Math.round(current)}%`;
      else if (isX) el.textContent = `${current.toFixed(1)}X`;
      else el.textContent = `${Math.round(current)}`;

      if (t < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        el.textContent = finalText;
      }
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [start, finalValue, duration, reduced, isRange, isPct, isX, numeric]);

  return (
    <span
      ref={spanRef}
      className="tabular-nums font-semibold"
      aria-hidden="false"
      style={{ lineHeight: 1, verticalAlign: "baseline" }}
    />
  );
};

/* =============== helper hook: detect mobile =============== */
const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const handler = (e) => setIsMobile(e.matches);
    if (mq.addEventListener) mq.addEventListener("change", handler);
    else mq.addListener(handler);
    setIsMobile(mq.matches);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", handler);
      else mq.removeListener(handler);
    };
  }, [breakpoint]);

  return isMobile;
};

/* =============== TeamCard (child component) =============== */
const TeamCard = ({
  card,
  index,
  scrollYProgress,
  isMobile,
  reducedMotion,
  hoveredIndex,
  setHoveredIndex,
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-10% 0px -10% 0px", once: true });

  const [isTouched, setIsTouched] = useState(false);
  const [expanded, setExpanded] = useState(false);

  // smoother springs for y-offset
  const rawYOffset = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -22 * (index % 2 === 0 ? 1 : -1)]
  );
  const ySpring = useSpring(rawYOffset, { stiffness: 100, damping: 18 });

  const yStyle = isMobile ? 0 : ySpring;

  const startFromHover = hoveredIndex === index;
  const [startCounter, setStartCounter] = useState(false);

  useEffect(() => {
    if (inView) {
      const id = setTimeout(() => setStartCounter(true), 220);
      return () => clearTimeout(id);
    }
    return undefined;
  }, [inView]);

  useEffect(() => {
    if (isMobile && expanded) setStartCounter(true);
  }, [expanded, isMobile]);

  useEffect(() => {
    if (!isMobile && startFromHover) {
      setStartCounter(true);
    }
  }, [startFromHover, isMobile]);

  const onTouchStart = () => setIsTouched(true);
  const onTouchEnd = () => setIsTouched(false);

  const shouldBlur = !isMobile && hoveredIndex !== null && hoveredIndex !== index;
  const isActiveHover = !isMobile && hoveredIndex === index;

  // merged style object to avoid duplicate 'style' prop
  const mergedStyle = {
    y: yStyle,
    transition: "filter 260ms ease, opacity 260ms ease",
    boxShadow: isActiveHover ? "0 32px 72px rgba(99,102,241,0.12)" : "0 10px 26px rgba(15,23,42,0.06)",
    transform: isActiveHover ? "translateY(-10px) scale(1.02)" : undefined,
    zIndex: isActiveHover ? 30 : 10,
    filter: shouldBlur ? "blur(6px) saturate(0.9)" : undefined,
    opacity: shouldBlur ? 0.74 : 1,
    pointerEvents: shouldBlur ? "none" : undefined,
  };

  return (
    <motion.div
      ref={ref}
      variants={item}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      style={mergedStyle}
      layout
      onMouseEnter={() => !isMobile && setHoveredIndex(index)}
      onMouseLeave={() => !isMobile && setHoveredIndex(null)}
      whileHover={!isMobile && !reducedMotion ? { y: -8, scale: 1.015 } : {}}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onClick={() => {
        if (isMobile) setExpanded((s) => !s);
      }}
      className="group rounded-2xl border-2 border-[#E9D5FF] bg-white p-6 text-left transition-all relative overflow-hidden"
    >
      {/* hover/touch glow */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: isActiveHover || isTouched ? 1 : 0 }}
        transition={{ duration: 0.28 }}
        className="absolute inset-0 pointer-events-none rounded-2xl"
        style={{
          background: "linear-gradient(135deg, rgba(99,102,241,0.06), rgba(236,72,153,0.04))",
          mixBlendMode: "screen",
        }}
      />

      {/* corner accent */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0.4, scale: 0.95 }}
        animate={{ opacity: isActiveHover || isTouched ? 1 : 0.4, scale: isActiveHover || isTouched ? 1 : 0.95 }}
        transition={{ duration: 0.35 }}
        className="absolute top-4 right-4 w-3 h-3 rounded-full"
        style={{ background: "linear-gradient(180deg,#7c3aed,#ec4899)" }}
      />

      <div className="mb-4 inline-flex p-2 rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 relative z-10">
        <span className="text-2xl" aria-hidden>
          {index === 0 && "📅"}
          {index === 1 && "🎯"}
          {index === 2 && "🤝"}
          {index === 3 && "💎"}
        </span>
      </div>

      <h3 className="mb-3 text-lg font-semibold text-[#111827] relative z-10">
        {card.title}
      </h3>

      <p className="mb-6 text-sm text-[#6B7280] relative z-10">{card.desc}</p>

      <div className="flex items-end gap-4">
        <div className="text-[#5B21B6] text-4xl font-extrabold relative z-10 tabular-nums">
          <CounterStat
            finalValue={card.stat}
            duration={1.4}
            start={startCounter}
            reduced={reducedMotion}
          />
        </div>

        <p className="mt-2 text-sm font-medium text-[#5B21B6] relative z-10">{card.statText}</p>
      </div>

      {/* Mobile: expanded area with smooth reveal */}
      <motion.div
        layout
        initial={false}
        animate={expanded ? { height: "auto", opacity: 1, marginTop: 12 } : { height: 0, opacity: 0, marginTop: 0 }}
        transition={{ duration: 0.36, ease: [0.2, 0.85, 0.2, 1] }}
        className="overflow-hidden md:hidden"
      >
        <div className="mt-4 text-sm text-gray-600">
          <strong>More info:</strong> {card.statText}
        </div>
      </motion.div>
    </motion.div>
  );
};

/* =============== Main Component =============== */
const RightTeamSection = () => {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "start 20%"],
  });

  const isMobile = useIsMobile(768);
  const reduced = useReducedMotion();

  // hovered card index at parent level so we can blur siblings
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section ref={sectionRef} className="relative overflow-hidden px-4 py-28">
      <div className="absolute inset-0 animated-pink-grid" />
      <div className="absolute inset-0 grid-light-flow" />

      <div className="relative z-10 mx-auto max-w-7xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-6 text-4xl md:text-5xl font-extrabold text-[#1F2937]"
        >
          Equip every team to bring back the <br />
          <span className="text-[#6D28D9]">Relationship (“R” in CRM!)</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mx-auto mb-20 max-w-3xl text-lg text-[#4B5563]"
        >
          HyperPersonalized Gifts demonstrate a thoughtful gesture which is
          the fastest way of building real relationships, goodwill & brand recall.
        </motion.p>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className={`grid grid-cols-1 gap-8 ${isMobile ? "md:grid-cols-1" : "md:grid-cols-2 lg:grid-cols-4"}`}
        >
          {cards.map((c, i) => (
            <TeamCard
              key={i}
              card={c}
              index={i}
              scrollYProgress={scrollYProgress}
              isMobile={isMobile}
              reducedMotion={reduced}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default RightTeamSection;