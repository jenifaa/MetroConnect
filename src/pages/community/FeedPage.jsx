import { useState } from "react";
import { Link, useSearchParams } from "react-router";
import {
  MessageSquare,
  ThumbsUp,
  AlertTriangle,
  Search,
  PlusCircle,
  Clock,
  Tag,
  Edit2,
  Trash2,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

import {
  useGetPostsQuery,
  useLikePostMutation,
  useDeletePostMutation,
  useReportPostMutation,
} from "@/redux/features/post/post.api";

import { useUserInfoQuery } from "@/redux/features/auth/auth.api";

import {
  LoadingState,
  EmptyState,
  ErrorState,
} from "@/components/common/States";

import ConfirmDialog from "@/components/common/ConfirmDialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const CATEGORIES = [
  "All",
  "GENERAL",
  "ACADEMIC",
  "DISCUSSION",
  "ANNOUNCEMENT",
  "CAMPUS",
  "HELP",
  "OTHER",
];

export default function FeedPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || "",
  );

  const activeCategory = searchParams.get("category") || "All";

  // =========================================================
  // API
  // =========================================================

  const { data: userResponse, isLoading: isUserLoading } =
    useUserInfoQuery(undefined);

  const currentUser = userResponse?.data || null;
  const {
    data: postsResponse,
    isLoading,
    isError,
    refetch,
  } = useGetPostsQuery(
    {
      search: searchParams.get("search") || undefined,
      category: activeCategory === "All" ? undefined : activeCategory,
    },
    {
      skip: isUserLoading || !currentUser,
    },
  );

  const [likePost] = useLikePostMutation();
  const [deletePost] = useDeletePostMutation();
  const [reportPost] = useReportPostMutation();

  const posts = postsResponse?.data || [];

  // =========================================================
  // DIALOG STATE
  // =========================================================

  const [postToDelete, setPostToDelete] = useState(null);
  const [postToReport, setPostToReport] = useState(null);

  // =========================================================
  // SEARCH
  // =========================================================

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

  // =========================================================
  // CATEGORY
  // =========================================================

  const handleCategorySelect = (category) => {
    const newParams = new URLSearchParams(searchParams);

    if (category === "All") {
      newParams.delete("category");
    } else {
      newParams.set("category", category);
    }

    setSearchParams(newParams);
  };

  // =========================================================
  // LIKE
  // =========================================================

  const handleLike = async (id) => {
    try {
      await likePost({
        id,
        reactionType: "like",
      }).unwrap();
    } catch (err) {
      console.log(err);
    }
  };

  // =========================================================
  // DELETE
  // =========================================================

  const handleDeleteConfirm = async () => {
    if (!postToDelete) return;

    try {
      await deletePost(postToDelete).unwrap();
    } catch (err) {
      console.log(err);
    } finally {
      setPostToDelete(null);
    }
  };

  // =========================================================
  // REPORT
  // =========================================================

  const handleReportConfirm = async () => {
    if (!postToReport) return;

    try {
      await reportPost({
        id: postToReport,
        reason: "Inappropriate Content",
      }).unwrap();
    } catch (err) {
      console.log(err);
    } finally {
      setPostToReport(null);
    }
  };

  // =========================================================
  // MAIN UI
  // =========================================================

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* =====================================================
              HEADER
          ====================================================== */}

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
                <Button
                  size="lg"
                  className="w-full rounded-xl shadow-sm sm:w-auto"
                >
                  <PlusCircle className="mr-2 h-5 w-5" />
                  Create Post
                </Button>
              </Link>
            </div>
          </section>

          {/* =====================================================
              SEARCH + FILTER
          ====================================================== */}

          <section className="rounded-2xl border bg-card p-4 shadow-sm">
            <div className="flex flex-col gap-4">
              {/* Search */}
              <form onSubmit={handleSearchSubmit} className="relative w-full">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search discussions, questions, announcements..."
                  className="h-11 rounded-xl border-muted bg-muted/30 pl-11 pr-4 focus-visible:bg-background"
                />
              </form>

              {/* Categories */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                {CATEGORIES.map((cat) => (
                  <Button
                    key={cat}
                    onClick={() => handleCategorySelect(cat)}
                    variant={activeCategory === cat ? "default" : "outline"}
                    className={`h-9 shrink-0 rounded-full px-4 text-xs font-medium transition-all ${
                      activeCategory === cat
                        ? "shadow-sm"
                        : "bg-background hover:bg-muted"
                    }`}
                  >
                    {cat}
                  </Button>
                ))}
              </div>
            </div>
          </section>

          {/* =====================================================
              RESULTS HEADER
          ====================================================== */}

          {!isLoading && !isError && posts.length > 0 && (
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold tracking-tight">
                  Recent Discussions
                </h2>

                <p className="text-sm text-muted-foreground">
                  Explore what your campus community is talking about.
                </p>
              </div>

              <div className="hidden rounded-full border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground sm:block">
                {posts.length} {posts.length === 1 ? "post" : "posts"}
              </div>
            </div>
          )}

          {/* =====================================================
              STATES
          ====================================================== */}

          {isUserLoading ? (
            <LoadingState message="Checking authentication..." items={1} />
          ) : !currentUser ? (
            <EmptyState
              title="Please log in first"
              description="You need to log in to view and participate in campus discussions."
            >
              <Link to="/login">
                <Button className="rounded-xl">Log In</Button>
              </Link>
            </EmptyState>
          ) : isLoading ? (
            <LoadingState message="Loading discussions..." items={4} />
          ) : isError ? (
            <ErrorState onRetry={refetch} />
          ) : posts.length === 0 ? (
            <EmptyState
              title="No posts yet"
              description={
                searchQuery || activeCategory !== "All"
                  ? "No posts match your filters. Try clearing search or categories."
                  : "Be the first to share an update or start a discussion on campus!"
              }
            >
              <Link to="/user/posts/new">
                <Button className="rounded-xl">Create a Post</Button>
              </Link>
            </EmptyState>
          ) : (
            /* =====================================================
               POSTS GRID
            ====================================================== */

            <div className="grid gap-5 md:grid-cols-2">
              {posts.map((post) => {
                const postId = post.id || post._id;

                const isOwner =
                  currentUser?.id === post?.author?.id ||
                  currentUser?._id === post?.author?._id ||
                  currentUser?.role === "ADMIN" ||
                  currentUser?.role === "SUPER_ADMIN";

                return (
                  <Card
                    key={postId}
                    className="group overflow-hidden rounded-3xl border-muted/80 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg"
                  >
                    <CardContent className="p-0">
                      {/* =================================================
                          IMAGE
                      ================================================== */}

                      {post.images?.length > 0 && (
                        <Link to={`/posts/${postId}`}>
                          <div className="relative aspect-video w-full overflow-hidden bg-muted">
                            <img
                              src={post.images[0]}
                              alt="Post attachment"
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />

                            {/* Image overlay */}
                            <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent opacity-60" />

                            <div className="absolute bottom-3 right-3 rounded-full bg-black/50 px-3 py-1 text-[11px] font-medium text-white backdrop-blur-md">
                              View post
                            </div>
                          </div>
                        </Link>
                      )}

                      <div className="p-5 sm:p-6">
                        {/* =============================================
                            AUTHOR HEADER
                        ============================================== */}

                        <div className="flex items-start justify-between gap-3">
                          <div className="flex min-w-0 items-center gap-3">
                            <img
                              src={
                                post.author?.picture ||
                                "https://i.ibb.co.com/xttK0CDW/pp.jpg"
                              }
                              alt="Author"
                              className="h-11 w-11 shrink-0 rounded-full border-2 border-background object-cover shadow-sm ring-1 ring-muted"
                            />

                            <div className="min-w-0">
                              <p className="truncate text-sm font-semibold">
                                {post.author?.name || "MU Student"}
                              </p>

                              <div className="mt-0.5 flex flex-wrap items-center gap-1.5 text-[11px] text-muted-foreground">
                                <Clock className="h-3 w-3" />

                                <span>
                                  {new Date(
                                    post.createdAt,
                                  ).toLocaleDateString()}
                                </span>

                                <span>•</span>

                                <span className="capitalize">
                                  {post.author?.role?.toLowerCase() ||
                                    "student"}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Category */}
                          <div className="shrink-0">
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/15 bg-primary/5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
                              <Tag className="h-3 w-3" />
                              {post.category || "General"}
                            </span>
                          </div>
                        </div>

                        {/* =============================================
                            OWNER ACTIONS
                        ============================================== */}

                        {isOwner && (
                          <div className="mt-4 flex items-center justify-end gap-1 border-b pb-3">
                            <Link to={`/posts/${postId}/edit`}>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 rounded-lg px-2.5 text-xs"
                              >
                                <Edit2 className="mr-1.5 h-3.5 w-3.5" />
                                Edit
                              </Button>
                            </Link>

                            <Button
                              onClick={() => setPostToDelete(postId)}
                              variant="ghost"
                              size="sm"
                              className="h-8 rounded-lg px-2.5 text-xs text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/20"
                            >
                              <Trash2 className="mr-1.5 h-3.5 w-3.5" />
                              Delete
                            </Button>
                          </div>
                        )}

                        {/* =============================================
                            POST CONTENT
                        ============================================== */}

                        <div className="mt-5">
                          <Link to={`/posts/${postId}`}>
                            <div className="flex items-start justify-between gap-3">
                              <h2 className="line-clamp-2 text-lg font-bold leading-6 tracking-tight transition-colors group-hover:text-primary sm:text-xl">
                                {post.title}
                              </h2>

                              <ArrowUpRight className="mt-1 hidden h-4 w-4 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary sm:block" />
                            </div>
                          </Link>

                          <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">
                            {post.description || post.content}
                          </p>
                        </div>

                        {/* =============================================
                            INTERACTIONS
                        ============================================== */}

                        <div className="mt-6 flex items-center justify-between border-t pt-4">
                          <div className="flex items-center gap-1">
                            {/* Like */}
                            <Button
                              onClick={() => handleLike(postId)}
                              variant="ghost"
                              className="h-9 gap-2 rounded-xl px-3 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                            >
                              <ThumbsUp className="h-4 w-4" />

                              <span className="text-xs font-semibold">
                                {post.reactions?.length || 0}
                              </span>
                            </Button>

                            {/* Comments */}
                            <Link to={`/posts/${postId}`}>
                              <Button
                                variant="ghost"
                                className="h-9 gap-2 rounded-xl px-3 text-muted-foreground transition-colors hover:bg-blue-500/10 hover:text-blue-500"
                              >
                                <MessageSquare className="h-4 w-4" />

                                <span className="text-xs font-semibold">
                                  {post.comments?.length || 0}
                                </span>
                              </Button>
                            </Link>
                          </div>

                          {/* Report */}
                          {!isOwner && (
                            <Button
                              onClick={() => setPostToReport(postId)}
                              variant="ghost"
                              className="h-9 gap-2 rounded-xl px-3 text-xs text-muted-foreground hover:bg-red-500/10 hover:text-red-500"
                            >
                              <AlertTriangle className="h-4 w-4" />

                              <span className="hidden sm:inline">Report</span>
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          {/* =====================================================
              DELETE CONFIRMATION
          ====================================================== */}

          <ConfirmDialog
            isOpen={!!postToDelete}
            title="Delete Community Post"
            description="Are you sure you want to delete this post? This operation cannot be undone and will remove all associated comments."
            confirmText="Yes, Delete"
            onConfirm={handleDeleteConfirm}
            onClose={() => setPostToDelete(null)}
          />

          {/* =====================================================
              REPORT CONFIRMATION
          ====================================================== */}

          <ConfirmDialog
            isOpen={!!postToReport}
            title="Report Community Post"
            description="Are you sure you want to flag this post as inappropriate? Community administrators will review this content."
            confirmText="Flag Content"
            isDanger={false}
            onConfirm={handleReportConfirm}
            onClose={() => setPostToReport(null)}
          />
        </div>
      </div>
    </div>
  );
}
