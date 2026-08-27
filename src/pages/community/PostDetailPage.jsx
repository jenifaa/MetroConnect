import { useState } from "react";
import { useParams, useNavigate } from "react-router";

import {
  MessageSquare,
  ThumbsUp,
  AlertTriangle,
  ArrowLeft,
  Clock,
  Tag,
  Trash2,
  Send,
} from "lucide-react";

import {
  useLikePostMutation,
  useAddCommentMutation,
  useDeleteCommentMutation,
  useReportPostMutation,
  useGetPostByIdQuery,
} from "@/redux/features/post/post.api";

import { useUserInfoQuery } from "@/redux/features/auth/auth.api";

import {
  LoadingState,
  ErrorState,
} from "@/components/common/States";

import ConfirmDialog from "@/components/common/ConfirmDialog";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function PostDetailPage() {
  const { postId } = useParams();
  const navigate = useNavigate();

  // Queries
  const { data: userResponse } = useUserInfoQuery(undefined);

  const {
    data: postResponse,
    isLoading,
    isError,
    refetch,
  } = useGetPostByIdQuery(postId, {
    skip: !postId,
  });

  // Mutations
  const [likePost] = useLikePostMutation();
  const [addComment] = useAddCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();
  const [reportPost] = useReportPostMutation();

  const currentUser = userResponse?.data || {};
  const post = postResponse?.data || {};

  const postRealId = post?.id || post?._id;

  // Form State
  const [commentText, setCommentText] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] =
    useState(false);

  // Dialog State
  const [commentToDelete, setCommentToDelete] =
    useState(null);

  const [postToReport, setPostToReport] =
    useState(false);

  // Loading
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl mt-14">
        <LoadingState
          message="Loading post..."
          items={1}
        />
      </div>
    );
  }

  // Error
  if (isError || !postRealId) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl mt-14">
        <ErrorState
          title="Post Not Found"
          message="This post may have been removed or doesn't exist."
          onRetry={refetch}
        />

        <div className="text-center mt-4">
          <Button
            onClick={() => navigate("/all-posts")}
            variant="outline"
            className="rounded-xl"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Feed
          </Button>
        </div>
      </div>
    );
  }

  const isAdmin =
    currentUser?.role === "ADMIN" ||
    currentUser?.role === "SUPER_ADMIN";

  const currentUserId =
    currentUser?.id || currentUser?._id;

  const authorId =
    post?.author?.id || post?.author?._id;

  const isPostOwner =
    currentUserId === authorId || isAdmin;

  // Handle Reaction
  const handleLike = async () => {
    try {
      await likePost({
        id: postRealId,
        reactionType: "like",
      }).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  // Submit Comment
  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!commentText.trim()) return;

    try {
      setIsSubmittingComment(true);

      await addComment({
        postId: postRealId,
        text: commentText.trim(),
      }).unwrap();

      setCommentText("");
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingComment(false);
    }
  };

  // Delete Comment
  const handleDeleteComment = async () => {
    if (!commentToDelete) return;

    try {
      await deleteComment({
        postId: postRealId,
        commentId: commentToDelete,
      }).unwrap();
    } catch (error) {
      console.error(error);
    } finally {
      setCommentToDelete(null);
    }
  };

  // Report Post
  const handleReportPost = async () => {
    try {
      await reportPost({
        id: postRealId,
        reason: "Inappropriate",
      }).unwrap();
    } catch (error) {
      console.error(error);
    } finally {
      setPostToReport(false);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 space-y-6 mt-14">
      {/* Back Button */}

      <div>
        <Button
          onClick={() => navigate("/all-posts")}
          variant="ghost"
          className="rounded-xl gap-2 text-muted-foreground"
        >
          <ArrowLeft className="h-4 w-4" />

          Back to Feed
        </Button>
      </div>

      {/* Main Post */}

      <Card className="border rounded-3xl overflow-hidden shadow-sm">
        <CardContent className="p-6 md:p-8 space-y-6">

          {/* Header */}

          <div className="flex items-center justify-between border-b pb-5">
            <div className="flex items-center gap-3">
              <img
                src={
                  post?.author?.picture ||
                  "https://i.ibb.co.com/xttK0CDW/pp.jpg"
                }
                alt="Author"
                className="w-12 h-12 rounded-full object-cover border"
              />

              <div>
                <p className="font-bold text-foreground">
                  {post?.isAnonymous
                    ? "Anonymous Student"
                    : post?.author?.name || "MU Student"}
                </p>

                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                  <Clock className="h-3 w-3" />

                  <span>
                    {post?.createdAt
                      ? new Date(
                          post.createdAt,
                        ).toLocaleString()
                      : ""}
                  </span>
                </div>
              </div>
            </div>

            <span className="inline-flex items-center gap-1 text-xs font-bold tracking-wider text-primary bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-full uppercase">
              <Tag className="h-3 w-3" />

              {post?.category || "GENERAL"}
            </span>
          </div>

          {/* Title */}

          <div className="space-y-4">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              {post?.title}
            </h1>

            <p className="text-sm md:text-base text-muted-foreground leading-relaxed whitespace-pre-line">
              {post?.description}
            </p>
          </div>

          {/* Images */}

          {post?.images?.length > 0 && (
            <div
              className={`grid gap-4 ${
                post.images.length === 1
                  ? "grid-cols-1"
                  : "grid-cols-1 md:grid-cols-2"
              }`}
            >
              {post.images.map((image, index) => (
                <div
                  key={index}
                  className="rounded-2xl overflow-hidden border"
                >
                  <img
                    src={image}
                    alt={`Post image ${index + 1}`}
                    className="w-full max-h-125 object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Interaction */}

          <div className="flex items-center justify-between border-t pt-4">
            <div className="flex items-center gap-3">
              <Button
                onClick={handleLike}
                variant="ghost"
                className="gap-2 rounded-xl hover:bg-primary/5 hover:text-primary"
              >
                <ThumbsUp className="h-4 w-4" />

                <span>
                  {post?.reactions?.length || 0} Reactions
                </span>
              </Button>

              <span className="text-sm text-muted-foreground flex items-center gap-1.5 px-3 py-2 bg-muted rounded-full">
                <MessageSquare className="h-4 w-4" />

                {post?.comments?.length || 0} Comments
              </span>
            </div>

            {!isPostOwner && (
              <Button
                onClick={() =>
                  setPostToReport(true)
                }
                variant="ghost"
                className="gap-2 text-muted-foreground hover:text-red-500 hover:bg-red-500/5 rounded-xl"
              >
                <AlertTriangle className="h-4 w-4" />

                Flag
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Comments */}

      <div className="space-y-4">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />

          Comments
        </h2>

        {/* Add Comment */}

        <form
          onSubmit={handleCommentSubmit}
          className="flex gap-2"
        >
          <Input
            value={commentText}
            onChange={(e) =>
              setCommentText(e.target.value)
            }
            placeholder="Write a comment..."
            className="rounded-xl flex-1 h-11"
            disabled={isSubmittingComment}
          />

          <Button
            type="submit"
            className="rounded-xl h-11 px-4 gap-2"
            disabled={
              isSubmittingComment ||
              !commentText.trim()
            }
          >
            <Send className="h-4 w-4" />

            Send
          </Button>
        </form>

        {/* Comments List */}

        <div className="space-y-3">
          {!post?.comments?.length ? (
            <div className="p-8 text-center text-sm text-muted-foreground border border-dashed rounded-3xl bg-card">
              No comments yet. Start the conversation!
            </div>
          ) : (
            post.comments.map((comment) => {
              const commentId =
                comment?.id || comment?._id;

              // Depending on your formatter,
              // the populated user may be called user.
              const commentUser =
                comment?.user || comment?.author;

              const commentUserId =
                commentUser?.id ||
                commentUser?._id;

              const isCommentOwner =
                currentUserId === commentUserId ||
                isAdmin;

              return (
                <div
                  key={commentId}
                  className="flex gap-3 bg-card border rounded-2xl p-4 shadow-sm"
                >
                  <img
                    src={
                      commentUser?.picture ||
                      "https://i.ibb.co.com/xttK0CDW/pp.jpg"
                    }
                    alt="User"
                    className="h-9 w-9 rounded-full object-cover border shrink-0"
                  />

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-bold">
                          {commentUser?.name ||
                            "MU Student"}
                        </span>

                        {comment?.createdAt && (
                          <span className="text-xs text-muted-foreground ml-2">
                            {new Date(
                              comment.createdAt,
                            ).toLocaleDateString()}
                          </span>
                        )}
                      </div>

                      {isCommentOwner && (
                        <Button
                          onClick={() =>
                            setCommentToDelete(
                              commentId,
                            )
                          }
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-500/5"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed wrap-break-word">
                      {comment?.text ||
                        comment?.content}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Delete Comment Dialog */}

      <ConfirmDialog
        isOpen={!!commentToDelete}
        title="Delete Comment"
        description="Are you sure you want to delete this comment? This action cannot be undone."
        onConfirm={handleDeleteComment}
        onClose={() =>
          setCommentToDelete(null)
        }
      />

      {/* Report Dialog */}

      <ConfirmDialog
        isOpen={postToReport}
        title="Flag Content"
        description="Flag this post for review?"
        confirmText="Flag Post"
        isDanger={false}
        onConfirm={handleReportPost}
        onClose={() =>
          setPostToReport(false)
        }
      />
    </div>
  );
}