import Image from "next/image";
import React from "react";

const about = () => {
  return (
    <main className="flex flex-row items-center p-5 gap-5 h-dvh font-sans max-md:flex-col max-md:h-auto m-3">
      <div>
        <Image
          src="/tip-left.png"
          alt="TipNGoal Prediction"
          width={800}
          height={100}
          className="w-auto h-auto "
        />
      </div>

      <div className="text-balance text-2xl max-md:text-lg">
        <h1 className="font-bold text-center border-b-4 border-green-500 text-5xl mb-5 max-md:text-xl">About Us</h1>
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
      </div>
    </main>
  );
};

export default about;
