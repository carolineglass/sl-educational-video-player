"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <p>{error.message || "An unexpected error occurred"}</p>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
