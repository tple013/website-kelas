"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface UserWithRole {
  id: string;
  email: string;
  role: 'admin' | 'member' | null;
  created_at: string;
}

export function UsersAdmin() {
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase.auth.admin.listUsers();
      if (error) throw error;

      const usersWithRoles = data.users.map(user => ({
        id: user.id,
        email: user.email || '',
        role: (user.user_metadata?.role as 'admin' | 'member') || null,
        created_at: user.created_at,
      }));

      setUsers(usersWithRoles);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (userId: string, newRole: 'admin' | 'member') => {
    setUpdating(userId);
    try {
      const { error } = await supabase.auth.admin.updateUserById(userId, {
        user_metadata: { role: newRole }
      });

      if (error) throw error;

      // Update local state
      setUsers(prev => prev.map(user =>
        user.id === userId ? { ...user, role: newRole } : user
      ));
    } catch (error) {
      console.error('Error updating role:', error);
      alert('Gagal update role');
    } finally {
      setUpdating(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-medium text-slate-900">Kelola User & Role</h2>
          <p className="text-sm text-slate-500">Atur role untuk setiap user admin panel</p>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-slate-600 mt-2">Memuat data...</p>
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-slate-200">
            {users.map((user) => (
              <li key={user.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-900">{user.email}</p>
                        <p className="text-sm text-slate-500">
                          Dibuat: {new Date(user.created_at).toLocaleDateString('id-ID')}
                        </p>
                      </div>
                      <div className="ml-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          user.role === 'admin'
                            ? 'bg-purple-100 text-purple-800'
                            : user.role === 'member'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-slate-100 text-slate-800'
                        }`}>
                          {user.role === 'admin' ? 'Pengurus Kelas' : user.role === 'member' ? 'Anggota' : 'Belum Diset'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => updateUserRole(user.id, 'admin')}
                      disabled={updating === user.id || user.role === 'admin'}
                      className="px-3 py-1 text-xs bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {updating === user.id ? '...' : 'Set Admin'}
                    </button>
                    <button
                      onClick={() => updateUserRole(user.id, 'member')}
                      disabled={updating === user.id || user.role === 'member'}
                      className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {updating === user.id ? '...' : 'Set Member'}
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}