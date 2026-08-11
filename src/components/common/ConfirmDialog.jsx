import { useEffect } from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "../ui/button";

export default function ConfirmDialog({
  isOpen,
  title = "Are you absolutely sure?",
  description = "This action cannot be undone. This will permanently delete the resource from the database.",
  confirmText = "Delete",
  cancelText = "Cancel",
  onConfirm,
  onClose,
  isDanger = true,
}) {
  // Prevent background scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
        onClick={onClose}
      />

      {/* Card Dialog */}
      <div className="relative w-full max-w-md rounded-3xl border bg-card p-6 shadow-2xl animate-in zoom-in-95 duration-200 z-10">
        <div className="flex gap-4">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
              isDanger
                ? "bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400"
                : "bg-primary/10 text-primary"
            }`}
          >
            <AlertCircle className="h-5 w-5" />
          </div>

          <div className="space-y-1.5 flex-1">
            <h3 className="text-lg font-bold text-foreground leading-none">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground leading-normal">
              {description}
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button variant="ghost" onClick={onClose} className="rounded-xl">
            {cancelText}
          </Button>
          <Button
            variant={isDanger ? "destructive" : "default"}
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="rounded-xl"
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}
