"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export const CustomCursor = () => {
  const [mounted, setMounted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth movement with a slight professional lag
  const springConfig = { damping: 35, stiffness: 250 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Detect if we are hovering over interactive elements
      const target = e.target as HTMLElement;
      setIsHovering(
        !!target.closest("a") || 
        !!target.closest("button") || 
        target.tagName.toLowerCase() === "button"
      );
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] hidden lg:block"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      {/* Outer Glow Ring */}
      <motion.div
        animate={{
          scale: isHovering ? 2 : 1,
          opacity: isHovering ? 0.3 : 0.2,
          borderWidth: isHovering ? "1px" : "0px",
        }}
        className="absolute inset-0 m-auto w-10 h-10 bg-primary/20 rounded-full blur-[2px] border-primary/50 transition-all duration-300"
      />
      
      {/* Precision Dot */}
      <motion.div
        animate={{
          scale: isHovering ? 0 : 1,
          opacity: isHovering ? 0 : 1,
        }}
        className="absolute inset-0 m-auto w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_8px_rgba(var(--primary),0.4)]"
      />
    </motion.div>
  );
};
