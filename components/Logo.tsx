import React from "react";
import Link from "next/link";

interface LogoProps {
  light?: boolean; // Dark sidebar ke liye white text
  href?: string;
}

// IntraShip branding logo component
export default function Logo({ light = false, href = "/dashboard" }: LogoProps) {
  return (
    <Link href={href} className="inline-flex items-center gap-3 group">
      {/* Circle Icon with 'I' */}
      <div className="w-10 h-10 rounded-full flex items-center justify-center font-extrabold text-lg text-white shadow-sm bg-[#225740] flex-shrink-0">
        I
      </div>

      {/* Brand Name aur Sub-title */}
      <div className="flex flex-col">
        <span
          className={`font-bold text-lg leading-tight tracking-tight ${
            light ? "text-white" : "text-[#16382b]"
          }`}
        >
          IntraShip
        </span>
        <span
          className={`text-[9px] font-bold tracking-wider uppercase mt-0.5 ${
            light ? "text-[#a3c4ae]" : "text-[#6b7c72]"
          }`}
        >
          USER & ACCESS MANAGEMENT
        </span>
      </div>
    </Link>
  );
}
