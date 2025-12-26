import Icon from "../../template/Icon";
import { useProductForm } from "../../../context/ProductContext";

export default function PublishingCard({ onOpenSchedule }) {
  const {
    form,
    scheduleOption,
    isSubmitting,
    setVisibility,
    setSchedule,
    setChannel,
      scheduleDate,
      scheduleTime,
      submitProduct,
  } = useProductForm();
  const isPublic = form.visibility === "public";
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-black/20 backdrop-blur">
      <h2 className="text-base font-semibold text-white">Publishing</h2>
      <div className="mt-4 space-y-4 text-sm text-white/60">
        <div className="space-y-2">
          <span className="text-xs uppercase tracking-wide text-white/40">
            Visibility
          </span>
          <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2">
            <span className="text-white/70">
              {isPublic ? "Public" : "Private"}
            </span>
            <button
              type="button"
              onClick={() => setVisibility(!isPublic)}
              aria-pressed={isPublic}
              className={[
                "relative h-6 w-11 rounded-full border transition",
                isPublic
                  ? "border-emerald-400/40 bg-emerald-400/20"
                  : "border-white/20 bg-white/10",
              ].join(" ")}
            >
              <span
                className={[
                  "absolute top-0.5 h-5 w-5 rounded-full bg-white transition",
                  isPublic ? "right-0.5" : "left-0.5",
                ].join(" ")}
              />
            </button>
          </div>
        </div>
        <div className="space-y-2">
          <span className="text-xs uppercase tracking-wide text-white/40">
            Schedule
          </span>
          <div className="relative">
            <select
              id="schedule"
              value={scheduleOption}
              onChange={(event) => {
                const nextValue = event.target.value;
                setSchedule(nextValue);
                if (nextValue === "Schedule") {
                  onOpenSchedule();
                }
              }}
              className="h-11 w-full appearance-none rounded-xl border border-white/10 bg-slate-950/60 px-4 pr-10 text-white outline-none transition focus:border-white/20 focus:ring-4 focus:ring-white/10"
            >
              <option value="Immediately">Immediately</option>
              <option value="Schedule">Schedule</option>
              <option value="Draft only">Draft only</option>
            </select>
            <Icon
              name="chevron-down"
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60"
            />
          </div>
          {scheduleOption === "Schedule" && (scheduleDate || scheduleTime) ? (
            <p className="text-xs text-white/50">
              Scheduled for {scheduleDate || "date"} {scheduleTime || ""}
            </p>
          ) : null}
        </div>
        <div className="space-y-2">
          <span className="text-xs uppercase tracking-wide text-white/40">
            Channel
          </span>
          <div className="relative">
            <select
              id="channel"
              value={form.channel}
              onChange={(event) => setChannel(event.target.value)}
              className="h-11 w-full appearance-none rounded-xl border border-white/10 bg-slate-950/60 px-4 pr-10 text-white outline-none transition focus:border-white/20 focus:ring-4 focus:ring-white/10"
            >
              <option value="online">Online</option>
              <option value="offline">Offline</option>
            </select>
            <Icon
              name="chevron-down"
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60"
            />
          </div>
        </div>
      </div>
      <div className="mt-6 flex flex-col gap-2">
        <button
          type="button"
          disabled={isSubmitting}
          onClick={() => submitProduct({ statusOverride: "published" })}
          className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-white/90"
        >
          {isSubmitting ? "Publishing..." : "Publish Product"}
        </button>
        <button
          type="button"
          disabled={isSubmitting}
          onClick={() => submitProduct({ statusOverride: "draft" })}
          className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white/70 transition hover:border-white/20 hover:text-white"
        >
          Save draft
        </button>
      </div>
    </div>
  );
}
