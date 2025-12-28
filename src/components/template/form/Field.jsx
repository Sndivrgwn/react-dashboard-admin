export default function Field({ label, helperText, error, children }) {
  return (
    <label className="flex flex-col gap-2 text-xs text-white/60">
      <span>
        {label}
        {helperText ? (
          <span className="ml-2 text-white/40">{helperText}</span>
        ) : null}
      </span>
      {children}
      {error ? (
        <span className="text-xs text-rose-300" aria-live="polite">
          {error}
        </span>
      ) : null}
    </label>
  );
}
