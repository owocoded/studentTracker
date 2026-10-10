"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogout() {
    if (loading) return;

    setLoading(true);
    setError("");

    const supabase = createClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.replace("/login");
    router.refresh();
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleLogout}
        disabled={loading}
        className="rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
      >
        {loading ? "Signing out..." : "Logout"}
      </button>

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
