"use client";

import React, { useEffect, useState } from "react";
import { Globe, Smartphone, Terminal, Cpu } from "lucide-react";
import ChartCard from "@/components/ui/ChartCard";
import * as dashboardService from "../../actions/getDashboard";
import { InterfaceAccessResponse } from "../../types/dashboard.types";

// Interface Access Chart: Web, Mobile, CLI aur API traffic breakdown
export default function InterfaceAccessChart() {
  const [data, setData] = useState<InterfaceAccessResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Service se traffic data load karna
  const fetchInterfaceAccess = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await dashboardService.getInterfaceAccess();
      setData(res);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Traffic data load nahi ho saka.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    dashboardService
      .getInterfaceAccess()
      .then((res) => {
        if (isMounted) {
          setData(res);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Failed to load interface traffic.");
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Interface type ke mutabiq icon render karna
  const renderIcon = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes("web")) return <Globe className="w-4 h-4 text-[#225740]" />;
    if (lower.includes("mobile")) return <Smartphone className="w-4 h-4 text-[#2563eb]" />;
    if (lower.includes("cli") || lower.includes("admin")) return <Terminal className="w-4 h-4 text-[#7e22ce]" />;
    return <Cpu className="w-4 h-4 text-[#d97706]" />;
  };

  return (
    <ChartCard
      title={data?.title || "Interface-wise Access"}
      subtitle={data?.subtitle || "Traffic distribution across client channels"}
      isLoading={isLoading}
      error={error}
      onRetry={fetchInterfaceAccess}
      badge={
        data?.timeframe ? (
          <span className="text-[10px] font-bold text-[#225740] bg-[#e6efe8] px-2.5 py-0.5 rounded-full">
            {data.timeframe}
          </span>
        ) : undefined
      }
    >
      <div className="space-y-3 pt-1">
        {data?.interfaces.map((item) => (
          <div
            key={item.id}
            className="p-2.5 sm:p-3 rounded-xl bg-[#f8faf8] border border-[#eef3ef] hover:border-[#dbe5dd] transition-colors"
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-white border border-[#e5ece7] flex items-center justify-center flex-shrink-0 shadow-2xs">
                  {renderIcon(item.name)}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#16382b] leading-tight">
                    {item.name}
                  </h4>
                  <p className="text-[10.5px] text-[#6b7c72]">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs sm:text-sm font-extrabold text-[#11261c]">
                  {item.count.toLocaleString()}
                </span>
                <span className="text-[10.5px] font-bold text-[#225740] ml-1.5">
                  {item.percent}%
                </span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full h-1.5 rounded-full bg-[#e5ece7] overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${item.percent}%`,
                  backgroundColor: item.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </ChartCard>
  );
}
