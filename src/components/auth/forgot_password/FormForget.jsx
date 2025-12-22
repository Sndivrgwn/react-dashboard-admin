import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import SuccessBanner from "../../error/banner/SuccessBanner";
import ErrorBanner from "../../error/banner/ErrorBanner";
import ButtonSubmit from "../../template/form/ButtonSubmit";

export default function FormForgetPassword() {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);
    const data = {
      email: email,
    };

    try {
      await axios.post("http://127.0.0.1:8000/api/forgot-password", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setMessage("Email has been sent! Check your email");
    } catch (error) {
      if (error.response) {
        console.error(error.response.data);
        setErrorMessage(
          error.response.data?.message || "Request failed. Please try again."
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {errorMessage ? <ErrorBanner message={errorMessage} /> : null}
      {message ? <SuccessBanner message={message} /> : null}
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-white/70">
          Email
        </label>
        <input
          id="email"
          type="email"
          inputMode="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 outline-none transition focus:border-white/20 focus:ring-4 focus:ring-white/10"
        />
      </div>

      <ButtonSubmit isSubmitting={isSubmitting} title="Send" text="Sending..."  />

      <p className="pt-2 text-center text-sm text-white/60">
        Remember your password?{" "}
        <Link to="/login" className="text-white/80 hover:text-white">
          Back to sign in
        </Link>
      </p>
    </form>
  );
}
