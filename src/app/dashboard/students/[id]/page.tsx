import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import CompleteSessionButton from "@/components/CompleteSessionButton";
import CopyStudentLink from "@/components/CopyStudentsLink";
import ShareStudentLink from "@/components/ShareStudentLink";
import TutorControlLink from "@/components/TutorControlLink";

type StudentPageProps = {
  params: Promise<{
    id: string;
  }>;
};

type Session = {
  id: string;
  session_number: number;
  completed: boolean;
  completed_at: string | null;
  created_at: string;
};

export default async function StudentPage({
  params,
}: StudentPageProps) {
  const { id } = await params;

  const supabase = await createClient();

  // Check if tutor is logged in
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Get the student
  const { data: student, error } = await supabase
    .from("students")
    .select("id, name, email, phone, student_token, tutor_control_token")
    .eq("id", id)
    .single();

  if (error || !student) {
    notFound();
  }

  // Get this student's packages and sessions
  const { data: packages } = await supabase
    .from("packages")
    .select(
      `
        *,
        sessions (
          id,
          session_number,
          completed,
          completed_at,
          created_at
        )
      `,
    )
    .eq("student_id", id)
    .order("created_at", { ascending: false });

  // Build the student-facing and tutor-control URLs
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const studentLink = `${siteUrl}/student/${student.student_token}`;
  const tutorLink = `${siteUrl}/tutor/${student.tutor_control_token}`;

  // Calculate overall progress
  const totalSessions =
    packages?.reduce(
      (total, pkg) => total + (pkg.total_sessions ?? 0),
      0,
    ) ?? 0;

  const completedSessions =
    packages?.reduce(
      (total, pkg) =>
        total +
        (pkg.sessions?.filter(
          (session: Session) => session.completed,
        ).length ?? 0),
      0,
    ) ?? 0;

  const remainingSessions = Math.max(
    0,
    totalSessions - completedSessions,
  );

  const progressPercentage =
    totalSessions > 0
      ? Math.round((completedSessions / totalSessions) * 100)
      : 0;

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
            href="/dashboard/students"
            className="text-sm font-medium text-[#71717A] transition hover:text-[#7C3AED]"
          >
            ← All Students
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-10">
        {/* Student heading */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#F5F3FF] text-2xl font-bold text-[#7C3AED]">
              {student.name?.charAt(0)?.toUpperCase() || "S"}
            </div>

            <div>
              <p className="text-sm font-semibold text-[#7C3AED]">
                STUDENT PROFILE
              </p>

              <h1 className="mt-1 text-3xl font-bold tracking-tight text-[#18181B]">
                {student.name}
              </h1>

              <p className="mt-1 text-sm text-[#71717A]">
                Student details and tutoring progress
              </p>
            </div>
          </div>

          <Link
            href={`/dashboard/students/${id}/packages/new`}
            className="inline-flex items-center justify-center rounded-xl bg-[#7C3AED] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#5B21B6]"
          >
            + Add Package
          </Link>
        </div>

        {/* Student information */}
        <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-[#18181B]">
            Contact Information
          </h2>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div className="rounded-xl bg-[#FAFAFA] p-4">
              <p className="text-sm text-[#71717A]">Email address</p>

              <p className="mt-1 break-words font-medium text-[#18181B]">
                {student.email || "No email provided"}
              </p>
            </div>

            <div className="rounded-xl bg-[#FAFAFA] p-4">
              <p className="text-sm text-[#71717A]">Phone number</p>

              <p className="mt-1 font-medium text-[#18181B]">
                {student.phone || "No phone provided"}
              </p>
            </div>
          </div>
        </section>

        {/* Overall session progress */}
        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#18181B]">
                Overall Session Progress
              </h2>

              <p className="mt-1 text-sm text-[#71717A]">
                Progress across all tutoring packages
              </p>
            </div>

            <p className="text-sm font-semibold text-[#7C3AED]">
              {progressPercentage}% completed
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-[#F5F3FF] p-4">
              <p className="text-sm font-medium text-[#71717A]">
                Total Sessions
              </p>

              <p className="mt-2 text-3xl font-bold text-[#7C3AED]">
                {totalSessions}
              </p>
            </div>

            <div className="rounded-xl bg-green-50 p-4">
              <p className="text-sm font-medium text-green-700">
                Completed
              </p>

              <p className="mt-2 text-3xl font-bold text-green-700">
                {completedSessions}
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-sm font-medium text-[#71717A]">
                Remaining
              </p>

              <p className="mt-2 text-3xl font-bold text-[#18181B]">
                {remainingSessions}
              </p>
            </div>
          </div>

          <div
            className="mt-6 h-3 overflow-hidden rounded-full bg-gray-100"
            role="progressbar"
            aria-label="Overall session completion"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progressPercentage}
          >
            <div
              className="h-full rounded-full bg-[#7C3AED] transition-all"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </section>

        {/* Student link */}
        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F5F3FF] text-xl">
              🔗
            </div>

            <div>
              <h2 className="text-lg font-bold text-[#18181B]">
                Student Link
              </h2>

              <p className="mt-1 text-sm leading-6 text-[#71717A]">
                Share this link with the student so they can view their
                packages and mark sessions that you have made available.
              </p>
            </div>
          </div>

          <div className="mt-5 break-all rounded-xl border border-gray-200 bg-[#FAFAFA] p-4 text-sm text-[#71717A]">
            {studentLink}
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <CopyStudentLink link={studentLink} />

            <ShareStudentLink
              link={studentLink}
              studentName={student.name}
            />
          </div>
        </section>

        {/* Tutor control link */}
        <div className="mt-6">
          <TutorControlLink
            link={tutorLink}
            studentName={student.name}
          />
        </div>

        {/* Packages */}
        <section className="mt-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-[#7C3AED]">
                SESSION MANAGEMENT
              </p>

              <h2 className="mt-1 text-2xl font-bold text-[#18181B]">
                Tutoring Packages
              </h2>

              <p className="mt-1 text-sm text-[#71717A]">
                Review package progress and session history.
              </p>
            </div>

            <Link
              href={`/dashboard/students/${id}/packages/new`}
              className="inline-flex items-center justify-center rounded-xl border border-[#DDD6FE] bg-white px-4 py-2.5 text-sm font-semibold text-[#7C3AED] transition hover:bg-[#F5F3FF]"
            >
              + Add Another Package
            </Link>
          </div>

          <div className="mt-6 space-y-6">
            {packages && packages.length > 0 ? (
              packages.map((pkg) => {
                const sessions: Session[] = [...(pkg.sessions ?? [])].sort(
                  (a: Session, b: Session) =>
                    a.session_number - b.session_number,
                );

                const completedInPackage = sessions.filter(
                  (session) => session.completed,
                ).length;

                const remainingInPackage = Math.max(
                  0,
                  pkg.total_sessions - completedInPackage,
                );

                const packageProgress =
                  pkg.total_sessions > 0
                    ? Math.round(
                        (completedInPackage / pkg.total_sessions) * 100,
                      )
                    : 0;

                return (
                  <article
                    key={pkg.id}
                    className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
                  >
                    {/* Package header */}
                    <div className="flex flex-col gap-4 border-b border-gray-100 p-6 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm font-medium text-[#71717A]">
                          Tutoring Package
                        </p>

                        <h3 className="mt-1 text-xl font-bold text-[#18181B]">
                          {pkg.total_sessions} Sessions
                        </h3>

                        <p className="mt-1 text-sm text-[#71717A]">
                          {completedInPackage} completed ·{" "}
                          {remainingInPackage} remaining
                        </p>
                      </div>

                      <span
                        className={`inline-flex w-fit rounded-full px-3 py-1.5 text-xs font-semibold ${
                          pkg.status === "ACTIVE"
                            ? "bg-[#F5F3FF] text-[#7C3AED]"
                            : pkg.status === "COMPLETED"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {pkg.status}
                      </span>
                    </div>

                    {/* Package progress */}
                    <div className="px-6 pt-5">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-[#71717A]">
                          Package progress
                        </span>

                        <span className="font-semibold text-[#18181B]">
                          {packageProgress}%
                        </span>
                      </div>

                      <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-100">
                        <div
                          className="h-full rounded-full bg-[#7C3AED]"
                          style={{ width: `${packageProgress}%` }}
                        />
                      </div>
                    </div>

                    {/* Session history */}
                    <div className="p-6">
                      <h4 className="font-semibold text-[#18181B]">
                        Session History
                      </h4>

                      <div className="mt-4 space-y-3">
                        {sessions.map((session) => (
                          <div
                            key={session.id}
                            className="flex flex-col gap-3 rounded-xl border border-gray-100 p-4 sm:flex-row sm:items-center sm:justify-between"
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${
                                  session.completed
                                    ? "bg-green-100 text-green-700"
                                    : "bg-[#F5F3FF] text-[#7C3AED]"
                                }`}
                              >
                                {session.completed ? "✓" : session.session_number}
                              </div>

                              <div>
                                <p className="font-medium text-[#18181B]">
                                  Session {session.session_number}
                                </p>

                                <p className="mt-1 text-xs text-[#71717A]">
                                  {session.completed
                                    ? session.completed_at
                                      ? `Completed ${new Date(
                                          session.completed_at,
                                        ).toLocaleDateString("en-GB", {
                                          day: "numeric",
                                          month: "short",
                                          year: "numeric",
                                        })}`
                                      : "Completed"
                                    : "Not completed yet"}
                                </p>
                              </div>
                            </div>

                            <div className="sm:shrink-0">
                              <CompleteSessionButton
                                sessionId={session.id}
                                completed={session.completed}
                              />
                            </div>
                          </div>
                        ))}

                        {sessions.length === 0 && (
                          <p className="rounded-xl bg-gray-50 p-4 text-sm text-[#71717A]">
                            No sessions have been added to this package.
                          </p>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })
            ) : (
              <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-14 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F5F3FF] text-2xl">
                  📚
                </div>

                <h3 className="mt-5 text-lg font-semibold text-[#18181B]">
                  No packages yet
                </h3>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#71717A]">
                  Create a tutoring package for this student to start
                  tracking sessions and progress.
                </p>

                <Link
                  href={`/dashboard/students/${id}/packages/new`}
                  className="mt-6 inline-flex rounded-xl bg-[#7C3AED] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#5B21B6]"
                >
                  + Create First Package
                </Link>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="mt-12 border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-6 text-center text-sm text-[#71717A]">
          StudentTracker · Simple tutoring session management
        </div>
      </footer>
    </main>
  );
}