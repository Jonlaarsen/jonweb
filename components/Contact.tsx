"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  SiGmail,
  SiLinkedin,
  SiGithub,
  SiReact,
  SiJavascript,
  SiTypescript,
} from "react-icons/si";
import {
  FaLaptopCode,
  FaMailBulk,
  FaPeopleArrows,
  FaPhoneSquare,
} from "react-icons/fa";

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

const Contact = () => {
  const isMobile = useScreenSize();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("");

    try {
      // Create mailto link with form data
      const mailtoLink = `mailto:jontoftdallarsen@icloud.com?subject=${encodeURIComponent(
        formData.subject
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;

      // Open default email client
      window.location.href = mailtoLink;

      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    {
      name: "Email",
      icon: <SiGmail className="text-2xl" />,
      href: "mailto:jontoftdallarsen@icloud.com",
      color: "hover:text-red-500",
    },
    {
      name: "LinkedIn",
      icon: <SiLinkedin className="text-2xl" />,
      href: "https://www.linkedin.com/in/jon-larsen-48b928187",
      color: "hover:text-blue-600",
    },
    {
      name: "GitHub",
      icon: <SiGithub className="text-2xl" />,
      href: "https://github.com/Jonlaarsen",
      color: "hover:text-gray-800 dark:hover:text-white",
    },
  ];

  const techIcons = [
    {
      icon: <FaPeopleArrows className="h-7 w-7 md:h-9 md:w-9" />,
      delay: 0.5,
      dx: { mobile: 20, desktop: 20 },
      dy: { mobile: -250, desktop: -300 },
    },
    {
      icon: <FaPhoneSquare className="h-7 w-7 md:h-9 md:w-9" />,
      delay: 0.8,
      dx: { mobile: 130, desktop: -160 },
      dy: { mobile: -190, desktop: -250 },
    },
    {
      icon: <FaLaptopCode className="h-7 w-7 md:h-9 md:w-9" />,
      delay: 1.1,
      dx: { mobile: -140, desktop: 220 },
      dy: { mobile: -180, desktop: -240 },
    },
    {
      icon: <FaPeopleArrows className="h-7 w-7 md:h-9 md:w-9" />,
      delay: 1.4,
      dx: { mobile: 20, desktop: 20 },
      dy: { mobile: 220, desktop: 260 },
    },
    {
      icon: <FaPhoneSquare className="h-7 w-7 md:h-9 md:w-9" />,
      delay: 1.7,
      dx: { mobile: -120, desktop: -160 },
      dy: { mobile: 150, desktop: 180 },
    },
    {
      icon: <FaLaptopCode className="h-7 w-7 md:h-9 md:w-9" />,
      delay: 2.0,
      dx: { mobile: 140, desktop: 220 },
      dy: { mobile: 160, desktop: 190 },
    },
  ];

  return (
    <AnimatePresence mode="wait">
      <div className="flex flex-col items-center justify-center dark:bg-[#252530] bg-violet-100 w-[100vw]">
        <h1 className="text-7xl underline md:text-9xl font-bold pb-10 pt-20 text-black dark:text-cyan-200">
          Contact
        </h1>
        <div className="min-h-screen w-full  grid grid-cols-1 lg:grid-cols-2 px-5 pb-10">
          <div className="h-[70vh] mb-20 sm:mb-0 sm:h-screen w-full relative pt-40 flex justify-center items-center">
            {/* Animated Icons around center */}
            {techIcons.map((icon, i) => (
              <motion.div
                key={i}
                className="absolute text-4xl z-0 text-blue-500/50 dark:text-cyan-200"
                initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                whileInView={{
                  x: isMobile ? icon.dx.mobile : icon.dx.desktop,
                  y: isMobile ? icon.dy.mobile : icon.dy.desktop,
                  scale: isMobile ? 3 : 2.5,
                  opacity: 1,
                  rotate: 360,
                }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  delay: icon.delay,
                  type: "spring",
                  stiffness: 80,
                  damping: 12,
                  ease: "easeIn",
                }}
              >
                {icon.icon}
              </motion.div>
            ))}

            {/* Laptop Image */}
            <div className="relative z-10 mb-5 text-black dark:text-white text-6xl sm:text-8xl font-bold animate-fade-in">
              <img
                src="https://static.vecteezy.com/system/resources/previews/008/853/677/non_2x/3d-illustration-laptop-free-png.png"
                alt=""
                className="block max-w-sm sm:max-w-lg"
              />
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <motion.div
            className="flex items-center justify-center p-10"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="w-full max-w-md space-y-8">
              {/* Header */}
              <div className="text-center">
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  Get In Touch
                </h2>
                <p className="text-gray-600 dark:text-cyan-200">
                  Let's work together on your next project
                </p>
              </div>

              {/* Social Links */}
              <div className="flex justify-center space-x-6">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-full border-2 dark:border-cyan-200 dark:bg-gray-800 transition-all duration-300 ${link.color} hover:scale-110`}
                    whileHover={{ y: -5 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>

              {/* Contact Form */}
              <motion.form
                onSubmit={handleSubmit}
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 dark:border-cyan-200 rounded-lg focus:ring-2 focus:ring-none focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 dark:border-cyan-200 rounded-lg focus:ring-2 focus:ring-none focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 dark:border-cyan-200 rounded-lg focus:ring-2 focus:ring-none focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300"
                      placeholder="Project inquiry"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 placeholder:text-gray-700 dark:placeholder:text-gray-300 border-2 dark:border-cyan-200 rounded-lg focus:ring-2 focus:ring-none focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300 resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full  bg-black dark:bg-cyan-500  text-white py-3 px-6 rounded-lg font-semibold  hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </motion.button>

                {/* Status Message */}
                {submitStatus && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`text-center p-3 rounded-lg ${
                      submitStatus === "success"
                        ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                        : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                    }`}
                  >
                    {submitStatus === "success"
                      ? "Message sent successfully! Check your email client."
                      : "Failed to send message. Please try again."}
                  </motion.div>
                )}
              </motion.form>

              {/* Additional Info */}
              <motion.div
                className="text-center text-sm text-gray-500 dark:text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <p>I'll get back to you within 24 hours</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default Contact;
