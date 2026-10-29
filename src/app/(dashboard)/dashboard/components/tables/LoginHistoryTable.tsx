"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Search, Filter, RefreshCw, Globe, Smartphone, Terminal, Cpu } from "lucide-react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/Table";
import Pagination from "@/components/ui/Pagination";
import Loader from "@/components/ui/Loader";
import EmptyState from "@/components/ui/EmptyState";
import * as dashboardService from "../../actions/getDashboard";
import { LoginHistoryResponse, LoginHistoryRecord, LoginHistoryFilters } from "../../types/dashboard.types";

// Login History Table: Audit logs, filters aur pagination
export default function LoginHistoryTable() {
  const [data, setData] = useState<LoginHistoryResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");
  const [selectedInterface, setSelectedInterface] = useState("All Interfaces");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // Data load karne ka memoized function
  const fetchRecords = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const filters: LoginHistoryFilters = {
        search: searchTerm,
        status: selectedStatus,
        interface: selectedInterface,
      };

      const res = await dashboardService.getLoginHistory(filters, {
        currentPage,
        pageSize,
      });
      setData(res);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load login history records.");
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm, selectedStatus, selectedInterface, currentPage]);

  useEffect(() => {
    let isMounted = true;
    const filters: LoginHistoryFilters = {
      search: searchTerm,
      status: selectedStatus,
      interface: selectedInterface,
    };

    dashboardService
      .getLoginHistory(filters, { currentPage, pageSize })
      .then((res) => {
        if (isMounted) {
          setData(res);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Failed to load audit records.");
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [searchTerm, selectedStatus, selectedInterface, currentPage]);

  // Search input change handler
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // Status dropdown filter change handler
  const handleStatusChange = (val: string) => {
    setSelectedStatus(val);
    setCurrentPage(1);
  };

  // Interface filter change handler
  const handleInterfaceChange = (val: string) => {
    setSelectedInterface(val);
    setCurrentPage(1);
  };

  // Sabhi filters reset karna
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedStatus("All Statuses");
    setSelectedInterface("All Interfaces");
    setCurrentPage(1);
  };

  // Status badge color rendering
  const renderStatusBadge = (record: LoginHistoryRecord) => {
    switch (record.status) {
      case "Success":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#dcfce7] text-[#15803d]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#15803d]"></span>
            Success
          </span>
        );
      case "Failed":
        return (
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#fde4e4] text-[#b42318]"
            title={record.failureReason || "Authentication failed"}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#b42318]"></span>
            Failed
          </span>
        );
      case "MFA Required":
        return (
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#fef3c7] text-[#b45309]"
            title={record.failureReason || "Secondary challenge pending"}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#b45309]"></span>
            MFA Req.
          </span>
        );
      case "Blocked":
        return (
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#f3f4f6] text-[#374151]"
            title={record.failureReason || "Access blocked"}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#374151]"></span>
            Blocked
          </span>
        );
      default:
        return null;
    }
  };

  // Interface icon rendering
  const renderInterfaceIcon = (interfaceName: string) => {
    switch (interfaceName) {
      case "Web Portal":
        return <Globe className="w-3.5 h-3.5 text-[#225740]" />;
      case "Mobile App":
        return <Smartphone className="w-3.5 h-3.5 text-[#2563eb]" />;
      case "Admin CLI":
        return <Terminal className="w-3.5 h-3.5 text-[#7e22ce]" />;
      case "API Gateway":
        return <Cpu className="w-3.5 h-3.5 text-[#d97706]" />;
      default:
        return <Globe className="w-3.5 h-3.5 text-[#225740]" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#e5ece7] shadow-sm overflow-hidden">
      {/* Table Header Section */}
      <div className="p-4 sm:p-6 border-b border-[#e5ece7]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#11261c]">
              {data?.title || "Recent Login Activity & Audit Logs"}
            </h3>
            <p className="text-xs text-[#6b7c72] mt-0.5">
              {data?.subtitle || "Detailed record of all authentication events across interfaces"}
            </p>
          </div>

          <button
            type="button"
            onClick={fetchRecords}
            disabled={isLoading}
            className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#dbe5dd] bg-[#f8faf8] hover:bg-[#eef3ef] text-xs font-semibold text-[#16382b] transition-colors disabled:opacity-50 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pt-2">
          {/* Search box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search by name, email, IP, location..."
              className="w-full h-9 pl-9 pr-3 py-1.5 text-xs bg-[#f8faf8] border border-[#dbe5dd] rounded-xl focus:bg-white focus:border-[#225740] focus:ring-1 focus:ring-[#225740] outline-none transition-all placeholder:text-gray-400"
            />
          </div>

          {/* Status & Interface Dropdown Selects */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-[#6b7c72]" />
              <select
                value={selectedStatus}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="h-9 px-3 py-1 bg-[#f8faf8] border border-[#dbe5dd] rounded-xl text-xs font-medium text-[#16382b] focus:outline-none focus:border-[#225740] cursor-pointer"
              >
                {(data?.filterOptions?.statusOptions || [
                  "All Statuses",
                  "Success",
                  "Failed",
                  "MFA Required",
                  "Blocked",
                ]).map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <select
              value={selectedInterface}
              onChange={(e) => handleInterfaceChange(e.target.value)}
              className="h-9 px-3 py-1 bg-[#f8faf8] border border-[#dbe5dd] rounded-xl text-xs font-medium text-[#16382b] focus:outline-none focus:border-[#225740] cursor-pointer"
            >
              {(data?.filterOptions?.interfaceOptions || [
                "All Interfaces",
                "Web Portal",
                "Mobile App",
                "Admin CLI",
                "API Gateway",
              ]).map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>

            {(searchTerm || selectedStatus !== "All Statuses" || selectedInterface !== "All Interfaces") && (
              <button
                type="button"
                onClick={clearFilters}
                className="text-xs font-bold text-[#225740] hover:underline px-2 py-1 cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Table Body */}
      {isLoading ? (
        <div className="p-12 flex items-center justify-center">
          <Loader text="Loading audit records..." />
        </div>
      ) : error ? (
        <div className="p-8 text-center">
          <p className="text-xs text-[#b42318] mb-2">{error}</p>
          <button
            type="button"
            onClick={fetchRecords}
            className="text-xs font-bold text-[#225740] underline cursor-pointer"
          >
            Retry Loading
          </button>
        </div>
      ) : !data?.records || data.records.length === 0 ? (
        <div className="p-8">
          <EmptyState
            title="No Login Records Found"
            description="No audit logs matched your active search or filter criteria."
            actionLabel="Clear Filters"
            onAction={clearFilters}
          />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-[#e5ece7] bg-[#f8faf8]">
                <TableHead className="py-3 px-4 text-left text-[11px] font-bold text-[#6b7c72] uppercase tracking-wider">
                  User
                </TableHead>
                <TableHead className="py-3 px-4 text-left text-[11px] font-bold text-[#6b7c72] uppercase tracking-wider">
                  Role
                </TableHead>
                <TableHead className="py-3 px-4 text-left text-[11px] font-bold text-[#6b7c72] uppercase tracking-wider">
                  Interface
                </TableHead>
                <TableHead className="py-3 px-4 text-left text-[11px] font-bold text-[#6b7c72] uppercase tracking-wider">
                  IP / Location
                </TableHead>
                <TableHead className="py-3 px-4 text-left text-[11px] font-bold text-[#6b7c72] uppercase tracking-wider">
                  Device
                </TableHead>
                <TableHead className="py-3 px-4 text-left text-[11px] font-bold text-[#6b7c72] uppercase tracking-wider">
                  Time
                </TableHead>
                <TableHead className="py-3 px-4 text-left text-[11px] font-bold text-[#6b7c72] uppercase tracking-wider">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.records.map((record) => (
                <TableRow
                  key={record.id}
                  className="border-b border-[#f0f4f1] hover:bg-[#f8faf8] transition-colors"
                >
                  {/* User Profile */}
                  <TableCell className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#e6efe8] text-[#225740] font-bold text-xs flex items-center justify-center flex-shrink-0">
                        {record.userInitials}
                      </div>
                      <div className="min-w-0">
                        <span className="block text-xs font-bold text-[#11261c] truncate">
                          {record.userName}
                        </span>
                        <span className="block text-[10.5px] text-[#6b7c72] truncate">
                          {record.userEmail}
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  {/* Role */}
                  <TableCell className="py-3.5 px-4 text-xs font-medium text-[#16382b]">
                    {record.userRole}
                  </TableCell>

                  {/* Interface */}
                  <TableCell className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5 text-xs text-[#16382b]">
                      {renderInterfaceIcon(record.interface)}
                      <span>{record.interface}</span>
                    </div>
                  </TableCell>

                  {/* IP Address & Location */}
                  <TableCell className="py-3.5 px-4">
                    <div className="text-xs text-[#16382b] font-mono">
                      {record.ipAddress}
                    </div>
                    <div className="text-[10.5px] text-[#6b7c72]">
                      {record.location}
                    </div>
                  </TableCell>

                  {/* Device */}
                  <TableCell className="py-3.5 px-4 text-xs text-[#465b50]">
                    {record.device}
                  </TableCell>

                  {/* Timestamp */}
                  <TableCell className="py-3.5 px-4 text-xs text-[#465b50] whitespace-nowrap">
                    {record.timestamp}
                  </TableCell>

                  {/* Status Badge */}
                  <TableCell className="py-3.5 px-4">
                    {renderStatusBadge(record)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Pagination Footer */}
      {data?.pagination && data.pagination.totalPages > 1 && (
        <div className="p-4 border-t border-[#e5ece7] flex items-center justify-between">
          <span className="text-xs text-[#6b7c72]">
            Showing{" "}
            <b>
              {(data.pagination.currentPage - 1) * data.pagination.pageSize + 1}-
              {Math.min(
                data.pagination.currentPage * data.pagination.pageSize,
                data.pagination.totalRecords
              )}
            </b>{" "}
            of <b>{data.pagination.totalRecords}</b> records
          </span>

          <Pagination
            currentPage={data.pagination.currentPage}
            totalPages={data.pagination.totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      )}
    </div>
  );
}
