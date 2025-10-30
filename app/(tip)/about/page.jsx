"use client"
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

const about = () => {
  return (
    <>

    <main className={`flex flex-row items-center justify-center p-5 gap-5 h-dvh max-md:flex-col max-md:h-auto m-3 font-sans`}>
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
  src="/goal.png"
  alt="TipNGoal Prediction"
  width={400}
  height={200}
  className="w-[400px] max-w-full h-auto object-contain drop-shadow-[0_0_25px_rgba(0,255,0,0.3)] 
             md:w-[400px] sm:w-[350px] max-sm:w-[220px]"
/> */}

      </motion.div>

      <motion.div className="text-balance  max-md:text-sm shadow-lg max-w-2xl shadow-green-500 py-10 px-3 border-green-500 bg-white"
       initial={{ opacity:0, scale: 0}}
       animate={{ opacity:1, scale: 1}}
       transition={{
           type: "tween",
           stiffness: 125,
           delay: 0.2,
           duration:0.8
       }}
      >
        <h1 className="font-bold text-center  text-green-500 text-3xl mb-5 max-md:text-lg">About Us</h1>
        <p className="text-balance">
          At <span className="text-green-500">TIPNGOAL</span>  Prediction, we are passionate about helping sports
          enthusiasts and betting fans make informed and confident predictions.
          Founded on the principles of accuracy, reliability, and user-centric
          solutions, we aim to provide top-notch sports prediction services
          tailored to meet the needs of our diverse audience.
        </p>
        <p className="font-semibold mt-3">Our platform is designed to be your go-to destination for:</p>
        <ul className="list-disc ml-7">
          <li>
            Safe Predictions: Carefully analyzed tips to maximize your chances
            of success.
          </li>
          <li>
            Sure Odds: Expertly forcasted odds for a higher winning potential
          </li>
          <li>Daily 5 odds picks with 90% Win rate</li>
          <li>
            Live Scores: Real-time updates to keep you informed of top European
            leagues and Fifa Competions.
          </li>
          <li>
            Game Bookings: Booking codes from Top bookies like Sportybet, Stake,
            BetKing, Bet9ja, e.t.c.
          </li>
        </ul>
        <p className="text-blance mt-5">
          At TipNgoal, we understand that success in sports predictions requires
          a blend of expertise and precision. Our team of analysts leverages
          in-depth research, advanced data analytics, and a passion for sports
          to deliver consistently high-quality predictions.
        </p>
        <p className="font-semibold italic mt-5">
          We are more than just a prediction platform; we are a community of
          sports lovers. Whether you are a beginner or an experienced punter,
          TipNgoal is here to guide you every step of the way. Join us today,
          and let’s turn your passion for sports into a rewarding experience!
        </p>
        <p className="text-center font-bold mt-5 max-md:text-sm">The best bet you can make is on your own discipline. Bet responsibly!</p>

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
      </motion.div>
    </main>
              </>
  );
};

export default about;
