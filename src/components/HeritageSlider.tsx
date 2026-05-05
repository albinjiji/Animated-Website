"use client";

import { useRef } from "react";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import Image from "next/image";

const sliderImages = [
  { id: 1, text: "Alpine Curves", src: "/images/alpine.png" },
  { id: 2, text: "Minimalist Cockpit", src: "/images/cockpit.png" },
  { id: 3, text: "Alpine Curves", src: "/images/alpine.png" },
  { id: 4, text: "Minimalist Cockpit", src: "/images/cockpit.png" },
];

export default function HeritageSlider() {
  const baseX = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const speed = 1; // Pixels per frame

  // Custom infinite scroll animation that supports pausing on hover and dragging
  useAnimationFrame((t, delta) => {
    let moveBy = speed * (delta / 16);
    let newX = baseX.get() - moveBy;
    
    // Wrap around logic (assuming each child set is ~2000px wide depending on screen)
    // For simplicity, we just reset it when it goes too far left
    if (newX <= -2000) {
       newX += 2000;
    }
    
    baseX.set(newX);
  });

  return (
    <section className="relative w-full py-40 bg-asphalt overflow-hidden flex flex-col gap-24">
      
      {/* Quote Overlay */}
      <div className="max-w-[90rem] mx-auto px-8 md:px-16 lg:px-24 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
        >
          <div className="text-guards-red text-6xl font-serif leading-none mb-6">"</div>
          <p className="text-3xl md:text-5xl text-chrome font-light leading-tight">
            The 911 R isn't about being the fastest around the Nürburgring. It's about being the most engaging.
          </p>
          <p className="mt-8 text-silver-dark uppercase tracking-[0.3em] text-sm font-semibold">
            – Porsche Motorsport
          </p>
        </motion.div>
      </div>

      {/* Infinite Carousel with Drag */}
      <div className="relative w-full carousel-mask cursor-grab active:cursor-grabbing">
        <motion.div 
          className="flex gap-8 px-4"
          style={{ x: baseX }}
          drag="x"
          dragConstraints={{ left: -4000, right: 0 }}
          dragElastic={0.1}
          onDrag={(e, info) => {
            // Stop the auto-scroll briefly while dragging (handled by Framer Motion's physics overriding the motion value)
          }}
        >
          {/* First set */}
          <div className="flex gap-8 flex-shrink-0">
            {sliderImages.map((item, i) => (
              <motion.div 
                key={item.id + "-" + i} 
                className="relative w-[300px] md:w-[500px] lg:w-[700px] aspect-[16/9] rounded-2xl overflow-hidden group shadow-2xl border border-white/5"
                whileHover={{ scale: 1.02, transition: { duration: 0.5, ease: "easeOut" } }}
              >
                <Image 
                  src={item.src}
                  alt={item.text}
                  fill
                  className="object-cover object-center transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-asphalt via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-6 left-6 z-10">
                  <span className="text-chrome font-mono text-xs uppercase tracking-[0.2em] bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-md">
                    {item.text}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
          {/* Duplicate set for infinite scroll effect */}
          <div className="flex gap-8 flex-shrink-0">
            {sliderImages.map((item, i) => (
              <motion.div 
                key={"dup-" + item.id + "-" + i} 
                className="relative w-[300px] md:w-[500px] lg:w-[700px] aspect-[16/9] rounded-2xl overflow-hidden group shadow-2xl border border-white/5"
                whileHover={{ scale: 1.02, transition: { duration: 0.5, ease: "easeOut" } }}
              >
                <Image 
                  src={item.src}
                  alt={item.text}
                  fill
                  className="object-cover object-center transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-asphalt via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-6 left-6 z-10">
                  <span className="text-chrome font-mono text-xs uppercase tracking-[0.2em] bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-md">
                    {item.text}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

    </section>
  );
}
