import axios from "axios";
import { useState } from "react";
import ErrorBanner from "../../../error/banner/ErrorBanner";
import Modal from "../../../template/Modal";

export default function UpdatePasswordModal({ isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    current_password: "",
    new_password: "",
    new_password_confirmation: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const token = localStorage.getItem("token");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    try {
      await axios.patch("http://127.0.0.1:8000/api/user/password", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      onSuccess?.("Password updated.");
      onClose();
    } catch (error) {
      const apiMessage = error?.response?.data?.message;
      const apiErrors = error?.response?.data?.errors;
      const fieldErrors = apiErrors
        ? Object.values(apiErrors).flat().filter(Boolean)
        : [];
      setErrorMessage(
        apiMessage || fieldErrors[0] || "Unable to update password."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} title="Update password" onClose={onClose}>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {errorMessage ? <ErrorBanner message={errorMessage} /> : null}
        <div className="space-y-2">
          <label className="text-sm text-white/70" htmlFor="currentPassword">
            Current password
          </label>
          <input
            id="currentPassword"
            type="password"
            name="current_password"
            value={formData.current_password}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white outline-none transition focus:border-white/20 focus:ring-4 focus:ring-white/10"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-white/70" htmlFor="newPassword">
            New password
          </label>
          <input
            id="newPassword"
            type="password"
            name="new_password"
            value={formData.new_password}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white outline-none transition focus:border-white/20 focus:ring-4 focus:ring-white/10"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-white/70" htmlFor="confirmPassword">
            Confirm new password
          </label>
          <input
            id="confirmPassword"
            type="password"
            name="new_password_confirmation"
            value={formData.new_password_confirmation}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white outline-none transition focus:border-white/20 focus:ring-4 focus:ring-white/10"
          />
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white/70 transition hover:border-white/20 hover:text-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <span className="inline-flex items-center gap-2">
              {isSubmitting ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-900/60 border-t-transparent" />
                  Updating...
                </>
              ) : (
                "Update"
              )}
            </span>
          </button>
        </div>
      </form>
    </Modal>
  );
}
