import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router";
import {
  Search,
  X,
  RefreshCw,
  Inbox,
  Sparkles,
  PlusCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  byNewest,
  countByFilter,
  FILTER_LABELS,
  matchesFilter,
  matchesSearch,
  normalizeAnnouncement,
  normalizeLostFound,
  normalizePost,
  normalizeQuestion,
  toList,
} from "@/utils/Feed.utils";
import { FeedFilterBar, FeedSidebar } from "./FeedSidebar";
import FeedCard from "./FeedCard";
import { useGetPostsQuery } from "@/redux/features/post/post.api";
import { useGetAnnouncementsQuery } from "@/redux/features/announcement/announcement.api";
import { useGetQuestionsQuery } from "@/redux/features/question/question.api";
import { useGetLostFoundQuery } from "@/redux/features/lost-found/lostFound.api";

const ARGS = { limit: 100 };

const PostSection = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const active = searchParams.get("filter") || "all";
  const [search, setSearch] = useState("");

  const posts = useGetPostsQuery(ARGS);
  const announcements = useGetAnnouncementsQuery(ARGS);
  const questions = useGetQuestionsQuery(ARGS);
  const lostFound = useGetLostFoundQuery(ARGS);

  const sources = [
    ["Posts", posts],
    ["Announcements", announcements],
    ["Questions", questions],
    ["Lost & found", lostFound],
  ];
  const isLoading = sources.some(([, q]) => q.isLoading);
  const failed = sources.filter(([, q]) => q.isError);

  // One unified, newest-first list built from all four APIs
  const items = useMemo(
    () =>
      [
        ...toList(posts.data).map(normalizePost),
        ...toList(announcements.data).map(normalizeAnnouncement),
        ...toList(questions.data).map(normalizeQuestion),
        ...toList(lostFound.data).map(normalizeLostFound),
      ].sort(byNewest),
    [posts.data, announcements.data, questions.data, lostFound.data],
  );

  const counts = useMemo(() => countByFilter(items), [items]);
  const visible = items.filter(
    (i) => matchesFilter(i, active) && matchesSearch(i, search.trim()),
  );

  const handleSelect = (key) => {
    const next = new URLSearchParams(searchParams);
    if (key === "all") next.delete("filter");
    else next.set("filter", key);
    setSearchParams(next);
  };

  const retryFailed = () => failed.forEach(([, q]) => q.refetch());

  return (
    <div className="container mx-auto  max-w-6xl px-4 py-8">
      <section className="relative overflow-hidden rounded-3xl border bg-card shadow-sm">
        {/* Decorative background */}
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />

        <div className="relative flex flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/10">
              <Sparkles className="h-7 w-7 text-primary" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  Campus Discussions
                </h1>

                <span className="rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold text-primary">
                  Community
                </span>
              </div>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                Share ideas, ask questions, check updates, and connect with
                Metropolitan University students.
              </p>
            </div>
          </div>

          <Link to="/user/posts/new">
            <Button size="lg" className="w-full rounded-xl shadow-sm sm:w-auto">
              <PlusCircle className="mr-2 h-5 w-5" />
              Create Post
            </Button>
          </Link>
        </div>
      </section>
      <div className="grid gap-3 rounded-[28px] border bg-muted/40 p-3 lg:grid-cols-[250px_minmax(0,1fr)]">
        {/* Sidebar (desktop) */}
        <aside className="hidden lg:block">
          <div className="sticky top-20">
            <FeedSidebar
              active={active}
              onSelect={handleSelect}
              counts={counts}
            />
          </div>
        </aside>

        {/* Main panel */}
        <main className="min-w-0 space-y-6 rounded-3xl border bg-background p-5 shadow-sm md:p-7">
          <div className="lg:hidden">
            <FeedFilterBar
              active={active}
              onSelect={handleSelect}
              counts={counts}
            />
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="font-serif text-2xl font-bold tracking-tight md:text-3xl">
                {FILTER_LABELS[active] || "All activity"}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {isLoading
                  ? "Loading..."
                  : `${visible.length} ${visible.length === 1 ? "item" : "items"}`}
              </p>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search this view"
                className="h-10 rounded-xl pl-10 pr-9"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* A failed API should not blank the whole page */}
          {failed.length > 0 && (
            <div
              role="alert"
              className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm"
            >
              <span className="text-destructive">
                Could not load{" "}
                {failed.map(([name]) => name.toLowerCase()).join(", ")}.
                Everything else is still shown.
              </span>
              <Button
                size="sm"
                variant="outline"
                onClick={retryFailed}
                className="gap-1.5 rounded-xl"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Retry
              </Button>
            </div>
          )}

          {isLoading && visible.length === 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="animate-pulse rounded-3xl border p-2">
                  <div className="aspect-4/3 rounded-2xl bg-muted" />
                  <div className="space-y-2 p-3">
                    <div className="h-4 w-2/3 rounded bg-muted" />
                    <div className="h-3 w-1/3 rounded bg-muted" />
                  </div>
                </div>
              ))}
            </div>
          ) : visible.length === 0 ? (
            <div className="flex flex-col items-center gap-3 rounded-3xl border border-dashed py-16 text-center">
              <Inbox
                className="h-10 w-10 text-muted-foreground"
                strokeWidth={1.5}
              />
              <div>
                <p className="font-semibold">Nothing here yet</p>
                <p className="text-sm text-muted-foreground">
                  {search
                    ? "No results for that search. Try another keyword."
                    : "Nothing matches this filter. Try another one from the sidebar."}
                </p>
              </div>
              {(search || active !== "all") && (
                <Button
                  variant="outline"
                  className="rounded-xl"
                  onClick={() => {
                    setSearch("");
                    handleSelect("all");
                  }}
                >
                  Show all activity
                </Button>
              )}
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {visible.map((item) => (
                <FeedCard key={item.key} item={item} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default PostSection;
