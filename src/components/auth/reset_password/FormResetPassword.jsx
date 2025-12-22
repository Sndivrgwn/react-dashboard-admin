import axios from "axios";
import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import ErrorBanner from "../../error/banner/ErrorBanner";
import ButtonSubmit from "../../template/form/ButtonSubmit";

export default function FormResetPassword() {
  const [params] = useSearchParams();
  const token = params.get("token");
  const email = params.get("email");
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    const resetPasswordData = {
      token: token,
      email: email,
      password: password,
      password_confirmation: confirmPassword,
    };

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/reset-password",
        resetPasswordData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(res.data);
      navigate("/login");
    } catch (error) {
      if (error.response) {
        console.error(error.response.data);
        setErrorMessage(
          error.response.data?.message || "Reset failed. Please try again."
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
    <form className="space-y-4" onSubmit={handleSubmit}>
      {errorMessage ? <ErrorBanner message={errorMessage} /> : null}
      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium text-white/70">
          New password
        </label>
        <input
          id="password"
          type="password"
          placeholder=""
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 outline-none transition focus:border-white/20 focus:ring-4 focus:ring-white/10"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="confirmPassword"
          className="text-sm font-medium text-white/70"
        >
          Confirm password
        </label>
        <input
          id="confirmPassword"
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder=""
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 outline-none transition focus:border-white/20 focus:ring-4 focus:ring-white/10"
        />
      </div>

      <ButtonSubmit isSubmitting={isSubmitting} title="Reset Password" text="Updating..."/>

      <p className="pt-2 text-center text-sm text-white/60">
        Remembered your password?{" "}
        <Link to="/login" className="text-white/80 hover:text-white">
          Back to sign in
        </Link>
      </p>
    </form>
  );
}
