"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { BiFootball } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { motion } from "framer-motion";

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const handleNavClose = () => setNavOpen(false);

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] z-50 font-sans backdrop-blur-lg  border border-green-500/30 rounded-3xl shadow-[0_0_20px_rgba(0,255,0,0.2)]">
        <motion.div
          className="max-w-7xl mx-auto px-5 md:py-4 flex items-center justify-between"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <Link href={"/"}>
              <Image
                src="/tiplogo2.png"
                alt="TipNGoal Prediction"
                width={50}
                height={50}
                className="rounded-lg"
              />
            </Link>

            <Link href={"/"}>
              <h2 className="text-2xl font-extrabold flex items-center max-md:text-sm text-white tracking-wide">
                TIP<span className="text-green-500">N</span>
                {/* <span className="flex items-center">
                  <BiFootball className="mx-1 text-green-500 animate-spin-slow" />
                </span> */}
                GOAL
              </h2>
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex gap-8 font-medium text-gray-300">
            <Link href="/about" className="hover:text-green-400 transition-colors duration-200">
              About Us
            </Link>
            <Link href="/contact" className="hover:text-green-400 transition-colors duration-200">
              Contact
            </Link>
            <Link href="/terms" className="hover:text-green-400 transition-colors duration-200">
              Terms of Use
            </Link>
            <Link href="/privacy" className="hover:text-green-400 transition-colors duration-200">
              Privacy Policy
            </Link>
          </div>

          {/* Hamburger (Mobile) */}
          <button
            className="text-green-400 text-3xl lg:hidden"
            onClick={() => setNavOpen(!navOpen)}
          >
            {navOpen ? (
              <IoMdClose className="text-4xl" />
            ) : (
              <GiHamburgerMenu className="text-4xl" />
            )}
          </button>
        </motion.div>

        {/* Mobile Menu */}
        {navOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute top-full left-0 w-full bg-black/90 backdrop-blur-lg border-t border-green-400/30 flex flex-col items-center gap-6 py-10 text-white font-semibold shadow-[0_4px_20px_rgba(0,255,0,0.2)] rounded-b-3xl"
          >
            {["About", "Contact", "Terms", "Privacy"].map((item, i) => (
              <Link
                key={i}
                href={`/${item.toLowerCase().replace(/\s+/g, "")}`}
                onClick={handleNavClose}
                className="hover:text-green-400 transition-colors duration-200"
              >
                {item}
              </Link>
            ))}
          </motion.div>
        )}
      </nav>

      {/* Spacer to prevent content being covered */}
      <div className="pt-28 md:pt-32"></div>
    </>
  );
};

export default Navbar;
