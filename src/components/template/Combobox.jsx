import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";

export default function Combobox({
  id,
  label,
  value,
  onChange,
  options,
  placeholder,
  showSwatch = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState(
    value !== null && value !== undefined ? String(value) : ""
  );
  const wrapperRef = useRef(null);

  const normalized = options.map((option) => {
    if (typeof option === "string" || typeof option === "number") {
      return { label: String(option), value: option };
    }
    const nextLabel = option?.label ?? option?.value ?? "";
    return {
      ...option,
      label: String(nextLabel),
      value: option?.value ?? nextLabel,
    };
  });

  const queryValue = String(query).toLowerCase();
  const filtered = normalized.filter((option) =>
    option.label.toLowerCase().includes(queryValue)
  );

  useEffect(() => {
    const matched = normalized.find((option) => option.value === value);
    if (matched) {
      setQuery(String(matched.label));
    } else if (value !== null && value !== undefined) {
      setQuery(String(value));
    } else {
      setQuery("");
    }
  }, [value, normalized]);

  useEffect(() => {
    const handleOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  return (
    <div className="space-y-2" ref={wrapperRef}>
      {label ? (
        <label className="text-sm text-white/70" htmlFor={id}>
          {label}
        </label>
      ) : null}
      <div className="relative">
        <input
          id={id}
          type="text"
          value={query}
          onChange={(event) => {
            const nextValue = event.target.value;
            const matched = normalized.find(
              (option) => option.label.toLowerCase() === nextValue.toLowerCase()
            );
            setQuery(nextValue);
            onChange?.(matched ? matched.value : nextValue);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="none"
          spellCheck={false}
          placeholder={placeholder}
          className="h-10 w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 pr-12 text-sm text-white outline-none transition focus:border-white/30 focus:ring-2 focus:ring-white/20"
        />
        <div className="pointer-events-none absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-2 text-white/50">
          <Icon name="search" className="h-4 w-4" />
        </div>
        {isOpen ? (
          <div className="absolute no-scrollbar z-20 mt-2  max-h-56 w-full overflow-auto rounded-2xl border border-white/10 bg-slate-950/95 p-2 text-sm shadow-xl">
            {filtered.length ? (
              filtered.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    setQuery(option.label);
                    onChange?.(option.value);
                    setIsOpen(false);
                  }}
                  className="flex w-full items-center rounded-xl px-3 py-2 text-left text-white/80 transition hover:bg-white/10 hover:text-white"
                >
                  {showSwatch ? (
                    <span
                      className="mr-2 h-3 w-3 rounded-full border border-white/20"
                      style={{ backgroundColor: option.value }}
                    />
                  ) : null}
                  {option.label}
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
