// app/admin/components/LogAdmin.tsx
"use client";

import React, { useState, useEffect } from 'react';

interface LoginLog {
  id: number;
  nama: string;
  timestamp: string;
  waktu: string;
}

export function LogsAdminPanel() {
  const [loginLogs, setLoginLogs] = useState<LoginLog[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Load log dari localStorage
  useEffect(() => {
    const savedLogs = localStorage.getItem('loginLogs');
    if (savedLogs) {
      setLoginLogs(JSON.parse(savedLogs));
    }
  }, []);

  // Filter logs
  const filteredLogs = loginLogs.filter(log =>
    log.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.waktu.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClearAllLogs = () => {
    if (window.confirm('Apakah Anda yakin ingin menghapus semua log?')) {
      setLoginLogs([]);
      localStorage.removeItem('loginLogs');
    }
  };

  const handleDeleteLog = (id: number) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus log ini?')) {
      const updatedLogs = loginLogs.filter(log => log.id !== id);
      setLoginLogs(updatedLogs);
      localStorage.setItem('loginLogs', JSON.stringify(updatedLogs));
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
      {/* Header */}
      <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-700">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              <i className="bi bi-door-open-fill mr-2"></i>
              Log Aktivitas Login
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              Total: {loginLogs.length} login
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <i className="bi bi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"></i>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari log..."
                className="pl-10 pr-4 py-2 w-64 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            
            {loginLogs.length > 0 && (
              <button
                onClick={handleClearAllLogs}
                className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg font-medium hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
              >
                <i className="bi bi-trash mr-2"></i>
                Hapus Semua
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {filteredLogs.length === 0 ? (
          <div className="text-center py-12">
            <i className="bi bi-journal-x text-4xl text-slate-300 dark:text-slate-600 mb-3"></i>
            <p className="text-slate-500 dark:text-slate-400">
              {searchTerm ? 'Tidak ada log yang sesuai' : 'Belum ada data log login'}
            </p>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
            <thead className="bg-slate-50 dark:bg-slate-900/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  #
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Nama Pengguna
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Waktu Login
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {filteredLogs.map((log, index) => (
                <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                      {index + 1}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-8 w-8 flex-shrink-0 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mr-3">
                        <i className="bi bi-person text-blue-600 dark:text-blue-400"></i>
                      </div>
                      <div className="text-sm font-medium text-slate-900 dark:text-white">
                        {log.nama}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-slate-900 dark:text-white">{log.waktu}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleDeleteLog(log.id)}
                      className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-1 rounded text-sm transition-colors"
                    >
                      <i className="bi bi-trash mr-1"></i>
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default LogsAdminPanel;