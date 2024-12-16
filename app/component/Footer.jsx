"use client";
import { BsCashStack } from "react-icons/bs";
import Link from "next/link";
import React from "react";
import { FaCopyright, FaInstagram, FaSquareXTwitter } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { BsFillSafe2Fill } from "react-icons/bs";
import { SiAmazongames } from "react-icons/si";
import { IoMdFlash } from "react-icons/io";
import { TbBallFootball } from "react-icons/tb";

const Footer = () => {
  return (
    <section className="h-[17rem] bg-[#c1c7c3] max-lg:h-auto">
        <h2 className="text-3xl font-bold border-b-4 border-black pt-6 text-center">What We Offer!</h2>
      <div className="flex justify-evenly mt-5 font-bold max-md:flex-col max-md:gap-2">
        <div className="flex flex-col items-center hover:scale-125 cursor-pointer group">
          <BsFillSafe2Fill className="text-6xl group-hover:text-green-500 max-md:text-2xl"/>
          <h3>Safe Predictions</h3>
        </div>
        <div className="flex flex-col items-center hover:scale-125 cursor-pointer group">
            <TbBallFootball className="text-6xl group-hover:text-green-500 max-md:text-2xl"/>
          <h3>Sure Odds</h3>
        </div>
        <div className="flex flex-col items-center hover:scale-125 cursor-pointer group">
            <BsCashStack className="text-6xl group-hover:text-green-500 max-md:text-2xl"/>
          <h3>Daily 5 Odds</h3>
        </div>
        <div className="flex flex-col items-center hover:scale-125 cursor-pointer group">
             <SiAmazongames className="text-6xl group-hover:text-green-500 max-md:text-2xl"/>
          <h3>Games bookings</h3>
        </div>
        <div className="flex flex-col items-center hover:scale-125 cursor-pointer group">
        <IoMdFlash  className="text-6xl group-hover:text-green-500 max-md:text-2xl"/>
          <h3>Livescore Update</h3>
        </div>
      </div>
      <div className="flex justify-between items-center px-3 mt-5 max-lg:flex-col ">
        <div className="flex gap-10 font-semibold mr-3 max-md:text-sm max-md:gap-3">
          <button className=" hover:scale-110 transition-all hover:text-green-500 underline decoration-double"><Link href={"/about"}>About Us</Link>
            
          </button>
          <button className=" hover:scale-110 transition-all hover:text-green-500 underline decoration-double"><Link href={"/contact"}>Contact</Link>
          
          </button>
          <button className=" hover:scale-110 transition-all hover:text-green-500 underline decoration-double"><Link href={"#"}>Disclaimer</Link>
          
          </button>
          <button className=" hover:scale-110 transition-all hover:text-green-500 underline decoration-double"><Link href={"/privacy"}>Privacy Policy</Link>
            
          </button>
        </div>

        <div className="flex items-center font-semibold gap-2 max-md:text-sm">
          <FaCopyright className="text-2xl max-md:text-sm" />
          <h3>TipNgoal Sport Prediction Limited</h3>
        </div>

        <div className="pb-5">
          <div className="flex gap-3 max-md:text-sm">
            <Link href="https://www.instagram.com">
              <div className="icon-container text-[#e6399b]">
                <FaInstagram />
              </div>
            </Link>
            <Link href="https://www.x.com">
              <div className="icon-container text-black hover:text-white">
                <FaSquareXTwitter />
              </div>
            </Link>
            <Link href="https://www.whatsapp.com">
              <div className="icon-container text-[#26e600]">
                <FaWhatsapp />
              </div>
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
  .icon-container {
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 4rem;
    height: 4rem;
    font-size: 2rem;
    border: 4px solid;
    border-radius: 0.5rem;
    overflow: hidden;
    transition: transform 0.5s ease, box-shadow 0.5s ease;
    cursor: pointer;
  }

  .icon-container::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: black;
    transform: scaleY(0);
    transform-origin: bottom;
    transition: transform 0.5s ease;
    z-index: -1;
  }

  .icon-container:hover {
    transform: scale(1.2);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  }

  .icon-container:hover::before {
    transform: scaleY(1);
  }

  .icon-container svg {
    z-index: 1;
  }

  /* Responsive styles for medium screens and below */
  @media (max-width: 768px) {
    .icon-container {
      width: 2.5rem;
      height: 2.5rem;
      font-size: 1.5rem;
      border-width: 2px;
    }

    .icon-container:hover {
      transform: scale(1.1); /* Slightly less scale on smaller screens */
    }
  }
`}</style>

    </section>
  );
};

export default Footer;
