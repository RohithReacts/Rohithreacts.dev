"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import { WelcomeScreen } from "./welcome-screen";

export function SplashManager({ children }: { children: React.ReactNode }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isVisible && <WelcomeScreen key="welcome" />}
      </AnimatePresence>
      <div
        className={`transition-opacity duration-1000 ${
          isVisible ? "opacity-0" : "opacity-100"
        }`}
      >
        {!isVisible && children}
        {/* Render children only when not visible to prevent layout shifts or interactions while splash is on */}
        {isVisible && (
          <div className="invisible fixed inset-0 overflow-hidden">
            {children}
          </div>
        )}
      </div>
    </>
  );
}
