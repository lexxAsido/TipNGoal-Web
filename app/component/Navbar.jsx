"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { IoIosFootball } from "react-icons/io";
import { BiFootball } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);
  return (
    <section className=''>
      <div className=' p-2 flex items-center justify-between bg-black'>
        <div className='flex items-center gap-2 justify-center '>
          <Link href={"/"}>
        <Image
        src="/tiplogo2.png"
        alt="TipNGoal Prediction"
        width="100"
        height="100"
        className='rounded-lg max-md:w-14'
        />
        </Link>
        <h2 className='text-4xl font-bold text-white flex items-center max-md:text-lg shadow-lg shadow-green-500'>TIP<span className="text-green-500">N</span>G<span><BiFootball /></span>AL</h2>
        </div>
        <button 
          className='text-green-500 text-3xl md:hidden' 
          onClick={() => setNavOpen(!navOpen)}
        >
          <GiHamburgerMenu />
        </button>

        {/* <div className='flex gap-10 font-semibold mr-3 text-green-500 max-lg:hidden '>
          <button className=' hover:scale-110 hover:border-b-4 border-white transition-all '><Link href={"/about"}>About Us</Link></button>
          <button className=' hover:scale-110 hover:border-b-4 border-white transition-all'><Link href={"/contact"}>Contact</Link></button>
          <button className=' hover:scale-110 hover:border-b-4 border-white transition-all'>Terms of Use</button>
          <button className=' hover:scale-110 hover:border-b-4 border-white transition-all'>Privacy Policy</button>
        </div> */}

        <div 
          className={`flex-col gap-4 font-semibold text-green-500 md:flex md:flex-row md:gap-10 mr-3 max-md:hidden ${
            navOpen ? 'flex' : 'hidden'
          } bg-black md:bg-transparent absolute md:static top-full left-0 w-full md:w-auto p-4 md:p-0`}
        >
          <button className='hover:scale-110 hover:border-b-4 border-white transition-all'>
            <Link href={"/about"}>About Us</Link>
          </button>
          <button className='hover:scale-110 hover:border-b-4 border-white transition-all'>
            <Link href={"/contact"}>Contact</Link>
          </button>
          <button className='hover:scale-110 hover:border-b-4 border-white transition-all'>
            Terms of Use
          </button>
          <button className='hover:scale-110 hover:border-b-4 border-white transition-all'>
            Privacy Policy
          </button>
        </div>
      </div>
    </section>
  );
}

export default Navbar;
