"use client";

import React, { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import KpiCardsGrid from "./cards/KpiCardsGrid";
import LoginAttemptsChart from "./charts/LoginAttemptsChart";
import RoleUsersChart from "./charts/RoleUsersChart";
import InterfaceAccessChart from "./charts/InterfaceAccessChart";
import LoginHistoryTable from "./tables/LoginHistoryTable";
import { dashboardData } from "@/lib/data";
import { ShieldCheck, Clock, KeySquare, Activity } from "lucide-react";

// Dashboard Component: UAM Analytics, charts aur login history audit table
export default function Dashboard() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  const { header, navigation, securityOverview, footerNote } = dashboardData;

  return (
    <div className="min-h-screen bg-[#f3f7f4] font-sans text-[#16382b]">
      {/* Sidebar navigation */}
      <Sidebar
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Main workspace container */}
      <div className="flex-1 flex flex-col min-w-0 md:pl-64">
        {/* Sticky top header */}
        <Header onOpenMobileSidebar={() => setMobileSidebarOpen(true)} />

        {/* Mobile horizontal tab bar */}
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
          {/* Greeting Banner and Date Badge */}
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

          {/* 1. Summary KPI Cards */}
          <section aria-label="Key Performance Indicators">
            <KpiCardsGrid />
          </section>

          {/* 2. Login Attempts Bar Chart & Role-wise Users Donut Chart */}
          <section
            aria-label="Login Attempts and Role Distribution"
            className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-5"
          >
            {/* Daily/Monthly Login Attempts (3 columns) */}
            <div className="lg:col-span-3">
              <LoginAttemptsChart />
            </div>

            {/* Role-wise Users (2 columns) */}
            <div className="lg:col-span-2">
              <RoleUsersChart />
            </div>
          </section>

          {/* 3. Interface-wise Access & Security Policy Overview */}
          <section
            aria-label="Interface Access and Security Policy"
            className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-5"
          >
            {/* Interface-wise Access Traffic Breakdown (3 columns) */}
            <div className="lg:col-span-3">
              <InterfaceAccessChart />
            </div> 

            {/* Security Policy Overview (2 columns) */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-4 sm:p-5 border border-[#e5ece7] shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[#225740] flex-shrink-0" />
                    <h3 className="text-sm font-bold text-[#16382b]">
                      {securityOverview.title}
                    </h3>
                  </div>
                  <span className="text-[10.5px] font-semibold text-[#6b7c72]">
                    {securityOverview.lastAuditExport}
                  </span>
                </div>

                <div className="space-y-2.5">
                  <div className="p-2.5 rounded-xl bg-[#f8faf8] border border-[#eef3ef] flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#1e4d3a]">
                      <Activity className="w-4 h-4 text-[#225740]" />
                      <span>MFA Adoption</span>
                    </div>
                    <span className="text-sm font-extrabold text-[#11261c]">
                      {securityOverview.mfaAdoptionRate}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#f8faf8] border border-[#eef3ef] flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#1e4d3a]">
                      <Clock className="w-4 h-4 text-[#225740]" />
                      <span>Active Sessions</span>
                    </div>
                    <span className="text-sm font-extrabold text-[#11261c]">
                      {securityOverview.activeSessions} Active
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#f8faf8] border border-[#eef3ef] flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#1e4d3a]">
                      <KeySquare className="w-4 h-4 text-[#225740]" />
                      <span>Password Policy</span>
                    </div>
                    <span className="text-xs font-bold text-[#11261c]">Strict (12+ char)</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-[#eef3ef] text-[10.5px] text-[#6b7c72]">
                Idle Session Timeout: <b>{securityOverview.sessionTimeout}</b>
              </div>
            </div> 
          </section>

          {/* 4. Login History Audit Table */}
          <section aria-label="Login History Audit Table">
            <LoginHistoryTable />
          </section>

          {/* 5. Footer */}
          <footer className="pt-2 pb-6 text-center text-[11px] sm:text-xs text-[#6b7c72]">
            {footerNote}
          </footer>
        </main>
      </div>
    </div>
  );
}

