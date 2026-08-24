import {
  MessageCircle,
  Heart,
  MoreHorizontal,
  Eye,
  Clock,
  Tag,
  Pencil,
  Trash2,
  Flag,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router";

import { useGetPostsQuery } from "@/redux/features/post/post.api";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function AllPosts() {
  const { data: postsResponse, isLoading, isError } = useGetPostsQuery();
  const { data: userResponse } = useUserInfoQuery(undefined);

  const posts = postsResponse?.data || [];
  const currentUser = userResponse?.data || {};

  if (isLoading) {
    return (
      <div className="min-h-screen bg-muted/20 py-10">
        <div className="mx-auto max-w-6xl px-4">
          <div className="space-y-5">
            {[1, 2, 3].map((item) => (
              <Card key={item} className="animate-pulse rounded-2xl">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="h-11 w-11 rounded-full bg-muted" />

                    <div className="flex-1 space-y-3">
                      <div className="h-4 w-40 rounded bg-muted" />
                      <div className="h-6 w-3/4 rounded bg-muted" />
                      <div className="h-4 w-full rounded bg-muted" />
                      <div className="h-4 w-5/6 rounded bg-muted" />
                    </div>
                  </div>
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
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold">Unable to load posts</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Something went wrong while loading the community posts.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/20 py-10">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-primary">
              <Sparkles className="h-5 w-5" />

              <span className="text-sm font-semibold">
                Metropolitan University Community
              </span>
            </div>

            <h1 className="text-3xl font-black tracking-tight md:text-4xl">
              All Posts
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              Explore discussions, questions, academic updates and conversations
              from the university community.
            </p>
          </div>

          <Link className="rounded-xl px-5 shadow-sm" to="/user/posts/new">
            Create Post
          </Link>
        </div>

        {/* Empty State */}
        {posts.length === 0 ? (
          <Card className="rounded-2xl border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-20 text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                <MessageCircle className="h-8 w-8 text-primary" />
              </div>

              <h2 className="text-xl font-bold">No posts yet</h2>

              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                Be the first person to start a discussion with the Metropolitan
                University community.
              </p>

              <Link to="/user/posts/new" className="mt-6">
                <Button className="rounded-xl">Create the First Post</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          /* Posts */
          <div className="space-y-5">
            {posts.map((post) => {
              const postId = post.id || post._id;

              const reactionCount = post.reactions?.length || 0;
              const commentCount = post.comments?.length || 0;

              const isOwner =
                currentUser?.id === post?.author?.id ||
                currentUser?._id === post?.author?._id;

              const isAdmin =
                currentUser?.role === "ADMIN" ||
                currentUser?.role === "SUPER_ADMIN";

              return (
                <Card
                  key={postId}
                  className="group overflow-hidden rounded-2xl border bg-background shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <CardContent className="p-0">
                    {/* Top section */}
                    <div className="p-5 sm:p-6">
                      <div className="flex items-start justify-between gap-4">
                        {/* Author */}
                        <div className="flex min-w-0 items-center gap-3">
                          <img
                            src={
                              post.author?.picture ||
                              "https://i.ibb.co.com/xttK0CDW/pp.jpg"
                            }
                            alt={post.author?.name || "Student"}
                            className="h-11 w-11 shrink-0 rounded-full border object-cover"
                          />

                          <div className="min-w-0">
                            <p className="truncate text-sm font-bold">
                              {post.author?.name || "MU Student"}
                            </p>

                            <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />

                                {post.createdAt
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

                              <span>•</span>

                              <span>{post.author?.role || "Student"}</span>
                            </div>
                          </div>
                        </div>

                        {/* Right actions */}
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="secondary"
                            className="hidden rounded-full px-3 py-1 text-xs sm:flex"
                          >
                            <Tag className="mr-1.5 h-3 w-3" />
                            {post.category || "GENERAL"}
                          </Badge>

                          {(isOwner || isAdmin) && (
                            <DropdownMenu>
                              <DropdownMenuTrigger >
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 rounded-full"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>

                              <DropdownMenuContent align="end">
                                <DropdownMenuItem >
                                  <Link to={`/posts/${postId}/edit`}>
                                    <Pencil className="mr-2 h-4 w-4" />
                                    Edit Post
                                  </Link>
                                </DropdownMenuItem>

                                <DropdownMenuSeparator />

                                <DropdownMenuItem className="text-destructive focus:text-destructive">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete Post
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          )}
                        </div>
                      </div>

                      {/* Mobile category */}
                      <div className="mt-4 sm:hidden">
                        <Badge
                          variant="secondary"
                          className="rounded-full text-xs"
                        >
                          <Tag className="mr-1.5 h-3 w-3" />
                          {post.category || "GENERAL"}
                        </Badge>
                      </div>

                      {/* Content */}
                      <Link to={`/posts/${postId}`} className="block">
                        <div className="mt-5">
                          <h2 className="text-xl font-bold leading-tight tracking-tight transition-colors group-hover:text-primary sm:text-2xl">
                            {post.title}
                          </h2>

                          <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">
                            {post.description || post.content}
                          </p>
                        </div>
                      </Link>

                      {/* Image */}
                      {post.image && (
                        <Link
                          to={`/posts/${postId}`}
                          className="mt-5 block overflow-hidden rounded-xl border"
                        >
                          <img
                            src={post.image}
                            alt={post.title}
                            className="max-h-105 w-full object-cover transition-transform duration-300 group-hover:scale-[1.01]"
                          />
                        </Link>
                      )}

                      {/* Statistics */}
                      <div className="mt-6 flex items-center justify-between border-t pt-4">
                        <div className="flex items-center gap-5 text-sm text-muted-foreground">
                          {/* Reactions */}
                          <div className="flex items-center gap-1.5">
                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-red-500/10">
                              <Heart className="h-3.5 w-3.5 text-red-500" />
                            </div>

                            <span className="font-medium">{reactionCount}</span>

                            <span className="hidden sm:inline">
                              {reactionCount === 1 ? "reaction" : "reactions"}
                            </span>
                          </div>

                          {/* Comments */}
                          <div className="flex items-center gap-1.5">
                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-500/10">
                              <MessageCircle className="h-3.5 w-3.5 text-blue-500" />
                            </div>

                            <span className="font-medium">{commentCount}</span>

                            <span className="hidden sm:inline">
                              {commentCount === 1 ? "comment" : "comments"}
                            </span>
                          </div>
                        </div>

                        <Link to={`/posts/${postId}`}>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="rounded-xl gap-2"
                            type="button"
                          >
                            <Eye className="h-4 w-4" />
                            View Post
                          </Button>
                        </Link>
                      </div>
                    </div>

                    {/* Bottom actions */}
                    <div className="flex items-center justify-between border-t bg-muted/20 px-5 py-3 sm:px-6">
                      <Link to={`/posts/${postId}`}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-2 rounded-xl text-muted-foreground hover:text-primary"
                          type="button"
                        >
                          <Heart className="h-4 w-4" />
                          React
                        </Button>
                      </Link>

                      <Link to={`/posts/${postId}`}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-2 rounded-xl text-muted-foreground hover:text-blue-500"
                          type="button"
                        >
                          <MessageCircle className="h-4 w-4" />
                          Comment
                        </Button>
                      </Link>

                      {!isOwner && !isAdmin && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-2 rounded-xl text-muted-foreground hover:text-destructive"
                        >
                          <Flag className="h-4 w-4" />
                          Report
                        </Button>
                      )}
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

export default AllPosts;
