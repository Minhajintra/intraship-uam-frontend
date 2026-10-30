import React, { useEffect } from "react";
import { X } from "lucide-react";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg";
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "md",
}: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className={`w-full ${maxWidthClasses[maxWidth]} bg-white rounded-3xl p-6 shadow-2xl border border-[#dbe5dd] relative animate-in zoom-in-95 duration-150`}
      >
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#eef3ef]">
          <h3 className="text-base font-bold text-[#16382b]">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-md cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div>{children}</div>
      </div>
    </div>
  );
}

