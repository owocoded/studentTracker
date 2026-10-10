import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAFAFA] text-[#18181B]">
      {/* Navigation */}
      <nav className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7C3AED] text-xl font-bold text-white shadow-sm">
              S
            </div>

            <span className="text-xl font-bold tracking-tight">
              StudentTracker
            </span>
          </Link>

          <Link
            href="/login"
            className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-semibold transition hover:border-[#7C3AED] hover:bg-[#F5F3FF] hover:text-[#5B21B6]"
          >
            Tutor Login
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F5F3FF] via-white to-white">
        {/* Decorative background accents */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-purple-200/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 left-0 h-64 w-64 rounded-full bg-violet-100/50 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:py-28 lg:grid-cols-2 lg:px-8">
          <div>
            <span className="inline-flex items-center rounded-full border border-purple-100 bg-white px-4 py-2 text-sm font-medium text-[#6D28D9] shadow-sm">
              A simpler way to manage tutoring sessions
            </span>

            <h1 className="mt-6 max-w-2xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Every lesson tracked.
              <span className="block text-[#7C3AED]">
                Every session accounted for.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-[#64748B]">
              Keep track of your students, manage tutoring packages, and
              know exactly how many lessons have been completed and how
              many remain. No more guesswork or manual counting.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#7C3AED] px-7 py-3.5 font-semibold text-white shadow-lg shadow-purple-600/20 transition hover:bg-[#5B21B6]"
              >
                Access Tutor Dashboard
                <span aria-hidden="true">→</span>
              </Link>

              <a
                href="#features"
                className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-7 py-3.5 font-semibold text-gray-700 transition hover:border-purple-200 hover:bg-[#F5F3FF]"
              >
                Explore Features
              </a>
            </div>

            <p className="mt-5 text-sm text-[#71717A]">
              Simple session tracking. Clear records. Better organisation.
            </p>
          </div>

          {/* Illustrative Dashboard Preview */}
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-purple-200/50 blur-2xl" />

            <div className="relative rounded-2xl border border-gray-200/80 bg-white p-6 shadow-2xl shadow-purple-900/10 sm:p-8">
              <div className="flex items-center justify-between border-b border-gray-100 pb-5">
                <div>
                  <p className="text-sm text-[#71717A]">
                    Student overview
                  </p>
                  <h2 className="mt-1 text-xl font-bold">
                    Student Tutoring Package
                  </h2>
                </div>

                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                  Active
                </span>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-green-50 p-5">
                  <p className="text-sm font-medium text-green-700">
                    Completed
                  </p>
                  <p className="mt-2 text-4xl font-bold text-green-700">
                    8
                  </p>
                  <p className="mt-1 text-xs text-green-700">
                    Lessons finished
                  </p>
                </div>

                <div className="rounded-xl bg-[#F5F3FF] p-5">
                  <p className="text-sm font-medium text-[#6D28D9]">
                    Remaining
                  </p>
                  <p className="mt-2 text-4xl font-bold text-[#7C3AED]">
                    4
                  </p>
                  <p className="mt-1 text-xs text-[#6D28D9]">
                    Lessons left
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-700">
                    Package progress
                  </span>
                  <span className="font-semibold text-gray-900">
                    67%
                  </span>
                </div>

                <div className="h-3 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-[#7C3AED]"
                    style={{ width: "66.67%" }}
                  />
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between rounded-lg border border-gray-100 p-3">
                  <span className="text-sm text-gray-700">
                    Session 8
                  </span>
                  <span className="text-sm font-medium text-green-600">
                    ✓ Completed
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-lg border border-purple-100 bg-[#F5F3FF]/60 p-3">
                  <span className="text-sm text-gray-700">
                    Session 9
                  </span>
                  <span className="text-sm font-medium text-[#7C3AED]">
                    Ready for student
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-lg border border-gray-100 p-3">
                  <span className="text-sm text-gray-500">
                    Session 10
                  </span>
                  <span className="text-sm text-gray-400">
                    🔒 Locked
                  </span>
                </div>
              </div>

              <p className="mt-5 text-center text-xs text-gray-400">
                Illustrative dashboard preview
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-[#7C3AED]">
              Built for tutors
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Spend less time counting lessons
            </h2>

            <p className="mt-4 leading-7 text-[#64748B]">
              Organise your tutoring work in one place and keep session
              progress easy to understand.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-purple-200 hover:shadow-lg hover:shadow-purple-900/5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F5F3FF] text-2xl">
                👨‍🎓
              </div>

              <h3 className="mt-5 text-xl font-bold">
                Manage Students
              </h3>

              <p className="mt-3 leading-7 text-[#64748B]">
                Keep student details organised and access each students
                tutoring packages and session history from one place.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-purple-200 hover:shadow-lg hover:shadow-purple-900/5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-2xl">
                📊
              </div>

              <h3 className="mt-5 text-xl font-bold">
                Track Session Progress
              </h3>

              <p className="mt-3 leading-7 text-[#64748B]">
                See completed and remaining lessons at a glance, with
                progress recorded for each tutoring package.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-purple-200 hover:shadow-lg hover:shadow-purple-900/5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F5F3FF] text-2xl">
                🔐
              </div>

              <h3 className="mt-5 text-xl font-bold">
                Controlled Session Access
              </h3>

              <p className="mt-3 leading-7 text-[#64748B]">
                Make a session available when the student is ready, so
                sessions can be completed in the intended order.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-y border-gray-100 bg-[#FAFAFA] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-[#7C3AED]">
              How it works
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Simple from start to finish
            </h2>

            <p className="mt-4 leading-7 text-[#64748B]">
              A straightforward workflow for managing tutoring sessions.
            </p>
          </div>

          <div className="mt-14 grid gap-10 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#7C3AED] text-xl font-bold text-white shadow-lg shadow-purple-600/20">
                1
              </div>

              <h3 className="mt-5 text-lg font-bold">
                Add Your Students
              </h3>

              <p className="mt-2 leading-7 text-[#64748B]">
                Create student profiles and add their tutoring packages.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#7C3AED] text-xl font-bold text-white shadow-lg shadow-purple-600/20">
                2
              </div>

              <h3 className="mt-5 text-lg font-bold">
                Manage Each Session
              </h3>

              <p className="mt-2 leading-7 text-[#64748B]">
                Use the tutor control link to make the next eligible
                session available to the student.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#7C3AED] text-xl font-bold text-white shadow-lg shadow-purple-600/20">
                3
              </div>

              <h3 className="mt-5 text-lg font-bold">
                Track Progress
              </h3>

              <p className="mt-2 leading-7 text-[#64748B]">
                The student marks the available session complete, and
                the progress is recorded in the tracker.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-white px-6 py-20 sm:py-24">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-gradient-to-br from-[#7C3AED] to-[#5B21B6] px-6 py-12 text-center text-white shadow-xl shadow-purple-600/20 sm:px-12 sm:py-16">
          <div className="pointer-events-none absolute -right-12 -top-16 h-48 w-48 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -bottom-24 -left-12 h-64 w-64 rounded-full border border-white/10" />

          <div className="relative">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to organise your tutoring sessions?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-purple-100">
              Sign in to manage your students, organise packages, and keep
              track of every lesson.
            </p>

            <Link
              href="/login"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 font-semibold text-[#6D28D9] transition hover:bg-purple-50"
            >
              Tutor Login
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-8 text-sm text-[#71717A] sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <Link href="/" className="font-semibold text-[#18181B]">
            StudentTracker
          </Link>

          <p>
            © {new Date().getFullYear()} StudentTracker. All rights reserved.
          </p>

          <Link
            href="/login"
            className="font-medium text-[#7C3AED] transition hover:text-[#5B21B6]"
          >
            Tutor Login
          </Link>
        </div>
      </footer>
    </main>
  );
}