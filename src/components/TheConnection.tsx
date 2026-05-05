"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Image from "next/image";

export default function TheConnection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-20%" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yImage = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section ref={containerRef} className="relative w-full py-32 lg:py-48 bg-carbon overflow-hidden border-t border-white/5">
      
      <div className="max-w-[90rem] mx-auto px-8 md:px-16 lg:px-24 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Static Detail Image with Curtain Reveal */}
          <div className="w-full lg:w-1/2 relative aspect-[4/5] lg:aspect-[3/4] overflow-hidden rounded-3xl group">
            {/* The Curtain Reveal */}
            <motion.div 
              className="absolute inset-0 bg-asphalt z-20 origin-top"
              initial={{ scaleY: 1 }}
              animate={isInView ? { scaleY: 0 } : { scaleY: 1 }}
              transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
            />
            
            <motion.div 
              style={{ y: yImage }}
              className="absolute inset-[-10%] w-[120%] h-[120%]"
            >
              <Image 
                src="/images/shifter.png"
                alt="6-Speed GT Sport Manual"
                fill
                className="object-cover object-center"
              />
            </motion.div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
            
            <div className="absolute bottom-8 left-8 z-10 text-chrome font-mono text-xs uppercase tracking-widest border border-white/20 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full">
              6-Speed GT Sport Manual
            </div>
          </div>

          {/* Copy */}
          <div className="w-full lg:w-1/2 flex flex-col gap-8">
            <div className="overflow-hidden">
              <motion.h2 
                initial={{ y: "100%", opacity: 0 }}
                animate={isInView ? { y: "0%", opacity: 1 } : { y: "100%", opacity: 0 }}
                transition={{ duration: 1, ease: [0.19, 1, 0.22, 1], delay: 0.2 }}
                className="text-5xl md:text-7xl font-bold text-chrome tracking-tighter leading-tight"
              >
                The Ultimate <br />
                <span className="text-guards-red italic pr-4">Connection.</span>
              </motion.h2>
            </div>
            
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
              className="h-[1px] w-32 bg-guards-red origin-left" 
            />
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="space-y-6"
            >
              <p className="text-xl text-silver font-light leading-relaxed">
                In an era of paddle shifters and algorithms, the 911 R demands your full participation. 
              </p>
              <p className="text-xl text-silver font-light leading-relaxed">
                The bespoke 6-speed manual transmission features short, precise throws, putting the mastery of 500 naturally aspirated horses directly into your right hand. Every shift is a mechanical symphony.
              </p>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
