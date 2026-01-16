"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function WelcomeScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-100 flex items-center justify-center overflow-hidden bg-zinc-900"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Full Screen Background Image */}
      <img
        src="/images/welcome.jpg"
        alt="Welcome Background"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-black/40" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="absolute bottom-12 z-20 flex flex-col items-center gap-3"
      >
        <Avatar className="size-16 border-2 border-white/20 rounded-xl">
          <AvatarImage src="/images/rohith.png" />
          <AvatarFallback className="rounded-xl">RK</AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-center">
          <span className="text-sm font-medium tracking-widest text-white/90">
            Rohith Kumar
          </span>
          <span className="text-[12px] font-medium text-white/50  tracking-[0.2em]">
            Full Stack Developer
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
