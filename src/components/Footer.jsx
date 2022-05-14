import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logo } from "../constants/index";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="bg-gray-900">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-2 bg-gray-900 py-10 px-6 text-gray-300 sm:grid-cols-2 sm:px-20 md:grid-cols-5 md:px-16 lg:px-4">
        <div className="flex flex-col sm:col-span-2 md:col-span-1">
          <Link to="/" className="mb-4 aspect-auto w-9/12">
            <img src={logo} alt="" className="h-full w-full object-fill" />
          </Link>
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
          <p className="mb-6 whitespace-nowrap text-lg text-white underline decoration-2 underline-offset-2">
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
      <div className="mx-auto flex max-w-6xl items-center justify-center bg-black py-4">
        <p className="font-normal text-white">
          Copyright © 2020 KMG | Built with React by Kavosh
        </p>
      </div>
    </footer>
  );
};

export default Footer;
