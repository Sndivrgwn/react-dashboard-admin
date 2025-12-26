import Icon from "../../template/Icon";

export default function ExportButton() {
  return (
    <button
      type="button"
      className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm text-white/70 transition hover:border-white/20 hover:text-white"
    >
      <Icon name="download" className="h-4 w-4" />
      Export
    </button>
  );
}
