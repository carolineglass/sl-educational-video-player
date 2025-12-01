# Knacky - Educational Video Platform

## Project Overview

Knacky is a modern educational video platform built with Next.js 16 that enables users to upload, browse, and discuss video tutorials for sharing practical life skills.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4
- **Fonts**: Inter & Geist Mono

## Key Features

- Video browsing with responsive grid layout
- Video playback (YouTube, Vimeo, Dailymotion)
- Video upload via URL with validation
- Comments system with character limits
- Welcome splash screen (first-visit onboarding)
- Mobile-first responsive design

## Project Structure

### App Directory (`/app`)
- `page.tsx` - Home page with video grid
- `layout.tsx` - Root layout with SplashWrapper and Header
- `globals.css` - Global styles, button classes (`.btn`, `.btn-primary`, `.btn-secondary`), and animations
- `video/[id]/page.tsx` - Video detail page with player and comments

### Components (`/components`)
- `SplashWrapper.tsx` - App-level splash screen manager (layout wrapper)
- `SplashScreen.tsx` - Welcome modal for first-time visitors
- `Header.tsx` - Navigation with Add Video button
- `HomePage.tsx` - Home page container
- `VideoGrid.tsx` - Responsive video card grid with thumbnails
- `VideoPlayer.tsx` - Embedded video player with metadata
- `AddVideoModal.tsx` - Video upload form modal
- `CommentsList.tsx` - Comments container
- `CommentForm.tsx` - Comment submission form
- `CommentItem.tsx` - Individual comment display
- `LoadingSpinner.tsx` - Reusable loading indicator

### Library (`/lib`)
- `api/videos.ts` - Video API functions (getVideos, getVideo, createVideo)
- `api/comments.ts` - Comments API functions (getComments, createComment)
- `types.ts` - TypeScript interfaces (Video, Comment)
- `constants.ts` - App constants (USER_ID, API_BASE_URL, etc.)
- `utils.ts` - Helper functions (getEmbedUrl, getThumbnailUrl, formatDate)

## Architecture Decisions

### Server vs Client Components
- **Server Components**: Pages that fetch data (home, video detail) for SEO and performance
- **Client Components**: Interactive elements (modals, forms, splash screen with localStorage)

### Data Fetching
- Parallel fetching using `Promise.all()` for video + comments
- `router.refresh()` after mutations to sync server state

### Styling
- **Global Button Classes**: `.btn`, `.btn-primary`, `.btn-secondary` in `globals.css`
- **12-Column Grid**: Responsive layouts across all breakpoints
- **Custom CSS Properties**: Brand colors in `:root` (--knacky-primary, --knacky-primary-hover, --knacky-splash-background)
- **Animations**: Splash screen slide-in and fade-in animations

### Splash Screen Implementation
- Uses `SplashWrapper` component in layout to prevent flash on page load
- Three-state pattern (null | true | false) to avoid hydration mismatch
- localStorage persistence for "dismissed" state
- Wraps both Header and page content to ensure nothing renders until splash check completes

## API Integration

Base URL: `https://take-home-assessment-423502.uc.r.appspot.com/api`

### Endpoints
- `GET /videos?user_id={userId}` - Fetch all videos for a user
- `GET /videos/single?video_id={videoId}` - Fetch single video by ID
- `POST /videos` - Create new video
- `GET /videos/comments?video_id={videoId}` - Fetch comments for a video
- `POST /videos/comments` - Post a new comment

### Data Types
```typescript
interface Video {
  id: string;
  title: string;
  description: string;
  video_url: string;
  user_id: string;
  created_at: string;
  num_comments: number;
}

interface Comment {
  id: string;
  video_id: string;
  content: string;
  user_id: string;
  created_at: string;
}
```

## Important Implementation Details

### Video URL Parsing
- Supports YouTube (full URLs and youtu.be short links)
- Supports Vimeo (vimeo.com URLs)
- Supports Dailymotion (full URLs and dai.ly short links)
- See `lib/utils.ts` for embed URL and thumbnail URL extraction logic

### Button Styling
All buttons use global CSS classes for consistency:
```tsx
<button className="btn btn-primary">Primary Action</button>
<button className="btn btn-secondary">Secondary Action</button>
```

### Responsive Design
- Mobile: Single column layout
- Tablet: Two column layout
- Desktop: Three column layout
- All using 12-column grid system

## Development Notes

- TypeScript strict mode enabled
- All components are fully typed
- API logic separated in `/lib/api` for clean separation of concerns
- Error boundaries at page level for graceful error handling
