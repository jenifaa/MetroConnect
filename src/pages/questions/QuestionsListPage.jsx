import { useState } from "react";
import { Link, useSearchParams } from "react-router";
import {
  MessageSquare,
  HelpCircle,
  Search,
  PlusCircle,
  Clock,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import { useGetQuestionsQuery } from "@/redux/features/question/question.api";
import { LoadingState, EmptyState, ErrorState } from "@/components/common/States";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const SUBJECTS = [
  "All",
  "CSE",
  "Mathematics",
  "Programming",
  "Database",
  "Networking",
  "General Academic",
];

export default function QuestionsListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const activeSubject = searchParams.get("subject") || "All";

  const {
    data: questionResponse,
    isLoading,
    isError,
    refetch,
  } = useGetQuestionsQuery({
    search: searchParams.get("search") || undefined,
    category: activeSubject === "All" ? undefined : activeSubject,
  });

  const questions = questionResponse?.data || [];

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

  const handleSubjectSelect = (subject) => {
    const newParams = new URLSearchParams(searchParams);
    if (subject === "All") {
      newParams.delete("subject");
    } else {
      newParams.set("subject", subject);
    }
    setSearchParams(newParams);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl space-y-8 mt-14">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-muted">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-foreground font-serif">
            Academic Q&A
          </h1>
          <p className="text-sm text-muted-foreground">
            Clear up your academic doubts. Ask course-related questions or help out your peers.
          </p>
        </div>
        <Link to="/questions/new">
          <Button className="rounded-xl gap-2 font-semibold shadow-md">
            <PlusCircle className="h-4 w-4" />
            Ask a Question
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
            placeholder="Search questions..."
            className="pl-10 h-10 rounded-xl"
          />
        </form>

        {/* Subjects scrollable list */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full no-scrollbar">
          {SUBJECTS.map((sub) => (
            <Button
              key={sub}
              onClick={() => handleSubjectSelect(sub)}
              variant={activeSubject === sub ? "default" : "outline"}
              className="rounded-full text-xs h-8 px-3 shrink-0"
            >
              {sub}
            </Button>
          ))}
        </div>
      </div>

      {/* Questions list */}
      {isLoading ? (
        <LoadingState message="Fetching academic questions..." items={4} />
      ) : isError ? (
        <ErrorState onRetry={refetch} />
      ) : questions.length === 0 ? (
        <EmptyState
          title="No questions yet"
          description={
            searchQuery || activeSubject !== "All"
              ? "No questions match your filter options. Try resetting terms."
              : "Stuck on a homework assignment? Ask your course question here to get peer advice!"
          }
        >
          <Link to="/questions/new">
            <Button className="rounded-xl">Ask your Question</Button>
          </Link>
        </EmptyState>
      ) : (
        <div className="space-y-4">
          {questions.map((question) => (
            <Card
              key={question.id || question._id}
              className="overflow-hidden border border-muted rounded-2xl shadow-xs hover:border-primary/20 transition-all duration-200"
            >
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold tracking-wider text-indigo-600 bg-indigo-500/10 border border-indigo-200/20 px-2.5 py-0.5 rounded-full uppercase">
                    <BookOpen className="h-2.5 w-2.5" />
                    {question.category || "General Academic"}
                  </span>

                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {new Date(question.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="space-y-2">
                  <Link to={`/questions/${question.id || question._id}`}>
                    <h2 className="text-lg font-bold tracking-tight hover:text-primary transition-colors text-foreground flex items-center gap-2">
                      <HelpCircle className="h-5 w-5 text-indigo-500 shrink-0" />
                      {question.title}
                    </h2>
                  </Link>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 pl-7">
                    {question.description || question.content}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-muted/50 pt-4 text-xs">
                  <div className="flex items-center gap-3">
                    <img
                      src={question.author?.picture || "https://i.ibb.co.com/xttK0CDW/pp.jpg"}
                      alt="Author"
                      className="h-6 w-6 rounded-full object-cover border"
                    />
                    <span className="font-semibold text-muted-foreground">
                      {question.author?.name || "Student"}
                    </span>
                  </div>

                  <Link to={`/questions/${question.id || question._id}`}>
                    <Button variant="ghost" className="gap-1.5 text-primary rounded-xl h-8 text-xs font-semibold">
                      <MessageSquare className="h-3.5 w-3.5" />
                      <span>{question.answers?.length || 0} Answers</span>
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
