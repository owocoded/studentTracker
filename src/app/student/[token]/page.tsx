import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import CompleteSessionButton from "@/components/CompleteSessionButton";

type StudentPageProps = {
  params: Promise<{
    token: string;
  }>;
};

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

export default async function StudentPage({
  params,
}: StudentPageProps) {
  const { token } = await params;

  const supabase = await createClient();

  // Get student data securely using the student token
  const { data, error } = await supabase.rpc(
    "get_student_by_token",
    {
      p_token: token,
    },
  );

  // Show 404 if the token is invalid
  if (error || !data) {
    notFound();
  }

  const student = data as Student;
  return (
    <main className="min-h-screen bg-[#FAFAFA] px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-2xl">
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F5F3FF] text-lg font-bold text-[#7C3AED]">
              {student.name.charAt(0).toUpperCase()}
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight text-[#18181B] sm:text-3xl">
                Hello, {student.name}!
                <span className="ml-2" role="img" aria-label="waving hand">
                  👋
                </span>
              </h1>

              <p className="mt-2 text-sm leading-6 text-[#71717A] sm:text-base">
                Track your tutoring sessions here. Once your tutor makes
                a session available, you can mark it as completed after
                your class.
              </p>
            </div>
          </div>
</section>
                  {/* Packages section */}
        <section className="mt-8">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-[#18181B]">
              Your Packages
            </h2>

            <p className="mt-1 text-sm text-[#71717A]">
              View your sessions and keep track of your progress.
            </p>
          </div>

          <div className="space-y-6">
            {student.packages.map((pkg) => {
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
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F5F3FF] text-lg">
                            📚
                          </div>

                          <div>
                            <h3 className="font-bold text-[#18181B]">
                              Tutoring Package
                            </h3>

                            <p className="mt-0.5 text-sm text-[#71717A]">
                              {pkg.total_sessions} total sessions
                            </p>
                          </div>
                        </div>
                      </div>

                      <span
                        className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                          pkg.status === "ACTIVE"
                            ? "bg-green-50 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {pkg.status}
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

                    {/* Completed and remaining counts */}
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

                  {/* Package completed message */}
                  {packageCompleted && (
                    <div className="mx-5 mt-5 rounded-xl border border-green-100 bg-green-50 p-4 sm:mx-6">
                      <div className="flex items-start gap-3">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700">
                          ✓
                        </span>

                        <div>
                          <p className="font-semibold text-green-800">
                            Package Completed!
                          </p>

                          <p className="mt-1 text-sm leading-5 text-green-700">
                            Well done! All {pkg.total_sessions} sessions
                            in this package have been completed.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Session list */}
                  <div className="p-5 sm:p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <h4 className="font-semibold text-[#18181B]">
                        Session History
                      </h4>

                      <span className="text-xs text-[#71717A]">
                        {pkg.sessions.length} sessions
                      </span>
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
                                {session.completed ? "✓" : session.session_number}
                              </div>

                              <div>
                                <p className="text-sm font-semibold text-[#18181B]">
                                  Session {session.session_number}
                                </p>

                                <p className="mt-0.5 text-xs text-[#71717A]">
                                  {session.completed
                                    ? "Successfully completed"
                                    : session.available
                                      ? "Ready to complete"
                                      : "Waiting for your tutor"}
                                </p>
                              </div>
                            </div>

                            <div className="shrink-0">
                              {session.completed ? (
                                <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-1.5 text-xs font-semibold text-green-700">
                                  <span aria-hidden="true">✓</span>
                                  Completed
                                </span>
                              ) : session.available ? (
                                <CompleteSessionButton
                                  sessionId={session.id}
                                  completed={session.completed}
                                  studentToken={token}
                                />
                              ) : (
                                <span className="inline-flex items-center gap-1 rounded-full bg-gray-200 px-2.5 py-1.5 text-xs font-medium text-gray-600">
                                  <span aria-hidden="true">🔒</span>
                                  Locked
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </article>
              );
            })}

            {/* No package message */}
            {student.packages.length === 0 && (
              <div className="rounded-2xl border border-dashed border-[#DDD6FE] bg-white px-6 py-12 text-center shadow-sm">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F5F3FF] text-2xl">
                  📚
                </div>

                <h3 className="mt-4 font-bold text-[#18181B]">
                  No package available yet
                </h3>

                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#71717A]">
                  Your tutoring packages will appear here once your tutor
                  adds them. Check back later.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-10 border-t border-gray-200 py-6 text-center">
          <p className="text-xs text-[#71717A]">
            Powered by{" "}
            <span className="font-semibold text-[#7C3AED]">
              StudentTracker
            </span>
          </p>
        </footer>
      </div>
    </main>
  );
}