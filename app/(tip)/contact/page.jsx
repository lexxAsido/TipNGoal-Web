"use client"
import React from 'react';
import { FaCopyright, FaInstagram, FaSquareXTwitter } from "react-icons/fa6";
import { FaWhatsapp, FaFacebook, FaYoutube } from "react-icons/fa";
import Link from 'next/link';
import Image from 'next/image';
import { motion } from "framer-motion";

const contact = () => {
  return (
    <section className=" py-12 px-4 flex justify-center items-center min-h-screen flex-row max-md:flex-col md:gap-10">
      <motion.div
      initial={{ opacity:0, scale: 0}}
      animate={{ opacity:1, scale: 1}}
      transition={{
          type: "spring",
          stiffness: 125,
          delay: 0.1,
          duration:0.7
      }}
      >
        {/* <Image
          src="/contact.png"
          alt="TipNGoal Prediction"
          width={300}
          height={200}
          className="w-auto h-auto "
        /> */}
      </motion.div>

      <motion.div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full shadow-green-500 mt-20  border-green-500"
      initial={{ opacity:0, scale: 0}}
      animate={{ opacity:1, scale: 1}}
      transition={{
          type: "tween",
          stiffness: 125,
          delay: 0.2,
          duration:0.8
      }}
      >
        <h2 className="text-3xl font-bold text-center mb-8 text-green-500 max-md:text-lg">Contact Us</h2>
        <p className="text-center mb-4 font-semibold max-md:text-sm">
        Have questions, feedback, or inquiries/Advert? We'd love to hear from you! At TIPNGOAL Prediction, our team
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
          {/* <li>
            <span className="font-bold max-md:text-sm">Phone:</span>{' '}
            <a
              href="tel:+2348107272019"
              className="text-green-500 hover:underline"
            >
              +234 801 234 5678
            </a>
          </li> */}
          <li className='max-md:text-sm'>
            <span className="font-bold font-sans">Address:</span> TIPNGOAL Headquarters, Mark Davidson Street, Okota Lagos, Nigeria
          </li>
        </ul>
      </div>

        <div className="mt-8 text-center text-gray-600 ">
          <p className='max-md:text-sm'>Or reach us directly on social media:</p>
          <div className="flex md:justify-center gap-4 mt-5">
            <Link href="https://x.com/tipngoal?s=21" target="_blank">
              <FaSquareXTwitter className="text-2xl hover:text-green-500 transition-colors" />
            </Link>
            <Link href="https://www.instagram.com/tipngoal?igsh=b21iODV2NjhvaDNx" target="_blank">
              <FaInstagram className="text-2xl hover:text-pink-400 transition-colors" />
            </Link>
            <Link href="https://www.facebook.com/share/1U7pMjvraT/?mibextid=wwXIfr" target="_blank">
  <FaFacebook className="text-2xl hover:text-blue-500 transition-colors" />
</Link>

<Link href="https://www.youtube.com/@tipngoal" target="_blank">
  <FaYoutube className="text-2xl hover:text-red-500 transition-colors" />
</Link>

            {/* <Link href="https://whatsapp.com" target="_blank">
              <FaWhatsapp className="text-2xl hover:text-green-400 transition-colors" />
            </Link> */}
          </div>
          <p className="mt-4 max-md:text-sm">We look forward to assisting you!</p>
        </div>
      </motion.div>
    </section>
  );
}

export default contact;
