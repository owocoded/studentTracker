"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type CompleteSessionButtonProps = {
  sessionId: string;
  completed: boolean;
  studentToken?: string;
};

export default function CompleteSessionButton({
  sessionId,
  completed,
  studentToken,
}: CompleteSessionButtonProps) {
  const router = useRouter();

  const [isCompleted, setIsCompleted] = useState(completed);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleComplete() {
    if (isCompleted || loading) {
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const supabase = createClient();

      let success = false;

      if (studentToken) {
        // Student completes a session through the secure RPC
        const { data, error } = await supabase.rpc(
          "complete_student_session",
          {
            p_token: studentToken,
            p_session_id: sessionId,
          },
        );

        if (error) {
          console.error(error);
          setErrorMessage("Could not complete this session. Please try again.");
          return;
        }

        success = data === true;
      } else {
        // Logged-in tutor users can update their own sessions directly
        const { error } = await supabase
          .from("sessions")
          .update({
            completed: true,
            completed_at: new Date().toISOString(),
          })
          .eq("id", sessionId);

        if (error) {
          console.error(error);
          setErrorMessage("Could not complete this session. Please try again.");
          return;
        }

        success = true;
      }

      if (success) {
        // Update the button immediately
        setIsCompleted(true);

        // Refresh the page so session counts and progress update
        router.refresh();
      } else {
        setErrorMessage(
          "This session could not be completed. Check its availability and try again.",
        );
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-end gap-1.5">
      <button
        type="button"
        onClick={handleComplete}
        disabled={isCompleted || loading}
        aria-live="polite"
        className={`inline-flex min-h-9 items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:ring-offset-2 disabled:cursor-not-allowed ${
          isCompleted
            ? "border border-green-200 bg-green-50 text-green-700"
            : loading
              ? "bg-[#EDE9FE] text-[#7C3AED]"
              : "bg-[#7C3AED] text-white hover:bg-[#5B21B6] active:bg-[#4C1D95]"
        }`}
      >
        {loading ? (
          <>
            <svg
              className="h-3.5 w-3.5 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />

              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>

            Saving...
          </>
        ) : isCompleted ? (
          <>✓ Completed</>
        ) : (
          <>Mark Complete →</>
        )}
      </button>

      {errorMessage && (
        <p
          role="alert"
          className="max-w-52 text-right text-xs leading-5 text-red-600"
        >
          {errorMessage}
        </p>
      )}
    </div>
  );
}
