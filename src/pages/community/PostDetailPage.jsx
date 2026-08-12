import { useState } from "react";
import {  useParams, useNavigate } from "react-router";
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
  useGetPostByIdQuery,
  useLikePostMutation,
  useAddCommentMutation,
  useDeleteCommentMutation,
  useReportPostMutation,
} from "@/redux/features/post/post.api";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { LoadingState, ErrorState } from "@/components/common/States";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";

export default function PostDetailPage() {
  const { postId } = useParams();
  const navigate = useNavigate();

  // Queries
  const { data: userResponse } = useUserInfoQuery(undefined);
  const { data: postResponse, isLoading, isError, refetch } = useGetPostByIdQuery(postId);

  const [likePost] = useLikePostMutation();
  const [addComment] = useAddCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();
  const [reportPost] = useReportPostMutation();

  const currentUser = userResponse?.data || {};
  const post = postResponse?.data || {};

  // Form State
  const [commentText, setCommentText] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  // Dialog State
  const [commentToDelete, setCommentToDelete] = useState(null);
  const [postToReport, setPostToReport] = useState(false);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl mt-14">
        <LoadingState message="Loading discussion..." items={1} />
      </div>
    );
  }

  if (isError || !post.title) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl mt-14">
        <ErrorState
          title="Post Not Found"
          message="This post may have been removed by moderators or doesn't exist."
          onRetry={refetch}
        />
        <div className="text-center mt-4">
          <Button onClick={() => navigate("/feed")} variant="outline" className="rounded-xl">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Feed
          </Button>
        </div>
      </div>
    );
  }

  const isPostOwner = currentUser?.id === post?.author?.id || currentUser?._id === post?.author?._id || currentUser?.role === "ADMIN" || currentUser?.role === "SUPER_ADMIN";

  const handleLike = async () => {
    try {
      await likePost(post.id || post._id).unwrap();
    } catch (err) {
      toast.error(err?.data?.message || "Could not upvote post");
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    setIsSubmittingComment(true);
    try {
      await addComment({ id: post.id || post._id, content: commentText }).unwrap();
      toast.success("Comment added");
      setCommentText("");
    } catch (err) {
      toast.error(err?.data?.message || "Could not add comment");
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handleDeleteComment = async () => {
    if (!commentToDelete) return;
    try {
      await deleteComment({ postId: post.id || post._id, commentId: commentToDelete }).unwrap();
      toast.success("Comment deleted");
    } catch (err) {
      toast.error(err?.data?.message || "Could not remove comment");
    } finally {
      setCommentToDelete(null);
    }
  };

  const handleReportPost = async () => {
    try {
      await reportPost({ id: post.id || post._id, reason: "Inappropriate" }).unwrap();
      toast.success(" flagged for moderation");
    } catch (err) {
      toast.error(err?.data?.message || "Flagging failed");
    } finally {
      setPostToReport(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl space-y-6 mt-14">
      {/* Back button */}
      <div>
        <Button onClick={() => navigate("/feed")} variant="ghost" className="rounded-xl gap-2 text-muted-foreground">
          <ArrowLeft className="h-4 w-4" />
          Back to Feed
        </Button>
      </div>

      {/* Main Post Card */}
      <Card className="border border-muted rounded-3xl overflow-hidden shadow-xs">
        <CardContent className="p-6 md:p-8 space-y-6">
          {/* Post Header */}
          <div className="flex items-center justify-between border-b pb-4">
            <div className="flex items-center gap-3">
              <img
                src={post.author?.picture || "https://i.ibb.co.com/xttK0CDW/pp.jpg"}
                alt="Author"
                className="w-12 h-12 rounded-full object-cover border"
              />
              <div>
                <p className="font-bold text-foreground">{post.author?.name || "MU Student"}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                  <Clock className="h-3 w-3" />
                  <span>{new Date(post.createdAt).toLocaleString()}</span>
                  <span>•</span>
                  <span className="capitalize">{post.author?.role?.toLowerCase() || "Student"}</span>
                </div>
              </div>
            </div>

            <span className="inline-flex items-center gap-1 text-xs font-bold tracking-wider text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full uppercase">
              <Tag className="h-3 w-3" />
              {post.category || "General"}
            </span>
          </div>

          {/* Title and Content */}
          <div className="space-y-4">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground font-serif leading-tight">
              {post.title}
            </h1>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed whitespace-pre-line">
              {post.description || post.content}
            </p>
          </div>

          {/* Attached Image */}
          {post.image && (
            <div className="rounded-2xl overflow-hidden border max-h-120">
              <img src={post.image} alt="Attachment" className="w-full h-full object-cover" />
            </div>
          )}

          {/* Interaction Bar */}
          <div className="flex items-center justify-between border-t pt-4">
            <div className="flex items-center gap-3">
              <Button
                onClick={handleLike}
                variant="ghost"
                className="gap-2 rounded-xl hover:bg-primary/5 hover:text-primary h-10 px-4"
              >
                <ThumbsUp className="h-4 w-4" />
                <span>{post.likes?.length || 0} Likes</span>
              </Button>

              <span className="text-sm text-muted-foreground flex items-center gap-1.5 px-3 py-1 bg-muted rounded-full">
                <MessageSquare className="h-4 w-4" />
                <span>{post.comments?.length || 0} Comments</span>
              </span>
            </div>

            {!isPostOwner && (
              <Button
                onClick={() => setPostToReport(true)}
                variant="ghost"
                className="gap-2 text-muted-foreground hover:text-red-500 hover:bg-red-500/5 rounded-xl h-10 px-4"
              >
                <AlertTriangle className="h-4 w-4" />
                <span>Flag</span>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Comments System */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold tracking-tight text-foreground flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          Comments Thread
        </h2>

        {/* Comment input form */}
        <form onSubmit={handleCommentSubmit} className="flex gap-2">
          <Input
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write a supportive comment..."
            className="rounded-xl flex-1 h-11"
            disabled={isSubmittingComment}
          />
          <Button type="submit" className="rounded-xl h-11 px-4 gap-1.5 shrink-0" disabled={isSubmittingComment || !commentText.trim()}>
            <Send className="h-3.5 w-3.5" />
            <span>Send</span>
          </Button>
        </form>

        {/* Comments List */}
        <div className="space-y-3">
          {(!post.comments || post.comments.length === 0) ? (
            <div className="p-8 text-center text-sm text-muted-foreground border border-dashed rounded-3xl bg-card">
              No comments yet. Start the conversation!
            </div>
          ) : (
            post.comments.map((comment) => {
              const isCommentOwner = currentUser?.id === comment?.author?.id || currentUser?._id === comment?.author?._id || currentUser?.role === "ADMIN" || currentUser?.role === "SUPER_ADMIN";
              return (
                <div
                  key={comment.id || comment._id}
                  className="flex gap-3 bg-card border rounded-2xl p-4 shadow-2xs hover:border-muted-foreground/10 transition"
                >
                  <img
                    src={comment.author?.picture || "https://i.ibb.co.com/xttK0CDW/pp.jpg"}
                    alt="Author"
                    className="h-8 w-8 rounded-full object-cover border shrink-0"
                  />
                  <div className="flex-1 space-y-1 overflow-hidden">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-foreground">
                          {comment.author?.name || "MU Student"}
                        </span>
                        <span className="text-[10px] text-muted-foreground ml-2">
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      {isCommentOwner && (
                        <Button
                          onClick={() => setCommentToDelete(comment.id || comment._id)}
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 rounded-lg text-red-500 hover:text-red-600 hover:bg-red-500/5"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      )}
                    </div>
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed break-words">
                      {comment.content}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Delete Comment Confirmation */}
      <ConfirmDialog
        isOpen={!!commentToDelete}
        title="Delete Comment"
        description="Are you sure you want to delete this comment? This action cannot be undone."
        onConfirm={handleDeleteComment}
        onClose={() => setCommentToDelete(null)}
      />

      {/* Report Post Confirmation */}
      <ConfirmDialog
        isOpen={postToReport}
        title="Flag Content"
        description="Flag this post for review by Metropolitan University administrators? Content violating site policy will be removed."
        confirmText="Flag Post"
        isDanger={false}
        onConfirm={handleReportPost}
        onClose={() => setPostToReport(false)}
      />
    </div>
  );
}
