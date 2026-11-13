import { useState } from "react";
import { ChevronDown, LayoutGrid, Layers } from "lucide-react";
import { cn } from "@/lib/utils";
import { FILTER_LABELS, SOURCES, STATUS_FILTERS, TONES } from "@/utils/Feed.utils";

 
function Row({ icon: Icon, tone, label, count, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? "true" : undefined}
      className={cn(
        "flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors",
        active
          ? "bg-foreground/[0.07] font-semibold text-foreground"
          : "text-muted-foreground hover:bg-foreground/4 hover:text-foreground",
      )}
    >
      <Icon className={cn("h-4 w-4 shrink-0", tone && TONES[tone].text)} />
      <span className="flex-1 truncate text-left">{label}</span>
      {count !== undefined && (
        <span className="rounded-md border bg-background px-1.5 py-0.5 text-xs font-normal tabular-nums text-muted-foreground">
          {count}
        </span>
      )}
    </button>
  );
}
 
export function FeedSidebar({ active, onSelect, counts }) {
  const [exploreOpen, setExploreOpen] = useState(true);
 
  return (
    <nav aria-label="Feed filters" className="space-y-1 p-1">
      <Row
        icon={Layers}
        label="All activity"
        count={counts.all}
        active={active === "all"}
        onClick={() => onSelect("all")}
      />
 
      {/* Explore group with tree line, like the reference */}
      <div>
        <button
          type="button"
          onClick={() => setExploreOpen((o) => !o)}
          aria-expanded={exploreOpen}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-foreground/4 hover:text-foreground"
        >
          <LayoutGrid className="h-4 w-4 shrink-0" />
          <span className="flex-1 text-left">Explore</span>
          <ChevronDown
            className={cn("h-4 w-4 transition-transform", !exploreOpen && "-rotate-90")}
          />
        </button>
        {exploreOpen && (
          <div className="ml-5 mt-1 space-y-0.5 border-l pl-2">
            {SOURCES.map((s) => (
              <Row
                key={s.key}
                icon={s.icon}
                tone={s.tone}
                label={s.label}
                count={counts[s.key]}
                active={active === s.key}
                onClick={() => onSelect(s.key)}
              />
            ))}
          </div>
        )}
      </div>
 
      <p className="px-3 pb-1 pt-5 text-xs font-medium text-muted-foreground">
        Filters
      </p>
      {STATUS_FILTERS.map((f) => (
        <Row
          key={f.key}
          icon={f.icon}
          tone={f.tone}
          label={f.label}
          count={counts[f.key]}
          active={active === f.key}
          onClick={() => onSelect(f.key)}
        />
      ))}
    </nav>
  );
}
 
// Compact version for small screens: one scrollable row of pills
export function FeedFilterBar({ active, onSelect, counts }) {
  const keys = ["all", ...SOURCES.map((s) => s.key), ...STATUS_FILTERS.map((s) => s.key)];
  return (
    <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
      {keys.map((key) => (
        <button
          key={key}
          type="button"
          onClick={() => onSelect(key)}
          aria-pressed={active === key}
          className={cn(
            "shrink-0 rounded-full border px-3.5 py-1.5 text-sm transition-colors",
            active === key
              ? "border-foreground bg-foreground text-background"
              : "bg-background text-muted-foreground hover:text-foreground",
          )}
        >
          {FILTER_LABELS[key]}
          <span className="ml-1.5 text-xs opacity-70">{counts[key]}</span>
        </button>
      ))}
    </div>
  );
}
 