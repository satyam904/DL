import { motion } from "framer-motion";

import slack from "../assets/platform/slack.avif";
import zoom from "../assets/platform/zoom.avif";
import hubspot from "../assets/platform/BHkrVKbuQarTI8Frp27VNWIvP8.png";
import salesforce from "../assets/platform/IJ80IurJqPQfNz8aeBjOFChuio.png";
import shopify from "../assets/platform/PVROWMfOxe7E0D21nTwMY5JhYY.png";
import jira from "../assets/platform/lb4CRbi0PnjfvT8yDGXrv1EqH9I.png";
import stripe from "../assets/platform/LgaG7RxfarBIPxEApx6sGPjGg.png";
import mailchimp from "../assets/platform/OaH0awhGJfcOAvFsAYep2Z6beEE.png";

const logos = [
  slack,
  zoom,
  hubspot,
  salesforce,
  shopify,
  jira,
  stripe,
  mailchimp,
];

const IntegrationSection = () => {
  return (
    <section className="py-2 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

        {/* LEFT TEXT */}
        <div>
          <h2 className="text-2xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Integrate with Existing <br />
            Platforms & Workflow. More <br />
            Revenue, without more <br />
            Consoles!
          </h2>

          <p className="mt-6 text-lg text-gray-600 max-w-xl">
            Connect your favorite go-to-market tools with DelightLoop to trigger
            the Right Gifts to the Right People at the Right Time & track ROI.
          </p>
        </div>

        {/* RIGHT ORBIT */}
        <div className="relative w-[320px] h-[320px] mx-auto">
          
          {/* ROTATING GROUP */}
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 30, 
              ease: "linear",
            }}
          >
            {logos.map((logo, index) => {
              const angle = (360 / logos.length) * index;

              return (
                <div
                  key={index}
                  className="absolute top-1/2 left-1/2"
                  style={{
                    transform: `
                      rotate(${angle}deg)
                      translate(140px)
                      rotate(-${angle}deg)
                    `,
                  }}
                >
                  <div className="w-14 h-14 bg-white rounded-xl shadow-md flex items-center justify-center">
                    <img
                      src={logo}
                      alt="logo"
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                </div>
              );
            })}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default IntegrationSection;
