import { Comment } from "@/lib/types";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

interface CommentsListProps {
  comments: Comment[];
  videoId: string;
}

export default function CommentsList({ comments, videoId }: CommentsListProps) {
  return (
    <div className="sticky top-8">
      <div className="border-b border-black/10 pb-6 mb-8">
        <h2 className="text-sm text-gray-500 uppercase tracking-wider mb-2">
          Discussion
        </h2>
        <p className="text-2xl text-black tracking-tight">
          {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
        </p>
      </div>

      <CommentForm videoId={videoId} />

      {comments.length === 0 ? (
        <p className="mt-8 text-gray-500">
          No comments yet. Be the first to comment!
        </p>
      ) : (
        <div className="mt-8 space-y-6">
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      )}
    </div>
  );
}
