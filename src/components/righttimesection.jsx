import { motion } from "framer-motion";

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

const RightTeamSection = () => {
  return (
    <section className="relative overflow-hidden px-4 py-28">

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
          {cards.map((card, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ y: -8, scale: 1.02 }}
              className="rounded-2xl border border-[#E9D5FF] bg-white p-6 text-left shadow-sm hover:shadow-xl"
            >
              <h3 className="mb-3 text-lg font-semibold text-[#111827]">
                {card.title}
              </h3>

              <p className="mb-6 text-sm text-[#6B7280]">
                {card.desc}
              </p>

              <div className="text-[#5B21B6] text-4xl font-extrabold">
                {card.stat}
              </div>

              <p className="mt-2 text-sm font-medium text-[#5B21B6]">
                {card.statText}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default RightTeamSection;
