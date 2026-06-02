"use client";
import { useEffect, useState } from "react";

type Petal = {
  id: number; left: string; delay: string;
  duration: string; size: string; color: string;
};

const COLORS = [
  "rgba(212,165,165,.5)",
  "rgba(201,169,110,.4)",
  "rgba(138,158,139,.35)",
  "rgba(232,213,170,.45)",
];

export default function FloatingPetals() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const generated: Petal[] = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 12}s`,
      duration: `${10 + Math.random() * 10}s`,
      size: `${8 + Math.random() * 8}px`,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));
    setPetals(generated);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden">
      {petals.map(p => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            top: "-20px",
            left: p.left,
            width: p.size,
            height: `calc(${p.size} * 1.6)`,
            borderRadius: "60% 40% 50% 50%",
            background: p.color,
            animationName: "floatPetal",
            animationDuration: p.duration,
            animationDelay: p.delay,
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
          }}
        />
      ))}
    </div>
  );
}
