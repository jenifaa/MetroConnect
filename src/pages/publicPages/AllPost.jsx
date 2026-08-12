import { Link } from "react-router";
import { ArrowRight, Search } from "lucide-react";
const stories = [
  "The little rituals that make collaboration feel effortless",
  "How small communities create unusually big momentum",
  "Making room for deep work in a noisy world",
  "A field guide to asking better questions",
  "The magic of showing your work early",
  "Why a kind comment can change someone’s day",
];
export default function AllPost() {
  return (
    <main>
      <section className="public-hero py-18 sm:py-24">
        <div className="page-wrap">
          <p className="section-eyebrow">THE MetroConnect JOURNAL</p>
          <h1 className="mt-4 max-w-3xl font-serif text-5xl leading-tight tracking-tight text-slate-900 sm:text-6xl">
            Ideas for a more
            <br />
            <em className="text-indigo-600">connected life.</em>
          </h1>
          <div className="relative mt-8 max-w-md">
            <Search className="absolute left-4 top-3 h-4 w-4 text-slate-400" />
            <input
              className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none focus:border-indigo-400"
              placeholder="Search the journal"
            />
          </div>
        </div>
      </section>
      <section className="page-wrap py-16">
        <div className="flex flex-wrap gap-2">
          <button className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white">
            All stories
          </button>
          {["Community", "Creative work", "Wellbeing", "Learning"].map((x) => (
            <button
              key={x}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 hover:border-indigo-300"
            >
              {x}
            </button>
          ))}
        </div>
        <div className="mt-12 grid gap-x-7 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {stories.map((title, i) => (
            <article className="group" key={title}>
              <div
                className={`h-44 rounded-3xl bg-gradient-to-br ${["from-orange-100 to-rose-200", "from-sky-100 to-cyan-200", "from-violet-100 to-purple-200"][i % 3]} p-6`}
              >
                <span className="rounded-full bg-white/75 px-3 py-1 text-[10px] font-bold tracking-widest text-slate-600">
                  STORY {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-5 text-[11px] font-bold tracking-[.15em] text-indigo-600">
                {
                  ["CREATIVE WORK", "BETTER TOGETHER", "IDEAS & PRACTICE"][
                    i % 3
                  ]
                }{" "}
                <span className="mx-1 text-slate-300">•</span> MAY {24 - i},
                2026
              </p>
              <h2 className="mt-3 font-serif text-2xl leading-tight text-slate-900">
                {title}
              </h2>
              <Link
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-indigo-600"
                to="/posts"
              >
                Read story <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
