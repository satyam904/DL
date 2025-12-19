import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const tabs = [
  { id: "pipeline", label: "Create More Pipeline" },
  { id: "deals", label: "Close Deals Faster" },
  { id: "referrals", label: "Improve Referrals, Reduce Churn" },
];

const UseCaseSection = () => {
  const [activeTab, setActiveTab] = useState("pipeline");

  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-7xl">
        {/* Tabs */}
        <div className="mb-16 flex justify-center gap-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-full px-6 py-3 text-sm md:text-base font-medium transition-all
                ${
                  activeTab === tab.id
                    ? "bg-purpleing from-purple-600 to-purple-700 text-white shadow-md"
                    : "text-purple-600 hover:bg-purple-50"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === "pipeline" && (
            <motion.div
              key="pipeline"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-center"
            >
              {/* LEFT – IMAGE PLACEHOLDER */}
              <div className="rounded-2xl border bg-white p-6 shadow-lg">
                {/* 🔁 Replace with your image later */}
                <div className="h-[360px] w-full rounded-xl bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center text-purple-600 font-semibold">
                  Pipeline Image
                </div>
              </div>

              {/* RIGHT – TEXT */}
              <div>
                <h2 className="mb-6 text-4xl font-bold leading-tight text-purple-600">
                  Build deeper relationships with Account Stakeholders that matter
                </h2>

                <p className="mb-6 text-lg text-gray-600">
                  Optimize ABM (Account Based Marketing) by sending AI-curated,
                  personalised gifts at key moments to key influencers & decision
                  makers throughout the buying journey.
                </p>

                <ul className="space-y-4 text-lg text-gray-700">
                  <li className="flex items-center gap-3">
                    <span className="text-purple-600">✓</span> Emotional Connect
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-purple-600">✓</span> Brand Recall
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-purple-600">✓</span> IceBreaker
                  </li>
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default UseCaseSection;
