import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../../../context/AuthContext";
import Modal from "../../../template/Modal";

export default function AddressModal({isAddressEditOpen, setIsAddressEditOpen, onSuccess}) {
    const { user, fetchUser } = useAuth();
    const [formData, setFormData] = useState({
      country: "",
      city_state: "",
      postal_code: "",
      tax_id: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const token = localStorage.getItem("token")

    useEffect(() => {
      if (!user) return;
      setFormData({
        country: user.country || "",
        city_state: user.city_state || "",
        postal_code: user.postal_code || "",
        tax_id: user.tax_id || "",
      });
    }, [user, isAddressEditOpen]);

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
        setIsAddressEditOpen(false);
        onSuccess?.("Address updated.");
      } finally {
        setIsSubmitting(false);
      }
    };

    return(
        <Modal
            isOpen={isAddressEditOpen}
            title="Edit address"
            onClose={() => setIsAddressEditOpen(false)}
          >
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm text-white/70" htmlFor="editCountry">
                    Country
                  </label>
                  <input
                    id="editCountry"
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white outline-none transition focus:border-white/20 focus:ring-4 focus:ring-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-white/70" htmlFor="editCityState">
                    City/State
                  </label>
                  <input
                    id="editCityState"
                    type="text"
                    name="city_state"
                    value={formData.city_state}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white outline-none transition focus:border-white/20 focus:ring-4 focus:ring-white/10"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm text-white/70" htmlFor="editPostalCode">
                    Postal code
                  </label>
                  <input
                    id="editPostalCode"
                    type="text"
                    name="postal_code"
                    value={formData.postal_code}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white outline-none transition focus:border-white/20 focus:ring-4 focus:ring-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-white/70" htmlFor="editTaxId">
                    Tax ID
                  </label>
                  <input
                    id="editTaxId"
                    type="text"
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
                  onClick={() => setIsAddressEditOpen(false)}
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
