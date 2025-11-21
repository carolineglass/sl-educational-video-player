"use client";

import { useState, useEffect } from "react";
import SplashScreen from "./SplashScreen";

/** localStorage key for tracking splash dismissal */
const SPLASH_DISMISSED_KEY = "knacky-splash-dismissed";

interface SplashWrapperProps {
  children: React.ReactNode;
}

/**
 * Wraps the entire app to manage splash screen visibility.
 * This prevents the header/content from flashing before we know
 * whether to show the splash.
 */
export default function SplashWrapper({ children }: SplashWrapperProps) {
  // null = not yet checked, true = show splash, false = show app
  const [showSplash, setShowSplash] = useState<boolean | null>(null);

  // Check localStorage on mount to determine splash visibility
  useEffect(() => {
    const dismissed = localStorage.getItem(SPLASH_DISMISSED_KEY) === "true";
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShowSplash(!dismissed);
  }, []);

  // Prevent background scrolling when splash is visible
  useEffect(() => {
    if (showSplash) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [showSplash]);

  /** Dismiss splash and persist to localStorage */
  const handleGetStarted = () => {
    localStorage.setItem(SPLASH_DISMISSED_KEY, "true");
    setShowSplash(false);
  };

  // Render nothing until localStorage check completes (prevents flash)
  if (showSplash === null) {
    return null;
  }

  // Show splash screen (hides header and all content)
  if (showSplash) {
    return <SplashScreen onGetStarted={handleGetStarted} />;
  }

  // Show the app content
  return <>{children}</>;
}
