"use client"

import Link from 'next/link';
import React from 'react';
import { FaCopyright, FaInstagram, FaSquareXTwitter } from 'react-icons/fa6';
import { FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <section className="h-[20rem] bg-[#f5f0f0]">
      <div>
        <div className="flex items-center font-semibold">
          <FaCopyright className="text-2xl" />
          <h3>TipNgoal Sport Prediction Limited</h3>
        </div>

        <div className="">
          <div className="flex gap-3">
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
          content: '';
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
      `}</style>
    </section>
  );
};

export default Footer;
