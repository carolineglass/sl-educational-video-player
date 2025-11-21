"use client";

import { useState, useEffect } from "react";
import { Video } from "@/lib/types";
import VideoGrid from "./VideoGrid";

interface HomePageProps {
  videos: Video[];
}

const SPLASH_DISMISSED_KEY = "knacky-splash-dismissed";

export default function HomePage({ videos }: HomePageProps) {
  const [showSplash, setShowSplash] = useState(() => {
    if (typeof window === "undefined") return true;
    return localStorage.getItem(SPLASH_DISMISSED_KEY) !== "true";
  });

  // Prevent background scrolling when splash is shown
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

  // Handle "Get Started" button click on splash modal
  const handleGetStarted = () => {
    localStorage.setItem(SPLASH_DISMISSED_KEY, "true");
    setShowSplash(false);
  };

  return (
    <>
      {showSplash && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="w-[90%] max-w-[1200px] h-[80%] bg-(--color-knacky-splash-background) rounded-2xl flex items-center overflow-auto">
            <div className="w-full px-8 lg:px-16 py-12 lg:py-20">
              <div className="max-w-3xl">
                <h2 className="text-5xl md:text-6xl lg:text-7xl text-black tracking-tight leading-[0.95] mb-8">
                  Get the{" "}
                  <span className="relative inline-block italic">
                    <span className="absolute left-0 right-0 bottom-[15%] h-[20%] bg-knacky-primary z-0" />
                    <span className="relative z-10">knack</span>
                  </span>{" "}
                  for
                  <br />
                  practical life skills
                </h2>
                <p className="text-xl md:text-2xl text-black leading-relaxed max-w-2xl font-serif mb-12">
                  Start building your personal library of favorite how-tos while
                  discovering new, practical knowledge from others.
                </p>
                <button
                  onClick={handleGetStarted}
                  className="bg-knacky-primary text-white px-8 py-3 hover:bg-knacky-primary-hover transition-all active:scale-98 flex items-center gap-2 group"
                >
                  <span className="uppercase tracking-wide text-sm">
                    Get Started
                  </span>
                  <span className="text-xl group-hover:translate-x-1 transition-transform duration-300">
                    →
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Videos</h1>
        </div>

        <VideoGrid videos={videos} />
      </main>
    </>
  );
}
