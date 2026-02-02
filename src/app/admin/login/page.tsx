"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { loginSchema, validateForm } from "@/lib/validations";
import { Button, Input } from "@/shared/components/ui";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signIn, isAuthenticated } = useAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  // Already logged in? Redirect to admin
  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/admin");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate form
    const validation = validateForm(loginSchema, { email, password });
    if (!validation.success) {
      const firstError = Object.values(validation.errors)[0];
      setError(firstError || "Form tidak valid");
      return;
    }

    setIsSubmitting(true);

    const { success, error: authError } = await signIn(email, password);
    
    if (success) {
      router.replace("/admin");
    } else {
      setError(authError?.message || "Email atau password salah");
      setIsSubmitting(false);
    }
  };

  // Don't show login form if already authenticated
  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 px-4">
      <div className="max-w-md w-full">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-xl mb-4">
            <i className="bi bi-shield-lock text-white text-2xl"></i>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Login</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Masuk untuk mengelola website kelas</p>
        </div>

        {/* Login Form */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
                <i className="bi bi-exclamation-circle mr-2"></i>
                {error}
              </div>
            )}

            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              icon="bi-envelope"
              autoComplete="email"
              disabled={isSubmitting}
              required
            />

            <div className="relative">
  <Input
    label="Password"
    type={showPassword ? "text" : "password"}
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    placeholder="••••••••"
    icon="bi-lock"
    autoComplete="current-password"
    disabled={isSubmitting}
    required
  />
  
  <button
    type="button"
    className="absolute right-2 top-11 transform -translate-y-1/2 text-gray-500 hover:text-black dark:text-sky-600 dark:hover:text-blue-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
    onClick={() => setShowPassword(!showPassword)}
    disabled={isSubmitting}
    aria-label={showPassword ? "Hide password" : "Show password"}
  >
    {showPassword ? (
      <i className="bi bi-eye-slash text-lg"></i>
    ) : (
      <i className="bi bi-eye text-lg"></i>
    )}
  </button>
</div>

            <Button type="submit" isLoading={isSubmitting} className="w-full">
              Masuk
            </Button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            <i className="bi bi-arrow-left mr-1"></i>
            Kembali ke Website
          </Link>
        </p>
      </div>
    </div>
  );
}
