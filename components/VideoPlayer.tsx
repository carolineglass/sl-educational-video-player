"use client";

import { useRouter } from "next/navigation";
import { Video } from "@/lib/types";
import { getEmbedUrl } from "@/lib/utils";

interface VideoPlayerProps {
  video: Video;
}

export default function VideoPlayer({ video }: VideoPlayerProps) {
  const router = useRouter();
  const embedUrl = getEmbedUrl(video.video_url);

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <button
        onClick={() => router.push("/")}
        className="text-blue-600 hover:text-blue-800 mb-4 cursor-pointer"
      >
        ← Back to videos
      </button>

      <div className="bg-white rounded-lg shadow p-6">
        {embedUrl ? (
          <iframe
            src={embedUrl}
            className="w-full aspect-video rounded"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="w-full aspect-video bg-gray-200 rounded flex items-center justify-center">
            <p>Unable to load video</p>
          </div>
        )}

        <h1 className="text-2xl font-bold mb-2">{video.title}</h1>
        <p className="text-gray-600 mb-4">{video.description}</p>
        <div className="text-sm text-gray-500">Posted by {video.user_id}</div>
      </div>
    </main>
  );
}
