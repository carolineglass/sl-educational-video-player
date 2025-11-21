"use client";

import { useState, useRef, useEffect } from "react";
import { Comment } from "@/lib/types";
import { formatDate } from "@/lib/utils";

interface CommentItemProps {
  comment: Comment;
}

export default function CommentItem({ comment }: CommentItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const contentRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const checkLineCount = () => {
      // Check if content exceeds 4 lines
      if (contentRef.current) {
        // Temporarily remove line-clamp to measure full height
        const element = contentRef.current;
        const originalClass = element.className;
        element.className = "wrap-break-word";

        const lineHeight = parseInt(
          window.getComputedStyle(element).lineHeight
        );
        const height = element.scrollHeight;
        const lines = height / lineHeight;

        // Restore original class
        element.className = originalClass;

        setShowButton(lines > 4);
      }
    };

    checkLineCount();

    // Recalculate on window resize
    window.addEventListener("resize", checkLineCount);
    return () => window.removeEventListener("resize", checkLineCount);
  }, [comment.content]);

  return (
    <div className="border-b border-black/10 pb-6">
      <div className="flex items-center gap-2 mb-3 text-sm">
        <span className="text-black font-medium">{comment.user_id}</span>
        <span className="text-gray-400">•</span>
        <span className="text-gray-400">{formatDate(comment.created_at)}</span>
      </div>
      <p
        ref={contentRef}
        className={`text-gray-700 leading-relaxed wrap-break-word ${
          isExpanded ? "" : "line-clamp-4"
        }`}
      >
        {comment.content}
      </p>
      {showButton && (
        <button
          onClick={() => setIsExpanded((prev) => !prev)}
          className="text-sm text-knacky-primary hover:text-knacky-primary-hover mt-2 uppercase tracking-wider"
        >
          {isExpanded ? "Show less" : "Read more"}
        </button>
      )}
    </div>
  );
}
