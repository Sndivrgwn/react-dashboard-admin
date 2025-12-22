import { useState } from "react";
import ButtonGoogle from "../../template/button/ButtonGoogle";
import ButtonGithub from "../../template/button/ButtonGithub";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import ErrorBanner from "../../error/banner/ErrorBanner";
import ButtonSubmit from "../../template/form/ButtonSubmit";

export default function FormLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);
    try {
      await login({ email, password });
      navigate("/profile");
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "Login gagal");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit} autoComplete="on">
      {errorMessage ? <ErrorBanner message={errorMessage} /> : null}
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-white/70">
          Email
        </label>
        <input
          id="email"
          type="email"
          inputMode="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 outline-none transition focus:border-white/20 focus:ring-4 focus:ring-white/10"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="text-sm font-medium text-white/70"
          >
            Password
          </label>
          <button
            type="button"
            className="cursor-pointer text-xs text-white/60 transition hover:text-white/80"
            onClick={() => setShowPassword((v) => !v)}
            aria-pressed={showPassword}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 pr-16 text-white placeholder:text-white/30 outline-none transition focus:border-white/20 focus:ring-4 focus:ring-white/10"
          />
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[11px] text-white/30">
            min 8
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <label className="flex cursor-pointer items-center gap-3 text-sm text-white/70">
          <input id="remember" type="checkbox" className="peer sr-only" />
          <span className="relative h-5 w-9 rounded-full border border-white/20 bg-white/10 transition peer-checked:border-emerald-400/70 peer-checked:bg-emerald-400/50 before:absolute before:left-0.5 before:top-1/2 before:h-4 before:w-4 before:-translate-y-1/2 before:rounded-full before:bg-white/80 before:shadow before:shadow-black/30 before:transition before:duration-200 before:content-[''] peer-checked:before:translate-x-4 peer-checked:before:bg-white" />
          Remember me
        </label>

        <Link
          to="/forgot-password"
          className="text-sm text-white/60 transition hover:text-white/80"
        >
          Forgot password?
        </Link>
      </div>

      <ButtonSubmit isSubmitting={isSubmitting} title="Sign In" text="Signing in..."/>

      <div className="relative py-2">
        <div className="h-px w-full bg-white/10" />
        <span className="absolute left-1/2 -translate-x-1/2 -top-1 text-xs bg-slate-900 px-3 text-white/40">
          or
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <ButtonGoogle />
        <ButtonGithub />
      </div>

      <p className="pt-2 text-center text-sm text-white/60">
        Don&apos;t have an account?{" "}
        <Link to="/register" className="text-white/80 hover:text-white">
          Sign up
        </Link>
      </p>
    </form>
  );
}
