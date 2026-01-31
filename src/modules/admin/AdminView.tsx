"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { ProtectedRoute } from "@/shared/components/auth";
import { MembersAdmin, ProjectsAdmin, SchedulesAdmin, UsersAdmin } from "./components";

type Tab = "members" | "projects" | "schedules" | "users";

function AdminContent() {
  const [activeTab, setActiveTab] = useState<Tab>("members");
  const { user, role, signOut } = useAuth();

  const allTabs = [
    { id: "members" as Tab, label: "Anggota", icon: "bi-people" },
    { id: "projects" as Tab, label: "Proyek", icon: "bi-kanban" },
    { id: "schedules" as Tab, label: "Jadwal", icon: "bi-calendar3" },
    { id: "users" as Tab, label: "Users", icon: "bi-person-gear" },
  ];

  // Filter tabs berdasarkan role
  const tabs = role === 'admin' ? allTabs : allTabs.filter(tab => tab.id === 'members');

  const handleLogout = async () => {
    if (confirm("Yakin ingin keluar?")) {
      await signOut();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                <i className="bi bi-gear-fill mr-2"></i>
                Admin Panel
              </h1>
              <p className="text-slate-500 mt-1">Kelola data anggota, proyek, dan jadwal</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-slate-900">{user?.email}</p>
                <p className="text-xs text-slate-500">{role === 'admin' ? 'Pengurus Kelas' : 'Anggota'}</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <i className="bi bi-box-arrow-right"></i>
                Keluar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                }`}
              >
                <i className={`bi ${tab.icon} mr-2`}></i>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "members" && <MembersAdmin />}
        {activeTab === "projects" && <ProjectsAdmin />}
        {activeTab === "schedules" && <SchedulesAdmin />}
        {activeTab === "users" && <UsersAdmin />}
      </div>
    </div>
  );
}

export function AdminView() {
  return (
    <ProtectedRoute>
      <AdminContent />
    </ProtectedRoute>
  );
}
