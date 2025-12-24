import Icon from "../Icon";

export default function ButtonGoogle() {
  return (
    <button
      type="button"
      className="group relative flex cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-xl border border-white/10 bg-white py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <Icon name="google" className="h-4 w-4 text-slate-900" />
      <span>Google</span>
    </button>
  );
}
