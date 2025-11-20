import { CreateCommentRequest, GetCommentsResponse } from "../types";
import { API_BASE_URL } from "../constants";

// Fetches all comments for a specific video
export async function getComments(
  videoId: string
): Promise<GetCommentsResponse> {
  const url = new URL(`${API_BASE_URL}/videos/comments`);
  url.searchParams.append("video_id", videoId);

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error("Failed to fetch comments");
  }

  return response.json();
}

// Creates a new comment on a video
export async function createComment(data: CreateCommentRequest): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/videos/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create comment");
  }
}
