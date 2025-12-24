import axios from "axios";
import { useRef, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import Icon from "../../template/Icon";
import LoadingOverlay from "../../template/LoadingOverlay";

export default function ProfileSummary() {
  const { user, loading, fetchUser } = useAuth();
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const token = localStorage.getItem("token");
  const avatarSrc = user?.avatar
    ? user.avatar.startsWith("http")
      ? user.avatar
      : `http://127.0.0.1:8000/${
          user.avatar.startsWith("storage/") ? "" : "storage/"
        }${user.avatar}`
    : "";

  const handleAvatarClick = () => {
    if (isUploading) return;
    fileInputRef.current?.click();
  };

  const handleAvatarChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("avatar", file);
    setIsUploading(true);
    try {
      await axios.post("http://127.0.0.1:8000/api/user/avatar", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await fetchUser?.();
      
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  };
  
  console.log(user);
  if (loading) {
    return <div className="p-6 text-white/70">Loading...</div>;
  }
    return (
        <>
        {isUploading ? <LoadingOverlay message="Uploading avatar..." /> : null}
        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-black/40 backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={handleAvatarClick}
                className="relative rounded-full focus:outline-none focus:ring-4 focus:ring-white/10"
                aria-label="Edit profile photo"
              >
                {user?.avatar ? (
                  <img
                    src={avatarSrc}
                    alt={`${user?.first_name || "User"} avatar`}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-lg font-semibold text-white">
                    {`${user?.first_name?.[0] || "U"}${user?.last_name?.[0] || ""}`}
                  </div>
                )}
                <span className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-slate-950 text-white/70">
                  <Icon name="pencil" className="h-4 w-4" />
                </span>
                {isUploading ? (
                  <span className="absolute inset-0 rounded-full bg-black/40" />
                ) : null}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
              <div>
                <h2 className="text-lg font-semibold">{user?.first_name} {user?.last_name}</h2>
                <p className="text-sm text-white/60">
                  {user?.job_title || "job title"} &nbsp;|&nbsp; {user?.city_state || "City/State"}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/70 transition hover:border-white/20 hover:text-white">
                <Icon name="facebook" className="h-4 w-4" />
              </button>
              <button className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/70 transition hover:border-white/20 hover:text-white">
                <Icon name="x" className="h-4 w-4" />
              </button>
              <button className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/70 transition hover:border-white/20 hover:text-white">
                <Icon name="linkedin" className="h-4 w-4" />
              </button>
              <button className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/70 transition hover:border-white/20 hover:text-white">
                <Icon name="instagram" className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        </>
    )
}
