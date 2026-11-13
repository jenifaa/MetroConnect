import { Link } from "react-router";
import { cn } from "@/lib/utils";
import { BADGE_STYLES, SOURCE_MAP, TONES } from "@/utils/Feed.utils";
import { timeAgo } from "@/utils/Question.utils";

 
export default function FeedCard({ item }) {
  const source = SOURCE_MAP[item.type];
  const Icon = source.icon;
  const tone = TONES[source.tone];
 
  return (
    <Link
      to={item.link}
      className="group block rounded-3xl border bg-card p-2 transition-all hover:-translate-y-0.5 hover:shadow-lg"
    >
      {/* Soft media tile, like the reference */}
      <div className="relative aspect-4/3 overflow-hidden rounded-2xl bg-muted/60">
        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className={cn("rounded-3xl p-6", tone.bg)}>
              <Icon className={cn("h-12 w-12", tone.text)} strokeWidth={1.5} />
            </span>
          </div>
        )}
 
        {item.badge && (
          <span
            className={cn(
              "absolute left-3 top-3 rounded-full border px-2.5 py-0.5 text-xs font-medium backdrop-blur",
              BADGE_STYLES[item.badge.tag],
            )}
          >
            {item.badge.label}
          </span>
        )}
      </div>
 
      <div className="space-y-1 px-3 pb-3 pt-3.5">
        <h3 className="line-clamp-1 font-semibold tracking-tight">{item.title}</h3>
        {item.description && (
          <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
            {item.description}
          </p>
        )}
        <div className="flex items-center justify-between pt-1.5 text-xs text-muted-foreground">
          <span className={cn("flex items-center gap-1.5 font-medium", tone.text)}>
            <Icon className="h-3.5 w-3.5" />
            {source.singular}
          </span>
          <span>{timeAgo(item.createdAt)}</span>
        </div>
      </div>
    </Link>
  );
}
 