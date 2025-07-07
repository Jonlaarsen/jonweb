"use client";
import { cn } from "../lib/utils";
import React, {
  createContext,
  useState,
  useContext,
  useRef,
  useEffect,
} from "react";
import Image from "next/image";
import Link from "next/link";

const MouseEnterContext = createContext(undefined);

export const CardContainer = ({ children, className, containerClassName }) => {
  const containerRef = useRef(null);
  const [isMouseEntered, setIsMouseEntered] = useState(false);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25;
    const y = (e.clientY - top - height / 2) / 25;
    containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
  };

  const handleMouseEnter = (e) => {
    setIsMouseEntered(true);
    if (!containerRef.current) return;
  };

  const handleMouseLeave = (e) => {
    if (!containerRef.current) return;
    setIsMouseEntered(false);
    containerRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
  };
  return (
    <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
      <div
        className={cn(
          "py-5 flex items-center justify-center",
          containerClassName
        )}
        style={{
          perspective: "1000px",
        }}
      >
        <div
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={cn(
            "flex items-center justify-center relative transition-all duration-200 ease-linear",
            className
          )}
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  );
};

export const CardBody = ({ children, className }) => {
  return (
    <div
      className={cn(
        "h-96 w-96 [transform-style:preserve-3d]  [&>*]:[transform-style:preserve-3d]",
        className
      )}
    >
      {children}
    </div>
  );
};

export const CardItem = ({
  as: Tag = "div",
  children,
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  ...rest
}) => {
  const ref = useRef(null);
  const [isMouseEntered] = useMouseEnter();

  useEffect(() => {
    handleAnimations();
  }, [isMouseEntered]);

  const handleAnimations = () => {
    if (!ref.current) return;
    if (isMouseEntered) {
      ref.current.style.transform = `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
    } else {
      ref.current.style.transform = `translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`;
    }
  };

  return (
    <Tag
      ref={ref}
      className={cn("w-fit transition duration-200 ease-linear", className)}
      {...rest}
    >
      {children}
    </Tag>
  );
};

// Create a hook to use the context
export const useMouseEnter = () => {
  const context = useContext(MouseEnterContext);
  if (context === undefined) {
    throw new Error("useMouseEnter must be used within a MouseEnterProvider");
  }
  return context;
};

export function ThreeDCard({ item }) {
  return (
    <CardContainer className=" inter-var ">
      <CardBody className="hover:shadow-2xl border-2 dark:border-cyan-200 bg-amber-100/50 dark:bg-violet-900/10  relative group/card  w-auto sm:w-[40rem] md:w-[47rem] lg:w-[40rem] h-auto 2xl:w-[35rem]  p-6 ">
        <CardItem translateZ={50} className="text-3xl font-bold uppercase  ">
          {item.title}
        </CardItem>
        <CardItem
          as="p"
          translateZ={60}
          className=" text-sm px-5 mt-2 min-h-[5rem] dark:text-neutral-300"
        >
          {item.desc}
        </CardItem>
        <CardItem translateZ={100} className="w-full mt-4">
          <Image
            src={item.image}
            height={1000}
            width={1000}
            className="h-60 sm:h-89 object-top lg:h-79 w-full object-cover border-2 border-black dark:border-cyan-200 2xl:object-contain  group-hover/card:shadow-xl"
            alt={item.title}
          />
        </CardItem>
        <div className="flex justify-between items-center mt-5">
          {item.link ? (
            <CardItem
              translateZ={20}
              as={Link}
              href={item.link}
              target="__blank"
              className="px-4 py-2  text-xs font-normal "
            >
              View Project →
            </CardItem>
          ) : (
            <div className="text-xs font-normal">Coming Soon!</div>
          )}
          <CardItem
            translateZ={20}
            as="p"
            className="px-4 py-2 rounded-xl border border-white/50 bg-red-400/50 dark:bg-red-400/20 text-white text-xs font-bold"
          >
            {item.details}
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
