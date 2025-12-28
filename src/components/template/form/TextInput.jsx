export default function TextInput({
  value,
  onChange,
  ariaInvalid,
  className = "",
  ...props
}) {
  return (
    <input
      value={value}
      onChange={onChange}
      aria-invalid={ariaInvalid}
      className={[
        "h-10 w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 text-sm text-white outline-none transition focus:border-white/30 focus:ring-2 focus:ring-white/20",
        className,
      ]
        .join(" ")
        .trim()}
      {...props}
    />
  );
}
