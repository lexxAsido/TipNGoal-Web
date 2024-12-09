import Image from 'next/image';
import React from 'react';
import { FaArrowAltCircleDown } from "react-icons/fa";

const page = () => {
  return (
    <main className='bg-green-500 h-dvh'>
      <div className='bg-black flex justify-center items-center gap-10'>
        <Image
         src="/tipblack.jpg"
         alt="TipNGoal Prediction"
         width="800"
         height="100"
         className=''
        />
        <div>

        <h3 className='text-white font-bold flex-wrap w-[70rem] text-2xl'>
        TipNGoal is the ultimate prediction app designed to give you the surest picks and daily insights 
        to help you maximize your winnings on your favorite betting platforms.
         Whether you're looking for accurate match predictions, game stats, or expert betting tips, 
         TipNGoal has you covered. With a focus on precision, reliability, 
         and ease of use, our app is your go-to companion for smarter betting decisions. 
         Trust TipNGoal to deliver the winning edge you need for success!
        </h3>
        <div>
        <p className='text-green-500 text-4xl font-bold text-center'>Now Available on Play Store and App Store</p>
        <span className='flex items-center mt-5 justify-center gap-2'>
        <p className='text-white font-bold'>Click image below to download the app</p>
        <FaArrowAltCircleDown className='text-green-500 text-2xl'/>
        </span>
        <span className='flex gap-5 justify-center'>
          <Image
           src="/app-store2.png"
           alt="App store"
           width="200"
           height="100"
           className='bg-white border-green-500 border-4 h-20 hover:scale-110'
          />

          <Image
           src="/google-play-badge.png"
           alt="Play store"
           width="200"
           height="200"
           className='bg-white border-green-500 border-4 h-20 hover:scale-110'
          />
        </span>
        </div>
        </div>
      </div>
    </main>
  );
}

export default page;
