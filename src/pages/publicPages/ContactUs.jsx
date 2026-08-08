import { Mail, MessageCircle, MapPin } from "lucide-react";
export default function ContactUs() {
  return (
    <main>
      <section className="public-hero py-20 text-center sm:py-28">
        <div className="page-wrap">
          <p className="section-eyebrow">SAY HELLO</p>
          <h1 className="mt-4 font-serif text-5xl tracking-tight text-slate-900 sm:text-6xl">
            We’d love to hear
            <br />
            <em className="text-indigo-600">what’s on your mind.</em>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-slate-600">
            Questions, ideas, a friendly hello—our door is always open.
          </p>
        </div>
      </section>
      <section className="page-wrap grid gap-12 py-18 lg:grid-cols-[.75fr_1.25fr] lg:py-24">
        <div>
          <p className="section-eyebrow">GET IN TOUCH</p>
          <h2 className="section-title mt-4">Let’s start a conversation.</h2>
          <div className="mt-9 space-y-6">
            {[
              [Mail, "Email us", "hello@langipages.com"],
              [
                MessageCircle,
                "Community support",
                "We usually reply within a day",
              ],
              [MapPin, "Based in", "Sylhet, Bangladesh"],
            ].map(([Icon, title, text]) => (
              <div className="flex gap-4" key={title}>
                <span className="feature-icon shrink-0 bg-indigo-50 text-indigo-600">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold text-slate-800">{title}</p>
                  <p className="mt-1 text-sm text-slate-500">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <form className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/35 sm:p-9">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="form-label">
              First name
              <input placeholder="Your first name" />
            </label>
            <label className="form-label">
              Last name
              <input placeholder="Your last name" />
            </label>
          </div>
          <label className="form-label mt-5">
            Email address
            <input type="email" placeholder="you@example.com" />
          </label>
          <label className="form-label mt-5">
            What can we help with?
            <select defaultValue="">
              <option value="" disabled>
                Select a topic
              </option>
              <option>General question</option>
              <option>Community support</option>
              <option>Partnership</option>
            </select>
          </label>
          <label className="form-label mt-5">
            Your message
            <textarea rows="5" placeholder="Tell us a little more..." />
          </label>
          <button
            className="action-button action-button-primary mt-6 w-full"
            type="button"
          >
            Send message
          </button>
        </form>
      </section>
    </main>
  );
}
