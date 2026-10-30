"use client";

import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import ChartCard from "@/components/ui/ChartCard";
import * as dashboardService from "../../actions/getDashboard";
import { RoleUsersResponse } from "../../types/dashboard.types";

// Role-wise Users Chart: Roles distribution ka donut chart
export default function RoleUsersChart() {
  const [data, setData] = useState<RoleUsersResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Service se roles data fetch karna
  const fetchRoleUsers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await dashboardService.getRoleUsers();
      setData(res);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load role distribution.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    dashboardService
      .getRoleUsers()
      .then((res) => {
        if (isMounted) {
          setData(res);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Failed to load roles.");
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <ChartCard
      title={data?.title || "Users by Assigned Role"}
      subtitle={data?.subtitle || "Active user distribution across system roles"}
      isLoading={isLoading}
      error={error}
      onRetry={fetchRoleUsers}
      badge={
        data?.totalUsers ? (
          <span className="text-[10px] font-bold text-[#225740] bg-[#e6efe8] px-2.5 py-0.5 rounded-full">
            {data.totalUsers} Total
          </span>
        ) : undefined
      }
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
        {/* Recharts Donut Chart */}
        <div className="h-52 w-52 relative flex items-center justify-center flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data?.roles || []}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={3}
                dataKey="count"
              >
                {data?.roles.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  borderRadius: "12px",
                  border: "1px solid #e5ece7",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                  fontSize: "12px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Center text in donut hole */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xl font-extrabold text-[#11261c] leading-none">
              {data?.totalUsers || "18.4K"}
            </span>
            <span className="text-[10px] font-semibold text-[#6b7c72] uppercase tracking-wider mt-0.5">
              Users
            </span>
          </div>
        </div>

        {/* Legend list */}
        <div className="flex-1 w-full space-y-1">
          {data?.roles.map((role) => (
            <div
              key={role.name}
              className="flex items-center justify-between p-1 rounded-xl hover:bg-[#f8faf8] transition-colors"
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-2.0 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: role.color }}
                />
                <span className="text-xs font-semibold text-[#16382b]">
                  {role.name}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold text-[#11261c]">
                  {role.count.toLocaleString()}
                </span>
                <span className="text-[9.5px] font-bold text-[#6b7c72] w-6 text-right">
                  {role.percent}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ChartCard>
  );
}
