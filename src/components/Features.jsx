import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from "framer-motion";
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

/* -----------------------
   Helpers
   ----------------------- */
const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  );
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const onChange = (e) => setIsMobile(e.matches);
    if (mq.addEventListener) mq.addEventListener("change", onChange);
    else mq.addListener(onChange);
    setIsMobile(mq.matches);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", onChange);
      else mq.removeListener(onChange);
    };
  }, [breakpoint]);
  return isMobile;
};

/* -----------------------
   DOM counter (rAF) - avoids frequent React updates & layout shift
   Usage: <Counter refValue="4X" start={true} />
   ----------------------- */
const Counter = ({ value, start = false, duration = 1200, reduced = false, className = "" }) => {
  const elRef = useRef(null);
  const rafRef = useRef(null);
  useEffect(() => {
    const el = elRef.current;
    if (!el) return;
    if (reduced) {
      el.textContent = value;
      return;
    }

    const isRange = /–|-/.test(value);
    const isPct = value.includes("%");
    const isX = /X/i.test(value);
    const numeric = isRange ? null : parseFloat(value.replace(/[^\d.]/g, "")) || 0;

    // reserve width to prevent layout shift
    el.style.minWidth = `${Math.max(3, value.length)}ch`;
    el.style.display = "inline-block";

    if (!start) {
      // initial placeholder
      if (isRange) el.textContent = value;
      else if (isPct) el.textContent = `0%`;
      else if (isX) el.textContent = `0.0X`;
      else el.textContent = `0`;
      return;
    }

    if (isRange) {
      el.textContent = value;
      return;
    }

    const startTime = performance.now();
    const tick = (t) => {
      const elapsed = t - startTime;
      const tnorm = Math.min(elapsed / duration, 1);
      // smooth cubic ease-in-out
      const eased = tnorm < 0.5 ? 4 * tnorm * tnorm * tnorm : 1 - Math.pow(-2 * tnorm + 2, 3) / 2;
      const current = numeric * eased;
      if (isPct) el.textContent = `${Math.round(current)}%`;
      else if (isX) el.textContent = `${current.toFixed(1)}X`;
      else el.textContent = `${Math.round(current)}`;

      if (tnorm < 1) rafRef.current = requestAnimationFrame(tick);
      else el.textContent = value;
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [start, value, duration, reduced]);

  return <span ref={elRef} className={className} aria-hidden="false" />;
};

/* ================= COMPONENT ================= */

const Features = () => {
  const [active, setActive] = useState(0);
  const sectionRef = useRef(null);
  const imgWrapRef = useRef(null);
  const badgeRef = useRef(null);
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();

  // auto-rotate with progress (rAF)
  const progressRef = useRef(0);
  const [progress, setProgress] = useState(0);
  const autoTimerRef = useRef(null);
  const rafRef = useRef(null);
  useEffect(() => {
    let start = performance.now();
    const tick = (t) => {
      const elapsed = t - start;
      const p = Math.min(elapsed / AUTO_CHANGE_TIME, 1);
      setProgress(p);
      if (p >= 1) {
        setActive((a) => (a + 1) % TABS.length);
        start = performance.now();
        setProgress(0);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    if (!reduced) rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  // allow keyboard left/right navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") setActive((a) => (a + 1) % TABS.length);
      if (e.key === "ArrowLeft") setActive((a) => (a - 1 + TABS.length) % TABS.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // scroll-linked subtle reveal transforms (keeps original behavior)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "start 20%"],
  });
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const textY = useTransform(scrollYProgress, [0, 0.3], [40, 0]);
  const imageOpacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);
  const imageScale = useTransform(scrollYProgress, [0.2, 0.5], [0.92, 1]);

  // image micro-interactions: badge parallax + tilt (desktop only)
  useEffect(() => {
    if (!imgWrapRef.current || isMobile) return;
    const el = imgWrapRef.current;
    const badge = badgeRef.current;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      if (badge) badge.style.transform = `translate3d(${px * 12}px, ${py * 8}px, 0)`;
      el.style.setProperty("--rx", `${-py * 6}deg`);
      el.style.setProperty("--ry", `${px * 6}deg`);
    };
    const onLeave = () => {
      if (badge) badge.style.transform = `translate3d(0px, 0px, 0)`;
      el.style.setProperty("--rx", `0deg`);
      el.style.setProperty("--ry", `0deg`);
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [isMobile, active]);

  const current = TABS[active];

  return (
    <section ref={sectionRef} className="bg-white px-4 py-24">
      <div className="mx-auto max-w-7xl">
        {/* TOP HEADER */}
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
            className="mx-auto mb-8 max-w-3xl text-lg md:text-xl text-gray-600"
          >
            Outstanding Results without spending more
          </motion.p>

          {/* Animated stats (use Counter for smoothness) */}
          <div className="mx-auto flex max-w-xl justify-between text-center gap-6 px-6">
            <div>
              <Counter value="4X" start={true} reduced={reduced} className="text-5xl font-extrabold text-[#6A41C6] leading-none" />
              <p className="mt-2 text-lg font-semibold">Qualified Pipeline</p>
            </div>

            <div>
              <Counter value="2X" start={true} reduced={reduced} className="text-5xl font-extrabold text-[#6A41C6] leading-none" />
              <p className="mt-2 text-lg font-semibold">Deals Closed</p>
            </div>

            <div>
              <Counter value="10%" start={true} reduced={reduced} className="text-5xl font-extrabold text-[#6A41C6] leading-none" />
              <p className="mt-2 text-lg font-semibold">Churn Reduction</p>
            </div>
          </div>
        </div>

        {/* TABS + progress underline */}
        <div className="mb-8">
          <div className="mb-6 flex flex-wrap justify-center gap-4">
            {TABS.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => setActive(index)}
                className={`relative rounded-full px-7 py-3.5 text-base md:text-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-300
                  ${active === index ? "bg-[#6A41C6] text-white shadow-lg" : "text-[#6A41C6] hover:bg-purple-50"}`}
                aria-pressed={active === index}
              >
                {tab.label}
                {/* active underline pill */}
                {active === index && (
                  <motion.span
                    layoutId="tab-underline"
                    className="absolute left-1/2 top-full -translate-x-1/2 mt-3 h-1 rounded-full bg-[#6A41C6]"
                    style={{ width: 140 }}
                    transition={{ type: "spring", stiffness: 300, damping: 28 }}
                    aria-hidden
                  />
                )}
              </button>
            ))}
          </div>

          {/* auto-rotate progress bar */}
          <div className="mx-auto max-w-xl h-1 bg-gray-100 rounded overflow-hidden">
            <motion.div
              className="h-full bg-[#6A41C6] origin-left"
              style={{ scaleX: progress }}
              transition={{ ease: "linear" }}
            />
          </div>
        </div>

        {/* CONTENT */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center"
          >
            {/* TEXT */}
            <motion.div
              className={current.reverse ? "md:order-2 px-2" : "md:order-1 px-2"}
              style={{ opacity: textOpacity, y: textY }}
            >
              <h2 className="mb-4 text-3xl font-extrabold text-[#6A41C6]">{current.title}</h2>
              <h3 className="mb-6 text-2xl font-bold text-gray-900">{current.subtitle}</h3>

              <motion.p
                className="mb-6 text-lg text-gray-600"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 }}
                viewport={{ amount: 0.4 }}
              >
                {current.desc}
              </motion.p>

              <ul className="space-y-3 text-lg text-gray-700">
                {current.bullets.map((b, i) => (
                  <motion.li
                    key={b}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.45, delay: 0.08 + i * 0.06 }}
                    viewport={{ amount: 0.4 }}
                  >
                    <span className="text-purple-600 text-xl">✓</span>
                    {b}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* IMAGE */}
            <motion.div
              ref={imgWrapRef}
              className={`relative rounded-2xl border bg-white p-6 shadow-xl overflow-hidden ${current.reverse ? "md:order-1" : "md:order-2"}`}
              style={{ opacity: imageOpacity, transformOrigin: "center" }}
            >
              {/* top badge */}
              <motion.div
                ref={badgeRef}
                initial={{ y: -8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.06 }}
                className="absolute -top-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
                aria-hidden
              >
                <div className="h-12 w-12 rounded-xl overflow-hidden shadow-md bg-white flex items-center justify-center">
                  <img src={current.image} alt={`${current.label} badge`} className="w-full h-full object-cover" />
                </div>
              </motion.div>

              {/* subtle bg behind image */}
              <div className="absolute inset-0 -z-10 rounded-2xl" style={{ background: "radial-gradient(ellipse at center, rgba(106,65,198,0.06), rgba(99,102,241,0.02))" }} />

              {/* image container w/ clip reveal + tilt via CSS vars */}
              <motion.div
                initial={{ clipPath: "inset(12% 0% 12% 0% round 18px)", rotateX: 0, rotateY: 0 }}
                animate={{ clipPath: "inset(0% 0% 0% 0% round 18px)" }}
                exit={{ clipPath: "inset(12% 0% 12% 0% round 18px)" }}
                transition={{ duration: 0.6, ease: [0.2, 0.9, 0.3, 1] }}
                className="rounded-xl bg-white"
                style={{
                  transform: `rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))`,
                  transformStyle: "preserve-3d",
                  perspective: "900px",
                }}
              >
                <img src={current.image} alt={current.label} className="h-[360px] w-full rounded-xl object-cover" draggable={false} />
                <motion.div
                  className="absolute inset-0 pointer-events-none rounded-xl"
                  style={{ background: "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.06) 40%, rgba(255,255,255,0) 80%)", mixBlendMode: "overlay" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                />
              </motion.div>

              <motion.button
                whileHover={!isMobile && !reduced ? { y: -6, scale: 1.02 } : {}}
                className="absolute bottom-6 right-6 z-30 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold shadow"
                aria-label="Explore image"
              >
                Explore
              </motion.button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Features;