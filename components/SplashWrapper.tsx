"use client";

import { useState, useEffect } from "react";
import SplashScreen from "./SplashScreen";

const SPLASH_DISMISSED_KEY = "knacky-splash-dismissed";

interface SplashWrapperProps {
  children: React.ReactNode;
}

export default function SplashWrapper({ children }: SplashWrapperProps) {
  const [showSplash, setShowSplash] = useState<boolean | null>(null);

  useEffect(() => {
    const dismissed = localStorage.getItem(SPLASH_DISMISSED_KEY) === "true";
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShowSplash(!dismissed);
  }, []);

  useEffect(() => {
    if (showSplash) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showSplash]);

  const handleGetStarted = () => {
    localStorage.setItem(SPLASH_DISMISSED_KEY, "true");
    setShowSplash(false);
  };

  // Show nothing until we've checked localStorage
  if (showSplash === null) {
    return null;
  }

  // Show splash screen over everything
  if (showSplash) {
    return <SplashScreen onGetStarted={handleGetStarted} />;
  }

  // Show the app
  return <>{children}</>;
}
