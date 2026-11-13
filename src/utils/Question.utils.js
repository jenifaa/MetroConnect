export const CATEGORIES = [
  { value: "ACADEMIC", label: "Academic" },
  { value: "CAMPUS_LIFE", label: "Campus life" },
  { value: "CAREER", label: "Career" },
  { value: "TECHNICAL", label: "Technical" },
  { value: "OTHER", label: "Other" },
];
 
export const FALLBACK_AVATAR = "https://i.ibb.co.com/xttK0CDW/pp.jpg";
 
export const getId = (item) => item?._id || item?.id;
 
export const categoryLabel = (value) =>
  CATEGORIES.find((c) => c.value === value)?.label || value || "General";
 
export const getErrorMessage = (err, fallback) =>
  err?.data?.message || err?.message || fallback;
 
export function timeAgo(date) {
  if (!date) return "";
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (seconds < 60) return "just now";
  const units = [
    ["year", 31536000],
    ["month", 2592000],
    ["day", 86400],
    ["hour", 3600],
    ["minute", 60],
  ];
  for (const [name, size] of units) {
    if (seconds >= size) {
      const n = Math.floor(seconds / size);
      return `${n} ${name}${n > 1 ? "s" : ""} ago`;
    }
  }
  return "just now";
}
 