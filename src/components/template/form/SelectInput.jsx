import Icon from "../Icon";

export default function SelectInput({
  value,
  onChange,
  options,
  ariaInvalid,
  className = "",
  ...props
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        aria-invalid={ariaInvalid}
        className={[
          "h-10 w-full appearance-none rounded-xl border border-white/10 bg-slate-950/60 px-3 pr-10 text-sm text-white outline-none transition focus:border-white/30 focus:ring-2 focus:ring-white/20",
          className,
        ]
          .join(" ")
          .trim()}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/50">
        <Icon name="chevron-down" className="h-4 w-4" />
      </span>
    </div>
  );
}
