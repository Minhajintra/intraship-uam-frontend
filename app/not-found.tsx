import Link from "next/link";

// 404 Page: Jab koi route na mile
export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-[#f3f7f4]">
      <h2 className="text-2xl font-bold text-[#16382b] mb-2">Page Not Found</h2>
      <p className="text-sm text-[#6b7c72] mb-4">Manga gaya page dastiyab nahi hai</p>
      <Link
        href="/dashboard"
        className="px-4 py-2 bg-[#225740] text-white rounded-xl text-xs font-semibold hover:bg-[#1a4432] transition-colors"
      >
        Dashboard par wapas jayein
      </Link>
    </div>
  );
}
