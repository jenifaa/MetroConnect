import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router";
import {
  ArrowLeft,
  CheckCircle2,
  RotateCcw,
  Trash2,
  Send,
  Loader2,
  MessageSquare,
} from "lucide-react";
import {
  useGetQuestionByIdQuery,
  useAddAnswerMutation,
  useDeleteAnswerMutation,
  useDeleteQuestionMutation,
  useUpdateQuestionStatusMutation,
} from "@/redux/features/question/question.api";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { LoadingState, ErrorState } from "@/components/common/States";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  Avatar,
  CategoryBadge,
  InlineError,
  StatusBadge,
  TagList,
  getErrorMessage,
  getId,
  timeAgo,
} from "./QuestionParts";
 
const ADMIN_ROLES = ["ADMIN", "SUPER_ADMIN"];
 
export default function QuestionDetailPage() {
  const { questionId } = useParams();
  const navigate = useNavigate();
 
  const { data: userResponse } = useUserInfoQuery(undefined);
  const {
    data: questionResponse,
    isLoading,
    isError,
    refetch,
  } = useGetQuestionByIdQuery(questionId);
 
  const [addAnswer, { isLoading: isPosting }] = useAddAnswerMutation();
  const [deleteAnswer] = useDeleteAnswerMutation();
  const [deleteQuestion, { isLoading: isDeleting }] = useDeleteQuestionMutation();
  const [updateStatus, { isLoading: isUpdatingStatus }] =
    useUpdateQuestionStatusMutation();
 
  const [answerText, setAnswerText] = useState("");
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);
 
  const currentUser = userResponse?.data || {};
  const question = questionResponse?.data || {};
  const comments = question.comments || [];
 
  const currentUserId = String(getId(currentUser) || "");
  const isLoggedIn = Boolean(currentUserId);
  const isAuthor = isLoggedIn && String(getId(question.author)) === currentUserId;
  const isAdmin = ADMIN_ROLES.includes(currentUser.role);
 
  // Mirrors the backend rule: comment author, question author or admin
  const canDeleteComment = (comment) =>
    isLoggedIn && (String(getId(comment.author)) === currentUserId || isAuthor || isAdmin);
 
  if (isLoading) {
    return (
      <div className="container mx-auto mt-14 max-w-3xl px-4 py-8">
        <LoadingState message="Loading question..." items={1} />
      </div>
    );
  }
 
  if (isError || !question.title) {
    return (
      <div className="container mx-auto mt-14 max-w-3xl space-y-4 px-4 py-8">
        <ErrorState
          title="Question not found"
          message="It may have been deleted, or the link is wrong."
          onRetry={refetch}
        />
        <div className="text-center">
          <Button variant="outline" className="rounded-xl" onClick={() => navigate("/questions")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to questions
          </Button>
        </div>
      </div>
    );
  }
 
  const handleToggleSolved = async () => {
    setError("");
    try {
      await updateStatus({ id: getId(question), isSolved: !question.isSolved }).unwrap();
    } catch (err) {
      setError(getErrorMessage(err, "Could not update the status."));
    }
  };
 
  const handleDeleteQuestion = async () => {
    if (!window.confirm("Delete this question? This cannot be undone.")) return;
    setError("");
    try {
      await deleteQuestion(getId(question)).unwrap();
      navigate("/questions");
    } catch (err) {
      setError(getErrorMessage(err, "Could not delete the question."));
    }
  };
 
  const handleAnswerSubmit = async (e) => {
    e.preventDefault();
    const content = answerText.trim();
    if (!content) return;
    setError("");
    try {
      await addAnswer({ id: getId(question), content }).unwrap();
      setAnswerText("");
    } catch (err) {
      setError(getErrorMessage(err, "Could not post your answer."));
    }
  };
 
  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Delete this answer?")) return;
    setError("");
    setDeletingId(commentId);
    try {
      await deleteAnswer({ id: getId(question), commentId }).unwrap();
    } catch (err) {
      setError(getErrorMessage(err, "Could not delete the answer."));
    } finally {
      setDeletingId(null);
    }
  };
 
  return (
    <div className="container mx-auto mt-14 max-w-3xl space-y-6 px-4 py-8">
      <Button
        variant="ghost"
        onClick={() => navigate("/questions")}
        className="-ml-3 gap-2 rounded-xl text-muted-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        All questions
      </Button>
 
      {/* Question */}
      <Card className="relative overflow-hidden rounded-3xl shadow-none">
        <span
          className={cn(
            "absolute inset-x-0 top-0 h-1",
            question.isSolved ? "bg-emerald-500" : "bg-indigo-500/70",
          )}
        />
        <CardContent className="space-y-6 p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge isSolved={question.isSolved} />
            <CategoryBadge category={question.category} />
          </div>
 
          <div className="space-y-4">
            <h1 className="font-serif text-2xl font-bold leading-tight tracking-tight md:text-3xl">
              {question.title}
            </h1>
            <p className="whitespace-pre-line text-base leading-7 text-foreground/85">
              {question.description}
            </p>
            <TagList tags={question.tags} />
          </div>
 
          <div className="flex flex-wrap items-center justify-between gap-4 border-t pt-5">
            <div className="flex items-center gap-3">
              <Avatar user={question.author} size="lg" />
              <div>
                <p className="text-sm font-semibold">{question.author?.name || "Student"}</p>
                <p className="text-xs text-muted-foreground" title={new Date(question.createdAt).toLocaleString()}>
                  Asked {timeAgo(question.createdAt)}
                  {question.isSolved && question.solvedAt && (
                    <> · solved {timeAgo(question.solvedAt)}</>
                  )}
                </p>
              </div>
            </div>
 
            {(isAuthor || isAdmin) && (
              <div className="flex gap-2">
                {isAuthor && (
                  <Button
                    onClick={handleToggleSolved}
                    disabled={isUpdatingStatus}
                    variant={question.isSolved ? "outline" : "default"}
                    className={cn(
                      "gap-2 rounded-xl",
                      !question.isSolved && "bg-emerald-600 text-white hover:bg-emerald-700",
                    )}
                  >
                    {isUpdatingStatus ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : question.isSolved ? (
                      <RotateCcw className="h-4 w-4" />
                    ) : (
                      <CheckCircle2 className="h-4 w-4" />
                    )}
                    {question.isSolved ? "Reopen question" : "Mark as solved"}
                  </Button>
                )}
                <Button
                  onClick={handleDeleteQuestion}
                  disabled={isDeleting}
                  variant="outline"
                  size="icon"
                  className="rounded-xl text-destructive hover:text-destructive"
                  aria-label="Delete question"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
 
      <InlineError message={error} />
 
      {/* Answers */}
      <section className="space-y-4">
        <h2 className="flex items-center gap-2 text-lg font-semibold tracking-tight">
          <MessageSquare className="h-5 w-5 text-indigo-500" />
          {comments.length} {comments.length === 1 ? "answer" : "answers"}
        </h2>
 
        {/* Composer */}
        {isLoggedIn ? (
          <form onSubmit={handleAnswerSubmit} className="space-y-3 rounded-2xl border bg-card p-4">
            <div className="flex gap-3">
              <Avatar user={currentUser} />
              <textarea
                value={answerText}
                onChange={(e) => setAnswerText(e.target.value)}
                onKeyDown={(e) => {
                  if ((e.ctrlKey || e.metaKey) && e.key === "Enter") handleAnswerSubmit(e);
                }}
                rows={3}
                maxLength={2000}
                disabled={isPosting}
                placeholder="Write an answer that would have helped you when you were stuck..."
                className="min-h-[84px] w-full resize-y rounded-xl border bg-background px-3 py-2 text-sm leading-relaxed outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                Ctrl + Enter to post · {answerText.length}/2000
              </span>
              <Button
                type="submit"
                disabled={isPosting || !answerText.trim()}
                className="gap-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700"
              >
                {isPosting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                Post answer
              </Button>
            </div>
          </form>
        ) : (
          <div className="rounded-2xl border border-dashed bg-card p-5 text-center text-sm text-muted-foreground">
            <Link to="/login" className="font-semibold text-primary hover:underline">
              Log in
            </Link>{" "}
            to answer this question.
          </div>
        )}
 
        {/* List */}
        {comments.length === 0 ? (
          <div className="rounded-2xl border border-dashed p-8 text-center text-sm text-muted-foreground">
            No answers yet. If you know this one, you can be the first to help.
          </div>
        ) : (
          <ul className="space-y-3">
            {comments.map((comment) => {
              const id = getId(comment);
              const isQuestionAuthor =
                String(getId(comment.author)) === String(getId(question.author));
              return (
                <li key={id} className="flex gap-3 rounded-2xl border bg-card p-4">
                  <Avatar user={comment.author} />
                  <div className="min-w-0 flex-1 space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-x-2 text-sm">
                        <span className="font-semibold">{comment.author?.name || "Student"}</span>
                        {isQuestionAuthor && (
                          <span className="rounded-md bg-indigo-500/10 px-1.5 py-0.5 text-[11px] font-medium text-indigo-600 dark:text-indigo-400">
                            Asker
                          </span>
                        )}
                        <span className="text-xs text-muted-foreground">
                          {timeAgo(comment.createdAt)}
                        </span>
                      </div>
                      {canDeleteComment(comment) && (
                        <Button
                          variant="ghost"
                          size="icon"
                          disabled={deletingId === id}
                          onClick={() => handleDeleteComment(id)}
                          className="h-8 w-8 rounded-lg text-muted-foreground hover:text-destructive"
                          aria-label="Delete answer"
                        >
                          {deletingId === id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </Button>
                      )}
                    </div>
                    <p className="whitespace-pre-line break-words text-sm leading-relaxed text-foreground/85">
                      {comment.content}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
 