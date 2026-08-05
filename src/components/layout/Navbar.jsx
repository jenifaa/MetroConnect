import { Link, NavLink } from "react-router";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";

import logo from "../../assets/logo/logo.png";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Features", path: "/features" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="w-10/12 mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="">
          <img src={logo} alt="MetroConnect Logo" className="w-14" />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `transition-colors hover:text-primary ${
                  isActive
                    ? "font-semibold text-primary"
                    : "text-muted-foreground"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" asChild>
            <Link to="/login">Login</Link>
          </Button>

          <Button asChild>
            <Link to="/register">Sign Up</Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-72">
            <div className="mt-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-lg transition-colors ${
                      isActive
                        ? "font-semibold text-primary"
                        : "text-muted-foreground"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}

              <div className="mt-6 flex flex-col gap-3">
                <Button variant="outline" asChild>
                  <Link to="/login">Login</Link>
                </Button>

                <Button asChild>
                  <Link to="/register">Sign Up</Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
