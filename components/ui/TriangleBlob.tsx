"use client";

import { useEffect, useRef } from "react";

interface TriangleBlobProps {
  className?: string;
  size?: number;
  color?: string;
  animationDuration?: number;
  delay?: number;
}

export default function TriangleBlob({
  className = "",
  size = 200,
  color = "rgba(59, 130, 246, 0.1)",
  animationDuration = 20,
  delay = 0,
}: TriangleBlobProps) {
  const blobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const blob = blobRef.current;
    if (!blob) return;

    let animationId: number;
    let startTime = Date.now() + delay;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress =
        (elapsed % (animationDuration * 1000)) / (animationDuration * 1000);

      // Create smooth floating animation
      const x = Math.sin(progress * Math.PI * 2) * 30;
      const y = Math.cos(progress * Math.PI * 2) * 20;
      const rotation = progress * 360;
      const scale = 1 + Math.sin(progress * Math.PI * 4) * 0.1;

      blob.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg) scale(${scale})`;

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [animationDuration, delay]);

  return (
    <div
      ref={blobRef}
      className={`absolute pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        transition: "transform 0.1s ease-out",
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id="triangleGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor={color} />
            <stop offset="50%" stopColor={color.replace("0.1", "0.2")} />
            <stop offset="100%" stopColor={color} />
          </linearGradient>
        </defs>
        <path
          d="M50 10 L90 90 L10 90 Z"
          fill="url(#triangleGradient)"
          stroke={color.replace("0.1", "0.3")}
          strokeWidth="0.5"
        />
      </svg>
    </div>
  );
}

export function TriangleBlobBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Large triangle blobs */}
      <TriangleBlob
        className="top-10 left-10 "
        size={300}
        color="rgba(59, 130, 246, 0.04)"
        animationDuration={25}
        delay={0}
      />
      <TriangleBlob
        className="top-20 right-20"
        size={250}
        color="rgba(147, 51, 234, 0.04)"
        animationDuration={30}
        delay={5000}
      />
      <TriangleBlob
        className="bottom-20 left-20"
        size={200}
        color="rgba(236, 72, 153, 0.04)"
        animationDuration={22}
        delay={10000}
      />

      {/* Medium triangle blobs */}
      <TriangleBlob
        className="top-1/3 left-1/4"
        size={150}
        color="rgba(34, 197, 94, 0.06)"
        animationDuration={18}
        delay={2000}
      />
      <TriangleBlob
        className="top-2/3 right-1/3"
        size={180}
        color="rgba(245, 158, 11, 0.06)"
        animationDuration={28}
        delay={8000}
      />

      {/* Small triangle blobs */}
      <TriangleBlob
        className="top-1/2 left-1/2"
        size={100}
        color="rgba(239, 68, 68, 0.05)"
        animationDuration={15}
        delay={3000}
      />
      <TriangleBlob
        className="bottom-1/3 right-1/4"
        size={120}
        color="rgba(6, 182, 212, 0.05)"
        animationDuration={20}
        delay={12000}
      />
    </div>
  );
}
