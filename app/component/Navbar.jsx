"use client";
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { BiFootball } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from 'react-icons/io';
import { motion } from "framer-motion";

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);

  const handleNavClose = () => setNavOpen(false);

  return (
    <section className="font-sans ">
      <motion.div className="p-2 flex items-center justify-between bg-black fixed w-full"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      >
        <div className="flex items-center gap-2 justify-center">
          <Link href={"/"}>
            <Image
              src="/tiplogo2.png"
              alt="TipNGoal Prediction"
              width="100"
              height="100"
              className="rounded-lg max-lg:w-14"
            />
          </Link>
          <Link href={"/"}>
          <h2 className="text-4xl font-bold text-white flex items-center max-lg:text-lg shadow-lg shadow-green-500">
            TIP<span className="text-green-500">N</span>G<span><BiFootball /></span>AL
          </h2>
          </Link>
        </div>

        <div className='flex gap-10 font-semibold mr-3 text-green-500 max-lg:hidden '>
          <button className='hover:scale-110 hover:border-b-4 border-white transition-all'>
            <Link href={"/about"}>About Us</Link>
          </button>
          <button className='hover:scale-110 hover:border-b-4 border-white transition-all'>
            <Link href={"/contact"}>Contact</Link>
          </button>
          <button className='hover:scale-110 hover:border-b-4 border-white transition-all'>
            <Link href={"/terms"}>Terms of Use</Link>
          </button>
          <button className='hover:scale-110 hover:border-b-4 border-white transition-all'>
            <Link href={"/privacy"}>Privacy Policy</Link>
          </button>
        </div>

        {/* Hamburger Menu Button */}
        <button
          className="text-green-500 text-3xl lg:hidden"
          onClick={() => setNavOpen(!navOpen)}
        >
          {navOpen ? (
            <IoMdClose className="text-5xl text-green-500" />
          ) : (
            <GiHamburgerMenu className="text-4xl text-green-500" />
          )}
        </button>

        {/* Navigation Links */}
        {navOpen && (
          <div className="absolute top-full left-0 w-full bg-green-500/60 font-bold flex flex-col justify-center items-center gap-10 p-6 h-screen backdrop-blur-md shadow-lg">
            <button
              className="hover:scale-110 hover:border-b-4 border-white transition-all"
              onClick={handleNavClose}
            >
              <Link href={"/about"}>About Us</Link>
            </button>
            <button
              className="hover:scale-110 hover:border-b-4 border-white transition-all"
              onClick={handleNavClose}
            >
              <Link href={"/contact"}>Contact</Link>
            </button>
            <button
              className="hover:scale-110 hover:border-b-4 border-white transition-all"
              onClick={handleNavClose}
            >
              <Link href={"/terms"}>Terms of Use</Link>
            </button>
            <button
              className="hover:scale-110 hover:border-b-4 border-white transition-all"
              onClick={handleNavClose}
            >
              <Link href={"/privacy"}>Privacy Policy</Link>
            </button>
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default Navbar;
