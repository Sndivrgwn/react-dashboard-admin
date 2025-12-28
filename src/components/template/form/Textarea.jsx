export default function Textarea({
  value,
  onChange,
  ariaInvalid,
  className = "",
  ...props
}) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      aria-invalid={ariaInvalid}
      className={[
        "min-h-[120px] w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 py-3 text-sm text-white outline-none transition focus:border-white/30 focus:ring-2 focus:ring-white/20",
        className,
      ]
        .join(" ")
        .trim()}
      {...props}
    />
  );
}
