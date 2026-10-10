"use client";

type ShareStudentLinkProps = {
  link: string;
  studentName: string;
};

export default function ShareStudentLink({
  link,
  studentName,
}: ShareStudentLinkProps) {
  function handleWhatsAppShare() {
    // Create a personalized message for the student
    const message = `Hello ${studentName}, here is your tutoring session link:\n\n${link}`;

    // Open WhatsApp with the message ready to send
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <button
      type="button"
      onClick={handleWhatsAppShare}
      className="mt-3 inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-[#16A34A] px-4 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-green-700 active:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
    >
      {/* WhatsApp icon */}
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
  );
}
