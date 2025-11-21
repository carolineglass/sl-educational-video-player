import Link from "next/link";
import Image from "next/image";
import { Video } from "@/lib/types";
import { formatDate, getThumbnailUrl } from "@/lib/utils";
import { USER_ID } from "@/lib/constants";

interface VideoGridProps {
  videos: Video[];
}

export default function VideoGrid({ videos }: VideoGridProps) {
  if (videos.length === 0) {
    return (
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-6 md:col-start-4 text-center py-20">
          <h3 className="text-4xl text-black tracking-tight mb-4">
            No Videos Yet
          </h3>
          <p className="text-lg text-gray-600 mb-8">
            Be the first to share your knowledge
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-12 gap-8">
      {videos.map((video) => {
        const thumbnailUrl = getThumbnailUrl(video.video_url);

        return (
          <div
            key={video.id}
            className="col-span-12 md:col-span-6 lg:col-span-4"
          >
            <Link href={`/video/${video.id}`} className="block group">
              <div className="w-full aspect-video bg-knacky-splash-background relative mb-6 overflow-hidden">
                {thumbnailUrl ? (
                  <Image
                    src={thumbnailUrl}
                    alt={video.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    <span>No thumbnail</span>
                  </div>
                )}
              </div>
              <h3 className="text-xl text-black tracking-tight mb-2 line-clamp-2 group-hover:text-knacky-primary transition-colors">
                {video.title}
              </h3>
              <p className="text-gray-600 mb-2 line-clamp-2">
                {video.description}
              </p>
              <div className="flex justify-between text-sm text-gray-400">
                <span>{USER_ID}</span>
                <span>{formatDate(video.created_at)}</span>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
