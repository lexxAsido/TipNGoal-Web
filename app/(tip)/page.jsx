import Image from "next/image";
import React from "react";
import { FaArrowAltCircleDown, FaArrowDown } from "react-icons/fa";
import { Jaro } from "next/font/google";


const jaro = Jaro({
  subsets: ["latin"],
  weight: "400",
});

const page = () => {
  return (
    <main className="bg-green-500 ">
      <div className=" flex justify-center items-center gap-20 bg-black">
        <Image
          src="/tipblack.jpg"
          alt="TipNGoal Prediction"
          width="800"
          height="100"
          className="mr-28"
        />
        <div className=" ">
          <p className="text-white font-bold flex-wrap w-[70rem] text-2xl mb-5">
            <span
              className={`text-7xl font-extrabold text-green-500 ${jaro.className}`}
            >
              TIPNGOAL
            </span>
            is the ultimate prediction app designed to give you the surest picks
            and daily insights to help you maximize your winnings on your
            favorite betting platforms. Whether you're looking for accurate
            match predictions, game stats, or expert betting tips, TipNGoal has
            you covered. With a focus on precision, reliability, and ease of
            use, our app is your go-to companion for smarter betting decisions.
            Trust TipNGoal to deliver the winning edge you need for success!
          </p>

          <div>
            <p className="text-green-500 text-4xl font-bold text-center">
              Now Available on Play Store and App Store
            </p>
            <span className="flex items-center mt-5 justify-center gap-2">
              <p className="text-white font-bold">
                Click image below to download the app
              </p>
              <FaArrowAltCircleDown className="text-green-500 text-2xl" />
            </span>
            <span className="flex gap-5 justify-center">
              <Image
                src="/app-store2.png"
                alt="App store"
                width="200"
                height="100"
                className="bg-white border-green-500 border-4 h-20 hover:scale-110"
              />

              <Image
                src="/google-play-badge.png"
                alt="Play store"
                width="200"
                height="200"
                className="bg-white border-green-500 border-4 h-20 hover:scale-110"
              />
            </span>
          </div>
        </div>
      </div>
      
        <h2 className="text-center font-extrabold text-5xl text-white border-b-4 p-2 border-black ">FEATURES</h2>
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
            </div>
      
      
      
    </main>
  );
};

export default page;
