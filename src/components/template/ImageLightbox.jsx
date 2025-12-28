import { useEffect } from "react";
import { createPortal } from "react-dom";

export default function ImageLightbox({ isOpen, src, alt, onClose }) {
  if (!isOpen || !src) return null;

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return createPortal(
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <img
        src={src}
        alt={alt || "Preview"}
        className="max-h-[90vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl shadow-black/60"
        onClick={(event) => event.stopPropagation()}
      />
    </div>,
    document.body
  );
}
