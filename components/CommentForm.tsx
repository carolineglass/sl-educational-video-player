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
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          htmlFor="content"
          className="block text-sm text-gray-500 uppercase tracking-wider mb-3"
        >
          Add a comment
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          className={`w-full px-4 py-3 bg-gray-50 border-0 border-b-2 focus:outline-none focus:border-knacky-primary transition-colors resize-none text-black placeholder:text-gray-400 ${
            isOverLimit ? "border-red-500" : "border-black/10"
          }`}
          placeholder="Share your thoughts..."
          disabled={isSubmitting}
          required
        />
        <p
          className={`text-xs mt-2 uppercase tracking-wider ${
            isOverLimit ? "text-red-600" : "text-gray-400"
          }`}
        >
          {characterCount}/{MAX_COMMENT_LENGTH}
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 border-l-2 border-red-500 bg-red-50">
          <p className="text-red-900 text-sm">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting || isOverLimit}
        className="btn btn-primary w-full"
      >
        {isSubmitting ? "Posting..." : "Post Comment"}
      </button>
    </form>
  );
}
