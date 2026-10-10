"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type MakeSessionAvailableButtonProps = {
  token: string;
  sessionId: string;
};

export default function MakeSessionAvailableButton({
  token,
  sessionId,
}: MakeSessionAvailableButtonProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleMakeAvailable() {
    if (loading) {
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const supabase = createClient();

      const { data, error } = await supabase.rpc(
        "make_session_available",
        {
          p_token: token,
          p_session_id: sessionId,
        },
      );

      if (error || data !== true) {
        console.error(error);

        setError(
          error?.message || "Could not unlock this session. Please try again.",
        );
        return;
      }

      // Show confirmation and refresh the tutor page
      setSuccess(true);
      router.refresh();
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-end gap-1.5">
      <button
        type="button"
        onClick={handleMakeAvailable}
        disabled={loading || success}
        aria-live="polite"
        className={`inline-flex min-h-9 items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:ring-offset-2 disabled:cursor-not-allowed ${
          success
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

            Unlocking...
          </>
        ) : success ? (
          <>✓ Session Unlocked</>
        ) : (
          <>Unlock Session →</>
        )}
      </button>

      {error && (
        <p
          role="alert"
          className="max-w-56 text-right text-xs leading-5 text-red-600"
        >
          {error}
        </p>
      )}

      {success && (
        <p
          role="status"
          className="max-w-56 text-right text-xs leading-5 text-green-700"
        >
          This session is now available to the student.
        </p>
      )}
    </div>
  );
}