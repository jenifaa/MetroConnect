import { Link } from "react-router";
import { ArrowRight, Heart, Lightbulb, Users } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Care before metrics",
    text: "People are never an engagement number. We make choices that protect genuine belonging.",
  },
  {
    icon: Lightbulb,
    title: "Curiosity is generous",
    text: "The best conversations begin with room for different experiences, questions, and points of view.",
  },
  {
    icon: Users,
    title: "Everyone has a seat",
    text: "We create tools and rituals that make it easier to participate, not harder.",
  },
];
export default function AboutUs() {
  return (
    <main>
      <section className="public-hero py-20 sm:py-28">
        <div className="page-wrap text-center">
          <p className="section-eyebrow">OUR STORY</p>
          <h1 className="mx-auto mt-4 max-w-3xl font-serif text-5xl leading-tight tracking-tight text-slate-900 sm:text-6xl">
            The internet can feel
            <br />
            <em className="text-indigo-600">like a neighborhood again.</em>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Langipages started with a simple belief: the most valuable spaces
            online are the ones where people feel seen.
          </p>
        </div>
      </section>
      <section className="page-wrap grid gap-12 py-20 lg:grid-cols-[.9fr_1.1fr] lg:py-28">
        <div className="rounded-[2rem] bg-linear-to-br from-amber-100 via-rose-100 to-indigo-200 p-8">
          <div className="flex h-full min-h-72 flex-col justify-end rounded-3xl border border-white/50 bg-white/25 p-7">
            <p className="font-serif text-3xl leading-tight text-slate-800">
              “Build a place you would want to return to.”
            </p>
            <p className="mt-5 text-sm font-semibold text-slate-600">
              — Our founding note, 2024
            </p>
          </div>
        </div>
        <div className="self-center">
          <p className="section-eyebrow">WHY WE EXIST</p>
          <h2 className="section-title mt-4">
            Because connection deserves better design.
          </h2>
          <p className="mt-6 leading-8 text-slate-600">
            We were tired of platforms that rewarded noise over nuance. So we
            made a calmer, kinder space where communities can share ideas,
            celebrate progress, and learn from one another.
          </p>
          <p className="mt-4 leading-8 text-slate-600">
            Today, members from around the world use Langipages to make the
            internet feel a little smaller—and their worlds a little bigger.
          </p>
        </div>
      </section>
      <section className="bg-slate-50 py-20">
        <div className="page-wrap">
          <div className="text-center">
            <p className="section-eyebrow">WHAT GUIDES US</p>
            <h2 className="section-title mt-4">The values we come back to.</h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {values.map(({ icon: Icon, title, text }) => (
              <article className="feature-card" key={title}>
                <span className="feature-icon bg-indigo-50 text-indigo-600">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-7 text-xl font-semibold text-slate-900">
                  {title}
                </h3>
                <p className="mt-3 leading-7 text-slate-500">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="page-wrap py-20 text-center">
        <h2 className="section-title">Come make this place yours.</h2>
        <Link
          to="/register"
          className="action-button action-button-primary mt-7"
        >
          Join the community <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </main>
  );
}
