import React from "react";
import { User, Shield, CheckCircle2, ListFilter } from "lucide-react";
import { KpiCardItem } from "@/types/uam";

interface KpiCardProps {
  card: KpiCardItem;
}

// Single KPI Metric Card
export default function KpiCard({ card }: KpiCardProps) {
  // Card ke hisaab se sahi Lucide icon chunn-na
  const renderIcon = () => {
    switch (card.iconType) {
      case "user":
        return <User className="w-5 h-5 text-[#225740]" />;
      case "role":
        return <Shield className="w-5 h-5 text-[#2563eb]" />;
      case "request":
        return <CheckCircle2 className="w-5 h-5 text-[#d97706]" />;
      case "audit":
        return <ListFilter className="w-5 h-5 text-[#7e22ce]" />;
      default:
        return <User className="w-5 h-5 text-[#225740]" />;
    }
  };

  // Badge ka style (warning ya normal)
  const renderBadge = () => {
    if (card.badgeType === "warning") {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-[#fef3c7] text-[#92400e]">
          {card.badge}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-[#e6efe8] text-[#1e4d3a]">
        {card.badge}
      </span>
    );
  };

  // Card ke right side par mini graphic (bars, donut, ya sparkline curve)
  const renderGraphic = () => {
    if (card.graphicType === "bars") {
      const heights = [10, 16, 12, 18, 22, 26, 20, 24];
      return (
        <div className="flex items-end gap-1 h-7 sm:h-8">
          {heights.map((h, i) => (
            <div
              key={i}
              style={{ height: `${h}px` }}
              className={`w-1.5 rounded-full ${
                i >= 5 ? "bg-[#225740]" : "bg-[#a3c4ae]"
              }`}
            />
          ))}
        </div>
      );
    }

    if (card.graphicType === "progressDonut") {
      return (
        <div className="flex flex-col items-center">
          <div className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-gray-200"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-[#225740]"
                strokeDasharray="71, 100"
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute text-[9px] sm:text-[10px] font-bold text-[#16382b]">
              71%
            </span>
          </div>
          <span className="text-[9px] sm:text-[10px] font-medium text-[#6b7c72] mt-0.5">
            reviewed
          </span>
        </div>
      );
    }

    // Default upward sparkline curve
    return (
      <div className="w-16 sm:w-20 h-8 sm:h-9">
        <svg
          viewBox="0 0 80 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <path
            d="M 2 28 C 15 28, 22 20, 35 22 C 48 24, 55 12, 72 6"
            stroke="#225740"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle
            cx="72"
            cy="6"
            r="3.5"
            fill="#ffffff"
            stroke="#225740"
            strokeWidth="2.5"
          />
        </svg>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#e5ece7] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
      {/* Upper row: Icon aur Badge */}
      <div className="flex items-center justify-between mb-3.5 sm:mb-4">
        <div
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: card.iconBg }}
        >
          {renderIcon()}
        </div>
        {renderBadge()}
      </div>

      {/* Lower row: Title, Number, Description aur Mini Graphic */}
      <div className="flex items-end justify-between gap-2">
        <div className="min-w-0">
          <span className="text-[11px] sm:text-xs font-semibold text-[#6b7c72] block mb-0.5 sm:mb-1 truncate">
            {card.title}
          </span>
          <span className="text-2xl sm:text-3xl font-extrabold text-[#16382b] tracking-tight block">
            {card.value}
          </span>
          <span className="text-[11px] sm:text-xs text-[#6b7c72] mt-0.5 sm:mt-1 block truncate">
            {card.comparison}
          </span>
        </div>

        <div className="flex-shrink-0">{renderGraphic()}</div>
      </div>
    </div>
  );
}
