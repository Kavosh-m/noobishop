import React from "react";
import { useNavigate } from "react-router-dom";
import { logo } from "../constants/index";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="mx-0 flex w-full flex-col bg-black">
      <div className="grid grid-cols-5 gap-1 bg-gray-900 px-24 py-24 text-gray-300">
        <div className=" flex flex-col">
          <button onClick={() => navigate("/")} className="mb-4 w-9/12">
            <img src={logo} alt="" />
          </button>
          <p className="w-4/5 text-left">
            Noobishop is the best parts shop of your daily nutritions. What kind
            of nutrition do you need you can get here soluta nobis
          </p>
        </div>
        <div className="flex flex-col">
          <p className="mb-6 text-lg text-white underline decoration-2 underline-offset-2">
            Information
          </p>
          <ul className="space-y-2">
            <li>
              <button className="translate-x-0 transition-all duration-300 ease-in-out hover:translate-x-2 hover:text-red-400">
                Our company
              </button>
            </li>
            <li>
              <button className="translate-x-0 transition-all duration-300 ease-in-out hover:translate-x-2 hover:text-red-400">
                Contact us
              </button>
            </li>
            <li>
              <button className="translate-x-0 transition-all duration-300 ease-in-out hover:translate-x-2 hover:text-red-400">
                Our services
              </button>
            </li>
            <li>
              <button className="translate-x-0 transition-all duration-300 ease-in-out hover:translate-x-2 hover:text-red-400">
                Why us?
              </button>
            </li>
            <li>
              <button className="translate-x-0 transition-all duration-300 ease-in-out hover:translate-x-2 hover:text-red-400">
                Careers
              </button>
            </li>
          </ul>
        </div>
        <div className=" flex flex-col">
          <p className="mb-6 text-lg text-white underline decoration-2 underline-offset-2">
            Quicklink
          </p>
          <ul className="space-y-2">
            <li>
              <button className="translate-x-0 transition-all duration-300 ease-in-out hover:translate-x-2 hover:text-red-400">
                Our company
              </button>
            </li>
            <li>
              <button className="translate-x-0 transition-all duration-300 ease-in-out hover:translate-x-2 hover:text-red-400">
                Contact us
              </button>
            </li>
            <li>
              <button className="translate-x-0 transition-all duration-300 ease-in-out hover:translate-x-2 hover:text-red-400">
                Our services
              </button>
            </li>
            <li>
              <button className="translate-x-0 transition-all duration-300 ease-in-out hover:translate-x-2 hover:text-red-400">
                Why us?
              </button>
            </li>
            <li>
              <button className="translate-x-0 transition-all duration-300 ease-in-out hover:translate-x-2 hover:text-red-400">
                Careers
              </button>
            </li>
          </ul>
        </div>
        <div className="flex flex-col">
          <p className="mb-6 text-lg text-white underline decoration-2 underline-offset-2">
            Support
          </p>
          <ul className="space-y-2">
            <li>
              <button className="translate-x-0 transition-all duration-300 ease-in-out hover:translate-x-2 hover:text-red-400">
                Our company
              </button>
            </li>
            <li>
              <button className="translate-x-0 transition-all duration-300 ease-in-out hover:translate-x-2 hover:text-red-400">
                Contact us
              </button>
            </li>
            <li>
              <button className="translate-x-0 transition-all duration-300 ease-in-out hover:translate-x-2 hover:text-red-400">
                Our services
              </button>
            </li>
            <li>
              <button className="translate-x-0 transition-all duration-300 ease-in-out hover:translate-x-2 hover:text-red-400">
                Why us?
              </button>
            </li>
            <li>
              <button className="translate-x-0 transition-all duration-300 ease-in-out hover:translate-x-2 hover:text-red-400">
                Careers
              </button>
            </li>
          </ul>
        </div>
        <div className="flex flex-col">
          <p className="mb-6 text-lg text-white underline decoration-2 underline-offset-2">
            See Information
          </p>
          <ul className="space-y-2">
            <li>
              <button className="translate-x-0 text-left transition-all duration-300 ease-in-out hover:translate-x-2 hover:text-red-400">
                Our company is a great company ever
              </button>
            </li>
            <li>
              <button className="translate-x-0 transition-all duration-300 ease-in-out hover:translate-x-2 hover:text-red-400">
                Contact us
              </button>
            </li>
            <li>
              <button className="translate-x-0 transition-all duration-300 ease-in-out hover:translate-x-2 hover:text-red-400">
                Our services
              </button>
            </li>
            <li>
              <button className="translate-x-0 transition-all duration-300 ease-in-out hover:translate-x-2 hover:text-red-400">
                Why us?
              </button>
            </li>
            <li>
              <button className="translate-x-0 transition-all duration-300 ease-in-out hover:translate-x-2 hover:text-red-400">
                Careers
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex items-center justify-center bg-black py-4">
        <p className="font-normal text-white">
          Copyright © 2020 KMG | Built with React by Kavosh
        </p>
      </div>
    </footer>
  );
};

export default Footer;
