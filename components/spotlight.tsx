"use client";

import { useEffect, useRef } from "react";
import { motion, useSpring, useMotionValue, useMotionTemplate } from "framer-motion";

export default function Spotlight() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Loose spring for "comet trail" following effect
  const smoothX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  // Motion values for transformation
  const rotate = useMotionValue(0);
  const scaleX = useMotionValue(1);
  const scaleY = useMotionValue(1);

  // Physics state
  const prevPos = useRef({ x: 0, y: 0 });
  const prevAngle = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    let frameId: number;

    const updatePhysics = () => {
      const currentX = smoothX.get();
      const currentY = smoothY.get();

      const dx = currentX - prevPos.current.x;
      const dy = currentY - prevPos.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);

      // Rotation Logic
      if (speed > 0.5) {
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);

        let currentAngle = prevAngle.current;
        let delta = angle - currentAngle;

        // Smart wrap to prevent 360 spin flipping
        while (delta <= -180) delta += 360;
        while (delta > 180) delta -= 360;

        // Smooth rotation easing
        const newAngle = currentAngle + delta * 0.15;

        rotate.set(newAngle);
        prevAngle.current = newAngle;
      }

      // Deformation Logic (Comet Effect)
      // Stretch along movement axis
      const stretch = Math.min(1 + speed * 0.04, 3.0);
      // Squash perpendicular axis
      const squash = Math.max(1 - speed * 0.01, 0.5);

      scaleX.set(stretch);
      scaleY.set(squash);

      prevPos.current = { x: currentX, y: currentY };
      frameId = requestAnimationFrame(updatePhysics);
    };

    frameId = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(frameId);
  }, [smoothX, smoothY, rotate, scaleX, scaleY]);

  // Create a combined transform string to ensure strict order: Translate -> Rotate -> Scale
  // This prevents squashing from always being horizontal regardless of rotation
  const transform = useMotionTemplate`translate3d(${smoothX}px, ${smoothY}px, 0) translate(-50%, -50%) rotate(${rotate}deg) scaleX(${scaleX}) scaleY(${scaleY})`;

  return (
    <motion.div
      className="pointer-events-none fixed z-50 rounded-full"
      style={{
        top: 0,
        left: 0,
        width: 300,
        height: 300,
        background: "radial-gradient(circle closest-side, rgba(255, 255, 255, 0.15), transparent 80%)",
        transform, // Apply the combined transform
        willChange: "transform",
      }}
    />
  );
}
