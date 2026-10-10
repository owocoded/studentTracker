import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function StudentsPage() {
  const supabase = await createClient();

  // Check if tutor is logged in
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Get all students belonging to this tutor
  const { data: students, error } = await supabase
    .from("students")
    .select("id, name, email, phone, created_at")
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      {/* Top navigation */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7C3AED] text-lg font-bold text-white">
              S
            </div>

            <div>
              <p className="font-bold text-[#18181B]">
                StudentTracker
              </p>

              <p className="text-xs text-[#71717A]">
                Tutor Dashboard
              </p>
            </div>
          </Link>

          <Link
            href="/dashboard"
            className="text-sm font-medium text-[#71717A] transition hover:text-[#7C3AED]"
          >
            ← Dashboard
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-10">
        {/* Page heading */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-[#7C3AED]">
              STUDENT MANAGEMENT
            </p>

            <h1 className="mt-1 text-3xl font-bold tracking-tight text-[#18181B]">
              Your Students
            </h1>

            <p className="mt-2 text-[#71717A]">
              Manage your tutoring students and track their sessions.
            </p>
          </div>

          <Link
            href="/dashboard/students/new"
            className="inline-flex items-center justify-center rounded-xl bg-[#7C3AED] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#5B21B6]"
          >
            + Add Student
          </Link>
        </div>

        {/* Student count */}
        <div className="mt-8 rounded-2xl border border-[#E9D5FF] bg-[#F5F3FF] p-5">
          <p className="text-sm font-medium text-[#71717A]">
            Total Students
          </p>

          <p className="mt-1 text-3xl font-bold text-[#7C3AED]">
            {students?.length ?? 0}
          </p>
        </div>

        {/* Students */}
        <div className="mt-8">
          {error ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
              <p className="font-medium text-red-700">
                Unable to load students.
              </p>

              <p className="mt-1 text-sm text-red-600">
                {error.message}
              </p>
            </div>
          ) : students && students.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2">
              {students.map((student) => (
                <Link
                  key={student.id}
                  href={`/dashboard/students/${student.id}`}
                  className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-[#C4B5FD] hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-4">
                    {/* Student avatar */}
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F5F3FF] text-lg font-bold text-[#7C3AED]">
                      {student.name?.charAt(0)?.toUpperCase() || "S"}
                    </div>

                    {/* Arrow */}
                    <span className="text-xl text-gray-300 transition group-hover:translate-x-1 group-hover:text-[#7C3AED]">
                      →
                    </span>
                  </div>

                  {/* Student information */}
                  <div className="mt-5">
                    <h2 className="text-lg font-semibold text-[#18181B]">
                      {student.name}
                    </h2>

                    <div className="mt-3 space-y-2">
                      <p className="flex items-center gap-2 text-sm text-[#71717A]">
                        <span>✉</span>
                        {student.email || "No email provided"}
                      </p>

                      <p className="flex items-center gap-2 text-sm text-[#71717A]">
                        <span>☎</span>
                        {student.phone || "No phone provided"}
                      </p>
                    </div>
                  </div>

                  {/* View details */}
                  <div className="mt-5 border-t border-gray-100 pt-4">
                    <span className="text-sm font-semibold text-[#7C3AED]">
                      View student details →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            /* Empty state */
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F5F3FF] text-2xl">
                👨‍🎓
              </div>

              <h2 className="mt-5 text-lg font-semibold text-[#18181B]">
                No students yet
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm text-[#71717A]">
                Add your first student to start creating tutoring packages
                and tracking completed sessions.
              </p>

              <Link
                href="/dashboard/students/new"
                className="mt-6 inline-flex rounded-xl bg-[#7C3AED] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#5B21B6]"
              >
                + Add Your First Student
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-10 border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-6 text-center text-sm text-[#71717A]">
          StudentTracker · Simple tutoring session management
        </div>
      </footer>
    </main>
  );
}
