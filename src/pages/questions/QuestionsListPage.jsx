import { useState } from "react";
import { Link, useSearchParams } from "react-router";
import {
  MessageSquare,
  Search,
  PlusCircle,
  ChevronLeft,
  ChevronRight,
  X,
  UserRound,
} from "lucide-react";
import { useGetQuestionsQuery } from "@/redux/features/question/question.api";
import { LoadingState, EmptyState, ErrorState } from "@/components/common/States";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Avatar, CategoryBadge, StatusBadge, TagList } from "./QuestionParts";
import { CATEGORIES, getId, timeAgo } from "./question.utils";
 
const PAGE_SIZE = 10;
 
const STATUS_TABS = [
  { value: "all", label: "All" },
  { value: "open", label: "Open" },
  { value: "solved", label: "Solved" },
];
 
export default function QuestionsListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
 
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "all";
  const status = searchParams.get("status") || "all";
  const page = Number(searchParams.get("page") || 1);
 
  const [searchQuery, setSearchQuery] = useState(search);
 
  const { data, isLoading, isFetching, isError, refetch } = useGetQuestionsQuery({
    page,
    limit: PAGE_SIZE,
    searchTerm: search || undefined, // backend reads `searchTerm`
    category: category === "all" ? undefined : category,
    isSolved: status === "all" ? undefined : String(status === "solved"),
  });
 
  const questions = data?.data || [];
  const meta = data?.meta;
  const totalPages = meta?.totalPage ?? meta?.totalPages ?? 1;
  const hasFilters = Boolean(search) || category !== "all" || status !== "all";
 
  // Any filter change goes back to page 1 unless `page` is part of the update
  const updateParams = (updates) => {
    const next = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (!value || value === "all") next.delete(key);
      else next.set(key, value);
    });
    if (!("page" in updates)) next.delete("page");
    setSearchParams(next);
  };
 
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateParams({ search: searchQuery.trim() });
  };
 
  const clearAll = () => {
    setSearchQuery("");
    setSearchParams(new URLSearchParams());
  };
 
  return (
    <div className="container mx-auto mt-14 max-w-4xl space-y-6 px-4 py-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <h1 className="font-serif text-3xl font-bold tracking-tight">
            Questions
          </h1>
          <p className="max-w-md text-sm text-muted-foreground">
            Stuck on a course, a deadline or a career choice? Ask, or help a
            classmate who is.
          </p>
        </div>
        <div className="flex gap-2">
          <Link to="/questions/my">
            <Button variant="outline" className="gap-2 rounded-xl">
              <UserRound className="h-4 w-4" />
              My questions
            </Button>
          </Link>
          <Link to="/questions/new">
            <Button className="gap-2 rounded-xl">
              <PlusCircle className="h-4 w-4" />
              Ask a question
            </Button>
          </Link>
        </div>
      </div>
 
      {/* Search + status */}
      <div className="space-y-4 rounded-2xl border bg-card p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <form onSubmit={handleSearchSubmit} className="relative flex-1">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title or description"
              className="h-10 rounded-xl pl-10 pr-9"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  updateParams({ search: "" });
                }}
                className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </form>
 
          <div className="flex rounded-xl bg-muted p-1" role="tablist">
            {STATUS_TABS.map((tab) => (
              <button
                key={tab.value}
                role="tab"
                aria-selected={status === tab.value}
                onClick={() => updateParams({ status: tab.value })}
                className={cn(
                  "rounded-lg px-4 py-1.5 text-sm font-medium transition",
                  status === tab.value
                    ? "bg-background shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
 
        <div className="no-scrollbar flex items-center gap-2 overflow-x-auto">
          {[{ value: "all", label: "All topics" }, ...CATEGORIES].map((c) => (
            <Button
              key={c.value}
              size="sm"
              variant={category === c.value ? "default" : "outline"}
              onClick={() => updateParams({ category: c.value })}
              className="h-8 shrink-0 rounded-full px-3 text-xs"
            >
              {c.label}
            </Button>
          ))}
        </div>
      </div>
 
      {/* List */}
      {isLoading ? (
        <LoadingState message="Loading questions..." items={4} />
      ) : isError ? (
        <ErrorState onRetry={refetch} />
      ) : questions.length === 0 ? (
        <EmptyState
          title={hasFilters ? "Nothing matches those filters" : "No questions yet"}
          description={
            hasFilters
              ? "Try a different keyword, or clear the filters to see everything."
              : "Be the first to ask. Someone in your class probably has the same doubt."
          }
        >
          {hasFilters ? (
            <Button variant="outline" onClick={clearAll} className="rounded-xl">
              Clear filters
            </Button>
          ) : (
            <Link to="/questions/new">
              <Button className="rounded-xl">Ask a question</Button>
            </Link>
          )}
        </EmptyState>
      ) : (
        <div className={cn("space-y-3", isFetching && "opacity-70 transition")}>
          {questions.map((q) => (
            <Link key={getId(q)} to={`/questions/${getId(q)}`} className="group block">
              <Card className="relative overflow-hidden rounded-2xl border shadow-none transition-colors group-hover:border-indigo-300 dark:group-hover:border-indigo-800">
                <span
                  className={cn(
                    "absolute inset-y-0 left-0 w-1",
                    q.isSolved ? "bg-emerald-500" : "bg-indigo-500/70",
                  )}
                />
                <CardContent className="space-y-3 p-5 pl-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <StatusBadge isSolved={q.isSolved} />
                    <CategoryBadge category={q.category} />
                  </div>
 
                  <div className="space-y-1">
                    <h2 className="text-lg font-semibold leading-snug tracking-tight group-hover:text-primary">
                      {q.title}
                    </h2>
                    <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                      {q.description}
                    </p>
                  </div>
 
                  <TagList tags={q.tags} limit={4} />
 
                  <div className="flex items-center justify-between pt-1 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Avatar user={q.author} size="sm" />
                      <span className="font-medium text-foreground/80">
                        {q.author?.name || "Student"}
                      </span>
                      <span>asked {timeAgo(q.createdAt)}</span>
                    </div>
                    <span className="flex items-center gap-1.5 font-medium">
                      <MessageSquare className="h-3.5 w-3.5" />
                      {q.commentsCount ?? 0}{" "}
                      {(q.commentsCount ?? 0) === 1 ? "answer" : "answers"}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
 
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-1 rounded-xl"
            disabled={page <= 1}
            onClick={() => updateParams({ page: String(page - 1) })}
          >
            <ChevronLeft className="h-4 w-4" /> Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            className="gap-1 rounded-xl"
            disabled={page >= totalPages}
            onClick={() => updateParams({ page: String(page + 1) })}
          >
            Next <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}