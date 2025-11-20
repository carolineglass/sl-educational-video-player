import Link from "next/link";
import { Video } from "@/lib/types";
import { formatDate } from "@/lib/utils";

interface VideoGridProps {
  videos: Video[];
}

export default function VideoGrid({ videos }: VideoGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((video) => (
        <Link
          key={video.id}
          href={`/video/${video.id}`}
          className="border rounded p-4"
        >
          <h3 className="font-bold">{video.title}</h3>
          <p>{video.description}</p>
          <p>{video.num_comments} Comments</p>
          <p>{formatDate(video.created_at)}</p>
        </Link>
      ))}
    </div>
  );
}
