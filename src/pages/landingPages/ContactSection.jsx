import {
  ArrowRight,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

function ContactSection() {
  return (
    <section className="relative overflow-hidden bg-background py-20 md:py-28">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border bg-muted/50 px-4 py-2 text-sm font-medium text-muted-foreground">
            <MessageCircle className="h-4 w-4 text-primary" />
            Get in Touch
          </div>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Let's start a{" "}
            <span className="text-primary">conversation.</span>
          </h2>

          <p className="mt-5 text-base leading-7 text-muted-foreground md:text-lg">
            Have a question, suggestion, or need help with MetroConnect?
            Send us a message and our team will get back to you.
          </p>
        </div>

        {/* Main Contact Card */}
        <div className="mx-auto mt-14 max-w-6xl overflow-hidden rounded-3xl border bg-card shadow-xl">
          <div className="grid lg:grid-cols-5">
            {/* Contact Information */}
            <div className="relative overflow-hidden bg-primary p-7 text-primary-foreground sm:p-10 lg:col-span-2">
              {/* Decorative circles */}
              <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full border border-primary-foreground/10" />
              <div className="absolute -bottom-24 -left-20 h-56 w-56 rounded-full border border-primary-foreground/10" />

              <div className="relative">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold">
                    Contact Information
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-primary-foreground/75">
                    We're here to help you make the most out of your
                    MetroConnect experience.
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Email */}
                  <div className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-foreground/10">
                      <Mail className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="text-sm font-semibold">Email</p>
                      <p className="mt-1 text-sm text-primary-foreground/70">
                        support@metroconnect.com
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-foreground/10">
                      <Phone className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="text-sm font-semibold">Phone</p>
                      <p className="mt-1 text-sm text-primary-foreground/70">
                        +880 1XXX-XXXXXX
                      </p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-foreground/10">
                      <MapPin className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="text-sm font-semibold">Location</p>
                      <p className="mt-1 text-sm leading-6 text-primary-foreground/70">
                        Metropolitan University
                        <br />
                        Sylhet, Bangladesh
                      </p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-foreground/10">
                      <Clock3 className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="text-sm font-semibold">
                        Support Hours
                      </p>
                      <p className="mt-1 text-sm text-primary-foreground/70">
                        Saturday – Thursday
                        <br />
                        9:00 AM – 5:00 PM
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom message */}
                <div className="mt-10 rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 p-5">
                  <p className="text-sm font-medium">
                    Need help with something specific?
                  </p>

                  <p className="mt-2 text-xs leading-5 text-primary-foreground/65">
                    Tell us what you need and we'll make sure your message
                    reaches the right team.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="p-7 sm:p-10 lg:col-span-3">
              <div className="mb-8">
                <h3 className="text-2xl font-bold">
                  Send us a message
                </h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  Fill out the form below and we'll get back to you soon.
                </p>
              </div>

              <form className="space-y-5">
                {/* Name + Email */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>

                    <Input
                      id="name"
                      placeholder="Enter your name"
                      className="h-11 rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>

                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      className="h-11 rounded-xl"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>

                  <Input
                    id="subject"
                    placeholder="How can we help you?"
                    className="h-11 rounded-xl"
                  />
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>

                  <Textarea
                    id="message"
                    placeholder="Write your message here..."
                    className="min-h-[150px] resize-none rounded-xl"
                  />
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  size="lg"
                  className="group w-full rounded-xl sm:w-auto"
                >
                  Send Message
                  <Send className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                </Button>

                <p className="text-xs leading-5 text-muted-foreground">
                  By submitting this form, you agree to our terms and
                  understand that your information will only be used to
                  respond to your inquiry.
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mx-auto mt-10 flex max-w-6xl flex-col items-center justify-between gap-5 rounded-3xl border bg-muted/40 p-6 text-center sm:p-8 md:flex-row md:text-left">
          <div>
            <h3 className="font-semibold">
              Prefer talking with the community?
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              Join MetroConnect and connect with fellow students.
            </p>
          </div>

          <Button variant="outline" className="group rounded-xl">
            Explore Community
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;