"use client";

function ErrorPage({ error, retry }) {
  return (
    <main className="mx-auto flex min-h-80 max-w-2xl flex-col items-center justify-center gap-4 px-6 text-center">
      <h2 className="text-2xl font-semibold text-gray-900">Something went wrong</h2>
      <p className="text-gray-600">{error?.message || "Unable to load this page."}</p>
      <button
        type="button"
        onClick={() => retry()}
        className="rounded-lg bg-primary px-4 py-2 font-medium text-white hover:opacity-90"
      >
        Try again
      </button>
    </main>
  );
}

export default ErrorPage;
