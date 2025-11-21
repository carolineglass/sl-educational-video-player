"use client";

import { useState } from "react";
import Link from "next/link";
import AddVideoModal from "./AddVideoModal";

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <nav className="border-b border-black/10 sticky top-0 z-40 bg-white">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-12 py-6">
          <div className="grid grid-cols-12 gap-6 items-center">
            {/* Logo - Spans 3 columns */}
            <div className="col-span-6 md:col-span-3">
              <Link href="/">
                <h1 className="text-3xl text-black tracking-tight">KNACKY</h1>
              </Link>
            </div>

            {/* CTA Button - Spans 3 columns */}
            <div className="col-span-6 md:col-span-3 md:col-start-10 flex justify-end">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-knacky-primary text-white px-8 py-3 hover:bg-knacky-primary-hover transition-all active:scale-98 flex items-center gap-2 group"
              >
                <span className="text-2xl group-hover:rotate-90 transition-transform duration-300">
                  +
                </span>
                <span className="uppercase tracking-wide text-sm">
                  Add Video
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {isModalOpen && <AddVideoModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
}
