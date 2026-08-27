import {
  AlertCircle,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  MessageSquare,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { Link } from "react-router";

import { useGetComplaintsQuery } from "@/redux/features/complaint/complaint.api";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

function MyComplains() {
  const { data, isLoading, isError } = useGetComplaintsQuery();

  const complaints = data?.data || [];

  const totalComplaints = complaints.length;

  const pendingComplaints = complaints.filter(
    (complaint) => complaint.status?.toLowerCase() === "pending",
  ).length;

  const resolvedComplaints = complaints.filter(
    (complaint) => complaint.status?.toLowerCase() === "resolved",
  ).length;

  const getStatusStyles = (status) => {
    switch (status?.toLowerCase()) {
      case "resolved":
        return {
          className:
            "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
          icon: <CheckCircle2 className="h-3.5 w-3.5" />,
        };

      case "pending":
        return {
          className:
            "bg-amber-500/10 text-amber-600 border-amber-500/20",
          icon: <Clock3 className="h-3.5 w-3.5" />,
        };

      case "rejected":
        return {
          className: "bg-red-500/10 text-red-600 border-red-500/20",
          icon: <AlertCircle className="h-3.5 w-3.5" />,
        };

      default:
        return {
          className:
            "bg-blue-500/10 text-blue-600 border-blue-500/20",
          icon: <Clock3 className="h-3.5 w-3.5" />,
        };
    }
  };

  const formatDate = (date) => {
    if (!date) return "Unknown date";

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-muted/20 px-4 py-10">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="animate-pulse space-y-3">
            <div className="h-8 w-56 rounded-lg bg-muted" />
            <div className="h-4 w-96 max-w-full rounded bg-muted" />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <Card key={item} className="rounded-2xl">
                <CardContent className="p-6">
                  <div className="animate-pulse space-y-3">
                    <div className="h-4 w-24 rounded bg-muted" />
                    <div className="h-8 w-16 rounded bg-muted" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-5">
            {[1, 2].map((item) => (
              <Card key={item} className="rounded-2xl">
                <CardContent className="animate-pulse space-y-4 p-6">
                  <div className="h-5 w-1/3 rounded bg-muted" />
                  <div className="h-4 w-full rounded bg-muted" />
                  <div className="h-4 w-4/5 rounded bg-muted" />
                  <div className="h-20 w-full rounded-xl bg-muted" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <Card className="w-full max-w-md rounded-2xl">
          <CardContent className="flex flex-col items-center p-8 text-center">
            <div className="mb-4 rounded-full bg-red-500/10 p-4">
              <AlertCircle className="h-8 w-8 text-red-500" />
            </div>

            <h2 className="text-xl font-bold">
              Failed to load complaints
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              We couldn't retrieve your complaints right now. Please try
              again later.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/20 px-4 py-10">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* ================= HEADER ================= */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-primary">
              <ShieldCheck className="h-5 w-5" />

              <span className="text-sm font-semibold">
                Community Support
              </span>
            </div>

            <h1 className="text-3xl font-black tracking-tight md:text-4xl">
              My Complaints
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              Track the complaints and concerns you have submitted to
              Metropolitan University administration.
            </p>
          </div>

          <Link to="/user/complaints/new">
            <Button className="rounded-xl shadow-sm">
              <FileText className="mr-2 h-4 w-4" />
              Submit Complaint
            </Button>
          </Link>
        </div>

        {/* ================= SUMMARY ================= */}
        <div className="grid gap-4 sm:grid-cols-3">
          {/* Total */}
          <Card className="rounded-2xl border bg-background shadow-sm">
            <CardContent className="flex items-center justify-between p-5">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Complaints
                </p>

                <p className="mt-1 text-3xl font-black">
                  {totalComplaints}
                </p>
              </div>

              <div className="rounded-2xl bg-primary/10 p-3">
                <FileText className="h-6 w-6 text-primary" />
              </div>
            </CardContent>
          </Card>

          {/* Pending */}
          <Card className="rounded-2xl border bg-background shadow-sm">
            <CardContent className="flex items-center justify-between p-5">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Pending
                </p>

                <p className="mt-1 text-3xl font-black">
                  {pendingComplaints}
                </p>
              </div>

              <div className="rounded-2xl bg-amber-500/10 p-3">
                <Clock3 className="h-6 w-6 text-amber-500" />
              </div>
            </CardContent>
          </Card>

          {/* Resolved */}
          <Card className="rounded-2xl border bg-background shadow-sm">
            <CardContent className="flex items-center justify-between p-5">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Resolved
                </p>

                <p className="mt-1 text-3xl font-black">
                  {resolvedComplaints}
                </p>
              </div>

              <div className="rounded-2xl bg-emerald-500/10 p-3">
                <CheckCircle2 className="h-6 w-6 text-emerald-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ================= EMPTY STATE ================= */}
        {complaints.length === 0 ? (
          <Card className="rounded-2xl border-dashed bg-background">
            <CardContent className="flex flex-col items-center justify-center py-20 text-center">
              <div className="mb-5 rounded-full bg-primary/10 p-5">
                <FileText className="h-9 w-9 text-primary" />
              </div>

              <h2 className="text-xl font-bold">
                No complaints submitted
              </h2>

              <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                You haven't submitted any complaints yet. If you have a
                concern about campus life, academics, transportation, or
                other university matters, you can submit one here.
              </p>

              <Link to="/user/complaints/new" className="mt-6">
                <Button className="rounded-xl">
                  Submit Your First Complaint
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          /* ================= COMPLAINT LIST ================= */
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">
                  Your submissions
                </h2>

                <p className="text-sm text-muted-foreground">
                  Review the current status of your complaints.
                </p>
              </div>

              <Badge variant="secondary" className="rounded-full">
                {totalComplaints}{" "}
                {totalComplaints === 1 ? "Complaint" : "Complaints"}
              </Badge>
            </div>

            {complaints.map((complaint) => {
              const status = getStatusStyles(complaint.status);

              return (
                <Card
                  key={complaint._id}
                  className="group overflow-hidden rounded-2xl border bg-background shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <CardContent className="p-0">
                    <div className="p-5 sm:p-6">
                      {/* Top row */}
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex min-w-0 gap-4">
                          {/* Icon */}
                          <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 sm:flex">
                            <FileText className="h-5 w-5 text-primary" />
                          </div>

                          <div className="min-w-0">
                            <div className="mb-2 flex flex-wrap items-center gap-2">
                              <Badge
                                variant="outline"
                                className="rounded-full text-xs"
                              >
                                {complaint.category || "GENERAL"}
                              </Badge>

                              <Badge
                                variant="outline"
                                className={`flex items-center gap-1 rounded-full text-xs ${status.className}`}
                              >
                                {status.icon}
                                {complaint.status || "Pending"}
                              </Badge>

                              {complaint.isAnonymous && (
                                <Badge
                                  variant="secondary"
                                  className="rounded-full text-xs"
                                >
                                  Anonymous
                                </Badge>
                              )}
                            </div>

                            <h3 className="text-xl font-bold leading-tight">
                              {complaint.title}
                            </h3>

                            <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                              <CalendarDays className="h-3.5 w-3.5" />

                              <span>
                                Submitted on{" "}
                                {formatDate(complaint.createdAt)}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Status */}
                        <Badge
                          variant="outline"
                          className={`hidden rounded-full px-3 py-1 sm:flex ${status.className}`}
                        >
                          {status.icon}
                          <span className="ml-1">
                            {complaint.status}
                          </span>
                        </Badge>
                      </div>

                      {/* Description */}
                      <div className="mt-6 rounded-xl bg-muted/40 p-4">
                        <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Your complaint
                        </p>

                        <p className="text-sm leading-6 text-foreground/80">
                          {complaint.description}
                        </p>
                      </div>

                      {/* Submitted by */}
                      <div className="mt-5 flex items-center gap-3">
                        {complaint.isAnonymous ? (
                          <>
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                              <UserRound className="h-4 w-4 text-muted-foreground" />
                            </div>

                            <div>
                              <p className="text-xs font-medium">
                                Submitted anonymously
                              </p>

                              <p className="text-xs text-muted-foreground">
                                Your identity is hidden from public view
                              </p>
                            </div>
                          </>
                        ) : (
                          <>
                            <img
                              src={
                                complaint.submittedBy?.picture ||
                                "https://i.ibb.co.com/xttK0CDW/pp.jpg"
                              }
                              alt={complaint.submittedBy?.name || "User"}
                              className="h-9 w-9 rounded-full border object-cover"
                            />

                            <div>
                              <p className="text-xs font-medium">
                                {complaint.submittedBy?.name ||
                                  "You"}
                              </p>

                              <p className="text-xs text-muted-foreground">
                                {complaint.submittedBy?.email || ""}
                              </p>
                            </div>
                          </>
                        )}
                      </div>

                      {/* Admin response */}
                      <div className="mt-5">
                        {complaint.adminResponse ? (
                          <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
                            <div className="mb-2 flex items-center gap-2">
                              <div className="rounded-lg bg-blue-500/10 p-1.5">
                                <MessageSquare className="h-4 w-4 text-blue-500" />
                              </div>

                              <p className="text-sm font-semibold text-blue-600">
                                Administration Response
                              </p>
                            </div>

                            <p className="text-sm leading-6 text-muted-foreground">
                              {complaint.adminResponse}
                            </p>
                          </div>
                        ) : (
                          <div className="flex items-center gap-3 rounded-xl border border-dashed p-4">
                            <div className="rounded-lg bg-amber-500/10 p-2">
                              <Clock3 className="h-4 w-4 text-amber-500" />
                            </div>

                            <div>
                              <p className="text-sm font-semibold">
                                Awaiting response
                              </p>

                              <p className="text-xs text-muted-foreground">
                                The administration has not responded yet.
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between border-t bg-muted/20 px-5 py-3 sm:px-6">
                      <div className="text-xs text-muted-foreground">
                        Last updated{" "}
                        {formatDate(complaint.updatedAt)}
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="rounded-xl"
                        asChild
                      >
                        <Link
                          to={`/complaints/${complaint._id}`}
                        >
                          View Details
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyComplains;