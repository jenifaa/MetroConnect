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
} from "lucide-react";
import {
  useGetPostsQuery,
  useLikePostMutation,
  useDeletePostMutation,
  useReportPostMutation,
} from "@/redux/features/post/post.api";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { LoadingState, EmptyState, ErrorState } from "@/components/common/States";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
// import { toast } from "@/components/ui/toast";

const CATEGORIES = [
  "All",
  "General",
  "Academic",
  "Discussion",
  "Announcement",
  "Campus",
  "Help",
  "Other",
];

export default function FeedPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const activeCategory = searchParams.get("category") || "All";

  // Redux API queries
  const { data: userResponse } = useUserInfoQuery(undefined);
  const {
    data: postsResponse,
    isLoading,
    isError,
    refetch,
  } = useGetPostsQuery({
    search: searchParams.get("search") || undefined,
    category: activeCategory === "All" ? undefined : activeCategory,
  });

  const [likePost] = useLikePostMutation();
  const [deletePost] = useDeletePostMutation();
  const [reportPost] = useReportPostMutation();

  const currentUser = userResponse?.data || {};
  const posts = postsResponse?.data || [];

  // Dialog State
  const [postToDelete, setPostToDelete] = useState(null);
  const [postToReport, setPostToReport] = useState(null);

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

  const handleCategorySelect = (category) => {
    const newParams = new URLSearchParams(searchParams);
    if (category === "All") {
      newParams.delete("category");
    } else {
      newParams.set("category", category);
    }
    setSearchParams(newParams);
  };

  const handleLike = async (id) => {
    try {
      await likePost(id).unwrap();
    } catch (err) {
      // toast.error(err?.data?.message || "Could not like post");
      console.log(err);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!postToDelete) return;
    try {
      await deletePost(postToDelete).unwrap();
      // toast.success("Post deleted successfully");
    } catch (err) {
      // toast.error(err?.data?.message || "Could not delete post");
      console.log(err);
    } finally {
      setPostToDelete(null);
    }
  };

  const handleReportConfirm = async () => {
    if (!postToReport) return;
    try {
      await reportPost({ id: postToReport, reason: "Inappropriate Content" }).unwrap();
      // toast.success("Post reported to community moderators");
    } catch (err) {
      // toast.error(err?.data?.message || "Could not submit report");
      console.log(err);
    } finally {
      setPostToReport(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl space-y-8 mt-14">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-muted">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-foreground font-serif">
            Campus discussions
          </h1>
          <p className="text-sm text-muted-foreground">
            Share ideas, check updates, and build connections with Metropolitan University students.
          </p>
        </div>
        <Link to="/posts/new">
          <Button className="rounded-xl gap-2 font-semibold shadow-md">
            <PlusCircle className="h-4 w-4" />
            Create Post
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
            placeholder="Search posts..."
            className="pl-10 h-10 rounded-xl"
          />
        </form>

        {/* Categories scrollable list */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full no-scrollbar">
          {CATEGORIES.map((cat) => (
            <Button
              key={cat}
              onClick={() => handleCategorySelect(cat)}
              variant={activeCategory === cat ? "default" : "outline"}
              className="rounded-full text-xs h-8 px-3 shrink-0"
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      {/* Posts Feed */}
      {isLoading ? (
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
          <Link to="/posts/new">
            <Button className="rounded-xl">Create a Post</Button>
          </Link>
        </EmptyState>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => {
            const isOwner = currentUser?.id === post?.author?.id || currentUser?._id === post?.author?._id || currentUser?.role === "ADMIN" || currentUser?.role === "SUPER_ADMIN";
            return (
              <Card
                key={post.id || post._id}
                className="overflow-hidden border border-muted rounded-2xl shadow-xs hover:border-primary/20 transition-all duration-200"
              >
                <CardContent className="p-6 space-y-4">
                  {/* Post Info Bar */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={post.author?.picture || "https://i.ibb.co.com/xttK0CDW/pp.jpg"}
                        alt="Author"
                        className="h-10 w-10 rounded-full object-cover border"
                      />
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          {post.author?.name || "MU Student"}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                          <span>•</span>
                          <span className="capitalize">{post.author?.role?.toLowerCase()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold tracking-wider text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full uppercase">
                        <Tag className="h-2.5 w-2.5" />
                        {post.category || "General"}
                      </span>
                      {isOwner && (
                        <div className="flex items-center gap-1 border-l pl-2">
                          <Link to={`/posts/${post.id || post._id}/edit`}>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                              <Edit2 className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground" />
                            </Button>
                          </Link>
                          <Button
                            onClick={() => setPostToDelete(post.id || post._id)}
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-lg"
                          >
                            <Trash2 className="h-3.5 w-3.5 text-red-500 hover:text-red-600" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="space-y-2">
                    <Link to={`/posts/${post.id || post._id}`}>
                      <h2 className="text-xl font-bold tracking-tight hover:text-primary transition-colors text-foreground">
                        {post.title}
                      </h2>
                    </Link>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                      {post.description || post.content}
                    </p>
                  </div>

                  {/* Image attachment if exists */}
                  {post.image && (
                    <div className="relative rounded-2xl overflow-hidden max-h-96 border">
                      <img
                        src={post.image}
                        alt="Attachment"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Interaction Controls */}
                  <div className="flex items-center justify-between border-t border-muted/50 pt-4 text-sm">
                    <div className="flex items-center gap-4">
                      <Button
                        onClick={() => handleLike(post.id || post._id)}
                        variant="ghost"
                        className="gap-2 rounded-xl h-9 hover:bg-primary/5 hover:text-primary"
                      >
                        <ThumbsUp className="h-4 w-4" />
                        <span>{post.likes?.length || 0}</span>
                      </Button>

                      <Link to={`/posts/${post.id || post._id}`}>
                        <Button
                          variant="ghost"
                          className="gap-2 rounded-xl h-9 hover:bg-blue-500/5 hover:text-blue-500"
                        >
                          <MessageSquare className="h-4 w-4" />
                          <span>{post.comments?.length || 0}</span>
                        </Button>
                      </Link>
                    </div>

                    {!isOwner && (
                      <Button
                        onClick={() => setPostToReport(post.id || post._id)}
                        variant="ghost"
                        className="gap-2 text-muted-foreground hover:text-red-500 hover:bg-red-500/5 rounded-xl h-9"
                      >
                        <AlertTriangle className="h-4 w-4" />
                        <span>Report</span>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!postToDelete}
        title="Delete Community Post"
        description="Are you sure you want to delete this post? This operation cannot be undone and will remove all associated comments."
        confirmText="Yes, Delete"
        onConfirm={handleDeleteConfirm}
        onClose={() => setPostToDelete(null)}
      />

      {/* Report Confirmation */}
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
  );
}
