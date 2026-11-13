import {
  FileText,
  Megaphone,
  HelpCircle,
  PackageSearch,
  PackageCheck,
  SearchX,
  CheckCircle2,
  CircleDot,
} from "lucide-react";
 
/* ------------------------------------------------------------------ */
/*  Sidebar config                                                     */
/* ------------------------------------------------------------------ */
 
// Full class names so Tailwind can see them
export const TONES = {
  indigo: { text: "text-indigo-600 dark:text-indigo-400", bg: "bg-indigo-500/10" },
  amber: { text: "text-amber-600 dark:text-amber-400", bg: "bg-amber-500/10" },
  sky: { text: "text-sky-600 dark:text-sky-400", bg: "bg-sky-500/10" },
  rose: { text: "text-rose-600 dark:text-rose-400", bg: "bg-rose-500/10" },
  emerald: { text: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-500/10" },
};
 
export const BADGE_STYLES = {
  found: "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/60 dark:text-sky-300 dark:border-sky-900",
  lost: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-900",
  solved: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-900",
  unsolved: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-900",
};
 
// "Explore" group: one entry per API
export const SOURCES = [
  { key: "post", label: "Posts", singular: "Post", icon: FileText, tone: "indigo" },
  { key: "announcement", label: "Announcements", singular: "Announcement", icon: Megaphone, tone: "amber" },
  { key: "question", label: "Questions", singular: "Question", icon: HelpCircle, tone: "sky" },
  { key: "lostfound", label: "Lost & found", singular: "Lost & found", icon: PackageSearch, tone: "rose" },
];
 
// "Filters" group: status filters that cut across the APIs
export const STATUS_FILTERS = [
  { key: "found", label: "Found", icon: PackageCheck, tone: "sky" },
  { key: "lost", label: "Lost", icon: SearchX, tone: "rose" },
  { key: "solved", label: "Solved", icon: CheckCircle2, tone: "emerald" },
  { key: "unsolved", label: "Unsolved", icon: CircleDot, tone: "amber" },
];
 
export const SOURCE_MAP = Object.fromEntries(SOURCES.map((s) => [s.key, s]));
 
export const FILTER_LABELS = {
  all: "All activity",
  ...Object.fromEntries(SOURCES.map((s) => [s.key, s.label])),
  ...Object.fromEntries(STATUS_FILTERS.map((s) => [s.key, s.label])),
};
 
/* ------------------------------------------------------------------ */
/*  Normalizers: ONE place that knows each API's field names.          */
/*  Adjust the field names / routes below to match your backend.       */
/* ------------------------------------------------------------------ */
 
const ROUTES = {
  post: (id) => `/posts/${id}`,
  announcement: (id) => `/announcements/${id}`,
  question: (id) => `/questions/${id}`,
  lostfound: (id) => `/lost-found/${id}`,
};
 
const getId = (item) => item?._id || item?.id;
 
export const toList = (response) =>
  Array.isArray(response?.data) ? response.data : Array.isArray(response) ? response : [];
 
const pickImage = (item) => {
  const first = item.images?.[0] ?? item.photos?.[0] ?? item.attachments?.[0];
  return (
    item.image ||
    item.imageUrl ||
    item.photo ||
    item.thumbnail ||
    (typeof first === "string" ? first : first?.url) ||
    null
  );
};
 
const base = (type, item) => ({
  key: `${type}-${getId(item)}`,
  type,
  id: getId(item),
  title: item.title || item.name || item.itemName || "Untitled",
  description: item.description || item.content || item.body || "",
  image: pickImage(item),
  author: item.author || item.postedBy || item.user || item.createdBy || null,
  createdAt: item.createdAt,
  link: ROUTES[type](getId(item)),
  statusTag: null, // "found" | "lost" | "solved" | "unsolved" | null
  badge: null, // { label, tag }
});
 
export const normalizePost = (item) => base("post", item);
 
export const normalizeAnnouncement = (item) => base("announcement", item);
 
export const normalizeQuestion = (item) => {
  const tag = item.isSolved ? "solved" : "unsolved";
  return {
    ...base("question", item),
    statusTag: tag,
    badge: { label: item.isSolved ? "Solved" : "Unsolved", tag },
  };
};
 
// Assumes a lost-found item says whether it is LOST or FOUND in
// `type`, `status` or `kind`. Change this if your model differs.
export const normalizeLostFound = (item) => {
  const kind = String(item.type || item.kind || item.status || "").toUpperCase();
  const tag = kind.includes("FOUND") ? "found" : kind.includes("LOST") ? "lost" : null;
  return {
    ...base("lostfound", item),
    statusTag: tag,
    badge: tag ? { label: tag === "found" ? "Found" : "Lost", tag } : null,
  };
};
 
/* ------------------------------------------------------------------ */
/*  Filtering helpers                                                  */
/* ------------------------------------------------------------------ */
 
export const byNewest = (a, b) =>
  new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
 
export const matchesFilter = (item, active) => {
  if (active === "all") return true;
  if (SOURCE_MAP[active]) return item.type === active;
  return item.statusTag === active;
};
 
export const matchesSearch = (item, term) => {
  if (!term) return true;
  const q = term.toLowerCase();
  return `${item.title} ${item.description}`.toLowerCase().includes(q);
};
 
export const countByFilter = (items) => {
  const counts = { all: items.length };
  [...SOURCES, ...STATUS_FILTERS].forEach((f) => {
    counts[f.key] = items.filter((i) => matchesFilter(i, f.key)).length;
  });
  return counts;
};
 
