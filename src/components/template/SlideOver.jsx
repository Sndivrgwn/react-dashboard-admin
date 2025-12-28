import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function SlideOver({
  isOpen,
  title,
  onClose,
  children,
  widthClass = "max-w-lg",
}) {
  if (!isOpen) return null;

  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/60"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className={[
          "flex h-full w-full flex-col",
          widthClass,
          "border-l border-white/10 bg-slate-900/95 text-white shadow-2xl shadow-black/40 backdrop-blur",
        ]
          .join(" ")
          .trim()}
        onClick={(event) => event.stopPropagation()}
      >
        <div
          className={[
            "sticky top-0 z-10 flex items-center justify-between px-6 py-5",
            hasScrolled ? "border-b border-white/10 bg-slate-900/95" : "",
          ]
            .join(" ")
            .trim()}
        >
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-white/10 px-2 py-1 text-xs text-white/60 transition hover:border-white/20 hover:text-white"
          >
            Close
          </button>
        </div>
        <div
          className="h-full overflow-y-auto px-6 py-5"
          onScroll={(event) => {
            setHasScrolled(event.currentTarget.scrollTop > 4);
          }}
        >
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}
