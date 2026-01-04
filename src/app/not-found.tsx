import Link from "next/link";
import { FaHome } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center p-6">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="mt-4 text-xl text-gray-600">Page not found</p>

      <Link
        href="/"
        className="flex gap-2 items-center mt-6 rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
      >
        <FaHome className="size-5" />
        Go Home
      </Link>
    </div>
  );
}
