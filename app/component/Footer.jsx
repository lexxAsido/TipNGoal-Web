"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaInstagram, FaSquareXTwitter, FaWhatsapp } from "react-icons/fa6";
import { CgMail } from "react-icons/cg";

const Footer = () => {
  return (
    <motion.footer
      className="bg-[#0b0b0b] text-gray-300 font-sans border-t border-green-500/10"
      initial={{ opacity: 0, scaleY: 0 }}
      animate={{ opacity: 1, scaleY: 1 }}
      transition={{
        type: "spring",
        stiffness: 125,
        delay: 0.2,
        duration: 1.0,
      }}
    >
      {/* Top Footer Section */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand Info */}
        <div>
          
          <span className="text-white font-semibold">TIP<span className="text-green-500">N</span>GOAL</span>
          <p className="text-sm leading-relaxed text-gray-400">
            Your ultimate football prediction companion. Delivering accurate
            insights, stats, and expert picks to help you make smarter betting
            decisions every matchday.
          </p>

          <span className="flex flex-row items-center gap-1">
            <CgMail color="green"/>
          <p className=" text-gray-400 ">
            {/* <span className="inline-block mr-2 text-green-400">📧</span> */}
            tipngoal@gmail.com
          </p>
          </span>
        </div>

        {/* Links */}
        <div className="flex flex-col space-y-2 md:items-center">
          <Link
            href="/about"
            className="hover:text-green-400 transition-colors"
          >
            About us
          </Link>
          <Link
            href="/contact"
            className="hover:text-green-400 transition-colors"
          >
            Contact us
          </Link>
          <Link
            href="/terms"
            className="hover:text-green-400 transition-colors"
          >
            Term of use
          </Link>
          <Link
            href="/privacy"
            className="hover:text-green-400 transition-colors"
          >
            Privacy Policy
          </Link>
          {/* <Link
            href="/blog"
            className="hover:text-green-400 transition-colors"
          >
            Blog
          </Link> */}
        </div>

        {/* Socials + App */}
        <div className="md:text-right">
          <h4 className="text-green-400 font-semibold mb-3">
            Follow us on socials
          </h4>
          <div className="flex md:justify-end gap-4 mb-5">
            <Link href="https://x.com" target="_blank">
              <FaSquareXTwitter className="text-2xl hover:text-green-400 transition-colors" />
            </Link>
            <Link href="https://instagram.com" target="_blank">
              <FaInstagram className="text-2xl hover:text-green-400 transition-colors" />
            </Link>
            <Link href="https://whatsapp.com" target="_blank">
              <FaWhatsapp className="text-2xl hover:text-green-400 transition-colors" />
            </Link>
          </div>

          <h4 className="text-green-400 font-semibold mb-3">Get the App</h4>
          <div className="flex md:justify-end gap-2 items-center">
            <Image
              src="/apple.png"
              alt="App Store"
              width={120}
              height={40}
              className="hover:opacity-90 transition-opacity mt-2"
            />
            <Image
              src="/google.png"
              alt="Google Play"
              width={120}
              height={40}
              className="hover:opacity-90 transition-opacity"
            />
          </div>
        </div>
      </div>

      {/* Glowing Divider Line */}
      <motion.div
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="h-[2px] bg-gradient-to-r from-transparent via-green-400 to-transparent shadow-[0_0_25px_rgba(0,255,0,0.5)]"
      />

      {/* Bottom Bar */}
      <div className="text-center py-4  bg-black/50 border-t border-green-500/10">
       <h2 className="text-gray-500 text-sm">
         © 2025 TipNGoal. All rights reserved.
        </h2>
        <p className="text-green-400 text-sm">Smarter predictions. Bigger wins.</p>
      </div>
    </motion.footer>
  );
};

export default Footer;
