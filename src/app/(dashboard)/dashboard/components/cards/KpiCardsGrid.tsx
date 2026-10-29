"use client";

import React, { useEffect, useState } from "react";
import { User, Shield, CheckCircle2, ListFilter } from "lucide-react";
import * as dashboardService from "../../actions/getDashboard";
import { DashboardKpiItem } from "../../types/dashboard.types";

// KPI Cards Grid: Top 4 key performance indicator cards
export default function KpiCardsGrid() {
  const [cards, setCards] = useState<DashboardKpiItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Service se KPI metrics fetch karna
  useEffect(() => {
    let isMounted = true;
    dashboardService
      .getDashboardKpis()
      .then((res) => {
        if (isMounted) {
          setCards(res);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error("Failed to load KPIs:", err);
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Card type ke mutabiq icon render karna
  const renderIcon = (type: string) => {
    switch (type) {
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

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-32 bg-white rounded-2xl p-4 border border-[#e5ece7] animate-pulse flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-gray-100" />
              <div className="w-16 h-5 rounded-full bg-gray-100" />
            </div>
            <div>
              <div className="w-20 h-4 bg-gray-100 rounded mb-1" />
              <div className="w-28 h-6 bg-gray-200 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
      {cards.map((card) => {
        const badgeColor =
          card.badgeType === "success"
            ? "bg-[#e6efe8] text-[#225740]"
            : card.badgeType === "warning"
            ? "bg-[#fdeccf] text-[#8a5200]"
            : card.badgeType === "danger"
            ? "bg-[#fde4e4] text-[#b42318]"
            : "bg-[#edf2ee] text-[#465b50]";

        return (
          <div
            key={card.id}
            className="bg-white rounded-2xl p-4 border border-[#e5ece7] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            {/* Top row: Icon and Badge */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: card.iconBg }}
              >
                {renderIcon(card.iconType)}
              </div>

              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase ${badgeColor}`}
              >
                {card.badge}
              </span>
            </div>

            {/* Bottom row: Value and Comparison */}
            <div>
              <span className="block text-xs font-semibold text-[#6b7c72] mb-0.5">
                {card.title}
              </span>
              <div className="flex items-baseline justify-between gap-1">
                <span className="text-xl sm:text-2xl font-extrabold text-[#11261c] tracking-tight">
                  {card.value}
                </span>

                {card.progressValue !== undefined && (
                  <span className="text-[11px] font-bold text-[#225740]">
                    {card.progressLabel || `${card.progressValue}%`}
                  </span>
                )}
              </div>

              <p className="text-[10.5px] text-[#55695e] mt-1 font-medium">
                {card.comparison}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
