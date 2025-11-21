import { Video } from "@/lib/types";
import { getEmbedUrl, formatDate } from "@/lib/utils";

interface VideoPlayerProps {
  video: Video;
}

export default function VideoPlayer({ video }: VideoPlayerProps) {
  const embedUrl = getEmbedUrl(video.video_url);

  return (
    <div className="overflow-hidden">
      {/* Video Player */}
      <div className="relative bg-black aspect-video w-full">
        {embedUrl ? (
          <iframe
            src={embedUrl}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            title={video.title}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <p className="text-gray-500">Unable to load video</p>
          </div>
        )}
      </div>

      {/* Video Title - Large Typography */}
      <div className="mt-8 py-8 border-b border-black/10">
        <h1 className="text-2xl md:text-4xl lg:text-5xl text-black tracking-tight leading-tight mb-6 wrap-break-word">
          {video.title}
        </h1>

        {/* Metadata */}
        <div className="flex items-center gap-2 text-sm text-gray-500 uppercase tracking-wider">
          <span className="text-black">{video.user_id}</span>
          <span>•</span>
          <span>{formatDate(video.created_at)}</span>
        </div>
      </div>

      {/* Description */}
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
