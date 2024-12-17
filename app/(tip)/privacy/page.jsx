"use client"
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { motion } from "framer-motion";

const Privacy = () => {
  return (
    <section className="bg-gray-100 py-12 px-4 flex justify-center items-center min-h-screen flex-row max-md:flex-col md:gap-10 font-sans">
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
        <Image
          src="/live.png"
          alt="TipNGoal Prediction"
          width={300}
          height={100}
          className="w-auto h-auto"
        />
      </motion.div>

      <motion.div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full shadow-green-500 mt-20 border border-green-500"
       initial={{ opacity:0, scale: 0}}
       animate={{ opacity:1, scale: 1}}
       transition={{
           type: "tween",
           stiffness: 125,
           delay: 0.2,
           duration:0.8
       }}
      >
        <h2 className="text-3xl font-bold text-center mb-8 text-green-500 max-md:text-lg">
          Privacy Policy
        </h2>
        <h3 className="font-bold">Effective Date: 16th December 2024</h3>
        <p className='max-lg:text-sm'>
          <span className="text-green-500 font-bold">TipNGoal</span> is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you use our services. By using TipNGoal, you agree to the terms of this Privacy Policy.
        </p>
        <ol className="mt-4 space-y-4 max-lg:text-sm">
          <li className="list-decimal ">
            Information We Collect
            <p className="ml-6">
              We collect the following personal information from users to provide and enhance our services:
            </p>
            <ul className="list-disc ml-10">
              <li>First Name</li>
              <li>Last Name</li>
              <li>Username</li>
              <li>Email</li>
              <li>Phone Number</li>
              <li>Address</li>
            </ul>
          </li>
          <li className="list-decimal ">
            How We Use Your Data
            <p className="ml-6">The data collected is used for the following purposes:</p>
            <ul className="list-disc ml-10">
              <li>Authentication: To create and manage user accounts, allowing secure access to our services.</li>
              <li>Display on the App: User details such as your first name, last name, username, and email are displayed on the app when you are signed in.</li>
              <li>Service Improvement: To enhance user experience and provide accurate and valuable football and sports predictions.</li>
            </ul>
          </li>
          <li className="list-decimal">
            Data Storage and Security
            <p className="ml-6">
              All user data is securely stored in our database. We implement strict measures to ensure your data remains private and protected. Your information will never be shared with third parties without your explicit consent.
            </p>
          <ul className="list-disc ml-10">
            <li>Restricted Access: Only authorized personnel have access to your personal information.</li>
            <li>Data Encryption: We use industry-standard encryption methods to secure your data.</li>
          </ul>
          </li>

          <li className='list-decimal'>
          Sharing of Information
          <p className="ml-6">We do not share, sell, or rent your personal information to any third parties. Your data is used exclusively within TipNGoal for the purposes stated in this Privacy Policy.</p>
          </li>

          <li className='list-decimal'>
          User Responsibility
          <p className="ml-6">As a user, you are responsible for keeping your account credentials (e.g., password) secure. Do not share your account information with anyone.</p>
          </li>

          <li className='list-decimal'>
          Your Privacy Rights
          <p className="ml-6">You have the right to:</p>
          <ul className='ml-10 list-disc'>
            <li>Access Your Data: Request access to the personal information we hold about you.</li>
            <li>Update Your Information: Modify or correct your personal details if they are inaccurate.</li>
            <li>Delete Your Data: Request deletion of your account and associated data from our system.</li>
          </ul>
          <p className='ml-6'>To exercise any of these rights,please <Link href={"/contact"} className='text-green-500 font-bold'>Contact us</Link>.</p>
          </li>

          <li className='list-decimal'>
          Changes to This Privacy Policy
          <p className='ml-6'>We may update this Privacy Policy from time to time. Any changes will be communicated to users through our app or website. Please review this policy periodically to stay informed about how we handle your data.</p>
          </li>

          <li className='list-decimal'>
          Contact Us
          <p className='ml-6'>If you have any questions or concerns about this Privacy Policy or how your data is handled, please <Link href={"/contact"} className='text-green-500 font-bold'>Contact us</Link> </p>
          </li>

        <p className='font-semibold text-center '>By using TipNGoal, you acknowledge that you have read and understood this Privacy Policy and agree to its terms.</p>
        </ol>

        <p className="text-center font-bold mt-6 max-md:text-sm">
          A smart gambler knows when to walk away – the best win is self-control.
        </p>

        <div className="flex justify-center mt-6">
          <Link href="/">
            <Image
              src="/tiplogo2.png"
              alt="TipNGoal Prediction"
              width={50}
              height={50}
              className="rounded-lg bg-black"
            />
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default Privacy;
