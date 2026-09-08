import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function MagneticCursor() {
  const cursorRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Track the mouse coordinates
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out the movement with spring physics
  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // If hovering a magnetic element, snap to its center instead of following the mouse
      const target = e.target.closest(".magnetic-target");
      
      if (target) {
        setIsHovered(true);
        const rect = target.getBoundingClientRect();
        // Calculate the center point of the button/target
        mouseX.set(rect.left + rect.width / 2);
        mouseY.set(rect.top + rect.height / 2);
      } else {
        setIsHovered(false);
        // Otherwise, perfectly follow the mouse coordinates
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <>
      {/* The Magnetic Custom Cursor */}
      <motion.div
        ref={cursorRef}
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 2.5 : 1, // Expands when magnetizing
          backgroundColor: isHovered ? "rgba(255,255,255,0.2)" : "#000",
          border: isHovered ? "1px solid #000" : "none"
        }}
        className="fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-50 mix-blend-difference transitions-all duration-150"
      />

      {/* Example Target Button */}
      <div className="flex justify-center items-center h-screen">
        <button className="magnetic-target px-6 py-3 bg-blue-600 text-white rounded-lg font-medium transition-transform duration-200 active:scale-95">
          Hover Me (Magnetic)
        </button>
      </div>
    </>
  );
}
