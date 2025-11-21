"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createVideo } from "@/lib/api/videos";
import { USER_ID } from "@/lib/constants";
import { getEmbedUrl } from "@/lib/utils";

interface AddVideoModalProps {
  onClose: () => void;
}

/**
 * Modal form for adding new videos to the platform.
 * Validates URL is from a supported platform (YouTube, Vimeo, Dailymotion).
 * On success, navigates to home and refreshes to show the new video.
 */
export default function AddVideoModal({ onClose }: AddVideoModalProps) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Scroll to error when it occurs
  useEffect(() => {
    if (error && errorRef.current) {
      errorRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [error]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();
    const trimmedVideoUrl = videoUrl.trim();

    if (!trimmedTitle || !trimmedDescription || !trimmedVideoUrl) {
      setError("All fields are required");
      return;
    }

    // Validate that the URL is from a supported platform
    if (!getEmbedUrl(trimmedVideoUrl)) {
      setError("Please enter a valid YouTube, Vimeo, or Dailymotion URL");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await createVideo({
        user_id: USER_ID,
        title: trimmedTitle,
        description: trimmedDescription,
        video_url: trimmedVideoUrl,
      });

      // Navigate to home page to see the new video and close modal
      router.push("/");
      router.refresh();
      onClose();
    } catch {
      setError("Failed to create video");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="relative max-w-3xl w-full max-h-[80vh]">
        {/* Close button - positioned outside scrollable area */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
          aria-label="Close"
          disabled={isSubmitting}
        >
          <span className="text-3xl">✕</span>
        </button>

        <div className="bg-white w-full max-h-[80vh] overflow-y-auto">
          {/* Header */}
          <div className="border-b border-black/10 p-6 lg:p-8">
            <h2 className="text-2xl md:text-3xl text-black tracking-tight leading-tight mb-2">
              Add New Video
            </h2>
            <p className="text-gray-600">
              Share your knacks with the community
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 lg:p-8">
            {error && (
              <div
                ref={errorRef}
                className="mb-8 p-4 border-l-2 border-red-500 bg-red-50"
              >
                <p className="text-red-900 text-sm" role="alert">
                  {error}
                </p>
              </div>
            )}

            <div className="space-y-6">
              {/* Step 1: Title */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm text-gray-500 uppercase tracking-wider mb-4"
                >
                  01 — Title
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter video title"
                  className="w-full px-0 py-2 text-xl bg-transparent border-b-2 border-black/10 focus:outline-none focus:border-knacky-primary transition-colors text-black placeholder:text-gray-300"
                  disabled={isSubmitting}
                  maxLength={100}
                  aria-required="true"
                />
                <div className="mt-2 flex justify-between text-xs text-gray-400 uppercase tracking-wider">
                  <span>Clear and descriptive</span>
                  <span>{title.length}/100</span>
                </div>
              </div>

              {/* Step 2: Description */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm text-gray-500 uppercase tracking-wider mb-4"
                >
                  02 — Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Explain what viewers will learn..."
                  rows={3}
                  className="w-full px-0 py-2 bg-transparent border-b-2 border-black/10 focus:outline-none focus:border-knacky-primary transition-colors resize-none text-black placeholder:text-gray-300"
                  disabled={isSubmitting}
                  maxLength={500}
                  aria-required="true"
                />
                <div className="mt-2 flex justify-between text-xs text-gray-400 uppercase tracking-wider">
                  <span>What makes this video helpful?</span>
                  <span>{description.length}/500</span>
                </div>
              </div>

              {/* Step 3: Video URL */}
              <div>
                <label
                  htmlFor="videoUrl"
                  className="block text-sm text-gray-500 uppercase tracking-wider mb-4"
                >
                  03 — Video URL
                </label>
                <input
                  id="videoUrl"
                  type="text"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://youtube.com/watch?v=..."
                  className="w-full px-0 py-2 bg-transparent border-b-2 border-black/10 focus:outline-none focus:border-knacky-primary transition-colors text-black placeholder:text-gray-300"
                  disabled={isSubmitting}
                  aria-required="true"
                />
                <p className="text-xs text-gray-400 mt-2">
                  Supports YouTube, Vimeo, and Dailymotion URLs
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4 pt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 border border-black/10 text-black hover:bg-gray-50 transition-colors uppercase tracking-wider text-sm"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-knacky-primary text-white hover:bg-knacky-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider text-sm"
              >
                {isSubmitting ? "Adding..." : "Add Video"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
