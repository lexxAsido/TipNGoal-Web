import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const privacy = () => {
  return (
    <section className="bg-gray-100 py-12 px-4 flex justify-center items-center min-h-screen flex-row max-md:flex-col md:gap-10">
    <div>
    <Image
      src="/live.png"
      alt="TipNGoal Prediction"
      width={300}
      height={100}
      className="w-auto h-auto "
      />
      </div> 

      <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full shadow-green-500 mt-20  border-green-500">
        <h2 className='text-3xl font-bold text-center mb-8 text-green-500 max-md:text-lg'>Privacy Policy</h2>
        <h3 className='font-bold'>Effective Date: 16th December 2024</h3>
        <p><span className='text-green-500 font-bold'>TipNGoal</span> is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you use our services. By using TipNGoal, you agree to the terms of this Privacy Policy.</p>
          <ol>
            <li className='list-decimal ml-5 font-semibold'>Information We Collect</li>
            <p>We collect the following personal information from users to provide and enhance our services:</p>
            <ul className='list-disc ml-10'>
              <li>FirstName</li>
              <li>LastName</li>
              <li>UserName</li>
              <li>Email</li>
              <li>Phone Number</li>
              <li>Address</li>
            </ul>
          <li className='list-decimal ml-5 font-semibold'>How We Use Your Data</li>





          </ol>








        <p className='text-center font-bold max-md:text-sm'>A smart gambler knows when to walk away – the best win is self-control.</p>
        <div className="flex justify-center">
        <Link href={"/"}>
            <Image
              src="/tiplogo2.png"
              alt="TipNGoal Prediction"
              width="50"
              height="50"
              className="rounded-lg max-lg:w-14 bg-black"
              />
          </Link>
              </div>
      </div>
    </section>
  );
}

export default privacy;
