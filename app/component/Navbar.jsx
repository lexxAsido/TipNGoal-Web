import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { IoIosFootball } from "react-icons/io";
import { BiFootball } from "react-icons/bi";

const Navbar = () => {
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
        className='rounded-lg '
        />
        </Link>
        <h2 className='text-4xl font-bold text-white flex items-center max-md:hidden'>TIP<span className="text-green-500">N</span>G<span><BiFootball /></span>AL</h2>
        </div>

        <div className='flex gap-10 font-semibold mr-3 text-green-500 max-lg:hidden '>
          <button className=' hover:scale-110 hover:border-b-4 border-white transition-all '><Link href={"/about"}>About Us</Link></button>
          <button className=' hover:scale-110 hover:border-b-4 border-white transition-all'>Contact</button>
          <button className=' hover:scale-110 hover:border-b-4 border-white transition-all'>Terms of Use</button>
          <button className=' hover:scale-110 hover:border-b-4 border-white transition-all'>Privacy Policy</button>
        </div>
      </div>
    </section>
  );
}

export default Navbar;
