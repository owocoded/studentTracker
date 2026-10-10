"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setLoading(true);

    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-br from-[#F5F3FF] via-white to-[#FAFAFA] px-4 py-12">
      
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-purple-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-violet-200/30 blur-3xl" />

      <div className="relative w-full max-w-md">
        <div className="mb-8 text-center">
          
          <p className="mt-3 text-sm text-[#71717A]">
            Every lesson tracked. Every session accounted for.
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-2xl border border-gray-100 bg-white p-7 shadow-xl shadow-purple-900/5 sm:p-9">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#18181B]">
              Welcome back
            </h1>

            <p className="mt-2 text-sm leading-6 text-[#71717A]">
              Sign in to manage your students and tutoring sessions.
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-8 space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Email address
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                required
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#7C3AED] focus:ring-4 focus:ring-purple-100"
                placeholder="you@example.com"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                required
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#7C3AED] focus:ring-4 focus:ring-purple-100"
                placeholder="Enter your password"
              />
            </div>

            {/* Authentication Error */}
            {error && (
              <p
                role="alert"
                className="rounded-xl border border-red-100 bg-red-50 p-3 text-sm leading-6 text-red-600"
              >
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#7C3AED] px-4 py-3.5 font-semibold text-white shadow-lg shadow-purple-600/20 transition hover:bg-[#5B21B6] focus:outline-none focus:ring-4 focus:ring-purple-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign in to your account"}

              {!loading && (
                <span aria-hidden="true">→</span>
              )}
            </button>
          </form>

          <div className="mt-6 border-t border-gray-100 pt-5 text-center">
            <Link
              href="/"
              className="text-sm font-medium text-[#7C3AED] transition hover:text-[#5B21B6]"
            >
              ← Back to homepage
            </Link>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs leading-5 text-[#71717A]">
          Secure access to your tutoring session records.
        </p>
      </div>
    </main>
  );
}