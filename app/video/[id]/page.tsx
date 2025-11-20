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
    <div>
      <VideoPlayer video={videoData.video} />
      <div className="max-w-4xl mx-auto px-4 pb-8">
        <CommentsList comments={commentsData.comments} videoId={id} />
      </div>
    </div>
  );
}
