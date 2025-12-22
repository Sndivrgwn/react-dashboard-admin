import Profiledetails from "./ProfileDetails";
import ProfileSummary from "./ProfileSummary";

export default function Profile() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 text-white">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-white/50">Home</p>
          <h1 className="text-2xl font-semibold">Profile</h1>
        </div>
        <p className="text-sm text-white/50">Home / Profile</p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
        <h2 className="text-lg font-semibold mb-6">Profile</h2>

      <div className="space-y-6">
        <ProfileSummary />
        <Profiledetails />
      </div>
      </div>
    </div>
  );
}
