import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-24">
      <p className="text-sm font-semibold text-blue-600">404</p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
        Page not found
      </h1>
      <p className="mt-4 text-base text-gray-600 text-center max-w-md">
        Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or
        doesn&apos;t exist.
      </p>
      <div className="mt-8 flex items-center gap-4">
        <Link
          href="/"
          className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white shadow transition-colors hover:bg-gray-800"
        >
          Go home
        </Link>
        <Link
          href="/blog"
          className="rounded-lg px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100"
        >
          Read blog
        </Link>
      </div>
    </div>
  );
}
