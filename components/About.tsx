"use client";
import React from "react";
import { motion } from "framer-motion";
import { LuCodesandbox } from "react-icons/lu";

const About = () => {
  return (
    <div className="text-black ">
      <div className="w-full flex items-center px-10 bg-[#cfeaff] dark:text-cyan-200 border-y-4 border-black dark:border-cyan-200 dark:bg-[#1e2225] h-full min-h-[70vh] -skew-y-6 ">
        <motion.h1
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-7xl sm:text-8xl font-semibold flex items-center gap-2 "
        >
          Who is JL-Studios
          <LuCodesandbox className="hidden md:block md:h-25 md:w-25" /> ?
        </motion.h1>
      </div>
      <div className="w-full flex items-center px-10 bg-[#cfeaff] dark:text-white border-y-4 border-black dark:border-cyan-200 dark:bg-[#1e2225]  h-full min-h-[70vh] skew-y-6 ">
        <motion.h1
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-2xl font-semibold"
        >
          I’m Jon. A frontend web developer on a mission to build sleek,
          intuitive interfaces that delight users. When I’m not translating
          design into pixel-perfect code, I’m globe-trotting on spontaneous
          adventures, getting my hands greasy on vintage motorbike restorations,
          or scoping out the latest trends in fashion for fresh inspiration.
          Let’s team up and turn bold ideas into beautiful digital experiences!
        </motion.h1>
      </div>
    </div>
  );
};

export default About;
