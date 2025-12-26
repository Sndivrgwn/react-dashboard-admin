export default function DataTableCard({
  title,
  description,
  toolbar,
  children,
  footer,
  className = "",
}) {
  return (
    <div
      className={[
        "rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-black/20 backdrop-blur",
        className,
      ]
        .join(" ")
        .trim()}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          {description ? (
            <p className="text-sm text-white/50">{description}</p>
          ) : null}
        </div>
        {toolbar ? <div>{toolbar}</div> : null}
      </div>

      <div className="mt-6">{children}</div>

      {footer ? (
        <div className="mt-6 flex flex-wrap items-center justify-between gap-2 text-xs text-white/50">
          {footer}
        </div>
      ) : null}
    </div>
  );
}
