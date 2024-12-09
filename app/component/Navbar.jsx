import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  return (
    <section className=''>
      <div className=' p-2 flex items-center justify-between bg-black'>
        <div className='flex items-center gap-2 justify-center '>
          <Link href={"/"}>
        <Image
        src="/tiplogo.png"
        alt="TipNGoal Prediction"
        width="100"
        height="100"
        className='rounded-lg '
        />
        </Link>
        <h2 className='text-2xl font-bold text-green-500'>TipNGoal</h2>
        </div>

        <div className='flex gap-10 font-semibold mr-3 text-green-500 '>
          <button className=' hover:scale-110 hover:border-b-4 border-white transition-all'>About Us</button>
          <button className=' hover:scale-110 hover:border-b-4 border-white transition-all'>Contact</button>
          <button className=' hover:scale-110 hover:border-b-4 border-white transition-all'>Terms of Use</button>
          <button className=' hover:scale-110 hover:border-b-4 border-white transition-all'>Privacy Policy</button>
        </div>
      </div>
    </section>
  );
}

export default Navbar;
