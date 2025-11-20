import { Comment } from "@/lib/types";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

interface CommentsListProps {
  comments: Comment[];
  videoId: string;
}

export default function CommentsList({
  comments,
  videoId,
}: CommentsListProps) {
  return (
    <div>
      <h2 className="font-bold mb-4">
        {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
      </h2>

      <CommentForm videoId={videoId} />

      {comments.length === 0 ? (
        <p className="mt-6">No comments yet. Be the first to comment!</p>
      ) : (
        <div className="mt-6">
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      )}
    </div>
  );
}
