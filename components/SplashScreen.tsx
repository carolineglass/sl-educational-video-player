"use client";

import Image from "next/image";

interface SplashScreenProps {
  onGetStarted: () => void;
}

/**
 * Welcome splash screen shown to first-time visitors.
 */
export default function SplashScreen({ onGetStarted }: SplashScreenProps) {
  return (
    // Full-screen overlay with semi-transparent black background
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="w-[90%] max-w-[1200px] max-h-[90%] lg:h-[80%] bg-knacky-splash-background rounded-2xl overflow-y-auto">
        <div className="min-h-full px-6 md:px-8 lg:px-16 py-6 md:py-12 lg:py-20 flex flex-col lg:flex-row items-center justify-between lg:justify-start">
          {/* Mobile only: Logo positioned at top */}
          <div className="lg:hidden flex justify-center shrink-0 mb-4 animate-fade-in">
            <Image
              src="/knacky-logo.svg"
              alt="Knacky Logo"
              width={100}
              height={100}
              className="w-[100px] h-[100px]"
              priority
            />
          </div>

          {/* Text content - takes 70% width on desktop */}
          <div className="w-full lg:w-[70%] lg:shrink-0 flex flex-col shrink lg:flex-none">
            <h2 className="text-4xl md:text-5xl lg:text-7xl text-black tracking-tight leading-[0.95] mb-3 md:mb-8 animate-slide-in-left">
              Get the {/* Highlighted word with orange underline effect */}
              <span className="relative inline-block italic">
                <span className="absolute left-0 right-0 bottom-[15%] h-[20%] bg-knacky-primary z-0" />
                <span className="relative z-10">knack</span>
              </span>{" "}
              for
              <br />
              practical life skills
            </h2>
            {/* Subheading with fade-in animation */}
            <p className="text-lg md:text-xl lg:text-2xl text-black leading-relaxed max-w-2xl mb-4 md:mb-12 animate-fade-in animate-delay-200">
              Start building your personal library of favorite how-tos while
              discovering new, practical knowledge from others.
            </p>
            {/* CTA button with arrow hover effect */}
            <div className="mt-8 lg:mt-0">
              <button
                onClick={onGetStarted}
                className="btn btn-primary px-6 md:px-8 active:scale-98 flex items-center gap-2 group animate-fade-in animate-delay-400"
              >
                <span className="uppercase tracking-wide text-sm">
                  Get Started
                </span>
                {/* Arrow moves right on hover */}
                <span className="text-xl group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </button>
            </div>
          </div>

          {/* Desktop only: Large logo on right side */}
          <div className="hidden lg:flex w-[30%] h-full items-center justify-center animate-fade-in animate-delay-200">
            <Image
              src="/knacky-logo.svg"
              alt="Knacky Logo"
              width={500}
              height={500}
              className="w-[70%] h-auto"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
