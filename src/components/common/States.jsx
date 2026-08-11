import { AlertCircle, FileQuestion, RotateCcw } from "lucide-react";
import { Button } from "../ui/button";

export function LoadingState({ message = "Loading content...", items = 3 }) {
  return (
    <div className="space-y-4 w-full animate-pulse py-6">
      <p className="text-sm text-muted-foreground text-center">{message}</p>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: items }).map((_, i) => (
          <div key={i} className="rounded-2xl border bg-card p-6 space-y-4 h-48">
            <div className="h-4 bg-muted rounded-md w-3/4" />
            <div className="space-y-2">
              <div className="h-3 bg-muted rounded-md w-full" />
              <div className="h-3 bg-muted rounded-md w-5/6" />
            </div>
            <div className="h-8 bg-muted rounded-md w-1/4 mt-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function EmptyState({
  title = "No data found",
  description = "There are no entries in this section yet.",
  icon: Icon = FileQuestion,
  children,
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 border border-dashed rounded-3xl bg-card/40 my-6">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground mb-4">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-sm mb-6">
        {description}
      </p>
      {children}
    </div>
  );
}

export function ErrorState({
  title = "Something went wrong",
  message = "An error occurred while fetching data from the server.",
  onRetry,
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 border border-red-200/50 dark:border-red-950/30 rounded-3xl bg-red-500/5 my-6">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400 mb-4">
        <AlertCircle className="h-6 w-6" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-sm mb-6">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline" className="gap-2">
          <RotateCcw className="h-4 w-4" />
          Try Again
        </Button>
      )}
    </div>
  );
}
