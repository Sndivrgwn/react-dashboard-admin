import { Link } from "react-router-dom";
import BackgroundAnimation from "../template/BackgroundAnimation";

export default function PageNotFound() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <BackgroundAnimation/>

      <div className="relative mx-auto flex min-h-screen w-full max-w-4xl flex-col items-center justify-center gap-6 px-4 text-center">
        <div className="reveal">
          <p className="text-sm uppercase tracking-[0.3em] text-white/50">
            404 error
          </p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight">
            Page not found
          </h1>
          <p className="mt-3 text-sm text-white/60">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        <div className="reveal reveal-delay-1 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="cursor-pointer rounded-xl bg-gradient-to-r from-rose-400 via-fuchsia-400 to-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-fuchsia-500/25 transition hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0"
          >
            Go to Home
          </Link>
          <Link
            to="/login"
            className="cursor-pointer rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/80 transition hover:border-white/20 hover:bg-white/10"
          >
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}
