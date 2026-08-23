import { HelpCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function FAQSection() {
  const faqs = [
    {
      question: "What is MetroConnect?",
      answer:
        "MetroConnect is a university community platform designed to help students stay connected, informed, and engaged. Students can discover announcements, participate in discussions, share posts, report issues, and stay updated with university activities from one place.",
    },
    {
      question: "Who can use MetroConnect?",
      answer:
        "MetroConnect is primarily designed for students of Metropolitan University. Depending on their role, users can access different features and services across the platform.",
    },
    {
      question: "Can I create posts and interact with other students?",
      answer:
        "Yes. Students can create community posts, ask questions, share useful information, and interact with other students through comments and discussions.",
    },
    {
      question: "How can I report a university-related complaint?",
      answer:
        "You can submit a complaint through the complaints section of your dashboard. Depending on your preference, you may also be able to submit feedback anonymously.",
    },
    {
      question: "How will I receive important university announcements?",
      answer:
        "Important announcements are available through the announcements section of MetroConnect. You can also receive relevant notifications when new information is published.",
    },
    {
      question: "Can I edit or delete my posts?",
      answer:
        "Yes. You can manage your own posts from your dashboard. Depending on the status and permissions of the post, you can edit or remove content that you have created.",
    },
    {
      question: "Is my personal information secure?",
      answer:
        "MetroConnect is designed with user privacy and security in mind. Authentication, access control, and protected user information help ensure that your account and personal data are handled securely.",
    },
    {
      question: "I found a problem with the platform. What should I do?",
      answer:
        "If you encounter a technical issue or something isn't working as expected, you can report the problem through the appropriate feedback or support section so it can be reviewed.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-muted/20 py-20 md:py-28">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border bg-background px-4 py-2 text-sm font-medium text-muted-foreground shadow-sm">
            <HelpCircle className="h-4 w-4 text-primary" />
            Frequently Asked Questions
          </div>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Have questions?
            <span className="block text-primary">
              We've got answers.
            </span>
          </h2>

          <p className="mt-5 text-base leading-7 text-muted-foreground md:text-lg">
            Everything you need to know about MetroConnect and how it helps
            you stay connected with your university community.
          </p>
        </div>

        {/* FAQ Card */}
        <div className="mx-auto mt-12 max-w-4xl rounded-3xl border bg-card p-5 shadow-sm sm:p-8">
          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue="item-0"
          >
            {faqs.map((faq, index) => (
              <AccordionItem
                key={faq.question}
                value={`item-${index}`}
                className="border-b last:border-b-0"
              >
                <AccordionTrigger className="py-6 text-left text-sm font-semibold hover:no-underline sm:text-base">
                  <span className="pr-4">{faq.question}</span>
                </AccordionTrigger>

                <AccordionContent className="pb-6 pr-6 text-sm leading-7 text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Bottom CTA */}
        <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-3xl border bg-primary p-7 text-primary-foreground shadow-lg sm:p-10">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h3 className="text-xl font-bold sm:text-2xl">
                Still have questions?
              </h3>

              <p className="mt-2 max-w-xl text-sm leading-6 text-primary-foreground/80">
                Can't find what you're looking for? Join the MetroConnect
                community and get help from fellow students.
              </p>
            </div>

            <Link
              to="/register"
              className="group inline-flex shrink-0 items-center gap-2 rounded-xl bg-background px-5 py-3 text-sm font-semibold text-foreground shadow-sm transition-all hover:gap-3 hover:bg-background/90"
            >
              Join MetroConnect
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FAQSection;