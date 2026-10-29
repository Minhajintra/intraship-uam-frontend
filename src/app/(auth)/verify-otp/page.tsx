"use client";

import React, { Suspense } from "react";
import Logo from "@/components/layout/Logo";
import VerifyOtpForm from "./components/VerifyOtpForm";

// Verify OTP page ka content wrapper
function VerifyOtpContent() {
  const steps = [
    { id: "01", text: "Check your registered email inbox" },
    { id: "02", text: "Enter all six digits carefully" },
    { id: "03", text: "Request a new code if it expires" },
  ];

  return (
    <div className="min-h-screen bg-[#f5f8f5] font-sans flex flex-col justify-center py-6 px-4 sm:px-6 lg:px-12 overflow-x-hidden">
      <main className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Left Side: OTP Verification Card */}
        <div className="flex flex-col">
          <div className="mb-5 sm:mb-6">
            <Logo href="/login" />
          </div>

          <VerifyOtpForm />
        </div>

        {/* Right Side: Informative steps card */}
        <div className="w-full bg-[#e6f0e8] rounded-[28px] p-6 sm:p-8 lg:p-9 shadow-xs flex flex-col justify-between min-h-[460px]">
          <div>
            <div className="w-full h-2.5 rounded-full bg-[#245b43] mb-6 sm:mb-8"></div>

            <span className="block text-[10px] sm:text-[10.5px] font-bold tracking-wider uppercase text-[#245b43] mb-2 sm:mb-2.5">
              ACCOUNT SECURITY
            </span>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#11261c] mb-2.5 tracking-tight">
              One more step to sign in
            </h2>

            <p className="text-xs sm:text-sm text-[#4a5e52] mb-6 leading-relaxed">
              A quick verification helps keep your workspace and users safe.
            </p>

            {/* 3 Step List */}
            <div className="space-y-3">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className="bg-white rounded-2xl p-3.5 sm:p-4 flex items-center gap-3.5 shadow-xs border border-white/80"
                >
                  <span className="w-7 h-7 rounded-full bg-[#e6f0e8] text-[#245b43] font-bold text-xs flex items-center justify-center flex-shrink-0">
                    {step.id}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-[#16382b]">
                    {step.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-[10px] font-bold tracking-wider text-[#4a6355] uppercase mt-8 pt-4">
            INTRASHIP &bull; SECURE BY DESIGN
          </div>
        </div>
      </main>
    </div>
  );
}

// Suspense wrapper search params hydration ke liye zaroori hai
export default function VerifyOtpPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f5f8f5]" />}>
      <VerifyOtpContent />
    </Suspense>
  );
}
