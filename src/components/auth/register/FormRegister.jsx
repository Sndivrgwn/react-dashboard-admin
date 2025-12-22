import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import ErrorBanner from "../../error/banner/ErrorBanner";
import ButtonSubmit from "../../template/form/ButtonSubmit";

export default function FormRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  async function HandleSubmit(e) {
    e.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const registrationData = {
        name: name,
        email: email,
        password: password,
      };

      const res = await register(registrationData);
      const fieldErrors =
        res?.errors || res?.validation_errors || res?.["Validation error"];

      if (fieldErrors && typeof fieldErrors === "object") {
        const firstField = Object.keys(fieldErrors)[0];
        const firstMessage = Array.isArray(fieldErrors[firstField])
          ? fieldErrors[firstField][0]
          : fieldErrors[firstField];
        setErrorMessage(
          firstMessage || "Registration failed. Please try again."
        );
        return;
      }

      if (
        typeof res?.message === "string" &&
        !res?.user &&
        !res?.token &&
        !res?.data
      ) {
        setErrorMessage(res.message);
        return;
      }

      if (res?.token) {
        navigate("/profile");
      } else {
        navigate("/login");
      }
    } catch (error) {
      if (error.response) {
        console.error(error.response.status);
        console.error(error.response.data);
        const responseData = error.response.data;
        const fieldErrors =
          responseData?.errors ||
          responseData?.validation_errors ||
          responseData?.["Validation error"];
        let fallbackMessage = responseData?.message;

        if (
          !fallbackMessage &&
          fieldErrors &&
          typeof fieldErrors === "object"
        ) {
          const firstField = Object.keys(fieldErrors)[0];
          const firstMessage = Array.isArray(fieldErrors[firstField])
            ? fieldErrors[firstField][0]
            : fieldErrors[firstField];
          fallbackMessage = firstMessage;
        }

        setErrorMessage(
          fallbackMessage || "Registration failed. Please try again."
        );
      } else {
        console.error(error.message);
        setErrorMessage("Network error. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="space-y-4" onSubmit={HandleSubmit} autoComplete="on">
      {errorMessage ? <ErrorBanner message={errorMessage} /> : null}
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium text-white/70">
          Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 outline-none transition focus:border-white/20 focus:ring-4 focus:ring-white/10"
        />
      </div>

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
            autoComplete="new-password"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 pr-16 text-white placeholder:text-white/30 outline-none transition focus:border-white/20 focus:ring-4 focus:ring-white/10"
          />
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[11px] text-white/30">
            min 8
          </span>
        </div>
      </div>

      <ButtonSubmit isSubmitting={isSubmitting} title="Sign Up" text="Creating..."/>

      <p className="pt-2 text-center text-sm text-white/60">
        Already have an account?{" "}
        <Link to="/login" className="text-white/80 hover:text-white">
          Sign in
        </Link>
      </p>
    </form>
  );
}
