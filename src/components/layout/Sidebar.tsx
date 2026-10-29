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
import Logo from "./Logo";
import { dashboardData } from "@/lib/data";
import { authService } from "@/services/auth.service";

interface SidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

// Left Sidebar Navigation component
export default function Sidebar({
  mobileOpen = false,
  onCloseMobile,
}: SidebarProps) {
  const router = useRouter();

  const navItems = dashboardData.navigation;
  const currentUser = dashboardData.currentUser;
  const helpBox = dashboardData.helpBox;

  // Icon name ke mutabiq Lucide icon return karna
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
      await authService.logout();
    } catch {
      // Ignored
    } finally {
      router.push("/login");
    }
  };

  return (
    <>
      {/* Mobile background overlay */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs md:hidden animate-fade-in"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#11261c] text-white flex flex-col justify-between p-4 sm:p-5 transition-transform duration-300 ease-in-out md:translate-x-0 ${
          mobileOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Header logo & mobile close button */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <Logo light href="/dashboard" />
            <button
              type="button"
              onClick={onCloseMobile}
              className="p-1 rounded-lg text-white/70 hover:text-white md:hidden transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="mt-6 space-y-1.5" aria-label="Sidebar Navigation">
            {navItems.map((item) => {
              const isDashboard = item.id === "dashboard";
              return (
                <Link
                  key={item.id}
                  href={item.href || "/dashboard"}
                  onClick={() => onCloseMobile?.()}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isDashboard
                      ? "bg-[#225740] text-white shadow-xs"
                      : "text-white/75 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {getNavIcon(item.icon)}
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#fdeccf] text-[#8a5200]">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section: Help card & Current user */}
        <div className="space-y-4 pt-4 border-t border-white/10">
          {/* Help box */}
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
            <h4 className="text-xs font-bold text-white mb-1">
              {helpBox.title}
            </h4>
            <p className="text-[11px] text-white/70 leading-relaxed mb-3">
              {helpBox.description}
            </p>
            <button
              type="button"
              onClick={() => alert("IntraShip Support: Help desk ticket submission opens in admin portal.")}
              className="w-full py-1.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold transition-colors cursor-pointer"
            >
              {helpBox.buttonText}
            </button>
          </div>

          {/* User badge and logout button */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#225740] text-white flex items-center justify-center font-bold text-xs border border-white/20">
                {currentUser.initials}
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white leading-tight">
                  {currentUser.name}
                </span>
                <span className="text-[10px] text-white/60 leading-tight">
                  {currentUser.role}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSignOut}
              title="Sign Out"
              aria-label="Sign Out"
              className="p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
