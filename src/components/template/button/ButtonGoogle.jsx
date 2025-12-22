export default function ButtonGoogle() {
  return (
    <button
      type="button"
      className="group relative flex cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-xl border border-white/10 bg-white py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <svg aria-hidden="true" viewBox="0 0 48 48" className="h-4 w-4">
        <path
          fill="#EA4335"
          d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.44 5.38 2.54 13.22l7.98 6.2C12.43 13.38 17.74 9.5 24 9.5z"
        />
        <path
          fill="#4285F4"
          d="M46.45 24.5c0-1.64-.15-3.22-.43-4.74H24v9.01h12.7c-.55 2.98-2.22 5.5-4.74 7.2l7.28 5.65c4.25-3.92 6.71-9.7 6.71-17.12z"
        />
        <path
          fill="#FBBC05"
          d="M10.52 28.04c-.62-1.84-.97-3.8-.97-5.82s.35-3.98.97-5.82l-7.98-6.2C.92 13.53 0 18.65 0 23.5c0 4.85.92 9.97 2.54 14.3l7.98-6.2z"
        />
        <path
          fill="#34A853"
          d="M24 48c6.48 0 11.93-2.13 15.9-5.78l-7.28-5.65c-2.02 1.36-4.62 2.17-8.62 2.17-6.26 0-11.57-3.88-13.48-9.3l-7.98 6.2C6.44 42.62 14.62 48 24 48z"
        />
      </svg>
      <span>Google</span>
    </button>
  );
}
