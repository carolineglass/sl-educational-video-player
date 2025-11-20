/**
 * Converts a YouTube or Vimeo URL to an embeddable URL
 */
export function getEmbedUrl(url: string): string | null {
  try {
    const urlObj = new URL(url);

    // YouTube
    if (
      urlObj.hostname === "www.youtube.com" ||
      urlObj.hostname === "youtube.com"
    ) {
      const videoId = urlObj.searchParams.get("v");
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }

    // YouTube short URLs (youtu.be)
    if (urlObj.hostname === "youtu.be") {
      const videoId = urlObj.pathname.slice(1);
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }

    // Vimeo
    if (urlObj.hostname === "vimeo.com" || urlObj.hostname === "www.vimeo.com") {
      const videoId = urlObj.pathname.slice(1);
      if (videoId) {
        return `https://player.vimeo.com/video/${videoId}`;
      }
    }

    return null;
  } catch {
    return null;
  }
}

/**
 * Formats an ISO date string to a readable date and time
 * Example: "2025-11-18T18:37:27.035511+00:00" -> "Nov 18, 2025"
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);

  // Check if date is invalid (getTime() returns NaN for invalid dates)
  if (isNaN(date.getTime())) {
    return dateString;
  }

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
