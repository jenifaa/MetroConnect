import { CheckCircle2, CircleDot } from "lucide-react";
import { cn } from "@/lib/utils";
import { FALLBACK_AVATAR, categoryLabel } from "./question.utils";
 
export function StatusBadge({ isSolved, className }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        isSolved
          ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-400"
          : "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-400",
        className,
      )}
    >
      {isSolved ? (
        <CheckCircle2 className="h-3 w-3" />
      ) : (
        <CircleDot className="h-3 w-3" />
      )}
      {isSolved ? "Solved" : "Open"}
    </span>
  );
}
 
export function CategoryBadge({ category, className }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-indigo-500/10 px-2.5 py-0.5 text-xs font-medium text-indigo-600 dark:text-indigo-400",
        className,
      )}
    >
      {categoryLabel(category)}
    </span>
  );
}
 
export function Avatar({ user, size = "md", className }) {
  const sizes = { sm: "h-6 w-6", md: "h-9 w-9", lg: "h-11 w-11" };
  return (
    <img
      src={user?.picture || FALLBACK_AVATAR}
      alt={user?.name || "Student"}
      className={cn(
        "shrink-0 rounded-full border bg-muted object-cover",
        sizes[size],
        className,
      )}
    />
  );
}
 
export function TagList({ tags, limit = 5 }) {
  if (!tags?.length) return null;
  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.slice(0, limit).map((tag) => (
        <span
          key={tag}
          className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground"
        >
          #{tag}
        </span>
      ))}
    </div>
  );
}
 
export function InlineError({ message }) {
  if (!message) return null;
  return (
    <p
      role="alert"
      className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-2.5 text-sm text-destructive"
    >
      {message}
    </p>
  );
}
 
