import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalRecords?: number;
  pageSize?: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  totalRecords,
  pageSize,
  onPageChange,
  className = "",
}: PaginationProps) {
  const showRecordCount = totalRecords !== undefined && pageSize !== undefined;
  const startItem = showRecordCount ? (totalRecords === 0 ? 0 : (currentPage - 1) * pageSize + 1) : 0;
  const endItem = showRecordCount ? Math.min(currentPage * pageSize, totalRecords) : 0;

  return (
    <div
      className={`flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t border-[#eef3ef] text-xs text-[#6b7c72] select-none ${className}`}
    >
      {showRecordCount && (
        <div>
          Showing <b className="text-[#16382b]">{startItem}</b> to{" "}
          <b className="text-[#16382b]">{endItem}</b> of{" "}
          <b className="text-[#16382b]">{totalRecords}</b> records
        </div>
      )}

      <div className="flex items-center gap-1.5">
        <button
          type="button"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="Previous page"
          className="p-1.5 rounded-lg border border-[#dbe5dd] bg-white hover:bg-[#f4f7f4] text-[#16382b] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
          <button
            key={pageNumber}
            type="button"
            onClick={() => onPageChange(pageNumber)}
            className={`w-7 h-7 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              pageNumber === currentPage
                ? "bg-[#225740] text-white"
                : "border border-[#dbe5dd] bg-white hover:bg-[#f4f7f4] text-[#16382b]"
            }`}
          >
            {pageNumber}
          </button>
        ))}

        <button
          type="button"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          aria-label="Next page"
          className="p-1.5 rounded-lg border border-[#dbe5dd] bg-white hover:bg-[#f4f7f4] text-[#16382b] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

