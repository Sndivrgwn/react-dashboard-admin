export default function ButtonSubmit({isSubmitting, text="Loading", title="set title" }) {
    return (
        <button
        type="submit"
        disabled={isSubmitting}
        className="group relative w-full cursor-pointer overflow-hidden rounded-xl bg-gradient-to-r from-rose-400 via-fuchsia-400 to-cyan-300 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-fuchsia-500/25 transition hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70"
      >
        <span className="absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.5),transparent_55%)]" />
        <span className="relative inline-flex items-center justify-center gap-2">
          {isSubmitting ? (
            <>
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-slate-900/60 border-t-transparent" />
              {text}
            </>
          ) : title}
        </span>
      </button>
    )
}