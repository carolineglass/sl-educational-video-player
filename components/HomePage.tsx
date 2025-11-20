"use client";

import { useState } from "react";
import { Video } from "@/lib/types";
import VideoGrid from "./VideoGrid";
import AddVideoModal from "./AddVideoModal";
import { USER_ID } from "@/lib/constants";

interface HomePageProps {
  videos: Video[];
}

export default function HomePage({ videos }: HomePageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{USER_ID} Videos</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Video
        </button>
      </div>

      <VideoGrid videos={videos} />

      {isModalOpen && <AddVideoModal onClose={() => setIsModalOpen(false)} />}
    </main>
  );
}
