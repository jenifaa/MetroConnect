import { Link } from "react-router";
import {
  ArrowRight,
  Heart,
  Lightbulb,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "People before metrics",
    text: "People are never just engagement numbers. We design MetroConnect around meaningful interactions, genuine belonging, and real community.",
  },
  {
    icon: Lightbulb,
    title: "Curiosity drives growth",
    text: "Great communities make room for questions, different perspectives, new ideas, and the freedom to learn from one another.",
  },
  {
    icon: Users,
    title: "Everyone has a seat",
    text: "Whether you're asking your first question or sharing something you've learned, MetroConnect makes participation feel natural.",
  },
];

const features = [
  {
    icon: MessageCircle,
    title: "Meaningful conversations",
    text: "Ask questions, share experiences, and start conversations that actually matter.",
  },
  {
    icon: ShieldCheck,
    title: "A trusted community",
    text: "A community designed around respectful interaction and a safer digital environment.",
  },
  {
    icon: Users,
    title: "Built together",
    text: "MetroConnect grows through the ideas, experiences, and contributions of its members.",
  },
];

export default function AboutUs() {
  return (
    <main className="overflow-hidden bg-white">
      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative isolate overflow-hidden bg-slate-50">
        {/* Background decoration */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 -top-75 h-162.5 w-162.5 -translate-x-1/2 rounded-full bg-indigo-100/70 blur-3xl" />

          <div className="absolute -left-48 top-1/2 h-96 w-96 rounded-full bg-violet-100/50 blur-3xl" />

          <div className="absolute -right-48 bottom-0 h-96 w-96 rounded-full bg-blue-100/50 blur-3xl" />

          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "radial-gradient(#475569 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
        </div>

        <div className="mx-auto max-w-7xl px-5 pb-28 pt-24 sm:px-8 sm:pb-36 sm:pt-32 lg:px-10 lg:pb-44 lg:pt-40">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white px-4 py-2 text-xs font-semibold tracking-wide text-indigo-600 shadow-sm">
              <Sparkles className="h-3.5 w-3.5" />
              OUR STORY
            </div>

            <h1 className="mt-8 text-5xl font-bold leading-[1.05] tracking-[-0.04em] text-slate-950 sm:text-6xl lg:text-7xl">
              Building a community
              <span className="block bg-linear-to-r from-indigo-600 via-violet-600 to-indigo-500 bg-clip-text text-transparent">
                worth coming back to.
              </span>
            </h1>

            <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              MetroConnect was created with a simple idea: university life is
              better when people have a place to connect, ask questions, share
              experiences, and help each other grow.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/register"
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 px-7 text-sm font-semibold text-white shadow-lg shadow-slate-950/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-600 hover:shadow-xl hover:shadow-indigo-600/20"
              >
                Join MetroConnect
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <a
                href="#our-story"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-7 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
              >
                Discover our story
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          STORY
      ====================================================== */}
      <section
        id="our-story"
        className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32 lg:px-10 lg:py-40"
      >
        <div className="grid items-center gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          {/* Visual */}
          <div className="relative">
            <div className="absolute -left-6 -top-6 h-32 w-32 rounded-full bg-indigo-100 blur-2xl" />

            <div className="relative overflow-hidden rounded-[2.5rem] bg-linear-to-br from-indigo-500 via-violet-500 to-blue-600 p-2 shadow-2xl shadow-indigo-950/15">
              <div className="rounded-[2.2rem] border border-white/20 bg-white/10 p-8 backdrop-blur-sm sm:p-10">
                <div className="flex min-h-105 flex-col justify-between">
                  <div>
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-xl font-bold text-indigo-600 shadow-lg">
                      M
                    </div>

                    <p className="mt-10 max-w-sm text-3xl font-bold leading-tight text-white sm:text-4xl">
                      Build a place you would want to return to.
                    </p>
                  </div>

                  <div>
                    <div className="mb-6 h-px bg-white/20" />

                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-sm font-semibold text-white">
                          MetroConnect
                        </p>
                        <p className="mt-1 text-xs text-indigo-100">
                          Our founding principle
                        </p>
                      </div>

                      <p className="font-mono text-xs text-indigo-100">
                        2026
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating card */}
            <div className="absolute -bottom-7 -right-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl sm:-right-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <Users className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-sm font-bold text-slate-900">
                    Built for students
                  </p>
                  <p className="text-xs text-slate-500">
                    Together, not alone.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-indigo-600">
              WHY WE EXIST
            </p>

            <h2 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-slate-950 sm:text-5xl">
              University life is more than classrooms and assignments.
            </h2>

            <div className="mt-7 space-y-5 text-base leading-8 text-slate-600 sm:text-lg">
              <p>
                Students constantly have questions, ideas, experiences, and
                opportunities worth sharing. But finding the right people and
                the right place to share them isn't always easy.
              </p>

              <p>
                MetroConnect brings those conversations together in one
                community built specifically around student life. It gives
                people a place to ask for help, share knowledge, discover
                events, report issues, and connect with others.
              </p>

              <p>
                Our goal isn't to create another noisy social network. It's to
                create a digital space that feels useful, welcoming, and
                genuinely connected to university life.
              </p>
            </div>

            <div className="mt-9 flex items-center gap-3">
              <div className="h-px w-10 bg-indigo-600" />
              <span className="text-sm font-semibold text-slate-700">
                Connection should feel natural.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          STATS
      ====================================================== */}
      <section className="border-y border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
          <div className="grid gap-10 text-center sm:grid-cols-3">
            <div>
              <p className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
                01
              </p>
              <p className="mt-3 text-sm font-medium text-slate-500">
                Community-first platform
              </p>
            </div>

            <div className="border-slate-200 sm:border-x">
              <p className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
                ∞
              </p>
              <p className="mt-3 text-sm font-medium text-slate-500">
                Ideas worth sharing
              </p>
            </div>

            <div>
              <p className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
                24/7
              </p>
              <p className="mt-3 text-sm font-medium text-slate-500">
                A place to connect
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          VALUES
      ====================================================== */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32 lg:px-10 lg:py-40">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold tracking-[0.2em] text-indigo-600">
            WHAT GUIDES US
          </p>

          <h2 className="mt-5 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            The values we come back to.
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-500 sm:text-lg">
            Everything we build starts with the people who use MetroConnect.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {values.map(({ icon: Icon, title, text }) => (
            <article
              key={title}
              className="group rounded-3xl border border-slate-200 bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:border-indigo-100 hover:shadow-2xl hover:shadow-indigo-950/5 sm:p-9"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 transition duration-300 group-hover:bg-indigo-600 group-hover:text-white">
                <Icon className="h-5 w-5" />
              </div>

              <h3 className="mt-7 text-xl font-bold text-slate-900">
                {title}
              </h3>

              <p className="mt-4 text-sm leading-7 text-slate-500 sm:text-base">
                {text}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* =====================================================
          FEATURES / DIFFERENCE
      ====================================================== */}
      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32 lg:px-10 lg:py-40">
          <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
            <div>
              <p className="text-xs font-bold tracking-[0.2em] text-indigo-400">
                MORE THAN A PLATFORM
              </p>

              <h2 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
                Designed around the way communities actually work.
              </h2>

              <p className="mt-6 text-base leading-8 text-slate-400 sm:text-lg">
                MetroConnect brings together the everyday moments that make
                university communities valuable — questions, ideas,
                conversations, events, and shared experiences.
              </p>
            </div>

            <div className="grid gap-5">
              {features.map(({ icon: Icon, title, text }) => (
                <div
                  key={title}
                  className="group flex gap-5 rounded-3xl border border-white/10 bg-white/4 p-6 transition hover:border-white/20 hover:bg-white/[0.07] sm:p-7"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400">
                    <Icon className="h-5 w-5" />
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {title}
                    </h3>

                    <p className="mt-2 text-sm leading-7 text-slate-400">
                      {text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          COMMUNITY QUOTE
      ====================================================== */}
      <section className="mx-auto max-w-5xl px-5 py-28 text-center sm:px-8 sm:py-36">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
          <MessageCircle className="h-6 w-6" />
        </div>

        <blockquote className="mt-8 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl">
          “A strong community isn't built by having more people.
          <span className="text-indigo-600">
            {" "}
            It's built by helping people feel that they belong.
          </span>
          ”
        </blockquote>

        <p className="mt-7 text-sm font-medium text-slate-500">
          The idea behind MetroConnect
        </p>
      </section>

      {/* =====================================================
          CTA
      ====================================================== */}
      <section className="relative overflow-hidden bg-linear-to-br from-indigo-600 via-violet-600 to-indigo-700">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-4xl px-5 py-24 text-center sm:px-8 sm:py-32">
          <p className="text-xs font-bold tracking-[0.2em] text-indigo-100">
            YOUR COMMUNITY IS WAITING
          </p>

          <h2 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Come make MetroConnect yours.
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-indigo-100 sm:text-lg">
            Ask something. Share something. Meet someone. Start with a single
            conversation.
          </p>

          <Link
            to="/register"
            className="group mt-9 inline-flex h-13 items-center gap-2 rounded-xl bg-white px-7 text-sm font-bold text-indigo-600 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
          >
            Join the community
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </main>
  );
}