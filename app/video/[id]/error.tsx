"use client";

import { useRouter } from "next/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  return (
    <div>
      <p>{error.message || "An unexpected error occurred"}</p>
      <button onClick={reset}>Try again</button>
      <button onClick={() => router.push("/")}>Back to videos</button>
    </div>
  );
}
