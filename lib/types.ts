export interface Video {
  created_at: string;
  video_url: string;
  user_id: string;
  description: string;
  title: string;
  num_comments: number;
  id: string;
}

export interface Comment {
  created_at: string;
  content: string;
  user_id: string;
  video_id: string;
  id: string;
}

// Response types
export interface GetVideosResponse {
  videos: Video[];
}

export interface GetVideoResponse {
  video: Video;
}

export interface GetCommentsResponse {
  comments: Comment[];
}

// Request types
export interface CreateVideoRequest {
  user_id: string;
  description: string;
  video_url: string;
  title: string;
}

export interface CreateCommentRequest {
  video_id: string;
  content: string;
  user_id: string;
}
