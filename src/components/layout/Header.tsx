"use client";

import React, { useState } from "react";
import { Search, Bell, Menu, X } from "lucide-react";
import { dashboardData } from "@/lib/data";

interface HeaderProps {
  onOpenMobileSidebar: () => void;
}

// Top Header: Breadcrumbs, Search, Notifications aur User Profile
export default function Header({ onOpenMobileSidebar }: HeaderProps) {
  const { header, currentUser } = dashboardData;
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 bg-white/85 backdrop-blur-md border-b border-[#e5ece7]">
      {/* Left side: Mobile menu toggle aur breadcrumbs */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Mobile menu button */}
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
          <span className="hidden xs:inline text-gray-300">/</span>
          <span className="font-bold text-[#16382b]">
            {header.breadcrumbCurrent}
          </span>
        </nav>
      </div>

      {/* Right side: Search, language, notifications, user avatar */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Search input (Desktop) */}
        <div className="relative hidden md:block w-48 lg:w-64">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder={header.searchPlaceholder}
            className="w-full h-9 pl-9 pr-3 py-1.5 text-xs bg-[#f4f7f4] border border-[#dbe5dd] rounded-xl focus:bg-white focus:border-[#225740] focus:ring-1 focus:ring-[#225740] outline-none transition-all placeholder:text-gray-400"
          />
        </div>

        {/* Mobile search toggle button */}
        <button
          type="button"
          onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
          aria-label="Toggle search bar"
          className="p-2 text-[#16382b] hover:bg-gray-100 rounded-xl md:hidden transition-colors cursor-pointer"
        >
          {mobileSearchOpen ? (
            <X className="w-4 h-4" />
          ) : (
            <Search className="w-4 h-4" />
          )}
        </button>

        {/* Language selector badge */}
        <div className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-full bg-[#f4f7f4] border border-[#dbe5dd] text-[11px] font-semibold text-[#16382b]">
          {header.language}
        </div>

        {/* Notifications button */}
        <button
          type="button"
          onClick={() => alert("No unread notifications at this time.")}
          aria-label="Notifications"
          className="relative p-2 text-[#16382b] hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#225740] ring-2 ring-white"></span>
        </button>

        {/* User profile dropdown badge */}
        <div className="flex items-center gap-2 pl-1 sm:pl-2 border-l border-[#e5ece7]">
          <div className="w-8 h-8 rounded-full bg-[#225740] text-white flex items-center justify-center font-bold text-xs shadow-xs">
            {currentUser.initials}
          </div>
          <div className="hidden lg:flex flex-col text-left">
            <span className="text-xs font-bold text-[#11261c] leading-tight">
              {currentUser.name}
            </span>
            <span className="text-[10px] text-[#6b7c72] leading-tight">
              {currentUser.role}
            </span>
          </div>
        </div>
      </div>

      {/* Expandable search bar for mobile view */}
      {mobileSearchOpen && (
        <div className="absolute top-full left-0 right-0 p-3 bg-white border-b border-[#e5ece7] shadow-sm md:hidden animate-fade-in z-20">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              autoFocus
              placeholder={header.searchPlaceholder}
              className="w-full h-10 pl-9 pr-3 py-2 text-xs bg-[#f4f7f4] border border-[#dbe5dd] rounded-xl focus:bg-white focus:border-[#225740] outline-none transition-all placeholder:text-gray-400"
            />
          </div>
        </div>
      )}
    </header>
  );
}
