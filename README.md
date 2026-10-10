**A simple tutoring session management system that helps tutors and students track lesson progress transparently.**

StudentTracker helps tutors manage students, organise tutoring packages, and track completed and remaining lessons. Each student has a dedicated link to view their sessions, while a separate private tutor control link allows the tutor to unlock sessions as lessons take place.

## Overview

Keeping track of tutoring sessions manually can lead to confusion about how many lessons a student has completed and how many remain in their package.

StudentTracker provides a centralised way to manage student records and tutoring sessions, making progress easier to monitor for both tutors and students.

## Features

- **Student management** — Create and manage individual student profiles.
- **Tutoring packages** — Create packages with a defined number of sessions for each student.
- **Session tracking** — Track completed, available, and pending sessions.
- **Student access links** — Give each student a dedicated link to view their tutoring progress without needing a tutor dashboard account.
- **Private tutor controls** — Use a separate tutor control link to unlock the next eligible session.
- **Progress tracking** — Display completed and remaining session counts.
- **Session history** — View session-by-session completion status.
- **WhatsApp sharing** — Share student and tutor links through WhatsApp.
- **Authentication** — Protect tutor dashboard pages with Supabase authentication.
- **Responsive interface** — Support desktop and mobile screen sizes.

## How It Works

1. **Create a student:** The tutor adds a student profile.
2. **Create a package:** The tutor sets the total number of sessions purchased.
3. **Share the student link:** The student receives a dedicated link to view their progress.
4. **Unlock a session:** After a lesson, the tutor uses the private tutor control link to make the next eligible session available.
5. **Record completion:** The student marks the available session as completed.
6. **Track progress:** The session history and completed/remaining counts reflect the recorded progress.

## Technology Stack

| Technology | Purpose |
|---|---|
| Next.js | Application framework and routing |
| React | User interface |
| TypeScript | Type safety |
| Tailwind CSS | Styling and responsive design |
| Supabase | Database, authentication, and server-side data operations |
| PostgreSQL | Relational data storage |
| Supabase RPC functions | Controlled session operations and token-based access |

## Getting Started

### Prerequisites

Before running the project, ensure you have:

- Node.js installed
- npm installed
- A Supabase account and project
- The project's required database tables, Row Level Security policies, and RPC functions configured

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd <your-project-folder>
```

Replace the placeholders with your actual repository URL and project folder name.

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

Replace the placeholder values with the corresponding values from your Supabase project settings.

**Security note:** Never expose your Supabase secret or service-role key in client-side code or commit private credentials to GitHub.

### 4. Configure Supabase

Ensure your Supabase database contains the required tables, relationships, Row Level Security policies, and RPC functions used by the application.

The current application uses functions including:

- `get_student_by_token`
- `get_student_by_tutor_token`
- `complete_student_session`
- `make_session_available`

These functions support student-link access, tutor controls, and session completion. Their implementation and permissions must match the application's expected arguments and return values.

### 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | URL of the Supabase project |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Publishable key used by the Supabase client |

Keep `.env.local` out of version control. The repository should contain only example placeholders, never real credentials.

## Project Structure

The following structure reflects the main application files currently used by StudentTracker.

```text
src/
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   ├── globals.css
│   ├── login/
│   │   └── page.tsx
│   ├── dashboard/
│   │   ├── page.tsx
│   │   └── students/
│   │       ├── page.tsx
│   │       ├── new/
│   │       │   └── page.tsx
│   │       └── [id]/
│   │           ├── page.tsx
│   │           └── packages/
│   │               └── new/
│   │                   └── page.tsx
│   ├── student/
│   │   └── [token]/
│   │       └── page.tsx
│   └── tutor/
│       └── [token]/
│           └── page.tsx
├── components/
│   ├── CompleteSessionButton.tsx
│   ├── CopyStudentsLink.tsx
│   ├── LogoutButton.tsx
│   ├── MakeSessionAvailableButton.tsx
│   ├── ShareStudentLink.tsx
│   └── TutorControlLink.tsx
└── lib/
    └── supabase/
        ├── client.ts
        └── server.ts
```

## Security Considerations

StudentTracker uses Supabase authentication and token-based links to support different user workflows.

- Tutor dashboard pages require an authenticated user.
- Student and tutor links use separate tokens for their respective purposes.
- Database access should be restricted through appropriately configured Row Level Security policies.
- RPC functions should validate tokens, enforce ownership and session eligibility, and prevent unauthorised updates.
- Tutor control tokens should be treated as private credentials and shared only with authorised tutors.
- Publishable keys may be used in browser code when database permissions are correctly enforced. Secret and service-role keys must remain server-side.


## Current Status

StudentTracker is under active development. The core workflows include student management, package creation, student progress views, tutor-controlled session availability, and session completion.

Future improvements may include:

- WhatsApp notifications for parents after session completion
- Parent-facing progress summaries
- Package payment and renewal tracking
- Session dates and attendance records
- Improved reporting and analytics
- Automated tests and production deployment documentation

## Contributing

Contributions, suggestions, and bug reports are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Test the affected workflows.
5. Submit a pull request describing the changes.

## License


---

**Built to make tutoring progress easier to track, one session at a time.**