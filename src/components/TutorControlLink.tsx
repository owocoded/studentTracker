"use client";

import { useState } from "react";

type TutorControlLinkProps = {
  link: string;
  studentName: string;
};

export default function TutorControlLink({
  link,
  studentName,
}: TutorControlLinkProps) {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState("");

  async function handleCopy() {
    setCopyError("");

    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);

      // Reset the button label after two seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy tutor link:", error);
      setCopied(false);
      setCopyError("Unable to copy. Please copy the link manually.");
    }
  }

  function handleWhatsAppShare() {
    const message =
      `Tutor control link for ${studentName}:\n\n${link}\n\n` +
      "Use this private link to make tutoring sessions available.";

    window.open(
      `https://wa.me/?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
    <section className="mt-6 rounded-2xl border border-[#DDD6FE] bg-white p-5 shadow-sm sm:p-6">
      {/* Heading */}
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F5F3FF] text-xl">
          🔐
        </div>

        <div>
          <h2 className="text-lg font-bold text-[#18181B]">
            Tutor Control Link
          </h2>

          <p className="mt-1 text-sm leading-5 text-[#71717A]">
            Use this private link to unlock the next eligible session
            after class.
          </p>
        </div>
      </div>

      {/* Private link */}
      <div className="mt-5">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#71717A]">
          Private tutor link
        </p>

        <div className="break-all rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm leading-6 text-[#18181B]">
          {link}
        </div>

        <p className="mt-2 flex items-start gap-2 text-xs leading-5 text-[#71717A]">
          <span aria-hidden="true">⚠️</span>
          Keep this link private. Anyone who has it may be able to access
          the tutor controls.
        </p>
      </div>

      {/* Actions */}
      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleCopy}
          className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:ring-offset-2 ${
            copied
              ? "border border-green-200 bg-green-50 text-green-700"
              : "bg-[#7C3AED] text-white hover:bg-[#5B21B6] active:bg-[#4C1D95]"
          }`}
        >
          {copied ? (
            <>✓ Copied!</>
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
              Copy Tutor Link
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleWhatsAppShare}
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-[#16A34A] px-4 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-green-700 active:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
        >
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M20.52 3.48A11.82 11.82 0 0 0 12.09 0C5.56 0 .25 5.3.25 11.83c0 2.08.54 4.11 1.57 5.9L.15 24l6.42-1.68a11.82 11.82 0 0 0 5.52 1.37h.01c6.52 0 11.83-5.3 11.83-11.83 0-3.16-1.23-6.13-3.41-8.38ZM12.1 21.67a9.83 9.83 0 0 1-5.01-1.37l-.36-.21-3.81 1 1.02-3.71-.24-.38a9.82 9.82 0 1 1 8.4 4.67Zm5.39-7.36c-.3-.15-1.79-.88-2.07-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.96 1.18-.18.2-.35.22-.65.07-.3-.15-1.28-.47-2.44-1.5-.9-.8-1.51-1.79-1.69-2.09-.18-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.68-1.64-.93-2.24-.24-.58-.49-.5-.68-.51h-.58c-.2 0-.53.07-.81.38-.28.3-1.06 1.03-1.06 2.52s1.09 2.92 1.24 3.12c.15.2 2.14 3.27 5.19 4.58.73.32 1.3.5 1.75.64.73.23 1.4.2 1.93.12.59-.09 1.79-.73 2.04-1.44.25-.71.25-1.32.18-1.44-.08-.13-.28-.2-.58-.35Z" />
          </svg>

          Share on WhatsApp
        </button>
      </div>

      {/* Feedback */}
      {copyError && (
        <p role="alert" className="mt-3 text-sm text-red-600">
          {copyError}
        </p>
      )}

      {copied && (
        <p role="status" className="mt-3 text-sm text-green-700">
          ✓ Tutor link copied to your clipboard.
        </p>
      )}
    </section>
  );
}