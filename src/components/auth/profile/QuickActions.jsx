import { useState } from "react";
import Logout from "../logout/ButtonLogout";
import QuickEditModal from "./modal/QuickEditModal";
import UpdatePasswordModal from "./modal/UpdatePasswordModal";
import NotificationsModal from "./modal/NotificationsModal";

export default function QuickActions({ onSuccess }) {
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isPasswordOpen, setIsPasswordOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

    return (
        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur">
            <h3 className="text-sm font-semibold text-white/80">
              Quick actions
            </h3>
            <div className="mt-4 grid gap-3 text-sm">
              <button
                type="button"
                onClick={() => setIsEditOpen(true)}
                className="cursor-pointer rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-white/80 transition hover:border-white/20 hover:bg-white/10"
              >
                Edit profile details
              </button>
              <button
                type="button"
                onClick={() => setIsPasswordOpen(true)}
                className="cursor-pointer rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-white/80 transition hover:border-white/20 hover:bg-white/10"
              >
                Update password
              </button>
              <button
                type="button"
                onClick={() => setIsNotificationsOpen(true)}
                className="cursor-pointer rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-white/80 transition hover:border-white/20 hover:bg-white/10"
              >
                Manage notifications
              </button>
              <Logout/>
            </div>

            <QuickEditModal
              isOpen={isEditOpen}
              onClose={() => setIsEditOpen(false)}
              onSuccess={onSuccess}
            />
            <UpdatePasswordModal isOpen={isPasswordOpen} onClose={() => setIsPasswordOpen(false)} />
            <NotificationsModal isOpen={isNotificationsOpen} onClose={() => setIsNotificationsOpen(false)} />
          </div>
    )
}
