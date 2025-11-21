import Link from "next/link";
import { getVideo } from "@/lib/api/videos";
import { getComments } from "@/lib/api/comments";
import VideoPlayer from "@/components/VideoPlayer";
import CommentsList from "@/components/CommentsList";

interface VideoPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function VideoPage({ params }: VideoPageProps) {
  const { id } = await params;
  const [videoData, commentsData] = await Promise.all([
    getVideo(id),
    getComments(id),
  ]);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Navigation */}
      <nav>
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-6">
          <Link
            href="/"
            className="flex items-center gap-3 text-black hover:text-knacky-primary transition-colors group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">
              ←
            </span>
            <span className="uppercase tracking-wider text-sm">
              Back to Browse
            </span>
          </Link>
        </div>
      </nav>

      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-4 lg:py-6">
        <div className="grid grid-cols-12 gap-6 lg:gap-12">
          {/* Video Player Section - 8 columns */}
          <div className="col-span-12 lg:col-span-8 min-w-0">
            <VideoPlayer video={videoData.video} />
          </div>

          {/* Comments Section - 4 columns */}
          <div className="col-span-12 lg:col-span-4 min-w-0">
            <CommentsList comments={commentsData.comments} videoId={id} />
          </div>
        </div>
      </div>
    </div>
  );
}
