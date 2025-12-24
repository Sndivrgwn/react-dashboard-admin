import Modal from "../../../template/Modal";

export default function NotificationsModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} title="Manage notifications" onClose={onClose}>
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <label className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80">
          Product updates
          <input type="checkbox" className="h-4 w-4" defaultChecked />
        </label>
        <label className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80">
          Security alerts
          <input type="checkbox" className="h-4 w-4" defaultChecked />
        </label>
        <label className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80">
          Weekly summary
          <input type="checkbox" className="h-4 w-4" />
        </label>
        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white/70 transition hover:border-white/20 hover:text-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={onClose}
            className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-white/90"
          >
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
}
