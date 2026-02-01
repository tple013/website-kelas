"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const { isAuthenticated, role } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Not logged in = redirect to login
    if (!isAuthenticated) {
      router.replace("/admin/login");
    }
  }, [isAuthenticated, router]);

  // Not authenticated
  if (!isAuthenticated) {
    return null;
  }

  // Require admin but user is not admin
  if (requireAdmin && role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-xl font-semibold text-red-600">Akses Ditolak</h2>
          <p className="text-slate-600 mt-2">Halaman ini hanya untuk admin.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
