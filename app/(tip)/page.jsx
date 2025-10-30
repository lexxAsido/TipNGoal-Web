"use client";
import Image from "next/image";
import React from "react";
import { BiFootball } from "react-icons/bi";
import Link from "next/link";
import { motion } from "framer-motion";

const Page = () => {
  return (
    <main className="min-h-screen flex flex-col justify-center relative overflow-hidden">
      
      {/* 🔥 Green gradient glow — positioned to the right side only */}
      <div className="absolute top-0 right-0 w-2/3 h-full bg-[radial-gradient(ellipse_at_center_right,rgba(0,255,0,0.25)_0%,transparent_80%)] pointer-events-none" />

      <div className="flex flex-col lg:flex-row justify-center items-center gap-10 md:gap-20 mx-5 mt-10 lg:mt-0 relative z-10">

        {/* Left Content */}
        <div className="pb-6 max-w-xl">
          {/* Logo + Heading */}
          <div className="text-white font-bold text-justify text-xl mb-5 p-5 font-sans max-md:text-sm flex-wrap text-balance">
            <p className="flex items-center">
              <span className="text-5xl font-extrabold max-md:text-2xl">
                TIP<span className="text-green-500">N</span>G
              </span>
              <span className="flex items-center text-5xl max-md:text-2xl">
                <BiFootball className="text-white animate-spin mx-1" />
                AL
              </span>
            </p>

            {/* Gradient text */}
            <p className="text-5xl font-extrabold max-md:text-2xl bg-[linear-gradient(90deg,#1a1a1a_0%,#d9d9d9_50%,#1a1a1a_100%)] bg-clip-text text-transparent">
              Predictions.
            </p>
            <p className="text-5xl font-extrabold max-md:text-2xl bg-[linear-gradient(90deg,#1a1a1a_0%,#d9d9d9_50%,#1a1a1a_100%)] bg-clip-text text-transparent">
              Bigger Wins
            </p>
          </div>

          {/* Supporting Text */}
          <p className="text-gray-300 text-base md:text-lg leading-relaxed px-5">
            Discover sure daily bet tips and reliable odds with{" "}
            <span className="text-white font-semibold">TIP<span className="text-green-500">N</span>GOAL</span>. Your go-to app for smarter betting decisions.
          </p>

          {/* User images */}
          <div className="flex items-center gap-3 px-5 mt-6">
            <div className="flex -space-x-2">
              {["/img6.jpg", "/img5.jpg", "/img4.jpg", "/img7.jpg", "/img3.jpg"].map((src, i) => (
                <div
                  key={i}
                  className="w-12 h-12 rounded-full overflow-hidden border-2 border-green-400"
                >
                  <Image
                    src={src}
                    alt={`User ${i + 1}`}
                    width={48}
                    height={48}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
            <p className="text-gray-400 text-sm">
              Trusted by <span className="text-green-400 font-semibold">200+</span> daily users
            </p>
          </div>

          {/* Download section */}
          <div className="mt-8 text-center md:text-left">
            <p className="text-gray-400 mb-2">Download now on</p>
            <div className="flex justify-center md:justify-start gap-5 items-center">
              <Link href="#">
                <Image
                  src="/apple.png"
                  alt="App Store"
                  width={160}
                  height={60}
                  className="rounded-md hover:scale-110 transition-transform object-contain mt-2"
                />
              </Link>
              <Link href="#">
                <Image
                  src="/google.png"
                  alt="Google Play"
                  width={180}
                  height={80}
                  className="rounded-md hover:scale-110 transition-transform object-contain"
                />
              </Link>
            </div>
          </div>
        </div>

        {/* Right side Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src="/tipimage.png"
            alt="TipNGoal App Preview"
            width={350}
            height={700}
            className="w-auto h-auto"
          />
        </motion.div>
      </div>
    </main>
  );
};

export default Page;
