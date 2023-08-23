import React, { useState } from "react";
import { motion } from "framer-motion";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="flex items-center justify-between p-4 text-white bg-black w-[95%] m-auto h-[65px] rounded-[20px]">
      <div className="flex items-center justify-between w-full">
        <a className="text-xl font-semibold" href="/">
          <img src={require("../images/logo.png")} />
        </a>
        <div className="ml-6 hidden md:flex space-x-8 items-center justify-center font-bold ">
          <a
            href="#"
            className="hover:text-[#86C6CC] active:text-[#86C6CC] transition duration-500"
          >
            Event Builder
          </a>
          <a
            href="#"
            className="hover:text-[#86C6CC] active:text-[#86C6CC] transition duration-500"
          >
            Saved
          </a>
          <button className="px-4 py-2 bg-[#5DA3A9] rounded-lg hover:bg-[#4f8b91] transition duration-500">
            Contact Us
          </button>
        </div>
      </div>

      <div className="md:hidden">
        <button
          className="text-white p-2 bg-[#5DA3A9] rounded-xl"
          onClick={toggleMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <motion.div
          initial={{ y: -1000, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -1000, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed top-0 left-0 w-full h-full bg-[#5DA3A9]  overflow-y-auto"
        >
          <div className="p-4 text-right">
            <button
              className="text-[#5DA3A9] p-2 bg-white rounded-xl"
              onClick={toggleMenu}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-col mt-24 h-full space-y-6 text-center ">
            <a
              href="#"
              className="text-xl text-gray-300 hover:font-semibold hover:text-white active:font-semibold active:text-white transition duration-500"
            >
              Event Builder
            </a>
            <a
              href="#"
              className="text-xl text-gray-300 hover:font-semibold hover:text-white active:font-semibold active:text-white transition duration-500"
            >
              Saved
            </a>
            <button className="text-xl text-gray-300 hover:font-semibold hover:text-white active:font-semibold active:text-white transition duration-500">
              Contact US
            </button>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
