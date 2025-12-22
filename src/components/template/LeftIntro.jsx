export default function LeftIntro({badge = "badge", title = "title", subtitle="subtitle", description="description", cardTitle1 = "cardtitle1" , cardTitle2 = "cardtitle2", cardDesc1="carddesc1", cardDesc2="carddesc2", hasCard=true, oneCard=false}) {
  return (
    <div className="reveal">
      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/70">
        <span className="h-2 w-2 rounded-full bg-emerald-400" />
        {badge}
      </div>
      <h1 className="mt-6 text-4xl font-semibold tracking-tight reveal-delay-1">
        {title}
        <span className="block text-white/60">{subtitle}</span>
      </h1>
      <p className="mt-4 max-w-md text-sm text-white/60 reveal-delay-2">
        {description}
      </p>

      {hasCard ? (<div className="mt-8 grid max-w-md grid-cols-2 gap-4 text-xs text-white/60 reveal-delay-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-white">{cardTitle1}</p>
          <p className="mt-1">{cardDesc1}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-white">{cardTitle2}</p>
          <p className="mt-1">{cardDesc2}</p>
        </div>
      </div>) : null}
      {oneCard ? (<div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-white/60">
            {cardTitle1}
          </div>) : null}
    </div>
  );
}
