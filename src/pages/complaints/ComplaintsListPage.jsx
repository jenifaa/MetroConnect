import { useState } from "react";
import { Link, useSearchParams } from "react-router";
import {
  FileText,
  Search,
  PlusCircle,
  Clock,
  ShieldCheck,
  User,
  ArrowRight,
} from "lucide-react";
import { useGetComplaintsQuery } from "@/redux/features/complaint/complaint.api";
import { LoadingState, EmptyState, ErrorState } from "@/components/common/States";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function ComplaintsListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const activeStatus = searchParams.get("status") || "All";

  const {
    data: complaintsResponse,
    isLoading,
    isError,
    refetch,
  } = useGetComplaintsQuery({
    search: searchQuery || undefined,
    status: activeStatus === "All" ? undefined : activeStatus,
  });

  const complaints = complaintsResponse?.data || [];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const newParams = new URLSearchParams(searchParams);
    if (searchQuery) {
      newParams.set("search", searchQuery);
    } else {
      newParams.delete("search");
    }
    setSearchParams(newParams);
  };

  const handleStatusSelect = (status) => {
    const newParams = new URLSearchParams(searchParams);
    if (status === "All") {
      newParams.delete("status");
    } else {
      newParams.set("status", status);
    }
    setSearchParams(newParams);
  };

  // Helper for complaint status badges
  const getStatusStyle = (status) => {
    switch (status) {
      case "Resolved":
        return "bg-green-500/10 text-green-700 dark:text-green-400 border-green-200/40";
      case "Under Review":
        return "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-200/40";
      case "Rejected":
        return "bg-red-500/10 text-red-700 dark:text-red-400 border-red-200/40";
      default:
        return "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200/40";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl space-y-8 mt-14">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-muted">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-foreground font-serif">
            My Complaints
          </h1>
          <p className="text-sm text-muted-foreground">
            File or monitor the resolution status of administrative complaints and feedback.
          </p>
        </div>
        <Link to="/complaints/new">
          <Button className="rounded-xl gap-2 font-semibold shadow-md bg-red-600 hover:bg-red-700 text-white">
            <PlusCircle className="h-4 w-4" />
            File Complaint
          </Button>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center justify-between">
        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search reference or topic..."
            className="pl-10 h-10 rounded-xl"
          />
        </form>

        {/* Status filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full no-scrollbar">
          {["All", "Pending", "Under Review", "Resolved", "Rejected"].map((status) => (
            <Button
              key={status}
              onClick={() => handleStatusSelect(status)}
              variant={activeStatus === status ? "default" : "outline"}
              className="rounded-full text-xs h-8 px-3 shrink-0"
            >
              {status}
            </Button>
          ))}
        </div>
      </div>

      {/* Complaints List */}
      {isLoading ? (
        <LoadingState message="Loading complaint catalog..." items={3} />
      ) : isError ? (
        <ErrorState onRetry={refetch} />
      ) : complaints.length === 0 ? (
        <EmptyState
          title="No complaints filed"
          description={
            searchQuery || activeStatus !== "All"
              ? "No complaint files match your filter criteria."
              : "All clear! You haven't filed any complaints or grievance records."
          }
        >
          <Link to="/complaints/new">
            <Button className="rounded-xl bg-red-600 hover:bg-red-700 text-white">
              File a Complaint
            </Button>
          </Link>
        </EmptyState>
      ) : (
        <div className="space-y-4">
          {complaints.map((item) => (
            <Card
              key={item.id || item._id}
              className="overflow-hidden border border-muted rounded-2xl shadow-xs hover:border-primary/20 transition duration-200"
            >
              <CardContent className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase bg-muted px-2 py-0.5 rounded-full">
                      Ref: {item.referenceId || item.id?.substring(0, 8) || item._id?.substring(0, 8) || "REF-ID"}
                    </span>
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 dark:text-slate-400 px-2 py-0.5 rounded-full uppercase">
                      {item.category || "General"}
                    </span>
                    {item.isAnonymous ? (
                      <span className="inline-flex items-center gap-0.5 text-[9px] font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded-md dark:bg-indigo-950/20">
                        <ShieldCheck className="h-3 w-3" />
                        Anonymous
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-0.5 text-[9px] font-bold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded-md dark:bg-slate-950/20">
                        <User className="h-3 w-3" />
                        Named
                      </span>
                    )}
                  </div>

                  <h2 className="text-lg font-bold text-foreground tracking-tight leading-snug">
                    {item.title}
                  </h2>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                    <Clock className="h-3.5 w-3.5" />
                    <span>Submitted {new Date(item.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusStyle(item.status)}`}>
                    {item.status || "Pending"}
                  </span>

                  <Link to={`/complaints/${item.id || item._id}`}>
                    <Button variant="outline" className="rounded-xl text-xs gap-1 h-9 font-semibold">
                      <span>Track Status</span>
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
