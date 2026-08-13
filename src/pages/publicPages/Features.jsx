
import {
  BookOpen,
  CalendarDays,
  MessageSquare,
  Search,
  ShieldCheck,
  Users,
} from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Student Community",
    description:
      "Connect with Metropolitan University students, share ideas, ask questions, and build meaningful connections.",
  },
  {
    icon: MessageSquare,
    title: "Community Discussions",
    description:
      "Create posts, join conversations, comment on discussions, and stay connected with what matters on campus.",
  },
  {
    icon: BookOpen,
    title: "Academic Support",
    description:
      "Ask academic questions, share useful resources, and learn from fellow students across different departments.",
  },
  {
    icon: Search,
    title: "Lost & Found",
    description:
      "Report lost belongings or share found items to help students quickly reconnect with their valuable possessions.",
  },
  {
    icon: CalendarDays,
    title: "Events & Announcements",
    description:
      "Discover university events, activities, announcements, and important updates from the student community.",
  },
  {
    icon: ShieldCheck,
    title: "Safe & Trusted Community",
    description:
      "A student-focused environment designed to encourage respectful communication and meaningful participation.",
  },
];

function Features() {
  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-indigo-100/40 blur-3xl" />
        <div className="absolute -right-32 bottom-10 h-72 w-72 rounded-full bg-purple-100/40 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="mb-4 inline-flex items-center rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-600">
            Everything in one place
          </span>

          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Built for the{" "}
            <span className="bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              university community
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            MetroConnect brings students together in one platform to
            communicate, collaborate, discover opportunities, and stay
            connected with campus life.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group relative rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/40"
              >
                {/* Icon */}
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition-all duration-300 group-hover:bg-indigo-600 group-hover:text-white">
                  <Icon size={27} strokeWidth={1.8} />
                </div>

                {/* Content */}
                <h3 className="mb-3 text-xl font-semibold text-slate-900">
                  {feature.title}
                </h3>

                <p className="text-sm leading-7 text-slate-600">
                  {feature.description}
                </p>

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-7 right-7 h-0.5 origin-left scale-x-0 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 transition-transform duration-300 group-hover:scale-x-100" />
              </div>
            );
          })}
        </div>

        {/* Bottom CTA / Highlight */}
        <div className="mt-16 overflow-hidden rounded-3xl bg-slate-950 px-6 py-10 sm:px-10 lg:px-14 lg:py-12">
          <div className="flex flex-col items-center justify-between gap-8 text-center lg:flex-row lg:text-left">
            <div className="max-w-2xl">
              <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-indigo-400">
                One connected campus
              </p>

              <h3 className="text-2xl font-bold text-white sm:text-3xl">
                Your university community,{" "}
                <span className="text-indigo-400">all in one place.</span>
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-400 sm:text-base">
                From academic discussions to campus events, MetroConnect makes
                it easier for students to stay informed and connected.
              </p>
            </div>

            <button
              type="button"
              className="shrink-0 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition-all duration-300 hover:bg-indigo-50 hover:shadow-lg"
            >
              Explore MetroConnect
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;

