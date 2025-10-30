"use client";
import React from "react";
import { BsFillSafe2Fill } from "react-icons/bs";
import { IoMdFlash } from "react-icons/io";
import { TbBallFootball, TbScoreboard } from "react-icons/tb";
import Image from "next/image";
import { motion } from "framer-motion";

const Offers = () => {
  return (
    <section className="relative overflow-hidden text-white py-20 bg-black">
      {/* 🟢 Why Choose TipNGoal Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16 relative z-10 px-5"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
          Why Choose{" "}
          <span className="text-white font-semibold">
            TIP<span className="text-green-500">N</span>GOAL?
          </span>
        </h2>

        <div className="flex flex-wrap justify-center gap-8 sm:gap-12 md:gap-16 mt-10">
          <Feature icon={<TbBallFootball />} title="Safe Predictions" />
          <Feature icon={<BsFillSafe2Fill />} title="Sure Odds" />
          <Feature icon={<IoMdFlash />} title="Daily Tips" />
          <Feature icon={<TbScoreboard />} title="Livescores" />
        </div>
      </motion.div>

      {/* 📱 App Reviews Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col-reverse lg:flex-row items-center justify-center gap-12 lg:gap-20 mt-10 relative z-10 px-6"
      >
        {/* Phone Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center w-full"
        >
          <Image
            src="/offers.png"
            alt="App screen"
            width={420}
            height={300}
            className="rounded-3xl w-[80%] sm:w-[65%] md:w-[50%] lg:w-[420px] shadow-[0_0_40px_rgba(0,255,0,0.15)]"
          />
        </motion.div>

        {/* Text Section */}
        <div className="text-center lg:text-left max-w-lg px-2">
          <h3 className="text-3xl sm:text-4xl font-extrabold mb-3 text-[#E5E5E5]">
            Over 200+ Daily Users
          </h3>
          <p className="text-gray-300 mb-6 leading-relaxed text-sm sm:text-base">
            Discover our daily bet tips and reliable odds with TIP N GOAL. Your
            go-to app for smarter betting decisions.
          </p>

          <div className="flex items-center justify-center lg:justify-start gap-3 bg-[#0c0c0c] rounded-full px-5 py-2 border border-green-500/40 w-fit mx-auto lg:mx-0">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
            <p className="text-xs sm:text-sm text-gray-200 whitespace-nowrap">
              89% Accurate Bet Predictions
            </p>
          </div>
        </div>
      </motion.div>

      {/* 🌟 Animated Glowing Horizontal Divider */}
      <div className="relative mt-24 sm:mt-28 mb-40 overflow-visible">
        <motion.div
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-green-400 to-transparent shadow-[0_0_30px_rgba(0,255,0,0.6)] z-20"
        />
        <motion.div
          animate={{ opacity: [0.4, 0.9, 0.4], scaleX: [1, 1.1, 1] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-full h-[200px] bg-[radial-gradient(ellipse_at_center,rgba(0,255,0,0.3)_0%,transparent_85%)] blur-[100px] pointer-events-none z-10"
        />
        <motion.div
          animate={{ opacity: [0.4, 0.9, 0.4], scaleX: [1, 1.1, 1] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[40px] left-1/2 -translate-x-1/2 w-[130%] h-[200px] bg-[radial-gradient(ellipse_at_center,rgba(0,255,0,0.3)_0%,transparent_85%)] blur-[100px] pointer-events-none z-10"
        />
      </div>

      {/* 🗣 Testimonials Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center relative z-10 px-5"
      >
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-10">
          What Users Had to Say
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <Testimonial
            img="/img7.jpg"
            name="Richard O."
            text="TIPNGOAL has changed the way I bet on football. I now enjoy healthy winning daily predictions!"
          />
          <Testimonial
            img="/img5.jpg"
            name="Buta M."
            text="This app is fun to use for live scores. The daily tips are 80% accurate too!"
          />
          <Testimonial
            img="/img4.jpg"
            name="Micheal J."
            text="The app is easy to use, and the predictions are always top-notch!"
          />
          <Testimonial
            img="/img6.jpg"
            name="Mr Okafor A."
            text="I love the design, simplicity, and accuracy of TIPNGOAL’s daily predictions."
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Offers;

// ✅ Feature Item
const Feature = ({ icon, title }) => (
  <div className="flex flex-col items-center text-center w-[120px] sm:w-[150px]">
    <div className="text-4xl sm:text-5xl mb-2 text-[#E5E5E5]">{icon}</div>
    <p className="text-gray-300 text-sm sm:text-base font-semibold">
      {title}
    </p>
  </div>
);

// ✅ Testimonial Card
const Testimonial = ({ img, name, text }) => (
  <div className="border border-green-500/20 rounded-2xl p-5 sm:p-6 shadow-[0_0_15px_rgba(0,255,0,0.05)] hover:shadow-[0_0_25px_rgba(0,255,0,0.15)] transition-all max-w-sm mx-auto bg-[#0a0a0a]/30">
    <div className="flex items-center mb-4 gap-3">
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-green-400 overflow-hidden flex-shrink-0">
        <Image
          src={img}
          alt={name}
          width={48}
          height={48}
          className="w-full h-full object-cover"
        />
      </div>
      <p className="font-semibold text-green-400 text-sm sm:text-base">
        {name}
      </p>
    </div>
    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{text}</p>
  </div>
);
