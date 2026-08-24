import { Link } from "react-router";
import {
  MessageSquare,
  HelpCircle,
  AlertOctagon,
  Search,
  Bell,

  ArrowRight,
  Megaphone,
  PlusCircle,
  FileText,
} from "lucide-react";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { useGetAnnouncementsQuery } from "@/redux/features/announcement/announcement.api";
import { useGetComplaintsQuery } from "@/redux/features/complaint/complaint.api";
import { useGetNotificationsQuery } from "@/redux/features/notification/notification.api";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function StudentDashboard() {
  const { data: userResponse } = useUserInfoQuery(undefined);
  const { data: announcementResponse } = useGetAnnouncementsQuery({ limit: 3 });
  const { data: complaintsResponse } = useGetComplaintsQuery(undefined);
  const { data: notificationsResponse } = useGetNotificationsQuery(undefined);

  const student = userResponse?.data || {};
  const announcements = announcementResponse?.data || [];
  const complaints = complaintsResponse?.data || [];
  const notifications = notificationsResponse?.data || [];

  const unreadNotificationsCount = notifications.filter((n) => !n.isRead).length;

  const quickActions = [
    {
      title: "Create Post",
      desc: "Share news or start a campus discussion",
      href: "/user/posts/new",
      icon: MessageSquare,
      color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200/50",
    },
    {
      title: "Ask Question",
      desc: "Get help with courses from peers",
      href: "/user/questions/new",
      icon: HelpCircle,
      color: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-200/50",
    },
    {
      title: "Submit Complaint",
      desc: "Report issues anonymously or publicly",
      href: "/user/complaints/new",
      icon: AlertOctagon,
      color: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-200/50",
    },
    {
      title: "Report Lost & Found",
      desc: "Register a lost or found item",
      href: "/user/lost-found/new",
      icon: Search,
      color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200/50",
    },
  ];

  const statCards = [
    {
      title: "My Complaints",
      value: complaints.length,
      desc: `${complaints.filter((c) => c.status === "Pending").length} pending response`,
      icon: FileText,
    },
    {
      title: "Notifications",
      value: unreadNotificationsCount,
      desc: `${unreadNotificationsCount} unread alerts`,
      icon: Bell,
    },
  ];

  // Helper for complaint status badges
  const getStatusStyle = (status) => {
    switch (status) {
      case "Resolved":
        return "bg-green-500/10 text-green-700 dark:text-green-400 border-green-200/35";
      case "Under Review":
        return "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-200/35";
      case "Rejected":
        return "bg-red-500/10 text-red-700 dark:text-red-400 border-red-200/35";
      default:
        return "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200/35";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl space-y-8 mt-14">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-[#1E293B] to-[#0F172A] dark:from-[#0F172A] dark:to-[#020617] text-white p-8 md:p-12 shadow-xl border border-slate-800">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/20 text-primary-foreground border border-primary/30">
              Metropolitan University Portal
            </span>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-none font-serif">
              Welcome back,{" "}
              <span className="bg-linear-to-r from-blue-400 via-indigo-300 to-primary bg-clip-text text-transparent">
                {student.name || "Student"}
              </span>{" "}
              👋
            </h1>
            <p className="text-slate-400 max-w-xl text-sm md:text-base">
              Here is what is happening around your campus community today. Connect with peers, view updates, or file academic feedback.
            </p>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <img
              src={student.picture || "https://i.ibb.co.com/xttK0CDW/pp.jpg"}
              alt="Profile"
              className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-slate-700 shadow-md object-cover"
            />
            <div className="text-left">
              <p className="font-semibold text-lg">{student.name}</p>
              <p className="text-xs text-slate-400 font-mono">ID: {student.studentId || "2026-MU-102"}</p>
              <p className="text-xs text-slate-400">{student.department || "Computer Science & Engineering"}</p>
            </div>
          </div>
        </div>
        {/* Geometric highlights */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-80 h-80 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />
      </div>

      {/* Main Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Left 2 Columns: Actions & Updates */}
        <div className="md:col-span-2 space-y-6">
          {/* Quick Actions */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold tracking-tight text-foreground flex items-center gap-2">
              <PlusCircle className="h-5 w-5 text-primary" />
              Quick Actions
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {quickActions.map((action) => (
                <Link key={action.title} to={action.href}>
                  <Card className="hover:shadow-md hover:border-primary/30 transition-all duration-200 cursor-pointer h-full border border-muted flex items-start p-5 gap-4 rounded-2xl group">
                    <div className={`p-3 rounded-xl border ${action.color}`}>
                      <action.icon className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-bold text-sm flex items-center gap-1 group-hover:text-primary transition-colors text-foreground">
                        {action.title}
                        <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                      </h3>
                      <p className="text-xs text-muted-foreground leading-snug">
                        {action.desc}
                      </p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Stat Cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            {statCards.map((card) => (
              <Card key={card.title} className="border border-muted rounded-2xl p-6 shadow-xs flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{card.title}</span>
                  <p className="text-3xl font-black text-foreground">{card.value}</p>
                  <p className="text-xs text-muted-foreground">{card.desc}</p>
                </div>
                <div className="p-3 bg-muted rounded-xl text-muted-foreground">
                  <card.icon className="h-6 w-6" />
                </div>
              </Card>
            ))}
          </div>

          {/* Recent Complaint tracking */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold tracking-tight text-foreground">
                Complaint Status Tracker
              </h2>
              <Link to="/complaints" className="text-xs font-semibold text-primary hover:underline">
                View All Complaints
              </Link>
            </div>
            <Card className="border border-muted rounded-2xl divide-y">
              {complaints.length === 0 ? (
                <div className="p-8 text-center text-sm text-muted-foreground">
                  You have not submitted any complaints yet.
                </div>
              ) : (
                complaints.slice(0, 3).map((item) => (
                  <div key={item.id || item._id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-muted/10">
                    <div className="space-y-1">
                      <p className="font-semibold text-sm text-foreground">{item.title}</p>
                      <p className="text-xs text-muted-foreground">
                        Submitted on {new Date(item.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStatusStyle(item.status)}`}>
                        {item.status}
                      </span>
                      <Link to={`/complaints/${item.id || item._id}`}>
                        <Button variant="ghost" size="sm" className="rounded-lg">
                          Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </Card>
          </div>
        </div>

        {/* Right 1 Column: Announcements & Notifications Panel */}
        <div className="space-y-6">
          {/* Official Announcements */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold tracking-tight text-foreground flex items-center gap-2">
              <Megaphone className="h-5 w-5 text-indigo-500" />
              Official Notices
            </h2>
            <div className="space-y-4">
              {announcements.length === 0 ? (
                <Card className="p-6 text-center text-xs text-muted-foreground border-dashed">
                  No announcements broadcasted yet.
                </Card>
              ) : (
                announcements.map((item) => (
                  <Link key={item.id || item._id} to={`/announcements/${item.id || item._id}`}>
                    <Card className="p-4 hover:shadow-xs transition border border-muted rounded-2xl bg-card space-y-2 hover:border-indigo-200/50 cursor-pointer group">
                      <span className="inline-flex text-[9px] font-bold tracking-wider text-indigo-600 bg-indigo-500/10 px-2 py-0.5 rounded-full">
                        {item.category || "GENERAL"}
                      </span>
                      <h3 className="font-bold text-sm text-foreground leading-snug group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {item.content}
                      </p>
                      <p className="text-[10px] text-muted-foreground/80 font-mono">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </p>
                    </Card>
                  </Link>
                ))
              )}
            </div>
            {announcements.length > 0 && (
              <Link to="/announcements" className="block text-center text-xs font-semibold text-primary hover:underline pt-2">
                Browse Announcements Archive
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
