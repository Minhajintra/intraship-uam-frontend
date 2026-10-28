import React from "react";
import { ActivityChartData } from "@/types/uam";

interface UserActivityChartProps {
  data: ActivityChartData;
}

// User Activity Weekly Trend Chart
export default function UserActivityChart({ data }: UserActivityChartProps) {
  const days = data.days || ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const activeUsers = data.activeUsers || [140, 190, 170, 260, 230, 300, 312];
  const newUsers = data.newUsers || [30, 50, 40, 90, 70, 110, 100];

  // SVG chart sizing
  const svgWidth = 560;
  const svgHeight = 220;
  const paddingLeft = 38;
  const paddingRight = 28;
  const paddingTop = 22;
  const paddingBottom = 28;

  const chartWidth = svgWidth - paddingLeft - paddingRight;
  const chartHeight = svgHeight - paddingTop - paddingBottom;
  const maxY = 400;

  // Data point ko SVG coordinates (X, Y) me badalna
  const getCoordinates = (value: number, index: number) => {
    const x = paddingLeft + (index / (days.length - 1)) * chartWidth;
    const y = paddingTop + chartHeight - (value / maxY) * chartHeight;
    return { x, y };
  };

  // Smooth SVG curve (Bézier spline) banana
  const makeSmoothPath = (values: number[]) => {
    const points = values.map((val, idx) => getCoordinates(val, idx));
    if (points.length === 0) return "";

    let path = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;

    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[Math.max(i - 1, 0)];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[Math.min(i + 2, points.length - 1)];

      const tension = 0.25;
      const cp1x = p1.x + (p2.x - p0.x) * tension;
      const cp1y = p1.y + (p2.y - p0.y) * tension;
      const cp2x = p2.x - (p3.x - p1.x) * tension;
      const cp2y = p2.y - (p3.y - p1.y) * tension;

      path += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
    }

    return path;
  };

  // Curve ke niche gradient fill ka path
  const makeAreaPath = (values: number[]) => {
    const linePath = makeSmoothPath(values);
    if (!linePath) return "";
    const lastX = (paddingLeft + chartWidth).toFixed(1);
    const bottomY = (paddingTop + chartHeight).toFixed(1);
    const firstX = paddingLeft.toFixed(1);

    return `${linePath} L ${lastX} ${bottomY} L ${firstX} ${bottomY} Z`;
  };

  const activeLinePath = makeSmoothPath(activeUsers);
  const activeAreaPath = makeAreaPath(activeUsers);
  const newLinePath = makeSmoothPath(newUsers);

  // Y-axis grid lines (0, 100, 200, 300, 400)
  const yTicks = [0, 100, 200, 300, 400];

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#e5ece7] shadow-sm flex flex-col justify-between h-full">
      {/* Header hissa: Title, Subtitle aur Legend */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-[#16382b]">
            User Activity Trends
          </h3>
          <p className="text-[11px] sm:text-xs text-[#6b7c72] mt-0.5">
            Active vs newly provisioned accounts this week
          </p>
        </div>

        {/* Legend pills */}
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#225740]"></span>
            <span className="font-semibold text-[#16382b]">Active</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#8fb07a]"></span>
            <span className="font-semibold text-[#6b7c72]">New</span>
          </div>
        </div>
      </div>

      {/* Responsive SVG Chart */}
      <div className="w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-auto overflow-visible font-sans"
        >
          <defs>
            <linearGradient id="activeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#225740" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#225740" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Horizontal Grid lines */}
          {yTicks.map((tick) => {
            const y = paddingTop + chartHeight - (tick / maxY) * chartHeight;
            return (
              <g key={tick}>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={paddingLeft + chartWidth}
                  y2={y}
                  stroke="#eef3ef"
                  strokeDasharray={tick === 0 ? undefined : "3 3"}
                  strokeWidth="1"
                />
                <text
                  x={paddingLeft - 8}
                  y={y + 3.5}
                  textAnchor="end"
                  fontSize="10"
                  fill="#9dbba7"
                  fontWeight="600"
                >
                  {tick}
                </text>
              </g>
            );
          })}

          {/* Active Users gradient aur line */}
          <path d={activeAreaPath} fill="url(#activeGrad)" />
          <path
            d={activeLinePath}
            fill="none"
            stroke="#225740"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* New Users line */}
          <path
            d={newLinePath}
            fill="none"
            stroke="#8fb07a"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="4 4"
          />

          {/* X-axis days labels */}
          {days.map((day, idx) => {
            const x = paddingLeft + (idx / (days.length - 1)) * chartWidth;
            return (
              <text
                key={day}
                x={x}
                y={svgHeight - 4}
                textAnchor="middle"
                fontSize="11"
                fill="#6b7c72"
                fontWeight="600"
              >
                {day}
              </text>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
