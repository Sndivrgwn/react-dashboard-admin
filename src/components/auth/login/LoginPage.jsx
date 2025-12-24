import BackgroundAnimation from "../../template/BackgroundAnimation";
import CardForm from "../../template/CardForm";
import LeftIntro from "../../template/LeftIntro";
import FormLogin from "./FormLogin";

export default function Login() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <BackgroundAnimation/>
      <div className="relative mx-auto grid min-h-screen w-full max-w-6xl items-center gap-12 px-4 py-12 lg:grid-cols-2">
        {/* Left intro */}
        <LeftIntro
          badge="Secure Access"
          title="Welcome Back"
          subtitle="Sign in to keep building."
          description="A clean, focused space to manage your projects, teams, and releases
        without distractions."
          cardTitle1="256-bit"
          cardTitle2="24/7"
          cardDesc1="Encrypted sessions"
          cardDesc2="Account monitoring"
        />

        {/* Card */}
        <CardForm
          title="Welcome back"
          subtitle="Sign in to your account"
          paragraph="Enter your email and password below."
        >
          <FormLogin />
        </CardForm>
      </div>
    </div>
  );
}
