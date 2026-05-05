"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Image from "next/image";

const Counter = ({ value, label, delay }: { value: string; label: string; delay: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-start glass-dark p-[0.4rem] pl-8 rounded-2xl border border-white/5 hover:border-guards-red/30 transition-all duration-500 relative overflow-hidden group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-guards-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <span className="text-4xl lg:text-5xl font-bold text-chrome mb-2 tracking-tighter relative z-10">{value}</span>
      <span className="text-xs text-silver uppercase tracking-[0.2em] relative z-10 font-medium">{label}</span>
    </motion.div>
  );
};

export default function WeightlessEngineering() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yTitle = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const yCopy = useTransform(scrollYProgress, [0, 1], [200, -200]);
  const yImage = useTransform(scrollYProgress, [0, 1], [50, -100]);
  const scaleImage = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 1.1]);

  return (
    <section ref={containerRef} className="relative w-full min-h-[120vh] bg-asphalt flex items-center py-32 overflow-hidden">
      
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-guards-red/5 rounded-full blur-[150px] opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-carbon-lighter rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[90rem] mx-auto px-8 md:px-16 lg:px-24 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <div className="flex flex-col gap-12">
            <motion.div style={{ y: yTitle }}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-px bg-guards-red" />
                <span className="text-guards-red uppercase tracking-[0.3em] text-xs font-bold">Philosophy</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-bold text-chrome tracking-tighter leading-[1.1]">
                Gravity is<br />Merely a <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-guards-red to-white">Suggestion.</span>
              </h2>
            </motion.div>
            
            <motion.div style={{ y: yCopy }} className="space-y-6">
              <p className="text-lg text-silver max-w-md font-light leading-relaxed">
                By discarding heavy sound insulation, rear seats, and the radio, we didn't just remove weight; we removed the barrier between you and the road.
              </p>
              <p className="text-lg text-silver max-w-md font-light leading-relaxed">
                The result is a visceral, unfiltered driving experience where every mechanical vibration is transmitted directly to your senses.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
              <Counter value="500 HP" label="4.0L Flat-Six" delay={0} />
              <Counter value="1,370 kg" label="Unladen Weight" delay={0.2} />
              <Counter value="3.7s" label="0-60 mph" delay={0.4} />
              <Counter value="8,250" label="Max RPM" delay={0.6} />
            </div>
          </div>

          {/* 3D Exploded View Image */}
          <motion.div style={{ y: yImage, scale: scaleImage }} className="relative h-[600px] lg:h-[800px] w-full flex items-center justify-center">
            <div className="relative w-full h-full rounded-3xl overflow-hidden group border border-white/5 shadow-2xl">
              <Image 
                src="/images/engine.png"
                alt="911 R Minimalist Architecture"
                fill
                className="object-cover object-center transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-asphalt via-transparent to-transparent opacity-80" />
               
              <div className="absolute bottom-8 left-8 flex items-center gap-4">
                 <div className="w-8 h-8 rounded-full border border-guards-red flex items-center justify-center">
                   <div className="w-2 h-2 bg-guards-red rounded-full animate-ping" />
                 </div>
                 <div className="text-chrome font-mono text-xs uppercase tracking-widest bg-black/50 px-4 py-2 rounded-full backdrop-blur-md">
                   Fig 1. Minimalist Architecture
                 </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
