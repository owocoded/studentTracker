import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "@/components/LogoutButton";
import Link from "next/link";

export default async function DashboardPage() {
  const supabase = await createClient();

  // Verify the current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-[#18181B]">
      {/* Top Navigation */}
      <header className="sticky top-0 z-20 border-b border-gray-200/80 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7C3AED]"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7C3AED] text-xl font-bold text-white shadow-sm">
              S
            </div>

            <div>
              <p className="text-lg font-bold tracking-tight">
                StudentTracker
              </p>
              <p className="text-xs text-[#71717A]">
                Tutor workspace
              </p>
            </div>
          </Link>

          <LogoutButton />
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10">
        {/* Welcome Section */}
        <section className="relative overflow-hidden rounded-2xl bg-linear-to-br from-[#7C3AED] to-[#5B21B6] p-6 text-white shadow-lg shadow-purple-900/10 sm:p-10">
          {/* Decorative background elements */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-12 -top-20 h-64 w-64 rounded-full border border-white/10"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-28 right-32 h-72 w-72 rounded-full border border-white/10"
          />

          <div className="relative">
            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-purple-50">
              Your tutoring workspace
            </span>

            <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
              Welcome back!
            </h1>

            {/* Primary Actions */}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/dashboard/students"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-[#6D28D9] transition hover:bg-purple-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Manage Students
                <span aria-hidden="true">→</span>
              </Link>

              <Link
                href="/dashboard/students/new"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/30 bg-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                + Add Student
              </Link>
            </div>
          </div>
        </section>

        {/* Workspace */}
        <section className="mt-10">
          <div>
            <h2 className="text-xl font-bold tracking-tight">
              Your workspace
            </h2>

            <p className="mt-1 text-sm leading-6 text-[#71717A]">
              Everything you need to manage your tutoring sessions.
            </p>
          </div>

          {/* Quick Action Cards */}
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {/* Student Management */}
            <Link
              href="/dashboard/students"
              className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-purple-200 hover:shadow-lg hover:shadow-purple-900/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7C3AED]"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F5F3FF] text-2xl">
                  👨‍🎓
                </div>

                <span
                  aria-hidden="true"
                  className="text-xl text-[#A78BFA] transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </div>

              <h3 className="mt-5 text-lg font-bold">
                Student Management
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#71717A]">
                View your student list, open student profiles, and
                access their tutoring packages and session history.
              </p>

              <span className="mt-5 inline-block text-sm font-semibold text-[#7C3AED]">
                View Students
              </span>
            </Link>

            {/* Add Student */}
            <Link
              href="/dashboard/students/new"
              className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-purple-200 hover:shadow-lg hover:shadow-purple-900/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7C3AED]"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F5F3FF] text-2xl text-[#7C3AED]">
                  +
                </div>

                <span
                  aria-hidden="true"
                  className="text-xl text-[#A78BFA] transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </div>

              <h3 className="mt-5 text-lg font-bold">
                Add a Student
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#71717A]">
                Create a student profile to start organising tutoring
                packages and tracking completed lessons.
              </p>

              <span className="mt-5 inline-block text-sm font-semibold text-[#7C3AED]">
                Create Student Profile
              </span>
            </Link>
          </div>
        </section>

        {/* How the Tracker Works */}
        <section className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <div>
            <p className="text-sm font-semibold tracking-wide text-[#7C3AED]">
              SESSION WORKFLOW
            </p>

            <h2 className="mt-2 text-xl font-bold tracking-tight">
              Keep every lesson accounted for
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#71717A]">
              Manage access to individual sessions and maintain an
              organised record of each student&apos;s progress.
            </p>
          </div>

          <div className="mt-7 grid gap-6 sm:grid-cols-3">
            {/* Step 1 */}
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F5F3FF] font-bold text-[#7C3AED]">
                01
              </div>

              <h3 className="mt-3 font-semibold">
                Create a package
              </h3>

              <p className="mt-1 text-sm leading-6 text-[#71717A]">
                Set the number of sessions included in a students
                tutoring package.
              </p>
            </div>

            {/* Step 2 */}
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F5F3FF] font-bold text-[#7C3AED]">
                02
              </div>

              <h3 className="mt-3 font-semibold">
                Unlock a session
              </h3>

              <p className="mt-1 text-sm leading-6 text-[#71717A]">
                Use the private tutor control link to make the next
                eligible session available to the student.
              </p>
            </div>

            {/* Step 3 */}
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 font-bold text-green-700">
                03
              </div>

              <h3 className="mt-3 font-semibold">
                Record completion
              </h3>

              <p className="mt-1 text-sm leading-6 text-[#71717A]">
                The student marks the available session complete, and
                the tracker records the result.
              </p>
            </div>
          </div>

          <div className="mt-7 border-t border-gray-100 pt-5">
            <Link
              href="/dashboard/students"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#7C3AED] transition hover:text-[#5B21B6] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7C3AED]"
            >
              Go to your students
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        {/* Account Information */}
        <section className="mt-8 flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F5F3FF] text-lg">
              👤
            </div>

            <div className="min-w-0">
              <h2 className="font-semibold">Your account</h2>

              <p className="mt-1 break-all text-sm text-[#71717A]">
                {user.email ?? "Email not available"}
              </p>

              <p className="mt-1 text-xs text-[#71717A]">
                Signed in to StudentTracker
              </p>
            </div>
          </div>

          <Link
            href="/dashboard/students"
            className="inline-flex shrink-0 items-center justify-center rounded-lg border border-[#DDD6FE] px-4 py-2 text-sm font-semibold text-[#7C3AED] transition hover:bg-[#F5F3FF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7C3AED]"
          >
            Open Students
          </Link>
        </section>

        {/* Footer */}
        <footer className="mt-10 border-t border-gray-200 py-6 text-center text-sm text-[#71717A]">
          © {new Date().getFullYear()} StudentTracker. All rights reserved.
        </footer>
      </div>
    </main>
  );
}