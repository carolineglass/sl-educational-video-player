import { Video } from "@/lib/types";
import { getEmbedUrl, formatDate } from "@/lib/utils";
import { VIDEO_EXTENSIONS } from "@/lib/constants";

interface VideoPlayerProps {
  video: Video;
}

/**
 * Video detail view with embedded player, title, metadata, and description.
 * Converts video URLs to embeddable iframes for YouTube, Vimeo, and Dailymotion.
 */
export default function VideoPlayer({ video }: VideoPlayerProps) {
  // Convert video URL to embeddable format
  const embedUrl = getEmbedUrl(video.video_url);

  // Check if this is a direct video file (MP4, WebM, etc.)
  const isDirectVideo = embedUrl && VIDEO_EXTENSIONS.some(ext =>
    embedUrl.toLowerCase().endsWith(ext)
  );

  return (
    <div className="overflow-hidden">
      {/* Embedded video player (16:9 aspect ratio) */}
      <div className="relative bg-black aspect-video w-full">
        {embedUrl ? (
          isDirectVideo ? (
            <video
              controls
              className="w-full h-full"
              preload="metadata"
              title={video.title}
            >
              <source src={embedUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <iframe
              src={embedUrl}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
              title={video.title}
            />
          )
        ) : (
          // Fallback if URL couldn't be converted
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <p className="text-gray-500">Unable to load video</p>
          </div>
        )}
      </div>

      {/* Title and metadata section */}
      <div className="py-8 border-b border-black/10">
        <h1 className="text-2xl md:text-3xl lg:text-4xl text-black tracking-tight leading-tight mb-6 wrap-break-word">
          {video.title}
        </h1>

        <div className="flex items-center gap-2 text-sm text-gray-500 uppercase tracking-wider">
          <span className="text-black">{video.user_id}</span>
          <span>•</span>
          <span>{formatDate(video.created_at)}</span>
        </div>
      </div>

      {/* Description section */}
      <div className="mt-8">
        <h3 className="text-sm text-gray-500 uppercase tracking-wider mb-4">
          Description
        </h3>
        <p className="text-lg text-gray-700 leading-relaxed max-w-3xl">
          {video.description}
        </p>
      </div>
    </div>
  );
}
