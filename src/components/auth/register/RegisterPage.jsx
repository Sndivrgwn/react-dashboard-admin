import LeftIntro from "../../template/LeftIntro";
import BackgroundAnimation from "../../template/BackgroundAnimation";
import CardForm from "../../template/CardForm";
import FormRegister from "./FormRegister";

export default function Register() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <BackgroundAnimation/>
      <div className="relative mx-auto grid min-h-screen w-full max-w-6xl items-center gap-12 px-4 py-12 lg:grid-cols-2">
        {/* Left intro */}
        <LeftIntro
          badge="Create your space"
          title=" Start building today"
          subtitle="Your account is one step away."
          description="Set up your profile, manage projects, and collaborate with your team
            in one focused workspace."
          cardTitle1="No clutter"
          cardTitle2="Fast setup"
          cardDesc1="Clean, quiet UI"
          cardDesc2="Ready in minutes"
        />

        {/* Card */}

        <CardForm
          title="Get started"
          subtitle="Create your account"
          paragraph="Use a real email to receive updates."
        >
          <FormRegister />
        </CardForm>
      </div>
    </div>         
  );
}
