export default function SuccessBanner({ message }) {
  return (
    <div className="rounded-xl border border-emerald-400/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
      {message}
    </div>
  );
}
