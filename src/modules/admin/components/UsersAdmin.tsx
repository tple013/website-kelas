"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth, UserRole } from "@/lib/auth";
import { Button } from "@/shared/components/ui";

interface ProfileWithRole {
  id: string;
  email: string | null;
  full_name: string | null;
  role: UserRole;
  created_at: string;
}

export function UsersAdmin() {
  const { role: currentUserRole, refreshProfile } = useAuth();
  const [profiles, setProfiles] = useState<ProfileWithRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchProfiles = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error: fetchError } = await supabase
        .from('profiles')
        .select('id, email, full_name, role, created_at')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      setProfiles(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal memuat data users');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (currentUserRole === 'admin') {
      fetchProfiles();
    } else {
      setLoading(false);
    }
  }, [currentUserRole, fetchProfiles]);

  const updateUserRole = async (userId: string, newRole: 'admin' | 'member') => {
    setUpdating(userId);
    setError(null);
    
    try {
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', userId);

      if (updateError) throw updateError;

      // Update local state
      setProfiles(prev => prev.map(profile =>
        profile.id === userId ? { ...profile, role: newRole } : profile
      ));

      // Refresh current user profile jika mengubah diri sendiri
      await refreshProfile();
    } catch (err) {
      setError('Gagal update role: ' + (err instanceof Error ? err.message : 'Unknown error'));
    } finally {
      setUpdating(null);
    }
  };

  // Non-admin tidak bisa akses
  if (currentUserRole !== 'admin') {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🔒</div>
        <h2 className="text-xl font-semibold text-red-600">Akses Ditolak</h2>
        <p className="text-slate-600 mt-2">Hanya pengurus kelas yang bisa mengakses menu ini.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-slate-600">Memuat data...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
        <i className="bi bi-exclamation-triangle mr-2"></i>
        Error: {error}
        <button
          onClick={fetchProfiles}
          className="ml-4 text-sm underline hover:no-underline"
        >
          Coba lagi
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-medium text-slate-900">Kelola User & Role</h2>
          <p className="text-sm text-slate-500">Atur role untuk setiap user yang terdaftar</p>
        </div>
        <Button 
          variant="secondary" 
          size="sm" 
          onClick={fetchProfiles}
          icon={<i className="bi bi-arrow-clockwise" />}
        >
          Refresh
        </Button>
      </div>

      {profiles.length === 0 ? (
        <div className="text-center py-8 text-slate-500">
          Belum ada user terdaftar.
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg border">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Dibuat
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {profiles.map((profile) => (
                <tr key={profile.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-slate-900">
                        {profile.full_name || profile.email || 'No name'}
                      </div>
                      {profile.full_name && (
                        <div className="text-sm text-slate-500">{profile.email}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-full ${
                      profile.role === 'admin'
                        ? 'bg-purple-100 text-purple-800'
                        : profile.role === 'member'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {profile.role === 'admin' 
                        ? '👑 Pengurus Kelas' 
                        : profile.role === 'member' 
                        ? '👤 Anggota' 
                        : '❓ Belum Diset'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    {new Date(profile.created_at).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => updateUserRole(profile.id, 'admin')}
                        disabled={updating === profile.id || profile.role === 'admin'}
                        className="px-3 py-1 text-xs bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        {updating === profile.id ? '...' : 'Set Admin'}
                      </button>
                      <button
                        onClick={() => updateUserRole(profile.id, 'member')}
                        disabled={updating === profile.id || profile.role === 'member'}
                        className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        {updating === profile.id ? '...' : 'Set Member'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Info Box */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <h3 className="font-medium text-amber-800 mb-2">
          <i className="bi bi-info-circle mr-2"></i>
          Tentang Role
        </h3>
        <ul className="text-sm text-amber-700 space-y-1">
          <li><strong>Pengurus Kelas (admin):</strong> Akses penuh - kelola anggota, proyek, jadwal, dan users</li>
          <li><strong>Anggota (member):</strong> Akses terbatas - hanya bisa kelola data anggota</li>
        </ul>
      </div>
    </div>
  );
}