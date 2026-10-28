import React from "react";
import { MoreHorizontal, ArrowRight } from "lucide-react";
import { RecentUser } from "@/types/uam";

interface RecentUsersTableProps {
  users: RecentUser[];
}

// Recent Users Directory Table
export default function RecentUsersTable({ users }: RecentUsersTableProps) {
  // Status badge pill (Active, Pending, Inactive)
  const renderStatusBadge = (status: "Active" | "Pending" | "Inactive") => {
    switch (status) {
      case "Active":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-[#e6efe8] text-[#15803d]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#15803d]"></span>
            Active
          </span>
        );
      case "Pending":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-[#fef3c7] text-[#b45309]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#b45309]"></span>
            Pending
          </span>
        );
      case "Inactive":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-gray-100 text-gray-600">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
            Inactive
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#e5ece7] shadow-sm overflow-hidden">
      {/* Table Header: Title aur View All button */}
      <div className="p-4 sm:p-5 flex items-center justify-between border-b border-[#eef3ef]">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-[#16382b]">
            Recent Users
          </h3>
          <p className="text-[11px] sm:text-xs text-[#6b7c72] mt-0.5">
            Active and newly registered users across your organization
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#225740] hover:text-[#16382b] transition-colors"
        >
          <span>View all</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Horizontal Scrollable Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[640px]">
          <thead>
            <tr className="bg-[#f8faf8] border-b border-[#eef3ef] text-[10px] sm:text-[11px] font-bold text-[#6b7c72] uppercase tracking-wider">
              <th scope="col" className="py-3 px-4 sm:px-6">User</th>
              <th scope="col" className="py-3 px-4 sm:px-6">Role</th>
              <th scope="col" className="py-3 px-4 sm:px-6">Status</th>
              <th scope="col" className="py-3 px-4 sm:px-6">Last Active</th>
              <th scope="col" className="py-3 px-4 sm:px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#eef3ef] text-xs sm:text-sm">
            {users.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-[#fbfdfb] transition-colors group"
              >
                {/* Avatar, Name aur Email */}
                <td className="py-3.5 px-4 sm:px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 bg-[#e6efe8] text-[#1e4d3a]">
                      {user.initials}
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-[#16382b] truncate">
                        {user.name}
                      </div>
                      <div className="text-[11px] text-[#6b7c72] truncate">
                        {user.email}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Role */}
                <td className="py-3.5 px-4 sm:px-6 font-medium text-[#2d4436]">
                  {user.role}
                </td>

                {/* Status Pill */}
                <td className="py-3.5 px-4 sm:px-6">
                  {renderStatusBadge(user.status)}
                </td>

                {/* Last Active Time */}
                <td className="py-3.5 px-4 sm:px-6 text-xs text-[#6b7c72]">
                  {user.lastActive}
                </td>

                {/* Action button */}
                <td className="py-3.5 px-4 sm:px-6 text-right">
                  <button
                    type="button"
                    aria-label={`Actions for ${user.name}`}
                    className="p-1 rounded-lg text-gray-400 hover:text-[#16382b] hover:bg-gray-100 transition-colors"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
