import React from 'react';
import { FaCopyright, FaInstagram, FaSquareXTwitter } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import Link from 'next/link';
import Image from 'next/image';

const contact = () => {
  return (
    <section className="bg-gray-100 py-12 px-4 flex justify-center items-center min-h-screen flex-row max-md:flex-col md:gap-10">
      <div>
        <Image
          src="/signup.png"
          alt="TipNGoal Prediction"
          width={900}
          height={200}
          className="w-auto h-auto "
        />
      </div>
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full shadow-green-500 mt-20  border-green-500 ">
        <h2 className="text-3xl font-bold text-center mb-8 text-green-500 max-md:text-lg">Contact Us</h2>
        <p className="text-center mb-4 font-semibold max-md:text-sm">
        Have questions, feedback, or inquiries/Advert? We'd love to hear from you! At TipNgoal Prediction, our team
        is dedicated to providing you with the best experience and assisting you with any concerns.
      </p>
      <div className=" p-6  w-full ">
        <h2 className="text-2xl font-semibold mb-4 text-center max-md:text-lg">Get in Touch</h2>
        <ul className="list-none space-y-4">
          <li>
            <span className="font-bold max-md:text-sm">Email:</span>{' '}
            <a
              href="mailto:lexxtech24@gmail.com"
              className="text-green-500 hover:underline"
            >
              support@tipngoal.com
            </a>
          </li>
          <li>
            <span className="font-bold max-md:text-sm">Phone:</span>{' '}
            <a
              href="tel:+2348107272019"
              className="text-green-500 hover:underline"
            >
              +234 801 234 5678
            </a>
          </li>
          <li className='max-md:text-sm'>
            <span className="font-bold font-sans">Address:</span> TipNgoal Headquarters, Odejayi Street, Surulere Lagos, Nigeria
          </li>
        </ul>
      </div>

        <div className="mt-8 text-center text-gray-600 ">
          <p className='max-md:text-sm'>Or reach us directly on social media:</p>
          <div className="flex gap-5 justify-center my-5">
            <Link href="https://www.instagram.com">
              <div className=" text-5xl text-[#e6399b] p-2 hover:scale-125 transition-all max-md:text-2xl border-4 border-pink-400 rounded-lg">
                <FaInstagram />
              </div>
            </Link>
            <Link href="https://www.x.com">
              <div className="text-5xl text-black p-2 hover:scale-125 transition-all max-md:text-2xl border-4 border-black rounded-lg">
                <FaSquareXTwitter />
              </div>
            </Link>
            <Link href="https://www.whatsapp.com">
              <div className="text-5xl  text-[#26e600] p-2 hover:scale-125 transition-all max-md:text-2xl border-4 border-green-300 rounded-lg">
                <FaWhatsapp />
              </div>
            </Link> 
          </div>
          <p className="mt-4 max-md:text-sm">We look forward to assisting you!</p>
        </div>
      </div>
    </section>
  );
}

export default contact;
