"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { ProtectedRoute } from "@/shared/components/auth";
import { MembersAdmin, ProjectsAdmin, SchedulesAdmin, UsersAdmin, LogsAdminPanel } from "./components";

type Tab = "members" | "projects" | "schedules" | "users" | "logs";

function AdminContent() {
  const [activeTab, setActiveTab] = useState<Tab>("members");
  const { user, profile, role, signOut } = useAuth();
  const [currentUserName, setCurrentUserName] = useState<string>('');

  // Ambil nama dari localStorage saat komponen mount
  useEffect(() => {
    const savedName = localStorage.getItem('currentUserName');
    if (savedName) {
      setCurrentUserName(savedName);
    }
  }, []);

  const allTabs = [
    { id: "members" as Tab, label: "Anggota", icon: "bi-people" },
    { id: "projects" as Tab, label: "Proyek", icon: "bi-kanban" },
    { id: "schedules" as Tab, label: "Jadwal", icon: "bi-calendar3" },
    { id: "users" as Tab, label: "Users", icon: "bi-person-gear" },
    { id: "logs" as Tab, label: "LOG Login", icon: "bi bi-door-open-fill" },
  ];

  // Filter tabs berdasarkan role
  const tabs = role === 'admin' ? allTabs : allTabs.filter(tab => tab.id === 'members');

  const handleLogout = async () => {
    if (confirm("Yakin ingin keluar?")) {
      // Hapus nama dari localStorage saat logout
      localStorage.removeItem('currentUserName');
      await signOut();
    }
  };

  // Display name: 
  // 1. Nama dari login form (currentUserName)
  // 2. Profile full_name dari auth
  // 3. Email dari auth
  const displayName = currentUserName || profile?.full_name || user?.email || 'User';
  const roleLabel = role === 'admin' ? 'Pengurus Kelas' : 'Anggota';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 shadow-sm border-b dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                <i className="bi bi-gear-fill mr-2"></i>
                Admin Panel
              </h1>
              <p className="text-slate-500 dark:text-slate-400 mt-1">
                Selamat datang, <span className="font-semibold text-blue-600 dark:text-blue-400">{displayName}</span>
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  {displayName}
                  {currentUserName && (
                    <span className="ml-2 text-xs px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 rounded-full">
                      <i className="bi bi-check-circle mr-1"></i>
                      Tercatat
                    </span>
                  )}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {roleLabel} • Login: {user?.email}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
              >
                <i className="bi bi-box-arrow-right"></i>
                Keluar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs & Content (sama seperti sebelumnya) */}
      <div className="bg-white dark:bg-slate-800 border-b dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? "border-blue-600 text-blue-600 dark:text-blue-400"
                    : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600"
                }`}
              >
                <i className={`bi ${tab.icon} mr-2`}></i>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "members" && <MembersAdmin />}
        {activeTab === "projects" && <ProjectsAdmin />}
        {activeTab === "schedules" && <SchedulesAdmin />}
        {activeTab === "users" && <UsersAdmin />}
        {activeTab === "logs" && <LogsAdminPanel />}
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