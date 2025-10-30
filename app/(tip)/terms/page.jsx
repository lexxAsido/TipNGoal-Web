"use client"
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

const page = () => {
  return (
    <section className=" py-12 px-4 flex justify-center items-center min-h-screen flex-row max-md:flex-col md:gap-10 max-md:text-sm font-sans">
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
         src="/goal2.png"
         alt="TipNGoal Prediction"
         width={400}
         height={200}
         className="w-[400px] max-w-full h-auto object-contain drop-shadow-[0_0_25px_rgba(0,255,0,0.3)] 
                    md:w-[400px] sm:w-[350px] max-sm:w-[220px]"
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
        <h2 className="text-3xl font-bold text-center mb-8 text-green-500 max-md:text-lg">
          Terms Of Use
        </h2>
        <h3 className="font-bold">Disclaimer</h3>
        <p>
          TipNGoal is a strictly information-based application designed to
          provide daily picks, odds, and sports predictions with a high win
          percentage. While we strive to offer accurate and valuable insights to
          enhance your sports prediction experience, we do not guarantee the
          success of any predictions provided.
        </p>
        <h3 className="font-bold">Important Notes:</h3>
        <ul className="list-disc ml-7">
          <li>
            TipNGoal does not offer any opportunities to win real money or
            prizes.
          </li>
          <li>
            The application is not a betting platform and does not facilitate or
            endorse any form of gambling.
          </li>
          <li>
            Our aim is solely to serve as a reliable and informative resource
            for football and sports enthusiasts.
          </li>
        </ul>
        <p>
          Users are encouraged to use the information responsibly and understand
          that sports predictions are inherently uncertain. TipNGoal will not be
          held liable for any decisions, actions, or outcomes resulting from the
          use of our predictions or information.
        </p>
        <h3 className="font-bold">
          Bet Responsibly – A Wise Word for Gamblers
        </h3>
        <p>
          At TipNGoal, we encourage all users to bet responsibly and understand
          the importance of maintaining control when engaging in any betting
          activities. Gambling should be viewed as a form of entertainment, not
          a means to earn money or solve financial problems.
        </p>
        <h3>Here are some wise words for gamblers:</h3>
        <ul className="list-disc ml-7">
          <li>
            Set Limits: Always decide on a budget and stick to it. Never bet
            more than you can afford to lose.
          </li>
          <li>
            Stay Disciplined: Avoid chasing losses or letting emotions influence
            your decisions.
          </li>
          <li>
            Take Breaks: Remember, gambling is not a race. Step away if you feel
            overwhelmed.
          </li>
          <li>
            Know When to Stop: Recognize when it’s time to walk away and seek
            help if gambling starts affecting your personal or financial life.
          </li>
        </ul>
        <p>
          If you or someone you know is struggling with gambling, please reach
          out to a trusted organization or helpline in your area for support.
          Betting responsibly ensures that the experience remains enjoyable and
          within your control.
        </p>
        <p className="font-bold text-center max-md:text-sm mt-4">
          Luck is fleeting, but responsibility lasts. Gamble wisely!
        </p>
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
    </section>
  );
};

export default page;
