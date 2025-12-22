import LeftIntro from "../../template/LeftIntro";
import BackgroundAnimation from "../../template/BackgroundAnimation";
import CardForm from "../../template/CardForm";
import FormResetPassword from "./FormResetPassword";

export default function ResetPassword() {
  
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <BackgroundAnimation/>

      <div className="relative mx-auto grid min-h-screen w-full max-w-6xl items-center gap-12 px-4 py-12 lg:grid-cols-2">
        {/* Left intro */}
        <LeftIntro
          badge="Reset your password"
          title="Set a new password"
          subtitle="Choose something strong and unique."
          description="Your new password should be
            at least 8 characters."
          hasCard={false}
        />

        {/* Card */}
        <CardForm title="Reset access" subtitle="Create a new password" paragraph="Enter and confirm your new password.">
            <FormResetPassword/>
        </CardForm>
      </div>
    </div>
  );
}
