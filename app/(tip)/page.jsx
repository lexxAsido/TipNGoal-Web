import Image from "next/image";
import React from "react";
import { FaArrowAltCircleDown, FaArrowDown } from "react-icons/fa";
import { Roboto } from "next/font/google";
import Link from "next/link";
import { IoIosFootball } from "react-icons/io";
import { BiFootball } from "react-icons/bi";
import { motion } from "framer-motion";

const roboto = Roboto({
  subsets: ["latin"],
  weight: "400",
});

const page = () => {
  return (
    <main className="bg-black">
      <div className=" flex flex-col lg:flex-row justify-center items-center gap-10 md:gap-20  mx-5">
        <Image
          src="/tipNgoal2.jpg"
          alt="TipNGoal Prediction"
          width={800}
          height={100}
          className="w-auto h-auto "
        />
        <div className="pb-6">
          <p className="text-white font-bold text-justify text-xl mb-5 p-5 font-sans max-md:text-sm w-auto flex-wrap text-balance">
          <span className="flex items-center italic">
            <span
              className={`text-7xl font-extrabold  max-md:text-2xl`}>
              TIP<span className="text-green-500">N</span>G
            </span>
               <span className="flex items-center text-7xl max-md:text-2xl ">
                <BiFootball className="animate-spin "/>AL
                </span>
                </span>
             An ultimate prediction app designed to give you the surest picks
            and daily insights to help you maximize your winnings on your
            favorite betting platforms. Whether you're looking for accurate
            match predictions, game stats, or expert betting tips
            you covered. With a focus on precision, reliability, and ease of
            use, our app is your go-to companion for smarter betting decisions.
            Trust TipNGoal to deliver the winning edge you need for success!
          </p>

          <div className="w-auto">
            <p className="text-green-500 text-4xl font-bold text-center max-lg:text-xl flex-wrap">
              Now Available on Play Store and App Store
            </p>
            <span className="flex items-center mt-5 justify-center md:gap-2">
              <p className="text-white font-bold max-md:text-sm">
                Click image below to download the app
              </p>
              <FaArrowAltCircleDown className="text-green-500 text-2xl max-md:text-sm" />
            </span>

            <span className="flex gap-5 justify-center mb-5">
              <Link href={"#"}>
              <Image
                src="/app-store2.png"
                alt="App store"
                width="200"
                height="100"
                className="bg-white border-green-500 border-4 h-20 hover:scale-110 w-auto"
                />
              </Link>

              <Link href={"#"}>
              <Image
                src="/google-play-badge.png"
                alt="Play store"
                width="200"
                height="200"
                className="bg-white border-green-500 border-4 h-20 hover:scale-110 w-auto"
                />
              </Link>
            </span>
          </div>
        </div>
      </div>
      
        {/* <h2 className="text-center font-extrabold text-5xl text-white border-b-4 p-2 border-white ">FEATURES</h2>
      <div className="flex justify-center items-center gap-5">
        <div className="flex">

          <Image
            src="/tipportrait.png"
            alt="background"
            width="250"
            height="100"
            className=""
            />
          <Image
            src="/signup.png"
            alt="background"
            width="250"
            height="100"
            className=""
            />
        
          <Image
            src="/tip3-portrait.png"
            alt="background"
            width="250"
            height="100"
            className=""
            />
          <Image
            src="/live.png"
            alt="background"
            width="300"
            height="100"
            className=""
            />
        
          <Image
            src="/tip2-portrait.png"
            alt="background"
            width="250"
            height="100"
            className=""
            />
        </div>

        <div className=" font-extrabold text-2xl flex flex-col items-center text-black gap-3">
          <h2 >Beautiful User Interface</h2>
          <FaArrowDown className="text-white"/>
          <h3>Simple Formik SignUp and Validation </h3>
          <FaArrowDown className="text-white"/>
          <h2 >Easy User Authentication With Firebase</h2>
          <FaArrowDown className="text-white"/>
          <h2>Livescores Api-Integration</h2>
          <FaArrowDown className="text-white"/>
          <h2 >Sport Predictions With 99% Win Rate</h2>
        </div>
            </div> */}
      
      
      
    </main>
  );
};

export default page;
