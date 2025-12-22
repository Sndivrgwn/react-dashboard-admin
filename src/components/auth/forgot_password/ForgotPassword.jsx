import LeftIntro from "../../template/LeftIntro";
import BackgroundAnimation from "../../template/BackgroundAnimation";
import CardForm from "../../template/CardForm";
import FormForgetPassword from "./FormForget";

export default function ForgotPassword() {
  

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <BackgroundAnimation/>

      <div className="relative mx-auto grid min-h-screen w-full max-w-6xl items-center gap-12 px-4 py-12 lg:grid-cols-2">
        {/* Left intro */}
        <LeftIntro
          badge="Account recovery"
          title="Forgot your password?"
          subtitle="We will help you reset it."
          description="Enter your email and we'll send a reset link."
          hasCard={false}
        />

        {/* Card */}
        <CardForm title="Reset access" subtitle="Send reset link" paragraph="We&apos;ll email you a link to reset your password.">
            <FormForgetPassword/>
        </CardForm>
      </div>
    </div>
  );
}
