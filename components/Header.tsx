"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
              <Link href="/" className="flex items-center gap-3">
                <Image
                  src="/knacky-logo.svg"
                  alt="Knacky Logo"
                  width={40}
                  height={40}
                  className="w-auto h-auto"
                />
                <h1 className="text-3xl text-black tracking-tight">KNACKY</h1>
              </Link>
            </div>

            {/* CTA Button - Spans 3 columns */}
            <div className="col-span-6 md:col-span-3 md:col-start-10 flex justify-end">
              <button
                onClick={() => setIsModalOpen(true)}
                className="btn btn-primary px-8 active:scale-98 flex items-center gap-2 group"
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
