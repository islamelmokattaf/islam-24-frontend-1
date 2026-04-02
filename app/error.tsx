"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-24">
      <p className="text-sm font-semibold text-red-600">Error</p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">
        Something went wrong
      </h1>
      <p className="mt-4 text-base text-gray-600 text-center max-w-md">
        {error.message || "An unexpected error occurred. Please try again."}
      </p>
      <button
        onClick={reset}
        className="mt-8 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white shadow transition-colors hover:bg-gray-800"
      >
        Try again
      </button>
    </div>
  );
}
