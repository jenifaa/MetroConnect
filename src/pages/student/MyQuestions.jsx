import { useState } from "react";
import { Link } from "react-router";
import {
  PlusCircle,
  MessageSquare,
  CheckCircle2,
  RotateCcw,
  Trash2,
  Loader2,
} from "lucide-react";
import {
  useGetMyQuestionsQuery,
  useUpdateQuestionStatusMutation,
  useDeleteQuestionMutation,
} from "@/redux/features/question/question.api";
import { LoadingState, EmptyState, ErrorState } from "@/components/common/States";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  CategoryBadge,
  InlineError,
  StatusBadge,
  getErrorMessage,
  getId,
  timeAgo,
} from "./QuestionParts";
 
const TABS = [
  { value: "all", label: "All" },
  { value: "open", label: "Open" },
  { value: "solved", label: "Solved" },
];
 
export default function MyQuestions() {
  const { data, isLoading, isError, refetch } = useGetMyQuestionsQuery({ limit: 100 });
  const [updateStatus] = useUpdateQuestionStatusMutation();
  const [deleteQuestion] = useDeleteQuestionMutation();
 
  const [tab, setTab] = useState("all");
  const [busyId, setBusyId] = useState(null);
  const [error, setError] = useState("");
 
  const questions = data?.data || [];
  const counts = {
    all: questions.length,
    open: questions.filter((q) => !q.isSolved).length,
    solved: questions.filter((q) => q.isSolved).length,
  };
  const visible = questions.filter((q) =>
    tab === "all" ? true : tab === "solved" ? q.isSolved : !q.isSolved,
  );
 
  const run = async (id, action, fallback) => {
    setError("");
    setBusyId(id);
    try {
      await action().unwrap();
    } catch (err) {
      setError(getErrorMessage(err, fallback));
    } finally {
      setBusyId(null);
    }
  };
 
  const handleToggle = (q) =>
    run(
      getId(q),
      () => updateStatus({ id: getId(q), isSolved: !q.isSolved }),
      "Could not update the status.",
    );
 
  const handleDelete = (q) => {
    if (!window.confirm("Delete this question? This cannot be undone.")) return;
    run(getId(q), () => deleteQuestion(getId(q)), "Could not delete the question.");
  };
 
  return (
    <div className="container mx-auto mt-14 max-w-4xl space-y-6 px-4 py-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <h1 className="font-serif text-3xl font-bold tracking-tight">My questions</h1>
          <p className="text-sm text-muted-foreground">
            {counts.open} open, {counts.solved} solved. Mark a question solved once
            you have your answer.
          </p>
        </div>
        <Link to="/questions/new">
          <Button className="gap-2 rounded-xl">
            <PlusCircle className="h-4 w-4" />
            Ask a question
          </Button>
        </Link>
      </div>
 
      <div className="flex w-fit rounded-xl bg-muted p-1" role="tablist">
        {TABS.map((t) => (
          <button
            key={t.value}
            role="tab"
            aria-selected={tab === t.value}
            onClick={() => setTab(t.value)}
            className={cn(
              "rounded-lg px-4 py-1.5 text-sm font-medium transition",
              tab === t.value ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {t.label} <span className="text-xs text-muted-foreground">{counts[t.value]}</span>
          </button>
        ))}
      </div>
 
      <InlineError message={error} />
 
      {isLoading ? (
        <LoadingState message="Loading your questions..." items={3} />
      ) : isError ? (
        <ErrorState
          title="Could not load your questions"
          message="Check that you are logged in, then try again."
          onRetry={refetch}
        />
      ) : visible.length === 0 ? (
        <EmptyState
          title={tab === "all" ? "You haven't asked anything yet" : `No ${tab} questions`}
          description={
            tab === "all"
              ? "Questions you ask will show up here so you can track the answers."
              : "Switch tabs to see your other questions."
          }
        >
          {tab === "all" && (
            <Link to="/questions/new">
              <Button className="rounded-xl">Ask a question</Button>
            </Link>
          )}
        </EmptyState>
      ) : (
        <div className="space-y-3">
          {visible.map((q) => {
            const id = getId(q);
            const busy = busyId === id;
            return (
              <Card key={id} className="relative overflow-hidden rounded-2xl shadow-none">
                <span
                  className={cn(
                    "absolute inset-y-0 left-0 w-1",
                    q.isSolved ? "bg-emerald-500" : "bg-indigo-500/70",
                  )}
                />
                <CardContent className="flex flex-col gap-4 p-5 pl-6 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <StatusBadge isSolved={q.isSolved} />
                      <CategoryBadge category={q.category} />
                      <span className="text-xs text-muted-foreground">
                        {timeAgo(q.createdAt)}
                      </span>
                    </div>
                    <Link to={`/questions/${id}`}>
                      <h2 className="truncate text-base font-semibold hover:text-primary">
                        {q.title}
                      </h2>
                    </Link>
                    <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MessageSquare className="h-3.5 w-3.5" />
                      {q.commentsCount ?? 0} {(q.commentsCount ?? 0) === 1 ? "answer" : "answers"}
                    </p>
                  </div>
 
                  <div className="flex shrink-0 items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={busy}
                      onClick={() => handleToggle(q)}
                      className="gap-1.5 rounded-xl"
                    >
                      {busy ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : q.isSolved ? (
                        <RotateCcw className="h-4 w-4" />
                      ) : (
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      )}
                      {q.isSolved ? "Reopen" : "Mark solved"}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      disabled={busy}
                      onClick={() => handleDelete(q)}
                      className="h-9 w-9 rounded-xl text-muted-foreground hover:text-destructive"
                      aria-label="Delete question"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
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
 