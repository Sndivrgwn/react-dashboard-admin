import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";

export default function Combobox({
  id,
  label,
  value,
  onChange,
  options,
  placeholder,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState(value || "");
  const wrapperRef = useRef(null);

  useEffect(() => {
    setQuery(value || "");
  }, [value]);

  useEffect(() => {
    const handleOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const filtered = options.filter((option) =>
    option.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-2" ref={wrapperRef}>
      <label className="text-sm text-white/70" htmlFor={id}>
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type="text"
          value={query}
          onChange={(event) => {
            const nextValue = event.target.value;
            setQuery(nextValue);
            onChange?.(nextValue);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 pr-16 text-white outline-none transition focus:border-white/20 focus:ring-4 focus:ring-white/10"
        />
        <div className="pointer-events-none absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-2 text-white/50">
          <Icon name="search" className="h-4 w-4" />
        </div>
        {isOpen ? (
          <div className="absolute no-scrollbar z-20 mt-2  max-h-56 w-full overflow-auto rounded-2xl border border-white/10 bg-slate-950/95 p-2 text-sm shadow-xl">
            {filtered.length ? (
              filtered.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    setQuery(option);
                    onChange?.(option);
                    setIsOpen(false);
                  }}
                  className="flex w-full items-center rounded-xl px-3 py-2 text-left text-white/80 transition hover:bg-white/10 hover:text-white"
                >
                  {option}
                </button>
              ))
            ) : (
              <div className="px-3 py-2 text-white/40">No matches</div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
