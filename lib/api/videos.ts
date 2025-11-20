import {
  CreateVideoRequest,
  GetVideosResponse,
  GetVideoResponse,
} from "../types";
import { API_BASE_URL } from "../constants";

// Fetches all videos for a specific user
export async function getVideos(userId: string): Promise<GetVideosResponse> {
  const url = new URL(`${API_BASE_URL}/videos`);
  url.searchParams.append("user_id", userId);

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error("Failed to fetch videos");
  }

  return response.json();
}

// Fetches a single video by its ID
export async function getVideo(videoId: string): Promise<GetVideoResponse> {
  const url = new URL(`${API_BASE_URL}/videos/single`);
  url.searchParams.append("video_id", videoId);
  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error("Failed to fetch video");
  }

  return response.json();
}

// Creates a new video
export async function createVideo(data: CreateVideoRequest): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/videos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create video");
  }
}
