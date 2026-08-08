import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";
import { Link } from "react-router";

function HeroSection() {
  const conversations = [
    {
      initials: "NS",
      name: "Nadia Sultana",
      role: "Product designer",
      color: "bg-rose-400",
      text: "Looking for thoughtful feedback on a new onboarding flow.",
      tag: "Design critique",
    },
    {
      initials: "RA",
      name: "Rafi Ahmed",
      role: "Software engineer",
      color: "bg-violet-500",
      text: "Just shared a practical guide to cleaner API contracts.",
      tag: "Engineering",
    },
    {
      initials: "TM",
      name: "Tania Miah",
      role: "Community builder",
      color: "bg-amber-400",
      text: "Who is joining our remote coffee chat this Friday?",
      tag: "Community",
    },
  ];
  return (
    <div>
      <section className="hero-shell relative isolate">
        <div className="hero-orb hero-orb-one" />
        <div className="hero-orb hero-orb-two" />
        <div className="page-wrap grid items-center gap-14 pb-20 pt-18 lg:grid-cols-[1.02fr_.98fr] lg:pb-28 lg:pt-28">
          <div className="relative z-10">
            <div className="eyebrow-pill">
              <Sparkles className="h-3.5 w-3.5" /> A more human way to connect
            </div>
            <h1 className="hero-title mt-7">
              Where good people
              <br />
              <em>find their place.</em>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              MetroConnect brings curious people and meaningful conversations into
              one beautifully simple community.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                className="action-button action-button-primary"
                to="/register"
              >
                Join the community <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                className="action-button action-button-secondary"
                href="#how-it-works"
              >
                See how it works
              </a>
            </div>
            <div className="mt-10 flex items-center gap-4 text-sm text-slate-500">
              <div className="flex -space-x-2">
                {[
                  "bg-rose-400",
                  "bg-amber-400",
                  "bg-sky-400",
                  "bg-violet-400",
                ].map((c, i) => (
                  <span
                    key={c}
                    className={`grid h-8 w-8 place-items-center rounded-full border-2 border-white ${c} text-[10px] font-bold text-white`}
                  >
                    {["A", "M", "R", "S"][i]}
                  </span>
                ))}
              </div>
              <span>
                Already home to{" "}
                <b className="font-semibold text-slate-800">
                  12,000+ kind minds
                </b>
              </span>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-135 lg:mr-0">
            <div className="hero-sun" />
            <div className="community-window relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/80 p-4 shadow-2xl shadow-indigo-950/10 backdrop-blur sm:p-5">
              <div className="mb-5 flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-600 font-serif text-lg font-bold text-white">
                    L
                  </span>
                  <div>
                    <p className="font-semibold text-slate-900">The Commons</p>
                    <p className="text-xs text-slate-400">
                      A place for growing together
                    </p>
                  </div>
                </div>
                <div className="flex gap-1.5">
                  <i className="h-2 w-2 rounded-full bg-slate-200" />
                  <i className="h-2 w-2 rounded-full bg-slate-200" />
                </div>
              </div>
              <div className="space-y-3">
                {conversations.map((item) => (
                  <article key={item.name} className="post-preview">
                    <span
                      className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${item.color} text-xs font-semibold text-white`}
                    >
                      {item.initials}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-semibold text-slate-900">
                          {item.name}
                        </p>
                        <span className="text-[10px] text-slate-400">2h</span>
                      </div>
                      <p className="text-xs text-slate-400">{item.role}</p>
                      <p className="mt-2 text-sm leading-5 text-slate-600">
                        {item.text}
                      </p>
                      <span className="mt-2 inline-block rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-semibold text-indigo-600">
                        {item.tag}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-medium text-white">
                <MessageCircle className="h-4 w-4" /> Start a thoughtful
                conversation <ArrowRight className="ml-auto h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HeroSection;
