"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "./MagneticButton";

const FRAME_COUNT = 240;
const FPS = 30;

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      const paddedIndex = i.toString().padStart(3, "0");
      img.src = `/images/HeroSection/ezgif-frame-${paddedIndex}.png`;
      loadedImages.push(img);
    }
    setImages(loadedImages);

    if (loadedImages[0]) {
      loadedImages[0].onload = () => setImagesLoaded(true);
      setTimeout(() => setImagesLoaded(true), 100);
    }
  }, []);

  // Animation Loop
  useEffect(() => {
    if (!imagesLoaded) return;

    let animationId: number;
    let lastTime = 0;
    const interval = 1000 / FPS;

    const animate = (time: number) => {
      if (time - lastTime >= interval) {
        setCurrentFrame((prev) => (prev + 1) % FRAME_COUNT);
        lastTime = time;
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [imagesLoaded]);

  // Draw current frame
  const drawImage = (index: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !images[index]) return;

    const img = images[index];
    if (!img.complete || img.naturalWidth === 0) return;

    if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.naturalWidth / img.naturalHeight;

    let renderWidth = canvas.width;
    let renderHeight = canvas.height;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      renderHeight = canvas.width / imgRatio;
      offsetY = (canvas.height - renderHeight) / 2;
    } else {
      renderWidth = canvas.height * imgRatio;
      offsetX = (canvas.width - renderWidth) / 2;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);
  };

  useEffect(() => {
    if (imagesLoaded) {
      drawImage(currentFrame);
    }
  }, [currentFrame, imagesLoaded]);

  // Text Sections Logic
  const activeSection = Math.floor((currentFrame / FRAME_COUNT) * 4);

  const textVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.5, ease: "easeIn" as const } }
  };

  return (
    <section className="relative w-full h-screen bg-asphalt overflow-hidden">
      {/* Canvas for image sequence */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 w-full h-full object-cover opacity-80"
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-asphalt/60 via-asphalt/20 to-asphalt/90 z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_var(--color-asphalt)_100%)] opacity-80 z-10" />

      <div className="relative z-30 w-full flex flex-col justify-center h-full px-[10vw] md:px-[15vw] lg:px-[25vw]">
        <AnimatePresence mode="wait">
          {activeSection === 0 && (
            <motion.div 
              key="intro"
              variants={textVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex flex-col items-start gap-6 max-w-4xl"
            >
              <h1 className="text-5xl md:text-7xl lg:text-[7rem] font-bold tracking-tighter text-chrome uppercase leading-[0.9]">
                Pure.
              </h1>
              <h1 className="text-5xl md:text-7xl lg:text-[7rem] font-bold tracking-tighter text-chrome uppercase leading-[0.9] -mt-6">
                Unfiltered.
              </h1>
              <h1 className="text-5xl md:text-7xl lg:text-[7rem] font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-guards-red to-[#ff4d4d] uppercase leading-[0.9] -mt-6">
                Unapologetic.
              </h1>
              <div className="w-24 h-1 bg-guards-red mt-2 mb-4" />
              <p className="text-lg md:text-xl text-silver max-w-xl font-light tracking-wide leading-relaxed">
                The Porsche 911 R. A tribute to the art of driving, stripped of the unnecessary, engineered for the soul.
              </p>
            </motion.div>
          )}

          {activeSection === 1 && (
            <motion.div 
              key="engine"
              variants={textVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex flex-col items-start gap-4 max-w-3xl"
            >
              <h2 className="text-sm md:text-base text-guards-red uppercase tracking-[0.3em] font-medium">Power & Precision</h2>
              <h3 className="text-4xl md:text-6xl font-bold tracking-tighter text-chrome uppercase leading-[1]">
                Naturally Aspirated Masterpiece
              </h3>
              <p className="text-lg text-silver mt-4 max-w-xl font-light">
                A 4.0-liter flat-six engine revving to 8,500 rpm. 500 horsepower delivered with razor-sharp response and an unforgettable acoustic signature.
              </p>
            </motion.div>
          )}

          {activeSection === 2 && (
            <motion.div 
              key="trans"
              variants={textVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex flex-col items-start gap-4 max-w-3xl"
            >
              <h2 className="text-sm md:text-base text-guards-red uppercase tracking-[0.3em] font-medium">The Human Element</h2>
              <h3 className="text-4xl md:text-6xl font-bold tracking-tighter text-chrome uppercase leading-[1]">
                Six-Speed Manual
              </h3>
              <p className="text-lg text-silver mt-4 max-w-xl font-light">
                An intimate connection between driver and machine. Short throws, precise engagement, and the pure satisfaction of mastering the shift.
              </p>
            </motion.div>
          )}

          {activeSection === 3 && (
            <motion.div 
              key="light"
              variants={textVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex flex-col items-start gap-4 max-w-3xl"
            >
              <h2 className="text-sm md:text-base text-guards-red uppercase tracking-[0.3em] font-medium">Diet of Champions</h2>
              <h3 className="text-4xl md:text-6xl font-bold tracking-tighter text-chrome uppercase leading-[1]">
                Weightless Engineering
              </h3>
              <p className="text-lg text-silver mt-4 max-w-xl font-light">
                Carbon fiber hood and fenders. Magnesium roof. Reduced sound deadening. At 1,370 kg, it's a lesson in extreme weight reduction.
              </p>
              <div className="mt-8 flex gap-4">
                <MagneticButton text="Experience the Purist" variant="primary" className="!p-[0.6rem]" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
