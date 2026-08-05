import { Link } from "react-router";
import {
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Send,
} from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";



export default function Footer() {
  return (
    <footer className="border-t bg-background">
      {/* Top Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-5 md:grid-cols-2">

          {/* Company */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-3xl font-bold">
                Dev<span className="text-primary">Hub</span>
              </h2>

              <p className="mt-5 max-w-md text-muted-foreground leading-7">
                Build amazing web experiences with modern technologies.
                We help developers and businesses create scalable,
                beautiful, and high-performance applications.
              </p>
            </div>

            <div className="space-y-3">

              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">
                  Sylhet, Bangladesh
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">
                  +880 1234-567890
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">
                  hello@devhub.com
                </span>
              </div>

            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3">

              <li>
                <Link
                  to="/"
                  className="text-muted-foreground hover:text-primary transition"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  className="text-muted-foreground hover:text-primary transition"
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  to="/services"
                  className="text-muted-foreground hover:text-primary transition"
                >
                  Services
                </Link>
              </li>

              <li>
                <Link
                  to="/projects"
                  className="text-muted-foreground hover:text-primary transition"
                >
                  Projects
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="text-muted-foreground hover:text-primary transition"
                >
                  Contact
                </Link>
              </li>

            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-lg mb-5">
              Resources
            </h3>

            <ul className="space-y-3">

              <li>
                <Link
                  to="/blog"
                  className="text-muted-foreground hover:text-primary transition"
                >
                  Blog
                </Link>
              </li>

              <li>
                <Link
                  to="/docs"
                  className="text-muted-foreground hover:text-primary transition"
                >
                  Documentation
                </Link>
              </li>

              <li>
                <Link
                  to="/faq"
                  className="text-muted-foreground hover:text-primary transition"
                >
                  FAQ
                </Link>
              </li>

              <li>
                <Link
                  to="/support"
                  className="text-muted-foreground hover:text-primary transition"
                >
                  Support
                </Link>
              </li>

              <li>
                <Link
                  to="/careers"
                  className="text-muted-foreground hover:text-primary transition"
                >
                  Careers
                </Link>
              </li>

            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-lg mb-5">
              Newsletter
            </h3>

            <p className="text-muted-foreground mb-5">
              Subscribe to receive updates,
              articles, and exclusive content.
            </p>

            <div className="flex gap-2">
              <Input placeholder="Email Address" />

              <Button size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex gap-4 mt-8">

              <a href="#">
                <Facebook className="h-5 w-5 hover:text-primary transition" />
              </a>

              <a href="#">
                <Instagram className="h-5 w-5 hover:text-primary transition" />
              </a>

              <a href="#">
                <Github className="h-5 w-5 hover:text-primary transition" />
              </a>

              <a href="#">
                <Twitter className="h-5 w-5 hover:text-primary transition" />
              </a>

              <a href="#">
                <Linkedin className="h-5 w-5 hover:text-primary transition" />
              </a>

            </div>
          </div>

        </div>
      </div>

      {/* Middle Section */}
      <div className="border-y">
        <div className="container mx-auto px-6 py-10">

          <div className="grid gap-6 md:grid-cols-4 text-sm">

            <div>
              <h4 className="font-semibold mb-3">
                Company
              </h4>

              <ul className="space-y-2 text-muted-foreground">
                <li>Our Team</li>
                <li>Partners</li>
                <li>Investors</li>
                <li>Press</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">
                Products
              </h4>

              <ul className="space-y-2 text-muted-foreground">
                <li>Dashboard</li>
                <li>Analytics</li>
                <li>Integrations</li>
                <li>API</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">
                Legal
              </h4>

              <ul className="space-y-2 text-muted-foreground">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Cookies</li>
                <li>Licenses</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">
                Follow Us
              </h4>

              <p className="text-muted-foreground">
                Join our community and stay updated with
                the latest news and releases.
              </p>
            </div>

          </div>

        </div>
      </div>

      {/* Bottom */}
      <div className="container mx-auto px-6 py-6">

        <div className="flex flex-col gap-4 md:flex-row items-center justify-between">

          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} DevHub.
            All rights reserved.
          </p>

          <div className="flex gap-6 text-sm text-muted-foreground">

            <Link to="/privacy" className="hover:text-primary">
              Privacy
            </Link>

            <Link to="/terms" className="hover:text-primary">
              Terms
            </Link>

            <Link to="/cookies" className="hover:text-primary">
              Cookies
            </Link>

            <Link to="/sitemap" className="hover:text-primary">
              Sitemap
            </Link>

          </div>

        </div>

      </div>
    </footer>
  );
}