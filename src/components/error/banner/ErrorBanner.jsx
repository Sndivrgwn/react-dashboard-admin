export default function ErrorBanner({message}) {
    return (
        <div className="rounded-xl border border-rose-400/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
          {message}
        </div>
    )
}