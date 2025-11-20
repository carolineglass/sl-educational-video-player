import { getVideo } from "@/lib/api/videos";
import VideoPlayer from "@/components/VideoPlayer";

interface VideoPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function VideoPage({ params }: VideoPageProps) {
  const { id } = await params;
  const data = await getVideo(id);

  return <VideoPlayer video={data.video} />;
}
