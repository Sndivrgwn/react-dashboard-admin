export default function BackgroundAnimation() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="glow-pulse absolute -left-28 -top-28 h-[28rem] w-[28rem] rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="glow-pulse absolute -bottom-36 right-0 h-[30rem] w-[30rem] rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_45%)]" />
    </div>
  );
}
