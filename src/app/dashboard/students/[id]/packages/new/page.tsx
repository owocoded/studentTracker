"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

type NewPackagePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function NewPackagePage({ params }: NewPackagePageProps) {
  const router = useRouter();

  const [totalSessions, setTotalSessions] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Prevent duplicate submissions.
    if (loading) return;

    setError("");

    const sessionCount = Number(totalSessions);

    // Validate the session count before making database requests.

    if (!Number.isInteger(sessionCount) || sessionCount <= 0) {
      setError("Please enter a valid whole number of sessions.");
      return;
    }

    if (sessionCount > 30) {
      setError("A package cannot have more than 30 sessions.");
      return;
    }

    setLoading(true);

    try {
      const { id: studentId } = await params;
      const supabase = createClient();

      // Confirm that a user is logged in.
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) {
        console.error("Authentication error:", authError);
        setError("Could not verify your login. Please try again.");
        return;
      }

      if (!user) {
        router.push("/login");
        return;
      }

      // Create the package and all its sessions in one transaction.
      const { error: packageError } = await supabase.rpc(
        "create_tutoring_package",
        {
          p_student_id: studentId,
          p_total_sessions: sessionCount,
        },
      );

      if (packageError) {
        console.error("Package creation error:", packageError);
        setError("Could not create the package. Please try again.");
        return;
      }

      // Return to the student's detail page.
      router.push(`/dashboard/students/${studentId}`);
      router.refresh();
    } catch (err) {
      console.error("Unexpected package creation error:", err);

      setError("Something went wrong. Please try again.");
    } finally {
      // Always reset loading, including after errors.
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-xl">
        <Link
          href="/dashboard/students"
          className="text-sm text-gray-600 hover:text-black"
        >
          ← Back to Students
        </Link>

        <div className="mt-6 rounded-xl bg-white p-6 shadow">
          <h1 className="text-2xl font-bold">Create Tutoring Package</h1>

          <p className="mt-2 text-gray-600">
            Set the total number of sessions for this package.
          </p>

          {error && (
            <div
              role="alert"
              className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div>
              <label htmlFor="totalSessions" className="mb-2 block font-medium">
                Total Sessions
              </label>

              <input
                id="totalSessions"
                type="number"
                min="1"
                max="30"
                step="1"
                required
                value={totalSessions}
                onChange={(event) => setTotalSessions(event.target.value)}
                disabled={loading}
                placeholder="e.g. 12"
                className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-black"
              />
            </div>

            {totalSessions &&
              Number.isInteger(Number(totalSessions)) &&
              Number(totalSessions) > 0 && (
                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="font-medium">Package Preview</p>

                  <p className="mt-1 text-gray-600">
                    {Number(totalSessions)} sessions will be created.
                  </p>
                </div>
              )}

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="rounded-lg bg-black px-5 py-3 text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Creating Package..." : "Create Package"}
              </button>

              <Link
                href="/dashboard/students"
                aria-disabled={loading}
                className={`rounded-lg border px-5 py-3 ${
                  loading ? "pointer-events-none opacity-50" : ""
                }`}
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
