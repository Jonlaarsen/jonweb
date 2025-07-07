"use client";
import About from "@/components/About";
import Hero from "@/components/Hero";
import { HeroParallaxCard } from "@/components/ui/Portfolio-data";
import { ThreeDCard } from "@/components/ui/3DCard";
import { Portfolio } from "@/data/data";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { TriangleBlobBackground } from "@/components/ui/TriangleBlob";
import { motion } from "motion/react";

export default function Home() {
  return (
    <div
      id="home"
      className="flex flex-col overflow-hidden transition-colors duration-200 min-h-screen items-center justify-center relative"
    >
      <TriangleBlobBackground />
      <Hero />
      <div id="about">
        <About />
      </div>
      <HeroParallaxCard products={Portfolio} />
      <div className="w-full bg-[#ffdfda] border-y-4 dark:border-cyan-200 border-black dark:bg-[#2a2423] py-10 mt-20 ">
        <h1 className="text-7xl underline text-center w-full md:text-9xl font-bold py-30 text-black dark:text-cyan-200">
          Portfolio
        </h1>
        <div
          id="portfolio"
          className="justify-evenly w-full px-2 grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 md:gap-5"
        >
          {Portfolio.map((item, index) => (
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              key={index}
            >
              <ThreeDCard item={item} />
            </motion.div>
          ))}
        </div>
      </div>
      <div id="contact">
        <Contact />
      </div>
      <Footer />
    </div>
  );
}
