import Icon from "../Icon";

export default function ButtonGithub() {
  return (
    <button
      type="button"
      className="group relative flex cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/10"
    >
      <Icon name="github" className="h-4 w-4 text-white" />
      <span>GitHub</span>
    </button>
  );
}
