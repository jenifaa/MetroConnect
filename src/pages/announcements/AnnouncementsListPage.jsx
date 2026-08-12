import { useState } from "react";
import { Link, useSearchParams } from "react-router";
import { Megaphone, Search, Clock,  ArrowRight } from "lucide-react";
import { useGetAnnouncementsQuery } from "@/redux/features/announcement/announcement.api";
import { LoadingState, EmptyState, ErrorState } from "@/components/common/States";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function AnnouncementsListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");

  const {
    data: announcementsResponse,
    isLoading,
    isError,
    refetch,
  } = useGetAnnouncementsQuery({
    search: searchQuery || undefined,
  });

  const announcements = announcementsResponse?.data || [];

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

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl space-y-8 mt-14">
      {/* Header section */}
      <div className="pb-4 border-b border-muted">
        <h1 className="text-3xl font-black tracking-tight text-foreground font-serif flex items-center gap-3">
          <Megaphone className="h-8 w-8 text-primary shrink-0" />
          University Announcements
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Official notifications, holiday notices, and campus updates from the Metropolitan University administration.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center justify-between">
        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search announcements..."
            className="pl-10 h-10 rounded-xl"
          />
        </form>
      </div>

      {/* Announcements List */}
      {isLoading ? (
        <LoadingState message="Loading official notices..." items={3} />
      ) : isError ? (
        <ErrorState onRetry={refetch} />
      ) : announcements.length === 0 ? (
        <EmptyState
          title="No notices published"
          description={
            searchQuery
              ? "No notices match your keywords."
              : "All quiet! The administration hasn't posted any announcements recently."
          }
        />
      ) : (
        <div className="space-y-6">
          {announcements.map((item) => (
            <Card
              key={item.id || item._id}
              className="overflow-hidden border border-muted border-l-4 border-l-primary rounded-2xl bg-card shadow-xs hover:shadow-md hover:border-primary/20 transition-all duration-200"
            >
              <CardContent className="p-6 md:p-8 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-primary bg-primary/10 border border-primary/20 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      {item.category || "Official Announcement"}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold tracking-tight text-foreground leading-snug">
                    {item.title}
                  </h2>

                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {item.content}
                  </p>
                </div>

                <div className="shrink-0 self-end md:self-center">
                  <Link to={`/announcements/${item.id || item._id}`}>
                    <Button className="rounded-xl text-xs gap-1.5 h-10 font-semibold shadow-sm">
                      <span>Read Announcement</span>
                      <ArrowRight className="h-4 w-4" />
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
