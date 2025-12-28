import Modal from "../../template/Modal";
import { useProductForm } from "../../../context/ProductContext";

export default function ScheduleModal({ isOpen, onClose }) {
  const {
    scheduleDate,
    scheduleTime,
    setScheduleDateTime,
  } = useProductForm();

  return (
    <Modal isOpen={isOpen} title="Schedule publishing" onClose={onClose}>
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm text-white/70" htmlFor="scheduleDate">
            Date
          </label>
          <input
            id="scheduleDate"
            type="date"
            value={scheduleDate}
            onChange={(event) =>
              setScheduleDateTime(event.target.value, scheduleTime)
            }
            className="h-10 w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 text-sm text-white outline-none transition focus:border-white/30 focus:ring-2 focus:ring-white/20"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-white/70" htmlFor="scheduleTime">
            Time
          </label>
          <input
            id="scheduleTime"
            type="time"
            value={scheduleTime}
            onChange={(event) =>
              setScheduleDateTime(scheduleDate, event.target.value)
            }
            className="h-10 w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 text-sm text-white outline-none transition focus:border-white/30 focus:ring-2 focus:ring-white/20"
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white/70 transition hover:border-white/20 hover:text-white"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-white/90"
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
}
