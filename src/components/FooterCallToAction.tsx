"use client";

import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";

export default function FooterCallToAction() {
  return (
    <footer className="relative w-full py-40 bg-carbon overflow-hidden border-t border-silver/5">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-guards-red to-transparent opacity-50" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-xl h-32 bg-guards-red/10 blur-[100px] rounded-full" />
      <div className="absolute inset-0 noise-overlay opacity-30 z-0" />

      <div className="relative z-10 max-w-[90rem] mx-auto px-8 md:px-16 lg:px-24 text-center flex flex-col items-center gap-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col gap-6"
        >
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-chrome tracking-tighter uppercase leading-none">
            Very Few Will Understand.<br />
            <span className="text-guards-red glow-red-text">Even Fewer Will Own One.</span>
          </h2>
          <p className="text-xl text-silver font-light tracking-wide max-w-2xl mx-auto">
            Production is strictly limited. The legend is forever.
          </p>
        </motion.div>

      </div>

      {/* Copyright/Links */}
      <div className="absolute bottom-8 left-0 w-full px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-silver-dark text-xs font-mono uppercase tracking-widest z-10">
        <div>© {new Date().getFullYear()} Porsche Concept. Not an official site.</div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-chrome transition-colors">Privacy</a>
          <a href="#" className="hover:text-chrome transition-colors">Terms</a>
          <a href="#" className="hover:text-chrome transition-colors">Cookies</a>
        </div>
      </div>
    </footer>
  );
}
