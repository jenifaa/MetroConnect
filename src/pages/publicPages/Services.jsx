
import {
  BookOpen,
  CalendarDays,
  FileText,
  HeartHandshake,
  MessageCircle,
  Search,
  ArrowUpRight,
} from "lucide-react";

const services = [
  {
    icon: BookOpen,
    title: "Academic Help",
    description:
      "Get academic support from fellow students by asking questions, sharing resources, and discussing courses.",
    link: "Explore Academic",
  },
  {
    icon: MessageCircle,
    title: "Student Discussions",
    description:
      "Start conversations, share opinions, and participate in discussions that matter to the university community.",
    link: "Join Discussions",
  },
  {
    icon: Search,
    title: "Lost & Found",
    description:
      "Report lost belongings or help others find their missing items through the university community.",
    link: "View Lost & Found",
  },
  {
    icon: CalendarDays,
    title: "Campus Events",
    description:
      "Discover upcoming university events, activities, programs, and opportunities happening around campus.",
    link: "Discover Events",
  },
  {
    icon: FileText,
    title: "Complaints & Feedback",
    description:
      "Share concerns, submit complaints, and provide feedback to help improve the student experience.",
    link: "Give Feedback",
  },
  {
    icon: HeartHandshake,
    title: "Community Support",
    description:
      "Connect with students, exchange knowledge, and build a stronger and more supportive university community.",
    link: "Connect Now",
  },
];

function Services() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-20 sm:py-24 lg:py-28">
      {/* Decorative Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-indigo-100/50 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-purple-100/40 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <span className="mb-4 inline-flex items-center rounded-full border border-indigo-100 bg-white px-4 py-2 text-sm font-semibold text-indigo-600 shadow-sm">
            What you can do
          </span>

          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Services designed for{" "}
            <span className="bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              student life
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            From academic support to campus events, MetroConnect gives
            students the tools they need to communicate, collaborate, and
            stay connected.
          </p>
        </div>

        {/* Services */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.title}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/50"
              >
                {/* Top Icon */}
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition-all duration-300 group-hover:bg-indigo-600 group-hover:text-white">
                    <Icon size={24} strokeWidth={1.8} />
                  </div>

                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition-all duration-300 group-hover:border-indigo-200 group-hover:bg-indigo-50 group-hover:text-indigo-600">
                    <ArrowUpRight size={17} />
                  </div>
                </div>

                {/* Content */}
                <h3 className="mb-3 text-xl font-semibold text-slate-900">
                  {service.title}
                </h3>

                <p className="mb-6 text-sm leading-7 text-slate-600">
                  {service.description}
                </p>

                {/* Link */}
                <button
                  type="button"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 transition-all duration-300 hover:gap-3"
                >
                  {service.link}
                  <ArrowUpRight size={16} />
                </button>

                {/* Hover Accent */}
                <div className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 bg-linear-to-r from-indigo-600 to-purple-600 transition-transform duration-300 group-hover:scale-x-100" />
              </div>
            );
          })}
        </div>

        {/* Bottom Section */}
        <div className="mt-14 flex flex-col items-center justify-between gap-6 rounded-2xl border border-indigo-100 bg-white p-6 shadow-sm sm:flex-row sm:p-8">
          <div>
            <h3 className="text-xl font-bold text-slate-900">
              Everything your campus community needs.
            </h3>

            <p className="mt-1 text-sm text-slate-600">
              Connect, communicate, and make university life easier with
              MetroConnect.
            </p>
          </div>

          <button
            type="button"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition-all duration-300 hover:bg-indigo-700 hover:shadow-xl"
          >
            Get Started
            <ArrowUpRight size={17} />
          </button>
        </div>
      </div>
    </section>
  );
}

export default Services;

