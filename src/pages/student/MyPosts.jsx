import { useState } from "react";
import { Link } from "react-router";
import {
  Calendar,
  Edit2,
  FileText,
  MessageSquare,
  PlusCircle,
  ThumbsUp,
  Trash2,
  Tag,
  MoreHorizontal,
  EyeOff,
} from "lucide-react";

import {
  useDeletePostMutation,
  useGetMyPostsQuery,
} from "@/redux/features/post/post.api";

import {
  LoadingState,
  EmptyState,
  ErrorState,
} from "@/components/common/States";

import ConfirmDialog from "@/components/common/ConfirmDialog";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function MyPosts() {
  const {
    data: postsResponse,
    isLoading,
    isError,
    refetch,
  } = useGetMyPostsQuery();

  const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation();

  const [postToDelete, setPostToDelete] = useState(null);

  const posts = postsResponse?.data || [];

  const handleDeleteConfirm = async () => {
    if (!postToDelete) return;

    try {
      await deletePost(postToDelete).unwrap();

      setPostToDelete(null);
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto mt-14 max-w-6xl px-4 py-8">
        <LoadingState message="Loading your posts..." items={4} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto mt-14 max-w-6xl px-4 py-8">
        <ErrorState onRetry={refetch} />
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-14 max-w-6xl px-4 py-8 space-y-8">
      {/* ================= Header ================= */}
      <div className="flex flex-col gap-5 border-b pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
            <FileText className="h-7 w-7 text-primary" />
          </div>

          <div>
            <h1 className="text-3xl font-black tracking-tight">My Posts</h1>

            <p className="mt-1 text-sm text-muted-foreground">
              Manage, edit, and keep track of everything you have shared with
              the Metropolitan University community.
            </p>
          </div>
        </div>

        <Link to="/user/posts/new">
          <Button className="h-11 gap-2 rounded-xl px-5 shadow-md">
            <PlusCircle className="h-4 w-4" />
            Create Post
          </Button>
        </Link>
      </div>

      {/* ================= Stats ================= */}
      {posts.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-3">
          {/* Total Posts */}
          <Card className="rounded-2xl border shadow-sm">
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                <FileText className="h-5 w-5 text-primary" />
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Total Posts
                </p>

                <p className="text-2xl font-bold">{posts.length}</p>
              </div>
            </CardContent>
          </Card>

          {/* Total Reactions */}
          <Card className="rounded-2xl border shadow-sm">
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                <ThumbsUp className="h-5 w-5 text-primary" />
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Total Reactions
                </p>

                <p className="text-2xl font-bold">
                  {posts.reduce(
                    (total, post) => total + (post.reactions?.length || 0),
                    0,
                  )}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Total Comments */}
          <Card className="rounded-2xl border shadow-sm">
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                <MessageSquare className="h-5 w-5 text-primary" />
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Total Comments
                </p>

                <p className="text-2xl font-bold">
                  {posts.reduce(
                    (total, post) => total + (post.comments?.length || 0),
                    0,
                  )}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ================= Empty State ================= */}
      {posts.length === 0 ? (
        <EmptyState
          title="You haven't created any posts yet"
          description="Share something with the Metropolitan University community and start a conversation."
        >
          <Link to="/user/posts/new">
            <Button className="rounded-xl gap-2">
              <PlusCircle className="h-4 w-4" />
              Create Your First Post
            </Button>
          </Link>
        </EmptyState>
      ) : (
        <>
          {/* ================= Posts Header ================= */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Your Published Posts</h2>

              <p className="text-sm text-muted-foreground">
                {posts.length} {posts.length === 1 ? "post" : "posts"} created
              </p>
            </div>
          </div>

          {/* ================= Posts Grid ================= */}
          <div className="grid gap-5 md:grid-cols-2">
            {posts.map((post) => {
              const postId = post?.id || post?._id;

              const description = post?.description || post?.content || "";

              const images =
                post?.images?.length > 0
                  ? post.images
                  : post?.image
                    ? [post.image]
                    : [];

              return (
                <Card
                  key={postId}
                  className="group relative overflow-hidden rounded-2xl border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg"
                >
                  {/* ================= Image ================= */}
                  {images.length > 0 && (
                    <Link to={`/posts/${postId}`}>
                      <div className="relative h-52 overflow-hidden bg-muted">
                        <img
                          src={images[0]}
                          alt={post.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />

                        {/* More Images */}
                        {images.length > 1 && (
                          <div className="absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                            +{images.length - 1} photos
                          </div>
                        )}
                      </div>
                    </Link>
                  )}

                  <CardContent className="space-y-5 p-5">
                    {/* ================= Top ================= */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Category */}
                        <span className="inline-flex items-center gap-1 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
                          <Tag className="h-3 w-3" />

                          {post?.category || "GENERAL"}
                        </span>

                        {/* Anonymous */}
                        {post?.isAnonymous && (
                          <span className="inline-flex items-center gap-1 rounded-full border bg-muted px-2.5 py-1 text-[10px] font-semibold text-muted-foreground">
                            <EyeOff className="h-3 w-3" />
                            Anonymous
                          </span>
                        )}
                      </div>

                      {/* Action Menu */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 shrink-0 rounded-xl"
                          >
                            <MoreHorizontal className="h-5 w-5" />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuItem asChild>
                            <Link
                              to={`/posts/${postId}/edit`}
                              className="flex cursor-pointer items-center gap-2"
                            >
                              <Edit2 className="h-4 w-4" />
                              Edit Post
                            </Link>
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            onClick={() => setPostToDelete(postId)}
                            className="cursor-pointer text-red-500 focus:text-red-500"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Post
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    {/* ================= Content ================= */}
                    <div className="space-y-2">
                      <Link to={`/posts/${postId}`}>
                        <h2 className="line-clamp-2 text-xl font-bold tracking-tight transition-colors hover:text-primary">
                          {post?.title}
                        </h2>
                      </Link>

                      <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                        {description}
                      </p>
                    </div>

                    {/* ================= Date ================= */}
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5" />

                      <span>
                        Posted{" "}
                        {post?.createdAt
                          ? new Date(post.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              },
                            )
                          : "Recently"}
                      </span>
                    </div>

                    {/* ================= Footer ================= */}
                    <div className="flex items-center justify-between border-t pt-4">
                      <div className="flex items-center gap-5">
                        {/* Reactions */}
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/5">
                            <ThumbsUp className="h-4 w-4 text-primary" />
                          </div>

                          <span className="font-medium">
                            {post?.reactions?.length || 0}
                          </span>
                        </div>

                        {/* Comments */}
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/5">
                            <MessageSquare className="h-4 w-4 text-primary" />
                          </div>

                          <span className="font-medium">
                            {post?.comments?.length || 0}
                          </span>
                        </div>
                      </div>

                      <Link to={`/posts/${postId}`}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="rounded-lg text-xs"
                        >
                          View Post
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </>
      )}

      {/* ================= Delete Dialog ================= */}
      <ConfirmDialog
        isOpen={!!postToDelete}
        title="Delete Your Post"
        description="Are you sure you want to delete this post? This action cannot be undone and associated comments may also be removed."
        confirmText={isDeleting ? "Deleting..." : "Yes, Delete"}
        onConfirm={handleDeleteConfirm}
        onClose={() => setPostToDelete(null)}
      />
    </div>
  );
}

export default MyPosts;
