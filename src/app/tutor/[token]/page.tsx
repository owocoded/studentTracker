import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import MakeSessionAvailableButton from "@/components/MakeSessionAvailableButton";

type Session = {
  id: string;
  session_number: number;
  completed: boolean;
  available: boolean;
  completed_at: string | null;
};

type Package = {
  id: string;
  total_sessions: number;
  status: string;
  sessions: Session[];
};

type Student = {
  id: string;
  name: string;
  packages: Package[];
};

type TutorPageProps = {
  params: Promise<{
    token: string;
  }>;
};

export default async function TutorControlPage({
  params,
}: TutorPageProps) {
  const { token } = await params;

  const supabase = await createClient();

  // Securely retrieve the student using the tutor control token
  const { data, error } = await supabase.rpc(
    "get_student_by_tutor_token",
    {
      p_token: token,
    },
  );

  // Show 404 if the tutor control token is invalid
  if (error || !data) {
    notFound();
  }

  const student = data as Student;



  return (
    <main className="min-h-screen bg-[#FAFAFA] px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-3xl">
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-start gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-[#18181B] sm:text-3xl">
                Tutor Control
              </h1>

              <p className="mt-2 text-[#71717A]">
                Manage sessions for{" "}
                <span className="font-semibold text-[#7C3AED]">
                  {student.name}
                </span>
                .
              </p>

              <p className="mt-2 text-sm leading-6 text-[#71717A]">
                Make the next eligible session available after the student
                has attended class. The student can then mark that session
                as completed.
              </p>
            </div>
          </div>

          {/* Overall progress */}
          {/* {student.packages.length > 0 && (
            <div className="mt-7 border-t border-gray-100 pt-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-[#71717A]">
                    Overall student progress
                  </p>

                  <p className="mt-1 text-2xl font-bold text-[#18181B]">
                    {completedSessions}
                    <span className="text-base font-medium text-[#71717A]">
                      {" "}
                      / {totalSessions} sessions
                    </span>
                  </p>
                </div>

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#F5F3FF] text-sm font-bold text-[#7C3AED]">
                  {overallProgress}%
                </div>
              </div>

              <div
                className="mt-4 h-2.5 overflow-hidden rounded-full bg-gray-100"
                role="progressbar"
                aria-label="Overall student session completion"
                aria-valuenow={overallProgress}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className="h-full rounded-full bg-[#7C3AED] transition-all duration-300"
                  style={{ width: `${overallProgress}%` }}
                />
              </div>
            </div>
          )} */}
        </section>

        {/* Packages */}
        <section className="mt-8">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-[#18181B]">
              Student Packages
            </h2>

            <p className="mt-1 text-sm text-[#71717A]">
              Review session status and unlock the next eligible session.
            </p>
          </div>

          <div className="space-y-6">
            {student.packages.map((pkg) => {
              const nextSession = pkg.sessions.find(
                (session) =>
                  !session.completed && !session.available,
              );

              const completedCount = pkg.sessions.filter(
                (session) => session.completed,
              ).length;

              const remainingSessions =
                pkg.total_sessions - completedCount;

              const packageProgress =
                pkg.total_sessions > 0
                  ? Math.round(
                      (completedCount / pkg.total_sessions) * 100,
                    )
                  : 0;

              const packageCompleted = remainingSessions === 0;

              return (
                <article
                  key={pkg.id}
                  className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
                >
                  {/* Package header */}
                  <div className="border-b border-gray-100 p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F5F3FF] text-xl">
                          📚
                        </div>

                        <div>
                          <h3 className="font-bold text-[#18181B]">
                            Tutoring Package
                          </h3>

                          <p className="mt-1 text-sm text-[#71717A]">
                            {pkg.total_sessions} total sessions
                          </p>
                        </div>
                      </div>

                      <span
                        className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                          pkg.status === "COMPLETED"
                            ? "bg-green-50 text-green-700"
                            : "bg-[#F5F3FF] text-[#7C3AED]"
                        }`}
                      >
                        {pkg.status === "COMPLETED"
                          ? "✓ Completed"
                          : "● Active"}
                      </span>
                    </div>

                    {/* Package progress */}
                    <div className="mt-6">
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="text-[#71717A]">
                          Package progress
                        </span>

                        <span className="font-semibold text-[#7C3AED]">
                          {packageProgress}%
                        </span>
                      </div>

                      <div
                        className="h-2 overflow-hidden rounded-full bg-gray-100"
                        role="progressbar"
                        aria-label="Package session completion"
                        aria-valuenow={packageProgress}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      >
                        <div
                          className="h-full rounded-full bg-[#7C3AED] transition-all duration-300"
                          style={{ width: `${packageProgress}%` }}
                        />
                      </div>
                    </div>

                    {/* Completed and remaining */}
                    <div className="mt-5 grid grid-cols-2 gap-3">
                      <div className="rounded-xl bg-green-50 p-4">
                        <p className="text-sm font-medium text-green-700">
                          Completed
                        </p>

                        <p className="mt-1 text-2xl font-bold text-green-700">
                          {completedCount}
                        </p>
                      </div>

                      <div className="rounded-xl bg-[#F5F3FF] p-4">
                        <p className="text-sm font-medium text-[#7C3AED]">
                          Remaining
                        </p>

                        <p className="mt-1 text-2xl font-bold text-[#5B21B6]">
                          {remainingSessions}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Session controls */}
                  <div className="p-5 sm:p-6">
                    <div className="mb-4">
                      <h4 className="font-semibold text-[#18181B]">
                        Session Management
                      </h4>

                      <p className="mt-1 text-sm leading-5 text-[#71717A]">
                        Unlock sessions in order to keep the student&apos;s
                        progress organized.
                      </p>
                    </div>

                    <div className="space-y-3">
                      {pkg.sessions
                        .slice()
                        .sort(
                          (a, b) =>
                            a.session_number - b.session_number,
                        )
                        .map((session) => (
                          <div
                            key={session.id}
                            className={`flex items-center justify-between gap-3 rounded-xl border p-3 sm:p-4 ${
                              session.completed
                                ? "border-green-100 bg-green-50/50"
                                : session.available
                                  ? "border-[#DDD6FE] bg-[#FAF9FF]"
                                  : nextSession?.id === session.id
                                    ? "border-[#DDD6FE] bg-white"
                                    : "border-gray-100 bg-gray-50/70"
                            }`}
                          >
                            <div className="flex min-w-0 items-center gap-3">
                              <div
                                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                                  session.completed
                                    ? "bg-green-100 text-green-700"
                                    : session.available
                                      ? "bg-[#EDE9FE] text-[#7C3AED]"
                                      : "bg-gray-200 text-gray-500"
                                }`}
                              >
                                {session.completed
                                  ? "✓"
                                  : session.session_number}
                              </div>

                              <div>
                                <p className="text-sm font-semibold text-[#18181B]">
                                  Session {session.session_number}
                                </p>

                                <p className="mt-0.5 text-xs text-[#71717A]">
                                  {session.completed
                                    ? "Student completed this session"
                                    : session.available
                                      ? "Available to the student"
                                      : nextSession?.id === session.id
                                        ? "Ready to be unlocked"
                                        : "Locked until earlier sessions progress"}
                                </p>
                              </div>
                            </div>

                            <div className="shrink-0">
                              {session.completed ? (
                                <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-1.5 text-xs font-semibold text-green-700">
                                  ✓ Completed
                                </span>
                              ) : session.available ? (
                                <span className="inline-flex items-center gap-1 rounded-full bg-[#EDE9FE] px-2.5 py-1.5 text-xs font-semibold text-[#7C3AED]">
                                  ● Available
                                </span>
                              ) : nextSession?.id === session.id ? (
                                <MakeSessionAvailableButton
                                  token={token}
                                  sessionId={session.id}
                                />
                              ) : (
                                <span className="inline-flex items-center gap-1 rounded-full bg-gray-200 px-2.5 py-1.5 text-xs font-medium text-gray-600">
                                  🔒 Locked
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                    </div>

                    {/* Package completion message */}
                    {packageCompleted && (
                      <div className="mt-5 rounded-xl border border-green-100 bg-green-50 p-4">
                        <p className="font-semibold text-green-800">
                          ✓ Package Completed
                        </p>

                        <p className="mt-1 text-sm text-green-700">
                          All {pkg.total_sessions} sessions in this
                          package have been completed.
                        </p>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}

            {/* No packages */}
            {student.packages.length === 0 && (
              <div className="rounded-2xl border border-dashed border-[#DDD6FE] bg-white px-6 py-12 text-center shadow-sm">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F5F3FF] text-2xl">
                  📚
                </div>

                <h3 className="mt-4 font-bold text-[#18181B]">
                  No packages yet
                </h3>

                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#71717A]">
                  There are no tutoring packages for this student yet.
                  Add a package from your tutor dashboard first.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-10 border-t border-gray-200 py-6 text-center">
          <p className="text-xs text-[#71717A]">
            Private tutor controls · Powered by{" "}
            <span className="font-semibold text-[#7C3AED]">
              StudentTracker
            </span>
          </p>
        </footer>
      </div>
    </main>
  );
}
