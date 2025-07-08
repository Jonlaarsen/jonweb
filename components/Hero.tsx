"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  SiBootstrap,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

// Custom hook to detect screen size
const useScreenSize = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return isMobile;
};

// Offsets (dx, dy) in px around the text
const Icons = [
  {
    id: 1,
    icon: <SiJavascript className="h-5 w-5 md:h-9 md:w-9" />,
    dx: { mobile: -140, desktop: -320 },
    dy: { mobile: -120, desktop: -150 },
    color: "text-black dark:text-cyan-200",
  },
  {
    id: 2,
    icon: <SiTypescript className="h-5 w-5 md:h-9 md:w-9" />,
    dx: { mobile: 140, desktop: 320 },
    dy: { mobile: -120, desktop: -150 },
    color: "text-black dark:text-cyan-200",
  },
  {
    id: 3,
    icon: <SiNextdotjs className="h-5 w-5 md:h-9 md:w-9" />,
    dx: { mobile: -120, desktop: -320 },
    dy: { mobile: 80, desktop: 80 },
    color: "text-black dark:text-cyan-200",
  },
  {
    id: 4,
    icon: <SiReact className="h-5 w-5 md:h-9 md:w-9" />,
    dx: { mobile: 120, desktop: 320 },
    dy: { mobile: 80, desktop: 80 },
    color: "text-black dark:text-cyan-200",
  },
  {
    id: 5,
    label: "tailwind",

    icon: <SiTailwindcss className="h-5 w-5 md:h-9 md:w-9" />,
    dx: { mobile: 80, desktop: 120 },
    dy: { mobile: 190, desktop: 250 },
    color: "text-black dark:text-cyan-200",
  },

  {
    id: 6,
    label: "github",
    icon: <SiGithub className="h-5 w-5 md:h-9 md:w-9" />,
    dx: { mobile: -80, desktop: -120 },
    dy: { mobile: 190, desktop: 250 },
    color: "text-black dark:text-cyan-200",
  },

  {
    id: 7,
    icon: <SiBootstrap className="h-5 w-5 md:h-9 md:w-9" />,
    dx: { mobile: 80, desktop: 120 },
    dy: { mobile: -220, desktop: -250 },
    color: "text-black dark:text-cyan-200",
  },
  {
    id: 8,
    icon: <SiHtml5 className="h-5 w-5 md:h-9 md:w-9" />,
    dx: { mobile: -80, desktop: -120 },
    dy: { mobile: -220, desktop: -250 },
    color: "text-black dark:text-cyan-200",
  },
];

const Hero = () => {
  const isMobile = useScreenSize();

  return (
    <div className="min-h-screen h-full w-full relative  flex justify-center items-center">
      {/* Animated Icons around center */}
      {Icons.map((icon, i) => (
        <motion.div
          key={icon.id}
          className={`absolute text-4xl ${icon.color} z-0`}
          initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
          animate={{
            x: isMobile ? icon.dx.mobile : icon.dx.desktop,
            y: isMobile ? icon.dy.mobile : icon.dy.desktop,
            scale: 4,
            opacity: 1,
            rotate: 360,
          }}
          transition={{
            delay: 0.5 + i * 0.25,
            type: "spring",
            stiffness: 80,
            damping: 12,
            ease: "easeIn",
          }}
        >
          <div className="hover:scale-110 duration-200 ease-in-out cursor-pointer">
            {icon.icon}
          </div>
        </motion.div>
      ))}

      {/* Main Hero Content */}
      <h1 className="relative z-10 mb-5 text-black dark:text-white text-6xl sm:text-8xl font-bold animate-fade-in">
        WELCOME
      </h1>
    </div>
  );
};

export default Hero;
