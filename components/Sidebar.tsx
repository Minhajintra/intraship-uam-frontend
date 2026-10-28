"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  KeyRound,
  CheckCircle2,
  ListChecks,
  Settings,
  LogOut,
  X,
} from "lucide-react";
import Logo from "@/components/Logo";
import { dashboardData } from "@/lib/data";

interface SidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

// Left Sidebar Navigation
export default function Sidebar({
  mobileOpen = false,
  onCloseMobile,
}: SidebarProps) {
  const router = useRouter();

  const navItems = dashboardData.navigation;
  const currentUser = dashboardData.currentUser;
  const helpBox = dashboardData.helpBox;

  // JSON ke icon name ko Lucide icon me map karna
  const getNavIcon = (iconName: string) => {
    switch (iconName) {
      case "LayoutDashboard":
        return <LayoutDashboard className="w-4 h-4 flex-shrink-0" />;
      case "Users":
        return <Users className="w-4 h-4 flex-shrink-0" />;
      case "KeyRound":
        return <KeyRound className="w-4 h-4 flex-shrink-0" />;
      case "CheckCircle2":
        return <CheckCircle2 className="w-4 h-4 flex-shrink-0" />;
      case "ListChecks":
        return <ListChecks className="w-4 h-4 flex-shrink-0" />;
      case "Settings":
        return <Settings className="w-4 h-4 flex-shrink-0" />;
      default:
        return <LayoutDashboard className="w-4 h-4 flex-shrink-0" />;
    }
  };

  // Sign out handle karna
  const handleSignOut = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {
      // Background error ignore karein
    }
    router.push("/login");
  };

  return (
    <>
      {/* Mobile par piche ka black overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 md:hidden transition-opacity"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      {/* Main Fixed Sidebar Panel */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-64 bg-[#1e3e2b] text-white flex flex-col justify-between p-5 overflow-y-auto custom-sidebar-scroll transition-transform duration-300 ease-in-out flex-shrink-0 shadow-2xl md:shadow-none ${
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Top hissa: Logo aur Menu Links */}
        <div className="flex flex-col flex-shrink-0">
          {/* Logo aur mobile close button */}
          <div className="flex items-center justify-between pb-6 pt-1">
            <Logo light href="/dashboard" />
            <button
              type="button"
              onClick={onCloseMobile}
              aria-label="Close menu"
              className="md:hidden p-1.5 rounded-lg text-[#a3c4ae] hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="text-[10px] font-bold tracking-widest uppercase text-[#9dbba7] mb-3 px-2">
            WORKSPACE
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = item.id === "dashboard";

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={onCloseMobile}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-[#8fb07a] text-[#10281d] shadow-sm font-bold"
                      : "text-[#dcebe1] hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {getNavIcon(item.icon)}
                    <span>{item.label}</span>
                  </div>

                  {/* Badge count (jaise Access Requests: 7) */}
                  {item.badge && (
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#fdeccf] text-[#8a5200]">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom hissa: Help Box aur User Profile */}
        <div className="space-y-4 pt-4 border-t border-white/10 mt-6 flex-shrink-0">
          {/* Help Center Box */}
          <div className="rounded-2xl bg-white/[0.08] p-4 border border-white/10">
            <h4 className="text-xs font-bold text-white mb-1">
              {helpBox.title}
            </h4>
            <p className="text-[11px] text-[#c2d6c8] leading-relaxed mb-3">
              {helpBox.description}
            </p>
            <a
              href="#help"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-white hover:underline group"
            >
              {helpBox.buttonText}
            </a>
          </div>

          {/* User profile aur Logout button */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#8fb07a] text-[#10281d] font-bold text-xs flex items-center justify-center">
                {currentUser.initials}
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-white leading-tight">
                  {currentUser.name}
                </div>
                <div className="text-[10px] text-[#a3c4ae]">
                  {currentUser.role}
                </div>
              </div>
            </div>

            <button
              onClick={handleSignOut}
              title="Sign Out"
              aria-label="Sign out of your account"
              className="p-1.5 rounded-lg text-[#a3c4ae] hover:text-white hover:bg-white/10 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
