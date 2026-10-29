"use client";

import React from "react";
import Logo from "@/components/layout/Logo";
import { brandingData } from "@/lib/data";
import LoginForm from "./components/LoginForm";

// Login Page: IntraShip branding aur login form ka main shell
export default function LoginPage() {
  return (
    <div className="relative h-screen max-h-screen w-full flex flex-col justify-between font-sans selection:bg-[#225740] selection:text-white overflow-hidden py-3 px-4 sm:px-8 lg:px-12 xl:px-14">
      {/* Background image overlay */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat pointer-events-none z-0"
        style={{
          backgroundImage: "url('/images/login-bg.webp')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#d9e6dc]/85 via-[#e8f1eb]/55 to-white/10 backdrop-blur-[0.5px]"></div>
      </div>

      {/* Top Header: Portal tag aur support help button */}
      <header className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-between gap-2 flex-shrink-0">
        <div className="px-3.5 sm:px-5 py-1.5 rounded-2xl bg-white/85 backdrop-blur-md border border-white/90 text-[10.5px] sm:text-xs font-semibold text-[#1e4d3a] shadow-xs truncate max-w-[210px] sm:max-w-none">
          {brandingData.portalTag}
        </div>

        <button
          type="button"
          onClick={() => alert("IntraShip Support: Please reach out to your administrator for access assistance.")}
          className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full bg-white/90 hover:bg-white text-[10.5px] sm:text-xs font-semibold text-[#16382b] shadow-xs border border-white/90 transition-all cursor-pointer flex-shrink-0"
        >
          <span className="text-[#225740] font-bold">?</span>
          <span>{brandingData.helpSupportText}</span>
        </button>
      </header>

      {/* Main 2-column layout */}
      <main className="relative z-10 w-full max-w-7xl mx-auto flex-1 flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-6 xl:gap-14 my-auto min-h-0 py-2">
        {/* Left branding column */}
        <div className="hidden lg:flex flex-col max-w-[440px] xl:max-w-[480px] shrink-0">
          <div className="mb-3 xl:mb-4">
            <Logo href="/login" />
          </div>

          <h1 className="text-3xl xl:text-4xl 2xl:text-[40px] font-black text-[#11261c] leading-[1.15] tracking-tight mb-2 drop-shadow-xs">
            {brandingData.headline}
          </h1>

          <p className="text-xs xl:text-sm text-[#253d30] font-medium leading-relaxed mb-3 xl:mb-4">
            {brandingData.subheadline}
          </p>

          {/* 3 Steps list */}
          <div className="space-y-2 xl:space-y-2.5 mb-3.5 xl:mb-4">
            {brandingData.steps.map((step) => (
              <div key={step.id} className="flex items-center gap-3">
                <span className="w-6 h-6 xl:w-6.5 xl:h-6.5 rounded-full bg-white text-[#225740] font-bold text-[11px] xl:text-xs flex items-center justify-center shadow-xs border border-white/80 flex-shrink-0">
                  {step.id}
                </span>
                <span className="text-xs xl:text-sm font-semibold text-[#16382b]">
                  {step.text}
                </span>
              </div>
            ))}
          </div>

          <div className="self-start inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#225740] text-white text-[10px] xl:text-[11px] font-bold tracking-wider uppercase shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
            <span>{brandingData.badgeText}</span>
          </div>
        </div>

        {/* Right login form card */}
        <LoginForm />
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto text-center lg:text-left text-[10.5px] text-[#3b4d42] font-medium flex-shrink-0 pt-1">
        {brandingData.copyright}
      </footer>
    </div>
  );
}
