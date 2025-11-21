import Link from "next/link";
import Image from "next/image";
import { Video } from "@/lib/types";
import { formatDate, getThumbnailUrl } from "@/lib/utils";

interface VideoGridProps {
  videos: Video[];
}

export default function VideoGrid({ videos }: VideoGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((video) => {
        const thumbnailUrl = getThumbnailUrl(video.video_url);

        return (
          <Link
            key={video.id}
            href={`/video/${video.id}`}
            className="overflow-hidden block"
          >
            <div className="w-full aspect-video bg-gray-200 relative">
              {thumbnailUrl ? (
                <Image
                  src={thumbnailUrl}
                  alt={video.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <span>No thumbnail</span>
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2 line-clamp-2">
                {video.title}
              </h3>
              <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                {video.description}
              </p>
              <div className="flex justify-between text-sm text-gray-500">
                <span>
                  {video.num_comments}{" "}
                  {video.num_comments === 1 ? "Comment" : "Comments"}
                </span>
                <span>{formatDate(video.created_at)}</span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
