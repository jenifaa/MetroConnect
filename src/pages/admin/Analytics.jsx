import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  CalendarDays,
  Download,
  MoreHorizontal,
  TrendingUp,
  Users,
  UserPlus,
  FileText,
  MessageSquare,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function Analytics() {
  const stats = [
    {
      title: "Total Users",
      value: "12,480",
      change: "+12.5%",
      trend: "up",
      icon: Users,
      description: "vs. last month",
    },
    {
      title: "New Users",
      value: "1,284",
      change: "+18.2%",
      trend: "up",
      icon: UserPlus,
      description: "vs. last month",
    },
    {
      title: "Total Posts",
      value: "8,642",
      change: "+8.4%",
      trend: "up",
      icon: FileText,
      description: "vs. last month",
    },
    {
      title: "Engagement Rate",
      value: "74.8%",
      change: "-2.1%",
      trend: "down",
      icon: Activity,
      description: "vs. last month",
    },
  ];

  const activities = [
    {
      user: "Sarah Ahmed",
      action: "Created a new post",
      category: "Community",
      time: "2 min ago",
      status: "Completed",
    },
    {
      user: "Tanvir Hasan",
      action: "Reported an issue",
      category: "Complaint",
      time: "15 min ago",
      status: "Pending",
    },
    {
      user: "Nusrat Jahan",
      action: "Commented on a post",
      category: "Engagement",
      time: "32 min ago",
      status: "Completed",
    },
    {
      user: "Rakibul Islam",
      action: "Created an event",
      category: "Events",
      time: "1 hour ago",
      status: "Completed",
    },
    {
      user: "Fahim Rahman",
      action: "Submitted feedback",
      category: "Feedback",
      time: "2 hours ago",
      status: "Pending",
    },
  ];

  return (
    <div className="min-h-screen bg-muted/30 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <BarChart3 className="h-4 w-4" />
              <span>Admin Dashboard</span>
            </div>

            <h1 className="mt-1 text-2xl font-bold tracking-tight md:text-3xl">
              Analytics Overview
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              Monitor platform performance, users, and community engagement.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Select defaultValue="30">
              <SelectTrigger className="w-37.5 bg-background">
                <CalendarDays className="mr-2 h-4 w-4" />
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 3 months</SelectItem>
                <SelectItem value="365">Last year</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <Card key={stat.title} className="shadow-sm">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        {stat.title}
                      </p>

                      <h2 className="mt-2 text-2xl font-bold tracking-tight">
                        {stat.value}
                      </h2>
                    </div>

                    <div className="rounded-xl bg-primary/10 p-3 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2 text-xs">
                    <span
                      className={`flex items-center gap-1 font-medium ${
                        stat.trend === "up"
                          ? "text-emerald-600"
                          : "text-red-600"
                      }`}
                    >
                      {stat.trend === "up" ? (
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      ) : (
                        <ArrowDownRight className="h-3.5 w-3.5" />
                      )}

                      {stat.change}
                    </span>

                    <span className="text-muted-foreground">
                      {stat.description}
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Analytics */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* User Growth */}
          <Card className="lg:col-span-2 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>User Growth</CardTitle>
                <p className="mt-1 text-sm text-muted-foreground">
                  New users registered over the selected period
                </p>
              </div>

              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </CardHeader>

            <CardContent>
              <div className="mb-6 flex items-end gap-3">
                <span className="text-3xl font-bold">12,480</span>
                <span className="mb-1 flex items-center text-sm font-medium text-emerald-600">
                  <TrendingUp className="mr-1 h-4 w-4" />
                  12.5%
                </span>
              </div>

              {/* Chart */}
              <div className="flex h-70 items-end gap-2 border-b border-l px-2 pb-0">
                {[42, 55, 48, 65, 58, 72, 68, 82, 76, 88, 80, 96].map(
                  (height, index) => (
                    <div
                      key={index}
                      className="group relative flex h-full flex-1 items-end"
                    >
                      <div
                        className="w-full rounded-t-md bg-primary/80 transition-all duration-300 group-hover:bg-primary"
                        style={{ height: `${height}%` }}
                      />

                      <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-muted-foreground">
                        {index + 1}
                      </span>
                    </div>
                  )
                )}
              </div>

              <div className="mt-8 flex justify-between text-xs text-muted-foreground">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
                <span>Jul</span>
                <span>Aug</span>
              </div>
            </CardContent>
          </Card>

          {/* Engagement */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Engagement</CardTitle>
              <p className="text-sm text-muted-foreground">
                Platform activity breakdown
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-medium">Posts</span>
                  <span className="text-muted-foreground">82%</span>
                </div>
                <Progress value={82} />
              </div>

              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-medium">Comments</span>
                  <span className="text-muted-foreground">68%</span>
                </div>
                <Progress value={68} />
              </div>

              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-medium">Events</span>
                  <span className="text-muted-foreground">54%</span>
                </div>
                <Progress value={54} />
              </div>

              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-medium">Feedback</span>
                  <span className="text-muted-foreground">41%</span>
                </div>
                <Progress value={41} />
              </div>

              <div className="rounded-xl bg-muted/70 p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-background p-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                  </div>

                  <div>
                    <p className="text-sm font-medium">Active Community</p>
                    <p className="text-xs text-muted-foreground">
                      6,842 active members
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Secondary Analytics */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Content Analytics */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Content Overview</CardTitle>
              <p className="text-sm text-muted-foreground">
                Current platform content statistics
              </p>
            </CardHeader>

            <CardContent className="grid grid-cols-2 gap-4">
              <div className="rounded-xl border bg-background p-4">
                <p className="text-sm text-muted-foreground">Posts</p>
                <p className="mt-2 text-2xl font-bold">8,642</p>
                <p className="mt-1 text-xs text-emerald-600">+8.4%</p>
              </div>

              <div className="rounded-xl border bg-background p-4">
                <p className="text-sm text-muted-foreground">Comments</p>
                <p className="mt-2 text-2xl font-bold">24,891</p>
                <p className="mt-1 text-xs text-emerald-600">+14.7%</p>
              </div>

              <div className="rounded-xl border bg-background p-4">
                <p className="text-sm text-muted-foreground">Events</p>
                <p className="mt-2 text-2xl font-bold">186</p>
                <p className="mt-1 text-xs text-emerald-600">+5.2%</p>
              </div>

              <div className="rounded-xl border bg-background p-4">
                <p className="text-sm text-muted-foreground">Complaints</p>
                <p className="mt-2 text-2xl font-bold">342</p>
                <p className="mt-1 text-xs text-red-600">+2.8%</p>
              </div>
            </CardContent>
          </Card>

          {/* Traffic */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Platform Traffic</CardTitle>
              <p className="text-sm text-muted-foreground">
                Where your users are coming from
              </p>
            </CardHeader>

            <CardContent className="space-y-5">
              {[
                ["Direct", "48%", 48],
                ["Search", "27%", 27],
                ["Social Media", "16%", 16],
                ["Other", "9%", 9],
              ].map(([source, percentage, value]) => (
                <div key={source}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="font-medium">{source}</span>
                    <span className="text-muted-foreground">
                      {percentage}
                    </span>
                  </div>

                  <Progress value={value} />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Activity</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">
                Latest activity across the platform
              </p>
            </div>

            <Button variant="outline" size="sm">
              View all
            </Button>
          </CardHeader>

          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Activity</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {activities.map((activity) => (
                    <TableRow key={`${activity.user}-${activity.time}`}>
                      <TableCell className="font-medium">
                        {activity.user}
                      </TableCell>

                      <TableCell>{activity.action}</TableCell>

                      <TableCell>
                        <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium">
                          {activity.category}
                        </span>
                      </TableCell>

                      <TableCell className="text-muted-foreground">
                        {activity.time}
                      </TableCell>

                      <TableCell>
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                            activity.status === "Completed"
                              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400"
                              : "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400"
                          }`}
                        >
                          {activity.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Analytics;