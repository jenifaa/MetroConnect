import { Quote, Star } from "lucide-react";

function Testimonial() {
  const testimonials = [
    {
      name: "Nusrat Jahan",
      role: "CSE Student",
      avatar: "https://i.pravatar.cc/150?img=47",
      text: "MetroConnect has made it much easier to stay connected with what's happening around campus. I can ask questions, find useful information, and communicate with other students in one place.",
    },
    {
      name: "Tanvir Ahmed",
      role: "BBA Student",
      avatar: "https://i.pravatar.cc/150?img=12",
      text: "I really like how organized the platform is. The announcement and community features help me keep track of important university updates without having to check multiple places.",
    },
    {
      name: "Fahim Rahman",
      role: "CSE Student",
      avatar: "https://i.pravatar.cc/150?img=33",
      text: "The community aspect is what I like most. Getting answers from other students and sharing experiences makes university life feel much more connected.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-background py-20 md:py-28">
      {/* Background decoration */}
      <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-muted/50 px-4 py-2 text-sm font-medium text-muted-foreground">
            <Star className="h-4 w-4 fill-primary text-primary" />
            Student Experiences
          </div>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Loved by the{" "}
            <span className="text-primary">MetroConnect</span> community
          </h2>

          <p className="mt-5 text-base leading-7 text-muted-foreground md:text-lg">
            See how students are using MetroConnect to stay informed,
            connected, and engaged with their university community.
          </p>
        </div>

        {/* Testimonials */}
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className={`group relative flex flex-col rounded-3xl border bg-card p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                index === 1
                  ? "border-primary/30 shadow-primary/5"
                  : ""
              }`}
            >
              {/* Quote Icon */}
              <div className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Quote className="h-5 w-5" />
              </div>

              {/* Rating */}
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-primary text-primary"
                  />
                ))}
              </div>

              {/* Testimonial */}
              <blockquote className="mt-6 flex-1 text-[15px] leading-7 text-muted-foreground">
                “{testimonial.text}”
              </blockquote>

              {/* Divider */}
              <div className="my-7 h-px bg-border" />

              {/* User */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="h-12 w-12 rounded-full border-2 border-background object-cover shadow-sm"
                />

                <div>
                  <h3 className="font-semibold text-foreground">
                    {testimonial.name}
                  </h3>

                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>

              {/* Hover accent */}
              <div className="absolute bottom-0 left-8 right-8 h-0.5 scale-x-0 rounded-full bg-primary transition-transform duration-300 group-hover:scale-x-100" />
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mx-auto mt-14 grid max-w-3xl grid-cols-2 divide-x rounded-3xl border bg-card p-6 shadow-sm md:grid-cols-3">
          <div className="px-4 text-center">
            <p className="text-2xl font-bold sm:text-3xl">5K+</p>
            <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
              Active Students
            </p>
          </div>

          <div className="px-4 text-center">
            <p className="text-2xl font-bold sm:text-3xl">10K+</p>
            <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
              Community Posts
            </p>
          </div>

          <div className="hidden px-4 text-center md:block">
            <p className="text-2xl font-bold sm:text-3xl">98%</p>
            <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
              Positive Feedback
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonial;