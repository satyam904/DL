import { motion } from "framer-motion";

const AnimatedCTA = () => {
  return (
    <section className="relative overflow-hidden py-40 bg-[#5B2EFF]">
      
      {/* GRID BACKGROUND */}
      <div className="absolute inset-0">
        {/* WALL GRID */}
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
          animate={{ backgroundPosition: ["0px 0px", "0px 80px"] }}
          transition={{
            repeat: Infinity,
            duration: 12,
            ease: "linear",
          }}
        />

        {/* FLOOR GRID (PERSPECTIVE) */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[55%] origin-bottom"
          style={{
            transform: "perspective(800px) rotateX(65deg)",
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
          animate={{ backgroundPosition: ["0px 0px", "0px 80px"] }}
          transition={{
            repeat: Infinity,
            duration: 10,
            ease: "linear",
          }}
        />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-white text-4xl md:text-6xl font-extrabold leading-tight"
        >
          Revolutionize your Gifting with <br /> Delightloop
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-lg text-white/80"
        >
          Book a call with our team to see how Delightloop can help
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35 }}
          className="mt-10"
        >
          <button className="inline-flex items-center gap-3 rounded-full bg-white px-10 py-4 text-lg font-semibold text-gray-900 shadow-xl hover:scale-105 transition">
            Book a Demo
            <span className="text-xl">›</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default AnimatedCTA;
