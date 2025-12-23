import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../../../context/AuthContext";
import Modal from "../../../template/Modal";

export default function ModalPersonal({isEditOpen, setIsEditOpen, onSuccess}) {
    const { user, fetchUser } = useAuth();
    const [formData, setFormData] = useState({
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      job_title: "",
      bio: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const token = localStorage.getItem("token")

    useEffect(() => {
      if (!user) return;
      setFormData({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        phone: user.phone || "",
        job_title: user.job_title || "",
        bio: user.bio || "",
      });
    }, [user, isEditOpen]);

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
          formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
          }
        );
        await fetchUser();
        setIsEditOpen(false);
        onSuccess?.("Personal information updated.");
      } finally {
        setIsSubmitting(false);
      }
    };
    
    return (
        <Modal
            isOpen={isEditOpen}
            title="Edit personal information"
            onClose={() => setIsEditOpen(false)}
          >
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm text-white/70" htmlFor="editFirstName">
                    First name
                  </label>
                  <input
                    id="editFirstName"
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white outline-none transition focus:border-white/20 focus:ring-4 focus:ring-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-white/70" htmlFor="editLastName">
                    Last name
                  </label>
                  <input
                    id="editLastName"
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white outline-none transition focus:border-white/20 focus:ring-4 focus:ring-white/10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-white/70" htmlFor="editEmail">
                  Email
                </label>
                <input
                  id="editEmail"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white outline-none transition focus:border-white/20 focus:ring-4 focus:ring-white/10"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm text-white/70" htmlFor="editPhone">
                    Phone
                  </label>
                  <input
                    id="editPhone"
                    type="number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white outline-none transition focus:border-white/20 focus:ring-4 focus:ring-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-white/70" htmlFor="editJobTitle">
                    Job title
                  </label>
                  <input
                    id="editJobTitle"
                    type="text"
                    name="job_title"
                    value={formData.job_title}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white outline-none transition focus:border-white/20 focus:ring-4 focus:ring-white/10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-white/70" htmlFor="editBio">
                  Bio
                </label>
                <input
                  id="editBio"
                  type="text"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white outline-none transition focus:border-white/20 focus:ring-4 focus:ring-white/10"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
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
    )
}
