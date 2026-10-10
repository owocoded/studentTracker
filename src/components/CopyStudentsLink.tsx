"use client";

import { useState } from "react";

type CopyStudentLinkProps = {
  link: string;
};

export default function CopyStudentLink({
  link,
}: CopyStudentLinkProps) {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  async function handleCopy() {
    if (copied) {
      return;
    }

    setError("");

    try {
      // Copy the student link to the clipboard
      await navigator.clipboard.writeText(link);

      // Show confirmation only after copying succeeds
      setCopied(true);

      // Reset the button after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy student link:", err);
      setError("Unable to copy. Please copy the link manually.");
    }
  }

  return (
    <div className="flex flex-col items-start gap-1.5">
      <button
        type="button"
        onClick={handleCopy}
        className={`mt-3 inline-flex min-h-10 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:ring-offset-2 ${
          copied
            ? "border border-green-200 bg-green-50 text-green-700"
            : "bg-[#7C3AED] text-white hover:bg-[#5B21B6] active:bg-[#4C1D95]"
        }`}
      >
        {copied ? (
          <>
            <span aria-hidden="true">✓</span>
            Copied!
          </>
        ) : (
          <>
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="8" y="8" width="13" height="13" rx="2" />
              <path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" />
            </svg>
            Copy Student Link
          </>
        )}
      </button>

      {error && (
        <p role="alert" className="max-w-xs text-xs leading-5 text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}