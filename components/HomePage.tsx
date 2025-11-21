import { Video } from "@/lib/types";
import VideoGrid from "./VideoGrid";

interface HomePageProps {
  videos: Video[];
}

export default function HomePage({ videos }: HomePageProps) {
  return (
    <main className="max-w-[1440px] mx-auto px-8 lg:px-12 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl text-black tracking-tight mb-2">My Videos</h1>
      </div>

      <VideoGrid videos={videos} />
    </main>
  );
}
