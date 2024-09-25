// app/not-found.js

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">Page Not Found</h1>
      <p className="mt-4 text-lg">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link href="/" className="mt-6 text-blue-600">
        Go back to Homepage
      </Link>
    </div>
  );
}