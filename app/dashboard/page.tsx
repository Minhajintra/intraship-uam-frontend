"use client";

import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import KpiCard from "./_components/KpiCard";
import UserActivityChart from "./_components/UserActivityChart";
import UsersByRoleChart from "./_components/UsersByRoleChart";
import RecentUsersTable from "./_components/RecentUsersTable";
import { dashboardData } from "@/lib/data";
import { ShieldCheck, Clock, KeySquare, Activity } from "lucide-react";

export default function DashboardPage() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  const {
    header,
    navigation,
    kpiCards,
    activityChart,
    roleDistribution,
    recentUsers,
    securityOverview,
    footerNote,
  } = dashboardData;

  return (
    <div className="min-h-screen bg-[#f3f7f4] font-sans text-[#16382b]">
      {/* 1. Fixed Sidebar (Desktop par fixed, mobile par slide drawer) */}
      <Sidebar
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* 2. Main Workspace (Desktop par sidebar ke liye md:pl-64) */}
      <div className="flex-1 flex flex-col min-w-0 md:pl-64">
        {/* Sticky Header */}
        <Header onOpenMobileSidebar={() => setMobileSidebarOpen(true)} />

        {/* Mobile par horizontal tab navigation bar */}
        <div className="md:hidden flex items-center gap-1.5 overflow-x-auto px-4 py-2.5 bg-white border-b border-[#e5ece7] no-scrollbar">
          {navigation.map((item) => {
            const isSelected = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors flex-shrink-0 ${
                  isSelected
                    ? "bg-[#225740] text-white shadow-xs"
                    : "bg-[#f4f7f4] text-[#465b50] hover:bg-[#e6efe8]"
                }`}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                      isSelected
                        ? "bg-white/20 text-white"
                        : "bg-[#fdeccf] text-[#8a5200]"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Dashboard Content */}
        <main className="flex-1 p-3.5 sm:p-5 md:p-8 max-w-7xl w-full mx-auto space-y-4 sm:space-y-6">
          {/* Greeting Banner aur Date Badge */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#11261c] tracking-tight">
                {header.greeting}
              </h1>
              <p className="text-xs sm:text-sm text-[#6b7c72] mt-0.5">
                {header.subtitle}
              </p>
            </div>

            <div className="self-start sm:self-auto px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold bg-[#e6efe8] text-[#1e4d3a] tracking-wider uppercase border border-[#c7ded0]">
              {header.dateBadge}
            </div>
          </div>

          {/* 3. Char Summary KPI Cards */}
          <section aria-label="Key Performance Indicators">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 md:gap-5">
              {kpiCards.map((card) => (
                <KpiCard key={card.id} card={card} />
              ))}
            </div>
          </section>

          {/* 4. Analytics Charts: User Activity aur Role Distribution */}
          <section
            aria-label="Activity & Role Distribution Analytics"
            className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-5"
          >
            {/* Line chart (Bayan hissa: 3 columns) */}
            <div className="lg:col-span-3">
              <UserActivityChart data={activityChart} />
            </div>

            {/* Donut chart (Dayan hissa: 2 columns) */}
            <div className="lg:col-span-2">
              <UsersByRoleChart data={roleDistribution} />
            </div>
          </section>

          {/* 5. Security Policy Overview Cards */}
          <section
            aria-label="Security Overview"
            className="bg-white rounded-2xl p-4 sm:p-5 border border-[#e5ece7] shadow-sm"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#225740] flex-shrink-0" />
                <h3 className="text-sm font-bold text-[#16382b]">
                  {securityOverview.title}
                </h3>
              </div>
              <span className="text-[10px] sm:text-[11px] font-semibold text-[#6b7c72]">
                Updated: {securityOverview.lastAuditExport}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 pt-2">
              <div className="p-3 sm:p-3.5 rounded-xl bg-[#f8faf8] border border-[#eef3ef]">
                <div className="flex items-center gap-2 text-xs font-bold text-[#1e4d3a]">
                  <Activity className="w-4 h-4 text-[#225740] flex-shrink-0" />
                  <span>MFA Adoption</span>
                </div>
                <div className="text-lg sm:text-xl font-extrabold text-[#11261c] mt-1">
                  {securityOverview.mfaAdoptionRate}
                </div>
                <div className="text-[11px] text-[#6b7c72] mt-0.5">
                  {securityOverview.mfaAdoptionLabel}
                </div>
              </div>

              <div className="p-3 sm:p-3.5 rounded-xl bg-[#f8faf8] border border-[#eef3ef]">
                <div className="flex items-center gap-2 text-xs font-bold text-[#1e4d3a]">
                  <Clock className="w-4 h-4 text-[#225740] flex-shrink-0" />
                  <span>Session Policy</span>
                </div>
                <div className="text-lg sm:text-xl font-extrabold text-[#11261c] mt-1">
                  {securityOverview.activeSessions} Active
                </div>
                <div className="text-[11px] text-[#6b7c72] mt-0.5">
                  {securityOverview.sessionTimeout}
                </div>
              </div>

              <div className="p-3 sm:p-3.5 rounded-xl bg-[#f8faf8] border border-[#eef3ef]">
                <div className="flex items-center gap-2 text-xs font-bold text-[#1e4d3a]">
                  <KeySquare className="w-4 h-4 text-[#225740] flex-shrink-0" />
                  <span>Password Policy</span>
                </div>
                <div className="text-lg sm:text-xl font-extrabold text-[#11261c] mt-1">
                  Strict
                </div>
                <div
                  className="text-[11px] text-[#6b7c72] mt-0.5 truncate"
                  title={securityOverview.passwordPolicy}
                >
                  {securityOverview.passwordPolicy}
                </div>
              </div>
            </div>
          </section>

          {/* 6. Recent Users Table */}
          <section aria-label="Recent Users Directory">
            <RecentUsersTable users={recentUsers} />
          </section>

          {/* 7. Footer Note */}
          <footer className="pt-2 pb-6 text-center text-[11px] sm:text-xs text-[#6b7c72]">
            {footerNote}
          </footer>
        </main>
      </div>
    </div>
  );
}
