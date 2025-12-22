import FormLogin from "../auth/login/FormLogin";

export default function CardForm({children, title = "title", subtitle="subtitle", paragraph ="paragraph"}) {
  return (
    <div className="relative reveal reveal-delay-1">
      <div className="absolute -inset-0.5 rounded-[28px] bg-gradient-to-br from-white/10 via-transparent to-white/5 blur" />
      <div className="relative rounded-[26px] border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-black/40 backdrop-blur sm:p-8">
        <div className="mb-6">
          <div className="text-sm font-medium text-white/60">{title}</div>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
            {subtitle}
          </h2>
          <p className="mt-1 text-sm text-white/60">
            {paragraph}
          </p>
        </div>

        {children}
      </div>
    </div>
  );
}
