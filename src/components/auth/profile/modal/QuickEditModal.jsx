import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../../../context/AuthContext";
import Modal from "../../../template/Modal";

export default function QuickEditModal({ isOpen, onClose, onSuccess }) {
  const { user, fetchUser } = useAuth();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    job_title: "",
    bio: "",
    country: "",
    city_state: "",
    postal_code: "",
    tax_id: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!user) return;
    setFormData({
      first_name: user.first_name || "",
      last_name: user.last_name || "",
      email: user.email || "",
      phone: user.phone || "",
      job_title: user.job_title || "",
      bio: user.bio || "",
      country: user.country || "",
      city_state: user.city_state || "",
      postal_code: user.postal_code || "",
      tax_id: user.tax_id || "",
    });
  }, [user, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.patch(
        "http://127.0.0.1:8000/api/user/update",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await fetchUser();
      onSuccess?.("Profile details updated.");
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} title="Edit profile details" onClose={onClose}>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm text-white/70" htmlFor="quickFirstName">
              First name
            </label>
            <input
              id="quickFirstName"
              type="text"
              placeholder="First name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white outline-none transition focus:border-white/20 focus:ring-4 focus:ring-white/10"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-white/70" htmlFor="quickLastName">
              Last name
            </label>
            <input
              id="quickLastName"
              type="text"
              placeholder="Last name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white outline-none transition focus:border-white/20 focus:ring-4 focus:ring-white/10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-white/70" htmlFor="quickEmail">
            Email
          </label>
          <input
            id="quickEmail"
            type="email"
            placeholder="you@example.com"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white outline-none transition focus:border-white/20 focus:ring-4 focus:ring-white/10"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm text-white/70" htmlFor="quickPhone">
              Phone
            </label>
            <input
              id="quickPhone"
              type="text"
              placeholder="+09 363 398 46"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white outline-none transition focus:border-white/20 focus:ring-4 focus:ring-white/10"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-white/70" htmlFor="quickJobTitle">
              Job title
            </label>
            <input
              id="quickJobTitle"
              type="text"
              placeholder="Job title"
              name="job_title"
              value={formData.job_title}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white outline-none transition focus:border-white/20 focus:ring-4 focus:ring-white/10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-white/70" htmlFor="quickBio">
            Bio
          </label>
          <input
            id="quickBio"
            type="text"
            placeholder="Bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white outline-none transition focus:border-white/20 focus:ring-4 focus:ring-white/10"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm text-white/70" htmlFor="quickCountry">
              Country
            </label>
            <input
              id="quickCountry"
              type="text"
              placeholder="Country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white outline-none transition focus:border-white/20 focus:ring-4 focus:ring-white/10"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-white/70" htmlFor="quickCityState">
              City/State
            </label>
            <input
              id="quickCityState"
              type="text"
              placeholder="City/State"
              name="city_state"
              value={formData.city_state}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white outline-none transition focus:border-white/20 focus:ring-4 focus:ring-white/10"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm text-white/70" htmlFor="quickPostalCode">
              Postal code
            </label>
            <input
              id="quickPostalCode"
              type="text"
              placeholder="Postal code"
              name="postal_code"
              value={formData.postal_code}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white outline-none transition focus:border-white/20 focus:ring-4 focus:ring-white/10"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-white/70" htmlFor="quickTaxId">
              Tax ID
            </label>
            <input
              id="quickTaxId"
              type="text"
              placeholder="Tax ID"
              name="tax_id"
              value={formData.tax_id}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white outline-none transition focus:border-white/20 focus:ring-4 focus:ring-white/10"
            />
          </div>
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
                  Saving...
                </>
              ) : (
                "Save"
              )}
            </span>
          </button>
        </div>
      </form>
    </Modal>
  );
}
