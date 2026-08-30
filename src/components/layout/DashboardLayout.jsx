import { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router";
import {
  LayoutDashboard,
  Users,
  AlertTriangle,
  Megaphone,
  MessageSquare,
  LogOut,
  Menu,
  X,
  User,
  Bell,

  FileText,
} from "lucide-react";

import { Button } from "../ui/button";
import { ModeToggle } from "./MoodToggler";

import {
  useUserInfoQuery,
  useLogoutMutation,
  authApi,
} from "@/redux/features/auth/auth.api";

import { useAppDispatch } from "@/redux/hook";
import logo from "../../assets/logo/logo.png";

/* =========================
   ADMIN NAVIGATION
========================= */

const adminNavLinks = [
  {
    to: "/admin/analytics",
    label: "Overview",
    icon: LayoutDashboard,
    end: true,
  },

  {
    to: "/admin/users",
    label: "User Management",
    icon: Users,
  },
  {
    to: "/admin/complaints",
    label: "Complaints",
    icon: AlertTriangle,
  },
  {
    to: "/admin/announcements",
    label: "Announcements",
    icon: Megaphone,
  },
  {
    to: "/admin/posts",
    label: "Post Moderation",
    icon: MessageSquare,
  },
];

/* =========================
   STUDENT NAVIGATION
========================= */

const studentNavLinks = [
  {
    to: "/user/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    end: true,
  },
  {
    to: "/user/profile",
    label: "My Profile",
    icon: User,
  },
  {
    to: "/user/posts/my-posts",
    label: "My Posts",
    icon: FileText,
  },
  {
    to: "/user/announcements",
    label: "Announcements",
    icon: Megaphone,
  },

  {
    to: "/user/complaints",
    label: "My Complaints",
    icon: AlertTriangle,
  },
  {
    to: "/user/notifications",
    label: "Notifications",
    icon: Bell,
  },

];

export default function DashboardLayout() {
  const { data } = useUserInfoQuery(undefined);
  // console.log(data);

  const [logout] = useLogoutMutation();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const userRole = data?.data?.role;

  const isAdmin = userRole === "ADMIN" || userRole === "SUPER_ADMIN";

  const navLinks = isAdmin ? adminNavLinks : studentNavLinks;

  const handleLogout = async () => {
    try {
      await logout(undefined).unwrap();

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      dispatch(authApi.util.resetApiState());

      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-muted/20 flex flex-col md:flex-row">
      {/* =========================
          MOBILE TOP HEADER
      ========================= */}

      <header className="flex md:hidden items-center justify-between px-4 py-3 bg-card border-b shadow-sm">
        <div className="flex items-center gap-2">
          <Link to="/">
            <img src={logo} alt="Logo" className="h-8 w-8 object-contain" />
          </Link>

          <span className="font-bold text-sm tracking-tight">
            Metro
            <span className="text-primary">
              {isAdmin ? "Admin" : "Connect"}
            </span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <ModeToggle />

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </header>

      {/* =========================
          MOBILE SIDEBAR
      ========================= */}

      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setIsSidebarOpen(false)}
          />

          {/* Drawer */}
          <aside className="relative flex flex-col w-64 max-w-xs bg-card h-full p-4 border-r animate-in slide-in-from-left duration-200">
            {/* Logo */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <Link to="/">
                  <img
                    src={logo}
                    alt="Logo"
                    className="h-8 w-8 object-contain"
                  />
                </Link>

                <span className="font-bold text-sm tracking-tight">
                  Metro
                  <span className="text-primary">
                    {isAdmin ? "Admin" : "Connect"}
                  </span>
                </span>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSidebarOpen(false)}
                aria-label="Close sidebar"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1">
              {navLinks.map((link) => {
                const Icon = link.icon;

                return (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.end}
                    onClick={() => setIsSidebarOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`
                    }
                  >
                    <Icon className="h-4 w-4" />
                    {link.label}
                  </NavLink>
                );
              })}
            </nav>

            {/* User */}
            <div className="border-t pt-4 mt-auto">
              <div className="flex items-center gap-3 px-3 py-2 mb-4">
                <img
                  src={
                    data?.data?.picture ||
                    "https://i.ibb.co.com/xttK0CDW/pp.jpg"
                  }
                  alt="Avatar"
                  className="h-9 w-9 rounded-full object-cover border"
                />

                <div className="overflow-hidden">
                  <p className="text-xs font-semibold truncate">
                    {data?.data?.name || "User"}
                  </p>

                  <p className="text-[10px] text-muted-foreground truncate">
                    {data?.data?.email}
                  </p>
                </div>
              </div>

              <Button
                onClick={handleLogout}
                variant="destructive"
                className="w-full justify-start gap-3 rounded-xl"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </aside>
        </div>
      )}

      {/* =========================
          DESKTOP SIDEBAR
      ========================= */}

      <aside className="hidden md:flex flex-col w-64 bg-card border-r h-screen sticky top-0 p-4">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8 px-2">
          <Link
            to="/"
            className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md"
          >
            <img
              src={logo}
              alt="Logo"
              className="h-full w-full object-contain"
            />
          </Link>

          <div>
            <h1 className="text-sm font-bold tracking-tight">
              Metro
              <span className="text-primary font-black">Connect</span>
            </h1>

            <p className="text-[10px] text-muted-foreground -mt-0.5">
              {isAdmin ? "Admin Control Panel" : "Student Portal"}
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1">
          {navLinks.map((link) => {
            const Icon = link.icon;

            return (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`
                }
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </NavLink>
            );
          })}
        </nav>

        {/* User section */}
        <div className="border-t pt-4">
          <div className="flex items-center gap-3 px-2 py-2 mb-4 bg-muted/40 rounded-xl">
            <img
              src={
                data?.data?.picture || "https://i.ibb.co.com/xttK0CDW/pp.jpg"
              }
              alt="Avatar"
              className="h-9 w-9 rounded-full object-cover border"
            />

            <div className="overflow-hidden flex-1">
              <p className="text-xs font-semibold truncate text-foreground">
                {data?.data?.name || "User"}
              </p>

              <p className="text-[9px] text-muted-foreground truncate">
                {data?.data?.email}
              </p>
            </div>

            <ModeToggle />
          </div>

          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full justify-start gap-3 rounded-xl border-dashed border-red-200 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* =========================
          MAIN CONTENT
      ========================= */}

      <main className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {/* Desktop Navbar */}
        <header className="hidden md:flex items-center justify-between px-6 py-4 bg-card/50 backdrop-blur-md border-b sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground">
              Portal Overview &gt; {isAdmin ? "Admin" : "Student"} &gt;
              Dashboard
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs font-semibold bg-primary/10 text-primary px-2 py-0.5 rounded-full uppercase">
              {userRole || "USER"}
            </span>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-4 md:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
