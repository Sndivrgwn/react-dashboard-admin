const badgeStyles = {
  published: "bg-emerald-500/15 text-emerald-200",
  draft: "bg-amber-500/15 text-amber-200",
  archived: "bg-slate-500/20 text-slate-200",
  scheduled: "bg-sky-500/15 text-sky-200",
  in_stock: "bg-emerald-500/15 text-emerald-200",
  low_stock: "bg-amber-500/15 text-amber-200",
  out_of_stock: "bg-rose-500/15 text-rose-200",
  private: "bg-slate-500/20 text-slate-200",
  public: "bg-emerald-500/15 text-emerald-200",
  unlisted: "bg-amber-500/15 text-amber-200",
  online: "bg-sky-500/15 text-sky-200",
  offline: "bg-slate-500/20 text-slate-200",
};

export default function Badge({ label, variant }) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        badgeStyles[variant] || "bg-white/10 text-white/70",
      ].join(" ")}
    >
      {label}
    </span>
  );
}
