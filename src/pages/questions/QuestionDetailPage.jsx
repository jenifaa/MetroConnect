import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router";
import {
  MessageSquare,
  ThumbsUp,
  ArrowLeft,
  Clock,
  BookOpen,
  Send,
  CheckCircle2,
} from "lucide-react";
import {
  useGetQuestionByIdQuery,
  useAddAnswerMutation,
  useUpvoteAnswerMutation,
} from "@/redux/features/question/question.api";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { LoadingState, EmptyState, ErrorState } from "@/components/common/States";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";

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

  const [addAnswer] = useAddAnswerMutation();
  const [upvoteAnswer] = useUpvoteAnswerMutation();

  const currentUser = userResponse?.data || {};
  const question = questionResponse?.data || {};

  const [answerText, setAnswerText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl mt-14">
        <LoadingState message="Loading question detail..." items={1} />
      </div>
    );
  }

  if (isError || !question.title) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl mt-14">
        <ErrorState
          title="Question Not Found"
          message="This academic query could not be located or has been deleted."
          onRetry={refetch}
        />
        <div className="text-center mt-4">
          <Button onClick={() => navigate("/questions")} variant="outline" className="rounded-xl">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to List
          </Button>
        </div>
      </div>
    );
  }

  const handleAnswerSubmit = async (e) => {
    e.preventDefault();
    if (!answerText.trim()) return;

    setIsSubmitting(true);
    try {
      await addAnswer({ id: question.id || question._id, content: answerText }).unwrap();
      toast.success("Answer posted successfully!");
      setAnswerText("");
    } catch (err) {
      toast.error(err?.data?.message || "Could not publish answer");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpvote = async (answerId) => {
    try {
      await upvoteAnswer(answerId).unwrap();
    } catch (err) {
      toast.error(err?.data?.message || "Could not register upvote");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl space-y-6 mt-14">
      {/* Back button */}
      <div>
        <Button onClick={() => navigate("/questions")} variant="ghost" className="rounded-xl gap-2 text-muted-foreground">
          <ArrowLeft className="h-4 w-4" />
          Back to Q&A
        </Button>
      </div>

      {/* Main Question Card */}
      <Card className="border border-muted rounded-3xl overflow-hidden shadow-xs">
        <CardContent className="p-6 md:p-8 space-y-5">
          {/* Header */}
          <div className="flex items-center justify-between border-b pb-4">
            <div className="flex items-center gap-3">
              <img
                src={question.author?.picture || "https://i.ibb.co.com/xttK0CDW/pp.jpg"}
                alt="Author"
                className="w-10 h-10 rounded-full object-cover border"
              />
              <div>
                <p className="font-bold text-foreground">{question.author?.name || "Student"}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                  <Clock className="h-3 w-3" />
                  <span>{new Date(question.createdAt).toLocaleString()}</span>
                </div>
              </div>
            </div>

            <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-indigo-600 bg-indigo-500/10 border border-indigo-200/20 px-3 py-1 rounded-full uppercase">
              <BookOpen className="h-3.5 w-3.5" />
              {question.category || "General"}
            </span>
          </div>

          {/* Title and Content */}
          <div className="space-y-4">
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-foreground font-serif leading-tight">
              {question.title}
            </h1>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed whitespace-pre-line">
              {question.description || question.content}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Answers Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold tracking-tight text-foreground flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-indigo-500" />
          Answers ({question.answers?.length || 0})
        </h2>

        {/* Answer Input form */}
        <form onSubmit={handleAnswerSubmit} className="flex gap-2">
          <Input
            value={answerText}
            onChange={(e) => setAnswerText(e.target.value)}
            placeholder="Type your explanation or course answer here..."
            className="rounded-xl flex-1 h-11 border-muted focus-visible:ring-indigo-500"
            disabled={isSubmitting}
          />
          <Button type="submit" className="rounded-xl h-11 px-4 gap-1.5 shrink-0 bg-indigo-600 hover:bg-indigo-700 text-white" disabled={isSubmitting || !answerText.trim()}>
            <Send className="h-3.5 w-3.5" />
            <span>Answer</span>
          </Button>
        </form>

        {/* Answers List */}
        <div className="space-y-4">
          {(!question.answers || question.answers.length === 0) ? (
            <div className="p-8 text-center text-sm text-muted-foreground border border-dashed rounded-3xl bg-card">
              No solutions provided yet. Be the first to help out!
            </div>
          ) : (
            question.answers.map((answer) => (
              <div
                key={answer.id || answer._id}
                className="flex gap-4 bg-card border rounded-2xl p-5 shadow-2xs hover:border-indigo-100 dark:hover:border-indigo-950 transition"
              >
                {/* Upvotes bar */}
                <div className="flex flex-col items-center gap-1 self-start">
                  <Button
                    onClick={() => handleUpvote(answer.id || answer._id)}
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-lg hover:bg-indigo-500/10 hover:text-indigo-600"
                    aria-label="Upvote answer"
                  >
                    <ThumbsUp className="h-4 w-4" />
                  </Button>
                  <span className="text-xs font-bold text-muted-foreground">
                    {answer.upvotes?.length || 0}
                  </span>
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <img
                      src={answer.author?.picture || "https://i.ibb.co.com/xttK0CDW/pp.jpg"}
                      alt="Author"
                      className="h-6 w-6 rounded-full object-cover border"
                    />
                    <span className="text-xs font-bold text-foreground">
                      {answer.author?.name || "Student"}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {new Date(answer.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {answer.content}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
