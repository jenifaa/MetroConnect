import { useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";
import {
  Eye,
  Trash2,
  MessageCircle,
  Heart,
  Image as ImageIcon,
  CalendarDays,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import {
  useGetPostsQuery,
  useDeletePostMutation,
} from "@/redux/features/post/post.api";

function PostManagement() {
  const [deletingPostId, setDeletingPostId] = useState(null);

  const {
    data,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetPostsQuery();

  const [deletePost] = useDeletePostMutation();

  /*
   * Depending on your backend response structure,
   * posts may be inside data.data or directly inside data.
   */
  const posts = data?.data?.data || data?.data || [];

  const handleDelete = async (postId) => {
    try {
      setDeletingPostId(postId);

      await deletePost(postId).unwrap();

      toast.success("Post deleted successfully");

      refetch();
    } catch (error) {
      toast.error(
        error?.data?.message || "Failed to delete the post"
      );
    } finally {
      setDeletingPostId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Post Management</h1>
          <p className="text-muted-foreground">
            Manage all posts submitted by students.
          </p>
        </div>

        <div className="flex min-h-[300px] items-center justify-center">
          <p className="text-muted-foreground">
            Loading posts...
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Post Management</h1>
          <p className="text-muted-foreground">
            Manage all posts submitted by students.
          </p>
        </div>

        <Card>
          <CardContent className="flex min-h-[250px] flex-col items-center justify-center gap-4">
            <p className="text-destructive">
              Failed to load posts.
            </p>

            <Button onClick={() => refetch()}>
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Post Management
          </h1>

          <p className="text-sm text-muted-foreground">
            View and manage posts submitted by students.
          </p>
        </div>

        {isFetching && (
          <p className="text-sm text-muted-foreground">
            Updating...
          </p>
        )}
      </div>

      {/* Posts */}
      {posts.length === 0 ? (
        <Card>
          <CardContent className="flex min-h-[300px] flex-col items-center justify-center text-center">
            <ImageIcon className="mb-4 h-10 w-10 text-muted-foreground" />

            <h2 className="text-lg font-semibold">
              No posts found
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              There are currently no posts to manage.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {posts.map((post) => {
            const postId = post?._id || post?.id;

            const author = post?.author || post?.createdBy || post?.user;

            const authorName =
              author?.name ||
              author?.fullName ||
              "Unknown User";

            const authorImage =
              author?.picture ||
              author?.profilePicture ||
              author?.image;

            const reactionCount =
              post?.reactions?.length ??
              post?.likes?.length ??
              0;

            const commentCount =
              post?.comments?.length ?? 0;

            const image =
              post?.images?.length > 0
                ? post.images[0]
                : null;

            return (
              <Card
                key={postId}
                className="overflow-hidden"
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    {/* Author */}
                    <div className="flex items-center gap-3">
                      {authorImage ? (
                        <img
                          src={authorImage}
                          alt={authorName}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                          <User className="h-5 w-5 text-muted-foreground" />
                        </div>
                      )}

                      <div>
                        <p className="font-semibold">
                          {authorName}
                        </p>

                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <CalendarDays className="h-3.5 w-3.5" />

                          <span>
                            {post?.createdAt
                              ? new Date(
                                  post.createdAt
                                ).toLocaleDateString()
                              : "Unknown date"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Category */}
                    {post?.category && (
                      <Badge variant="secondary">
                        {post.category}
                      </Badge>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Content */}
                  <div>
                    <p className="whitespace-pre-wrap text-sm leading-6">
                      {post?.content || "No content available."}
                    </p>
                  </div>

                  {/* Image */}
                  {image && (
                    <div className="overflow-hidden rounded-lg border">
                      <img
                        src={image}
                        alt="Post attachment"
                        className="max-h-[400px] w-full object-cover"
                      />
                    </div>
                  )}

                  {/* Statistics */}
                  <div className="flex items-center gap-5 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Heart className="h-4 w-4" />
                      <span>
                        {reactionCount} reactions
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <MessageCircle className="h-4 w-4" />
                      <span>
                        {commentCount} comments
                      </span>
                    </div>

                    {post?.images?.length > 0 && (
                      <div className="flex items-center gap-1.5">
                        <ImageIcon className="h-4 w-4" />
                        <span>
                          {post.images.length} image
                          {post.images.length > 1 ? "s" : ""}
                        </span>
                      </div>
                    )}
                  </div>

                  <Separator />

                  {/* Actions */}
                  <div className="flex flex-wrap justify-end gap-2">
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                    >
                      <Link
                        to={`/posts/${postId}`}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Link>
                    </Button>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="destructive"
                          size="sm"
                          disabled={
                            deletingPostId === postId
                          }
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </Button>
                      </AlertDialogTrigger>

                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Delete Post?
                          </AlertDialogTitle>

                          <AlertDialogDescription>
                            Are you sure you want to delete this
                            post? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>

                        <AlertDialogFooter>
                          <AlertDialogCancel>
                            Cancel
                          </AlertDialogCancel>

                          <AlertDialogAction
                            onClick={() =>
                              handleDelete(postId)
                            }
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Delete Post
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default PostManagement;