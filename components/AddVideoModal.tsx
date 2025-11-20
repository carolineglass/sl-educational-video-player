"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createVideo } from "@/lib/api/videos";
import { USER_ID } from "@/lib/constants";
import { getEmbedUrl } from "@/lib/utils";

interface AddVideoModalProps {
  onClose: () => void;
}

export default function AddVideoModal({ onClose }: AddVideoModalProps) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      setError(
        "Please enter a valid YouTube, Vimeo, or Dailymotion URL"
      );
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

      // Refresh page data and close modal
      router.refresh();
      onClose();
    } catch {
      setError("Failed to create video");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add New Video</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            disabled={isSubmitting}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block font-bold mb-2">
              Title <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded p-2"
              placeholder="Enter video title"
              disabled={isSubmitting}
              aria-required="true"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block font-bold mb-2">
              Description <span className="text-red-600">*</span>
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full border rounded p-2"
              placeholder="Enter video description"
              disabled={isSubmitting}
              aria-required="true"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="videoUrl" className="block font-bold mb-2">
              Video URL <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="videoUrl"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="w-full border rounded p-2"
              placeholder="Enter YouTube, Vimeo, or Dailymotion URL"
              disabled={isSubmitting}
              aria-required="true"
            />
          </div>

          {error && (
            <p id="form-error" className="text-red-600 mb-4" role="alert">
              {error}
            </p>
          )}

          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 border rounded disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
            >
              {isSubmitting ? "Adding..." : "Add Video"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
