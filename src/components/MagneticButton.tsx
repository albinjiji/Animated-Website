"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
  text: string;
  variant?: "primary" | "outline";
  className?: string;
}

export default function MagneticButton({ text, variant = "primary", className = "" }: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = buttonRef.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  // Simplify button padding and structure
  const baseStyles = "relative inline-flex items-center justify-center px-12 py-5 rounded-full font-sans font-medium tracking-[0.1em] text-sm uppercase transition-all duration-300 overflow-hidden group cursor-pointer border";
  
  const variants = {
    primary: "bg-chrome text-asphalt border-transparent shadow-lg hover:border-guards-red/30",
    outline: "bg-transparent text-silver border-silver/30 hover:border-guards-red/50",
  };

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onMouseEnter={handleMouseEnter}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {/* Modern fill animation from bottom center */}
      <motion.div
        className="absolute inset-0 bg-guards-red z-0"
        initial={{ y: "100%" }}
        animate={{ y: isHovered ? "0%" : "100%" }}
        transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
      />
      
      {/* Text wrapper */}
      <span className={`relative z-10 ${isHovered ? 'text-[#F5F5F5]' : ''} transition-colors duration-300`}>
        {text}
      </span>
    </motion.button>
  );
}
