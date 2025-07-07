"use client";
import React from "react";
import { useTheme } from "./ThemeProvider";
import { FaMoon, FaSun } from "react-icons/fa";
import { LuCodesandbox } from "react-icons/lu";
import { motion } from "motion/react";

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="transition-all duration-200 z-50 relative text-black dark:text-white">
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="absolute flex top-4 left-4 gap-1 text-3xl font-bold border-b-4"
      >
        JL-Studios
        <LuCodesandbox className="h-10 w-10" />
      </motion.div>
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="fixed top-0 right-0 px-2 py-2 text-end dark:bg-[#2e282e] bg-emerald-100 rounded-bl-2xl border-l-2 border-b-2"
      >
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full border-2 mb-4 bg-transparent  shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? (
            <FaMoon className="w-5 h-5 " />
          ) : (
            <FaSun className="w-5 h-5  border-white" />
          )}
        </button>
        <nav className="flex flex-col items-center gap-4">
          <ul className="flex flex-col gap-2  ">
            <li className="cursor-pointer duration-200 hover:scale-105 ">
              <button onClick={() => scrollToSection("home")}>home</button>
            </li>
            <li className="cursor-pointer duration-200 hover:scale-105 ">
              <button onClick={() => scrollToSection("about")}>about</button>
            </li>
            <li className="cursor-pointer duration-200 hover:scale-105  ">
              <button onClick={() => scrollToSection("portfolio")}>portfolio</button>
            </li>
            <li className="cursor-pointer duration-200 hover:scale-105 ">
              <button onClick={() => scrollToSection("contact")}>contact</button>
            </li>
          </ul>
        </nav>
      </motion.div>
    </div>
  );
};

export default Header;
