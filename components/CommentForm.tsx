"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createComment } from "@/lib/api/comments";
import { USER_ID } from "@/lib/constants";

const MAX_COMMENT_LENGTH = 500;

interface CommentFormProps {
  videoId: string;
}

export default function CommentForm({ videoId }: CommentFormProps) {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedContent = content.trim();

    if (!trimmedContent) {
      setError("Comment cannot be empty");
      return;
    }

    if (trimmedContent.length > MAX_COMMENT_LENGTH) {
      setError(`Comment cannot exceed ${MAX_COMMENT_LENGTH} characters`);
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await createComment({
        video_id: videoId,
        content: trimmedContent,
        user_id: USER_ID,
      });

      // Clear form and refresh page data
      setContent("");
      router.refresh();
    } catch {
      setError("Failed to post comment");
    } finally {
      setIsSubmitting(false);
    }
  };

  const characterCount = content.length;
  const isOverLimit = characterCount > MAX_COMMENT_LENGTH;

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <div className="mb-4">
        <label htmlFor="content" className="block font-bold mb-2">
          Add a comment
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={3}
          className={`w-full border rounded p-2 ${
            isOverLimit ? "border-red-500" : ""
          }`}
          placeholder="Write your comment..."
          disabled={isSubmitting}
          required
        />
        <p
          className={`text-sm mt-1 ${
            isOverLimit ? "text-red-600" : "text-gray-500"
          }`}
        >
          {characterCount}/{MAX_COMMENT_LENGTH} characters
        </p>
      </div>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <button
        type="submit"
        disabled={isSubmitting || isOverLimit}
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
      >
        {isSubmitting ? "Posting..." : "Post Comment"}
      </button>
    </form>
  );
}
