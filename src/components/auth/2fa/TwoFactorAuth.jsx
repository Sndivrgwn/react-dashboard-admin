import BackgroundAnimation from "../../template/BackgroundAnimation";
import ButtonSubmit from "../../template/form/ButtonSubmit";
import LeftIntro from "../../template/LeftIntro";

export default function TwoFactorAuth() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">

      <div className="relative mx-auto grid min-h-screen w-full max-w-6xl items-center gap-12 px-4 py-12 lg:grid-cols-2">
        {/* Left intro */}
        <LeftIntro 
            badge="Verification required"
            title="Enter your one-time code"
            subtitle="Check your email for a 6-digit OTP."
            description="We sent a verification code to your email. Enter it below to finish
            signing in."
            oneCard
            hasCard={false}
            cardTitle1="Didn&apos;t get the email? Check spam or request a new code."
        />

        {/* Card */}
        <div className="relative reveal reveal-delay-1">
          <div className="absolute -inset-0.5 rounded-[28px] bg-gradient-to-br from-white/10 via-transparent to-white/5 blur" />
          <div className="relative rounded-[26px] border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-black/40 backdrop-blur sm:p-8">
            <div className="mb-6">
              <div className="text-sm font-medium text-white/60">Two-factor</div>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
                Verify your email
              </h2>
              <p className="mt-1 text-sm text-white/60">
                Enter the 6-digit code below.
              </p>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <label htmlFor="otp" className="text-sm font-medium text-white/70">
                  One-time code
                </label>
                <input
                  id="otp"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="123456"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 outline-none transition focus:border-white/20 focus:ring-4 focus:ring-white/10"
                />
              </div>

              <ButtonSubmit text="Verifying..." title="Verify" />

              <div className="flex items-center justify-between text-sm text-white/60">
                <button
                  type="button"
                  className="cursor-pointer transition hover:text-white"
                >
                  Resend code
                </button>
                <button
                  type="button"
                  className="cursor-pointer transition hover:text-white"
                >
                  Change email
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
