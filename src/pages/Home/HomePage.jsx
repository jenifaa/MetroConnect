import { Link } from "react-router";
import {
  ArrowRight,
  BadgeCheck,
  Globe2,
  Heart,
  MessageCircle,
  ShieldCheck,
  Users,
} from "lucide-react";
import HeroSection from "../landingPages/HeroSection";
import FeedPage from "../community/FeedPage";
import FAQSection from "../landingPages/FAQSection";
import ContactSection from "../landingPages/ContactSection";
import Testimonial from "../landingPages/Testimonial";

const features = [
  {
    icon: Users,
    title: "Find your people",
    text: "Discover thoughtful communities and peers who share your interests, ambitions, and curiosity.",
  },
  {
    icon: MessageCircle,
    title: "Conversations that matter",
    text: "A calm space for ideas, questions, and the kind of exchange that moves work forward.",
  },
  {
    icon: ShieldCheck,
    title: "Built on trust",
    text: "Clear community standards and practical controls help every member feel welcome and safe.",
  },
];

const posts = [
  {
    category: "CREATIVE WORK",
    date: "May 24, 2026",
    title: "The little rituals that make collaboration feel effortless",
    author: "Aisha Rahman",
    read: "6 min read",
    hue: "from-orange-100 via-rose-100 to-pink-200",
  },
  {
    category: "BETTER TOGETHER",
    date: "May 17, 2026",
    title: "How small communities create unusually big momentum",
    author: "Nafis Chowdhury",
    read: "4 min read",
    hue: "from-sky-100 via-cyan-100 to-teal-200",
  },
  {
    category: "IDEAS & PRACTICE",
    date: "May 10, 2026",
    title: "Making room for deep work in a noisy world",
    author: "Sabrina Islam",
    read: "5 min read",
    hue: "from-violet-100 via-fuchsia-100 to-purple-200",
  },
];

function SectionHeading({ eyebrow, title, copy, centered = true }) {
  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-xl"}>
      <p className="section-eyebrow">{eyebrow}</p>
      <h2 className="section-title mt-4">{title}</h2>
      {copy && <p className="section-copy mt-5">{copy}</p>}
    </div>
  );
}

function HomePage() {
  return (
    <main className="overflow-hidden">
      <HeroSection></HeroSection>

      <section id="how-it-works" className="page-wrap py-22 lg:py-30">
        <SectionHeading
          eyebrow="BUILT FOR BELONGING"
          title="A quieter corner of the internet."
          copy="Less noise, more connection. Langipages gives every idea room to breathe—and every person a way in."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {features.map(({ icon: Icon, title, text }, i) => (
            <article className="feature-card" key={title}>
              <span className={`feature-icon feature-${i}`}>
                <Icon className="h-5 w-5" />
              </span>
              <p className="mt-7 text-xl font-semibold tracking-tight text-slate-900">
                {title}
              </p>
              <p className="mt-3 leading-7 text-slate-500">{text}</p>
              <span className="mt-7 inline-flex items-center gap-1 text-sm font-semibold text-indigo-600">
                Explore <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-slate-950 py-22 text-white lg:py-30">
        <div className="page-wrap grid items-center gap-14 lg:grid-cols-2">
          <div>
            <p className="section-eyebrow text-indigo-300">
              THE MetroConnect DIFFERENCE
            </p>
            <h2 className="mt-4 max-w-lg font-serif text-4xl leading-tight sm:text-5xl">
              Connection is more than a click.
            </h2>
            <p className="mt-6 max-w-lg leading-8 text-slate-300">
              We designed Langipages around the things that make a community
              last: shared purpose, generous voices, and the freedom to show up
              as yourself.
            </p>
            <Link
              className="action-button mt-8 bg-white text-slate-950 hover:bg-indigo-50"
              to="/about"
            >
              Our approach <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-3xl bg-white/10 p-6 backdrop-blur">
              <Globe2 className="h-6 w-6 text-amber-300" />
              <p className="mt-10 font-serif text-4xl">36</p>
              <p className="mt-2 text-sm text-slate-300">
                countries represented
              </p>
            </div>
            <div className="mt-8 rounded-3xl bg-indigo-500 p-6">
              <Heart className="h-6 w-6 text-indigo-100" />
              <p className="mt-10 font-serif text-4xl">94%</p>
              <p className="mt-2 text-sm text-indigo-100">
                feel more connected
              </p>
            </div>
            <div className="col-span-2 rounded-3xl border border-white/10 p-6">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-amber-300 text-slate-950">
                  <BadgeCheck className="h-5 w-5" />
                </div>
                <p className="text-lg font-medium">
                  “It feels like the internet at its best.”
                </p>
              </div>
              <p className="mt-3 pl-14 text-sm text-slate-400">
                — Mira, member since 2024
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="page-wrap py-22 lg:py-30">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="FROM THE JOURNAL"
            title="Good things to linger over."
            centered={false}
          />
          <Link
            to="/posts"
            className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600"
          >
            Read all stories <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-12 grid gap-7 lg:grid-cols-3">
          {posts.map((post, i) => (
            <article key={post.title} className="group">
              <div
                className={`relative h-52 overflow-hidden rounded-3xl bg-linear-to-br ${post.hue} p-6 transition duration-500 group-hover:-translate-y-1`}
              >
                <div className="absolute -right-8 -top-10 h-40 w-40 rounded-full border-18 border-white/55" />
                <div className="absolute bottom-7 left-7 h-20 w-20 rounded-full bg-white/45" />
                <span className="relative rounded-full bg-white/70 px-3 py-1 text-[10px] font-bold tracking-widest text-slate-700">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-6 text-[11px] font-bold tracking-[.16em] text-indigo-600">
                {post.category} <span className="mx-2 text-slate-300">•</span>{" "}
                {post.date}
              </p>
              <h3 className="mt-3 font-serif text-2xl leading-tight text-slate-900">
                {post.title}
              </h3>
              <p className="mt-4 text-sm text-slate-500">
                By {post.author} <span className="mx-1">·</span> {post.read}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-wrap pb-22 lg:pb-30">
        <div className="cta-panel relative overflow-hidden rounded-[2rem] bg-indigo-600 px-7 py-14 text-center text-white sm:px-12">
          <div className="absolute -left-20 -top-20 h-56 w-56 rounded-full bg-white/10" />
          <div className="absolute -bottom-28 -right-8 h-64 w-64 rounded-full border-36 border-white/10" />
          <div className="relative">
            <p className="section-eyebrow text-indigo-200">
              YOUR PLACE IS WAITING
            </p>
            <h2 className="mx-auto mt-4 max-w-2xl font-serif text-4xl leading-tight sm:text-5xl">
              Bring your curiosity. Find your people.
            </h2>
            <p className="mx-auto mt-5 max-w-xl leading-7 text-indigo-100">
              Join a community that leaves you feeling a little more inspired
              than when you arrived.
            </p>
            <Link
              to="/register"
              className="action-button mt-8 bg-white text-indigo-700 hover:bg-indigo-50"
            >
              Create your free account <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
      <FeedPage></FeedPage>
      <FAQSection></FAQSection>
      <ContactSection></ContactSection>
      <Testimonial></Testimonial>
    </main>
  );
}

export default HomePage;
