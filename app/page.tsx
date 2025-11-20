import { getVideos } from "@/lib/api/videos";
import { USER_ID } from "@/lib/constants";
import VideoGrid from "@/components/VideoGrid";

export default async function Home() {
  const data = await getVideos(USER_ID);

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <VideoGrid videos={data.videos} />
    </main>
  );
}
