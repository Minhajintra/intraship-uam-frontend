import React from "react";
import { RoleDistributionData } from "@/types/uam";

interface UsersByRoleChartProps {
  data: RoleDistributionData;
}

// Users by Role Donut Chart
export default function UsersByRoleChart({ data }: UsersByRoleChartProps) {
  const roles = data.roles || [
    { name: "Teachers", count: 214, percent: 61, color: "#1e4d3a" },
    { name: "Administrators", count: 38, percent: 10, color: "#8fb07a" },
    { name: "Support staff", count: 61, percent: 17, color: "#d89a3a" },
    { name: "Other", count: 35, percent: 10, color: "#bcd3c4" },
  ];

  const totalUsers = data.totalUsers || "348";

  // SVG Donut geometry
  const radius = 48;
  const strokeWidth = 18;
  const circumference = 2 * Math.PI * radius; // ~301.59

  // Har slice ka stroke offset hisaab lagana
  const slices = roles.map((role, idx) => {
    const previousSum = roles
      .slice(0, idx)
      .reduce((sum, r) => sum + r.percent, 0);

    const strokeLength = (role.percent / 100) * circumference;
    const strokeOffset = -(previousSum / 100) * circumference;

    return {
      ...role,
      strokeDasharray: `${strokeLength} ${circumference}`,
      strokeDashoffset: strokeOffset,
    };
  });

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#e5ece7] shadow-sm flex flex-col justify-between h-full">
      {/* Title */}
      <div>
        <h3 className="text-sm sm:text-base font-bold text-[#16382b]">
          Users by Role
        </h3>
        <p className="text-[11px] sm:text-xs text-[#6b7c72] mt-0.5">
          Breakdown of provisioned identity profiles
        </p>
      </div>

      {/* SVG Donut Circle */}
      <div className="relative w-40 h-40 sm:w-44 sm:h-44 mx-auto my-3 sm:my-4 flex items-center justify-center">
        <svg
          viewBox="0 0 140 140"
          className="w-full h-full transform -rotate-90"
        >
          {/* Background circle track */}
          <circle
            cx="70"
            cy="70"
            r={radius}
            fill="none"
            stroke="#eef3ef"
            strokeWidth={strokeWidth}
          />

          {/* Role slices */}
          {slices.map((slice) => (
            <circle
              key={slice.name}
              cx="70"
              cy="70"
              r={radius}
              fill="none"
              stroke={slice.color}
              strokeWidth={strokeWidth}
              strokeDasharray={slice.strokeDasharray}
              strokeDashoffset={slice.strokeDashoffset}
              strokeLinecap="butt"
              className="transition-all duration-500 ease-out"
            />
          ))}
        </svg>

        {/* Center label: Total users count */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
          <span className="text-2xl sm:text-3xl font-extrabold text-[#16382b] tracking-tight leading-none">
            {totalUsers}
          </span>
          <span className="text-[10px] sm:text-[11px] font-semibold text-[#6b7c72] uppercase tracking-wider mt-1">
            Total Users
          </span>
        </div>
      </div>

      {/* Roles Legend List */}
      <div className="grid grid-cols-2 gap-2 sm:gap-2.5 pt-2 border-t border-[#eef3ef]">
        {roles.map((role) => (
          <div key={role.name} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 min-w-0">
              <span
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: role.color }}
              />
              <span className="text-[#3b4e42] truncate font-medium">
                {role.name}
              </span>
            </div>
            <span className="font-bold text-[#16382b] ml-1 flex-shrink-0">
              {role.percent}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
