import { Link } from "react-router";

import { Button } from "../ui/button";

import logo from "../../assets/logo/logo.png";
import {
  authApi,
  useLogoutMutation,
  useUserInfoQuery,
} from "@/redux/features/auth/auth.api";
import { useAppDispatch } from "@/redux/hook";

import { ModeToggle } from "./MoodToggler";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const navLinks = [
  { to: "/", label: "Home", role: "PUBLIC" },
  { to: "/about", label: "About", role: "PUBLIC" },
  { to: "/features", label: "Features", role: "PUBLIC" },
  { to: "/services", label: "Services", role: "PUBLIC" },

  { to: "/contact", label: "Contact", role: "PUBLIC" },
  {
    to: "/all-posts",
    label: "All Posts",
    role: "USER",
  },
  { to: "/admin", label: "Dashboard", role: "ADMIN" },
  { to: "/admin", label: "Dashboard", role: "SUPER_ADMIN" },
  { to: "/user", label: "Dashboard", role: "USER" },
];

export default function Navbar() {
  const { data } = useUserInfoQuery(undefined);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();


  const userRole = data?.data?.role;

  const handleLogout = async () => {
    try {
      await logout(undefined).unwrap();
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      dispatch(authApi.util.resetApiState());
      // navigate("/login");
    } catch (error) {
      console.log("Logout failed:", error);
    }
  };

  return (
    <header className="fixed  top-0 z-50 w-full transition-all duration-300 ">
      <div className="container w-11/12 mx-auto flex h-16 items-center justify-between px-4 lg:px-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md"
          >
            <img
              src={logo}
              alt="Logo"
              className="h-10 w-10 object-contain"
            />
          </Link>

          <div>
            <h1 className="text-black font-semibold tracking-tight">
              Metro
              <span className="bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent font-extrabold tracking-tight">
                Connect
              </span>{" "}
            </h1>
           
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex ">
          {navLinks
            .filter((link) => link.role === "PUBLIC" || link.role === userRole)
            .map((link, index) => (
              <Link
                key={index}
                to={link.to}
                className="rounded-lg px-4 py-2 text-sm font-medium text-black transition-all duration-200 hover:bg-muted hover:text-black dark:text-black dark:hover:text-black"
              >
                {link.label}
              </Link>
            ))}
        </nav>

        {/* Actions */}
        <div className="hidden items-center gap-3 lg:flex">
          {data?.data?.email && (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <img
                    src={
                      data?.data?.picture ||
                      "https://i.ibb.co.com/xttK0CDW/pp.jpg"
                    }
                    className="w-10 h-10 rounded-full"
                    alt=""
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <Link to="/change-password">Change Password</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to="/profile">My Profile</Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem>Announcement</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                onClick={handleLogout}
                variant="outline"
                className="text-black"
              >
                LogOut
              </Button>
            </>
          )}

          {!data?.data?.email && (
            <>
              <Link
                to="/login"
                className="rounded-xl border px-4 py-2 text-sm font-medium transition hover:bg-muted hover:text-black"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-xl text-white bg-[#1F2340] px-5 py-2 text-sm font-medium  shadow-lg transition hover:opacity-90"
              >
                Get Started
              </Link>
            </>
          )}
          <ModeToggle />
        </div>

        {/* Mobile Menu */}
        <details className="relative lg:hidden">
          <summary className="flex gap-4 cursor-pointer list-none items-center rounded-xl border p-2 hover:bg-muted">
            {data?.data?.email && (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <img
                      src={
                        data?.data?.picture ||
                        "https://i.ibb.co.com/xttK0CDW/pp.jpg"
                      }
                      className="w-10 h-10 rounded-full"
                      alt=""
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuGroup>
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <Link to="/change-password">Change Password</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link to="/profile">My Profile</Link>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem>Announcement</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
            <ModeToggle />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </summary>

          <div className="absolute right-0 mt-3 w-72 rounded-2xl border bg-background p-4 shadow-2xl">
            <div className="flex flex-col gap-1">
              {navLinks
                .filter(
                  (link) => link.role === "PUBLIC" || link.role === userRole,
                )
                .map((link, index) => (
                  <Link
                    key={index}
                    to={link.to}
                    className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-muted hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
            </div>

            <div className="mt-4 flex flex-col gap-2 border-t pt-4">
              {data?.data?.email && (
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="dark:text-white text-black "
                >
                  LogOut
                </Button>
              )}
              {!data?.data?.email && (
                <>
                  <Link
                    to="/login"
                    className="dark:text-white rounded-xl border px-4 py-2 text-sm font-medium transition text-black hover:bg-muted hover:text-black"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="dark:text-white rounded-xl bg-[#1F2340] px-5 py-2 text-sm font-medium text-primary-foreground shadow-lg transition hover:opacity-90"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </details>
      </div>
    </header>
  );
}
