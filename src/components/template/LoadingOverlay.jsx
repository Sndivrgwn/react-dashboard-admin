import { createPortal } from "react-dom";

export default function LoadingOverlay({ message = "Loading..." }) {
  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/80 backdrop-blur">
      <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/80 px-5 py-4 text-sm text-white/80 shadow-xl">
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-transparent" />
        <span>{message}</span>
      </div>
    </div>,
    document.body
  );
}
