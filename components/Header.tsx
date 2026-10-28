"use client";

import React, { useState } from "react";
import { Search, Bell, Menu, ChevronDown, X } from "lucide-react";
import { dashboardData } from "@/lib/data";

interface HeaderProps {
  onOpenMobileSidebar: () => void;
}

// Top Header: Breadcrumbs, Search, Notifications, Profile
export default function Header({ onOpenMobileSidebar }: HeaderProps) {
  const { header, currentUser } = dashboardData;
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 bg-white/85 backdrop-blur-md border-b border-[#e5ece7]">
      {/* Bayan taraf: Mobile hamburger toggle aur Breadcrumb */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Mobile menu kholne ka button */}
        <button
          type="button"
          onClick={onOpenMobileSidebar}
          aria-label="Open sidebar menu"
          className="p-2 -ml-1 rounded-xl text-[#16382b] hover:bg-gray-100 md:hidden transition-colors flex-shrink-0"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Page path (Workspace / Dashboard) */}
        <nav
          aria-label="Breadcrumb"
          className="text-xs text-[#6b7c72] flex items-center gap-1.5"
        >
          <span className="hidden xs:inline">{header.breadcrumbRoot}</span>
          <span className="text-gray-400 hidden xs:inline">/</span>
          <span className="font-bold text-[#16382b]">
            {header.breadcrumbCurrent}
          </span>
        </nav>
      </div>

      {/* Daye taraf: Search, Language, Notifications aur Avatar */}
      <div className="flex items-center gap-2 sm:gap-3.5">
        {/* Desktop search box */}
        <div className="relative hidden md:block w-48 lg:w-64">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder={header.searchPlaceholder}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-[#dbe5dd] rounded-xl focus:outline-none focus:border-[#225740] focus:ring-1 focus:ring-[#225740] placeholder:text-gray-400 text-[#16382b]"
          />
        </div>

        {/* Mobile search toggle icon */}
        <div className="md:hidden relative">
          <button
            type="button"
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            aria-label="Toggle search input"
            className="p-2 rounded-xl text-gray-600 hover:bg-gray-100 border border-[#dbe5dd] bg-white transition-colors"
          >
            {mobileSearchOpen ? (
              <X className="w-4 h-4 text-[#16382b]" />
            ) : (
              <Search className="w-4 h-4 text-[#16382b]" />
            )}
          </button>
        </div>

        {/* Language selector */}
        <button
          type="button"
          className="hidden sm:flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-[#16382b] border border-[#dbe5dd] rounded-xl bg-white hover:bg-gray-50 transition-colors"
        >
          <span>{header.language}</span>
          <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
        </button>

        {/* Notification bell icon */}
        <button
          type="button"
          aria-label="Notifications"
          className="relative p-2 rounded-xl text-gray-600 hover:bg-gray-100 border border-[#dbe5dd] bg-white transition-colors"
        >
          <Bell className="w-4 h-4 text-[#16382b]" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#f59e0b] ring-2 ring-white"></span>
        </button>

        {/* Logged in user avatar */}
        <div className="flex items-center gap-2 pl-1 sm:pl-2 sm:border-l sm:border-gray-200">
          <div className="w-8 h-8 rounded-full bg-[#c7ded0] text-[#10281d] font-bold text-xs flex items-center justify-center flex-shrink-0">
            {currentUser.initials}
          </div>
          <div className="hidden lg:block text-left">
            <div className="text-xs font-bold text-[#16382b] leading-tight">
              {currentUser.name}
            </div>
            <div className="text-[10px] text-[#6b7c72]">
              {currentUser.role}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile search drop-down bar */}
      {mobileSearchOpen && (
        <div className="absolute top-full left-0 right-0 p-3 bg-white border-b border-[#e5ece7] shadow-md md:hidden animate-fadeIn">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              autoFocus
              placeholder={header.searchPlaceholder}
              className="w-full pl-9 pr-3 py-2 text-xs bg-[#f8faf8] border border-[#dbe5dd] rounded-xl focus:outline-none focus:border-[#225740] text-[#16382b]"
            />
          </div>
        </div>
      )}
    </header>
  );
}
