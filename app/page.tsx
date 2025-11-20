import { getVideos } from "@/lib/api/videos";
import { USER_ID } from "@/lib/constants";
import HomePage from "@/components/HomePage";

export default async function Home() {
  const data = await getVideos(USER_ID);

  return <HomePage videos={data.videos} />;
}
