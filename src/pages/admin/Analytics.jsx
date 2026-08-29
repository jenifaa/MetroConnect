
import {
  Activity,

  ArrowUpRight,
  BarChart3,
  CalendarDays,
  Download,
  MoreHorizontal,
 
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

import { useGetAllUsersQuery } from "@/redux/features/auth/auth.api";
import { useGetPostsQuery } from "@/redux/features/post/post.api";

function Analytics() {
  // =========================================================
  // API
  // =========================================================

  const {
    data: usersResponse,
    isLoading: usersLoading,
  } = useGetAllUsersQuery(undefined);

  const {
    data: postsResponse,
    isLoading: postsLoading,
  } = useGetPostsQuery(undefined);

  // =========================================================
  // META DATA
  // =========================================================

  const totalUsers = usersResponse?.meta?.total ?? 0;
  const totalPosts = postsResponse?.meta?.total ?? 0;

  // If your backend uses meta.totalDocs instead of meta.total,
  // change the above to:
  //
  // const totalUsers = usersResponse?.meta?.totalDocs ?? 0;
  // const totalPosts = postsResponse?.meta?.totalDocs ?? 0;

  const users = usersResponse?.data ?? [];
  const posts = postsResponse?.data ?? [];

  // =========================================================
  // CALCULATED DATA
  // =========================================================

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const newUsersThisMonth = users.filter((user) => {
    if (!user.createdAt) return false;

    const date = new Date(user.createdAt);

    return (
      date.getMonth() === currentMonth &&
      date.getFullYear() === currentYear
    );
  }).length;

  const totalComments = posts.reduce(
    (total, post) => total + (post.comments?.length || 0),
    0,
  );

  const totalReactions = posts.reduce(
    (total, post) => total + (post.reactions?.length || 0),
    0,
  );

  // =========================================================
  // STATS
  // =========================================================

  const stats = [
    {
      title: "Total Users",
      value: usersLoading ? "..." : totalUsers.toLocaleString(),
      change: "Current",
      trend: "up",
      icon: Users,
      description: "registered users",
    },
    {
      title: "New Users",
      value: usersLoading ? "..." : newUsersThisMonth.toLocaleString(),
      change: "This month",
      trend: "up",
      icon: UserPlus,
      description: "new registrations",
    },
    {
      title: "Total Posts",
      value: postsLoading ? "..." : totalPosts.toLocaleString(),
      change: "Current",
      trend: "up",
      icon: FileText,
      description: "community posts",
    },
    {
      title: "Engagement",
      value: postsLoading ? "..." : totalReactions.toLocaleString(),
      change: "Total",
      trend: "up",
      icon: Activity,
      description: "post reactions",
    },
  ];

  // =========================================================
  // CONTENT DATA
  // =========================================================

  const contentStats = [
    {
      label: "Posts",
      value: totalPosts,
    },
    {
      label: "Comments",
      value: totalComments,
    },
    {
      label: "Reactions",
      value: totalReactions,
    },
  ];

  // =========================================================
  // MAIN UI
  // =========================================================

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
                    <span className="flex items-center gap-1 font-medium text-emerald-600">
                      <ArrowUpRight className="h-3.5 w-3.5" />
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

          {/* User / Post Overview */}
          <Card className="lg:col-span-2 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Platform Overview</CardTitle>

                <p className="mt-1 text-sm text-muted-foreground">
                  Current users and community content statistics
                </p>
              </div>

              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </CardHeader>

            <CardContent>
              <div className="grid gap-4 sm:grid-cols-3">

                {/* Users */}
                <div className="rounded-2xl border bg-background p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      Total Users
                    </p>

                    <Users className="h-5 w-5 text-primary" />
                  </div>

                  <p className="mt-3 text-3xl font-bold">
                    {usersLoading
                      ? "..."
                      : totalUsers.toLocaleString()}
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Registered users
                  </p>
                </div>

                {/* Posts */}
                <div className="rounded-2xl border bg-background p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      Total Posts
                    </p>

                    <FileText className="h-5 w-5 text-primary" />
                  </div>

                  <p className="mt-3 text-3xl font-bold">
                    {postsLoading
                      ? "..."
                      : totalPosts.toLocaleString()}
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Community posts
                  </p>
                </div>

                {/* Comments */}
                <div className="rounded-2xl border bg-background p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      Comments
                    </p>

                    <MessageSquare className="h-5 w-5 text-primary" />
                  </div>

                  <p className="mt-3 text-3xl font-bold">
                    {postsLoading
                      ? "..."
                      : totalComments.toLocaleString()}
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Total comments
                  </p>
                </div>
              </div>

              {/* User Growth */}
              <div className="mt-8">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">
                      User Statistics
                    </h3>

                    <p className="text-sm text-muted-foreground">
                      Current platform user activity
                    </p>
                  </div>

                  <span className="text-2xl font-bold">
                    {totalUsers.toLocaleString()}
                  </span>
                </div>

                <Progress
                  value={totalUsers > 0 ? 100 : 0}
                  className="h-3"
                />

                <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                  <span>Registered Users</span>

                  <span>
                    {newUsersThisMonth.toLocaleString()} new this month
                  </span>
                </div>
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
                  <span className="font-medium">
                    Posts
                  </span>

                  <span className="text-muted-foreground">
                    {totalPosts.toLocaleString()}
                  </span>
                </div>

                <Progress
                  value={totalPosts > 0 ? 100 : 0}
                />
              </div>

              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-medium">
                    Comments
                  </span>

                  <span className="text-muted-foreground">
                    {totalComments.toLocaleString()}
                  </span>
                </div>

                <Progress
                  value={
                    totalPosts > 0
                      ? Math.min(
                          (totalComments / totalPosts) * 20,
                          100,
                        )
                      : 0
                  }
                />
              </div>

              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-medium">
                    Reactions
                  </span>

                  <span className="text-muted-foreground">
                    {totalReactions.toLocaleString()}
                  </span>
                </div>

                <Progress
                  value={
                    totalPosts > 0
                      ? Math.min(
                          (totalReactions / totalPosts) * 20,
                          100,
                        )
                      : 0
                  }
                />
              </div>

              <div className="rounded-xl bg-muted/70 p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-background p-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                  </div>

                  <div>
                    <p className="text-sm font-medium">
                      Community Activity
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {(
                        totalComments + totalReactions
                      ).toLocaleString()}{" "}
                      interactions
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content Analytics */}
        <div className="grid gap-6 md:grid-cols-2">

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Content Overview</CardTitle>

              <p className="text-sm text-muted-foreground">
                Current platform content statistics
              </p>
            </CardHeader>

            <CardContent className="grid grid-cols-2 gap-4">
              {contentStats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border bg-background p-4"
                >
                  <p className="text-sm text-muted-foreground">
                    {item.label}
                  </p>

                  <p className="mt-2 text-2xl font-bold">
                    {item.value.toLocaleString()}
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Current total
                  </p>
                </div>
              ))}

              <div className="rounded-xl border bg-background p-4">
                <p className="text-sm text-muted-foreground">
                  New Users
                </p>

                <p className="mt-2 text-2xl font-bold">
                  {newUsersThisMonth.toLocaleString()}
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  This month
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Platform Traffic */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Community Activity</CardTitle>

              <p className="text-sm text-muted-foreground">
                Current activity across the platform
              </p>
            </CardHeader>

            <CardContent className="space-y-5">

              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-medium">
                    Users
                  </span>

                  <span className="text-muted-foreground">
                    {totalUsers.toLocaleString()}
                  </span>
                </div>

                <Progress value={100} />
              </div>

              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-medium">
                    Posts
                  </span>

                  <span className="text-muted-foreground">
                    {totalPosts.toLocaleString()}
                  </span>
                </div>

                <Progress
                  value={
                    totalUsers > 0
                      ? Math.min(
                          (totalPosts / totalUsers) * 100,
                          100,
                        )
                      : 0
                  }
                />
              </div>

              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-medium">
                    Comments
                  </span>

                  <span className="text-muted-foreground">
                    {totalComments.toLocaleString()}
                  </span>
                </div>

                <Progress
                  value={
                    totalPosts > 0
                      ? Math.min(
                          (totalComments / totalPosts) * 100,
                          100,
                        )
                      : 0
                  }
                />
              </div>

              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-medium">
                    Reactions
                  </span>

                  <span className="text-muted-foreground">
                    {totalReactions.toLocaleString()}
                  </span>
                </div>

                <Progress
                  value={
                    totalPosts > 0
                      ? Math.min(
                          (totalReactions / totalPosts) * 100,
                          100,
                        )
                      : 0
                  }
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Posts */}
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Posts</CardTitle>

              <p className="mt-1 text-sm text-muted-foreground">
                Latest posts from the community
              </p>
            </div>
          </CardHeader>

          <CardContent>
            {posts.length === 0 ? (
              <div className="py-10 text-center text-sm text-muted-foreground">
                No posts available.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Comments</TableHead>
                      <TableHead>Reactions</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {posts.slice(0, 5).map((post) => (
                      <TableRow key={post.id || post._id}>
                        <TableCell className="max-w-75 truncate font-medium">
                          {post.title || "Untitled Post"}
                        </TableCell>

                        <TableCell>
                          <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium">
                            {post.category || "General"}
                          </span>
                        </TableCell>

                        <TableCell>
                          {post.author?.name || "Unknown"}
                        </TableCell>

                        <TableCell>
                          {post.comments?.length || 0}
                        </TableCell>

                        <TableCell>
                          {post.reactions?.length || 0}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Analytics;

