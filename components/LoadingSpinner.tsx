interface LoadingSpinnerProps {
  message?: string;
}

export default function LoadingSpinner({
  message = "Loading...",
}: LoadingSpinnerProps) {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="text-center">
        <div className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-knacky-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        <p className="mt-6 text-gray-500 uppercase tracking-wider text-sm">
          {message}
        </p>
      </div>
    </div>
  );
}
