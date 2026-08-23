import { Link } from "react-router";
import {
  Users,
  MessageSquare,
  AlertTriangle,
  Megaphone,
  CheckCircle,

  PlusCircle,
  HelpCircle,
  Eye,
} from "lucide-react";
import { useGetAdminDashboardQuery } from "@/redux/features/admin/admin.api";
import { LoadingState, ErrorState } from "@/components/common/States";
import PageHeader from "@/components/common/PageHeader";
import { Card} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  const { data: dashboardResponse, isLoading, isError, refetch } = useGetAdminDashboardQuery(undefined);

  const stats = dashboardResponse?.data || {
    totalUsers: 0,
    totalPosts: 0,
    totalQuestions: 0,
    pendingComplaints: 0,
    resolvedComplaints: 0,
    totalAnnouncements: 0,
    reportedContentCount: 0,
  };

  if (isLoading) {
    return <LoadingState message="Loading dashboard statistics..." items={4} />;
  }

  if (isError) {
    return <ErrorState onRetry={refetch} />;
  }

  const statCards = [
    { title: "Total Users", value: stats.totalUsers, icon: Users, color: "text-blue-500 bg-blue-500/10" },
    { title: "Total Posts", value: stats.totalPosts, icon: MessageSquare, color: "text-emerald-500 bg-emerald-500/10" },
    { title: "Pending Complaints", value: stats.pendingComplaints, icon: AlertTriangle, color: "text-red-500 bg-red-500/10" },
    { title: "Active Announcements", value: stats.totalAnnouncements, icon: Megaphone, color: "text-purple-500 bg-purple-500/10" },
  ];

  const secondaryStats = [
    { label: "Questions Asked", value: stats.totalQuestions || 0, icon: HelpCircle },
    { label: "Resolved Complaints", value: stats.resolvedComplaints || 0, icon: CheckCircle },
    { label: "Reported Content", value: stats.reportedContentCount || 0, icon: AlertTriangle },
  ];

  return (
    <div className="space-y-8">
      {/* Title */}
      <PageHeader
        title="Admin Control Overview"
        description="Monitor community statistics, edit official notices, and resolve pending student complaints."
      >
        <Link to="/admin/announcements">
          <Button className="rounded-xl gap-2 font-semibold shadow-md">
            <PlusCircle className="h-4.5 w-4.5" />
            New Announcement
          </Button>
        </Link>
      </PageHeader>

      {/* Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => (
          <Card key={card.title} className="border border-muted rounded-2xl p-6 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">{card.title}</span>
              <p className="text-3xl font-black text-foreground">{card.value}</p>
            </div>
            <div className={`p-3.5 rounded-xl border border-muted/50 ${card.color}`}>
              <card.icon className="h-6 w-6" />
            </div>
          </Card>
        ))}
      </div>

      {/* Secondary metrics grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {secondaryStats.map((item) => (
          <Card key={item.label} className="border border-muted rounded-2xl p-5 flex items-center gap-4 bg-card/60">
            <div className="p-2.5 bg-muted rounded-lg text-muted-foreground">
              <item.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium">{item.label}</p>
              <p className="text-xl font-bold text-foreground">{item.value}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Action Matrix */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-foreground">Administrative Shortcuts</h3>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          <Card className="border border-muted rounded-2xl p-5 hover:border-primary/30 transition flex flex-col justify-between h-40">
            <div className="space-y-1">
              <h4 className="font-bold text-sm text-foreground">User Directory</h4>
              <p className="text-xs text-muted-foreground leading-normal">
                Check details, modify authorization roles, or deactivate student accounts.
              </p>
            </div>
            <Link to="/admin/users" className="mt-4">
              <Button variant="outline" className="w-full text-xs font-semibold rounded-xl gap-1">
                <span>Open Users</span>
                <Eye className="h-3 w-3" />
              </Button>
            </Link>
          </Card>

          <Card className="border border-muted rounded-2xl p-5 hover:border-primary/30 transition flex flex-col justify-between h-40">
            <div className="space-y-1">
              <h4 className="font-bold text-sm text-foreground">Moderation Inbox</h4>
              <p className="text-xs text-muted-foreground leading-normal">
                Review flagged comments and posts reported by students for terms violations.
              </p>
            </div>
            <Link to="/admin/posts" className="mt-4">
              <Button variant="outline" className="w-full text-xs font-semibold rounded-xl gap-1">
                <span>Open Moderation</span>
                <Eye className="h-3 w-3" />
              </Button>
            </Link>
          </Card>

          <Card className="border border-muted rounded-2xl p-5 hover:border-primary/30 transition flex flex-col justify-between h-40">
            <div className="space-y-1">
              <h4 className="font-bold text-sm text-foreground">Complaint Resolver</h4>
              <p className="text-xs text-muted-foreground leading-normal">
                Respond to filed student complaints, update review statuses, and append resolutions.
              </p>
            </div>
            <Link to="/admin/complaints" className="mt-4">
              <Button variant="outline" className="w-full text-xs font-semibold rounded-xl gap-1">
                <span>Open Complaints</span>
                <Eye className="h-3 w-3" />
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}
