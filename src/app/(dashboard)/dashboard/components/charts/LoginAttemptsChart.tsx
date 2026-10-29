"use client";

import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import ChartCard from "@/components/ui/ChartCard";
import * as dashboardService from "../../actions/getDashboard";
import { LoginAttemptsResponse, LoginAttemptsPeriod } from "../../types/dashboard.types";

// Login Attempts Chart: Daily aur Monthly attempts ka bar chart
export default function LoginAttemptsChart() {
  const [period, setPeriod] = useState<LoginAttemptsPeriod>("daily");
  const [data, setData] = useState<LoginAttemptsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Selected period ke hisab se data fetch karna
  const fetchLoginAttempts = async (selectedPeriod: LoginAttemptsPeriod) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await dashboardService.getLoginAttempts(selectedPeriod);
      setData(res);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load login attempts.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    dashboardService
      .getLoginAttempts(period)
      .then((res) => {
        if (isMounted) {
          setData(res);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Failed to load attempts.");
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [period]);

  const handlePeriodChange = (newPeriod: LoginAttemptsPeriod) => {
    setPeriod(newPeriod);
  };

  return (
    <ChartCard
      title={data?.title || "Login Attempts Overview"}
      subtitle={data?.subtitle || "Comparison of successful vs failed authentication events"}
      isLoading={isLoading}
      error={error}
      onRetry={() => fetchLoginAttempts(period)}
      actions={
        <div className="flex items-center gap-1 p-0.5 rounded-lg bg-[#eef3ef] border border-[#dbe5dd]">
          <button
            type="button"
            onClick={() => handlePeriodChange("daily")}
            className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
              period === "daily"
                ? "bg-white text-[#225740] shadow-xs"
                : "text-[#465b50] hover:text-[#16382b]"
            }`}
          >
            Daily
          </button>
          <button
            type="button"
            onClick={() => handlePeriodChange("monthly")}
            className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
              period === "monthly"
                ? "bg-white text-[#225740] shadow-xs"
                : "text-[#465b50] hover:text-[#16382b]"
            }`}
          >
            Monthly
          </button>
        </div>
      }
    >
      <div>
        {/* Metric summary badges */}
        <div className="flex flex-wrap items-center gap-4 mb-4 pb-3 border-b border-[#f0f4f1] text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#225740]" />
            <span className="text-[#6b7c72]">Successful:</span>
            <span className="font-extrabold text-[#11261c]">
              {data?.totalSuccessful?.toLocaleString() ?? 0}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#d92d20]" />
            <span className="text-[#6b7c72]">Failed:</span>
            <span className="font-extrabold text-[#11261c]">
              {data?.totalFailed?.toLocaleString() ?? 0}
            </span>
          </div>

          {data?.successRate && (
            <div className="ml-auto flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#e6efe8] text-[#225740] font-bold text-[11px]">
              <span>Success Rate:</span>
              <span>{data.successRate}</span>
            </div>
          )}
        </div>

        {/* Recharts Bar Graph */}
        <div className="h-64 sm:h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data?.chartData || []}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#edf2ee" />
              <XAxis
                dataKey="period"
                stroke="#6b7c72"
                fontSize={11}
                tickLine={false}
                axisLine={{ stroke: "#dbe5dd" }}
              />
              <YAxis
                stroke="#6b7c72"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  borderRadius: "12px",
                  border: "1px solid #e5ece7",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                  fontSize: "12px",
                }}
              />
              <Legend
                wrapperStyle={{ fontSize: "11px", paddingTop: "10px" }}
                iconType="circle"
              />
              <Bar
                dataKey="successful"
                name="Successful"
                fill="#225740"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="failed"
                name="Failed"
                fill="#d92d20"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </ChartCard>
  );
}
