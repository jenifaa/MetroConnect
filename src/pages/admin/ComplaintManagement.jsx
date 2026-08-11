import { useState } from "react";
import {
  useGetComplaintsQuery,
  useUpdateComplaintStatusMutation,
} from "@/redux/features/complaint/complaint.api";
import { LoadingState, EmptyState, ErrorState } from "@/components/common/States";
import PageHeader from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { toast } from "@/components/ui/toast";
import { ShieldCheck, User, Clock, AlertTriangle, Eye, Send } from "lucide-react";

export default function ComplaintManagement() {
  const { data: complaintsResponse, isLoading, isError, refetch } = useGetComplaintsQuery(undefined);
  const [updateComplaintStatus, { isLoading: isUpdating }] = useUpdateComplaintStatusMutation();

  const complaints = complaintsResponse?.data || [];

  // Focus modal state
  const [activeComplaint, setActiveComplaint] = useState(null);
  const [statusVal, setStatusVal] = useState("Under Review");
  const [resolutionText, setResolutionText] = useState("");

  const handleOpenDetail = (complaint) => {
    setActiveComplaint(complaint);
    setStatusVal(complaint.status || "Under Review");
    setResolutionText(complaint.resolutionDetails || "");
  };

  const handleUpdateStatusSubmit = async (e) => {
    e.preventDefault();
    if (!activeComplaint) return;
    try {
      await updateComplaintStatus({
        id: activeComplaint.id || activeComplaint._id,
        status: statusVal,
        resolutionDetails: resolutionText,
      }).unwrap();
      toast.success("Complaint resolved and status updated! 🎉");
      setActiveComplaint(null);
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update complaint resolution status");
    }
  };

  // Helper for complaint status badges
  const getStatusStyle = (status) => {
    switch (status) {
      case "Resolved":
        return "bg-green-500/10 text-green-700 dark:text-green-400 border-green-200/50";
      case "Under Review":
        return "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-200/50";
      case "Rejected":
        return "bg-red-500/10 text-red-700 dark:text-red-400 border-red-200/50";
      default:
        return "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200/50";
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Administrative Complaints Review"
        description="Review student grievances, adjust status logs, and draft official resolution comments."
      />

      {isLoading ? (
        <LoadingState message="Loading complaints catalog..." items={3} />
      ) : isError ? (
        <ErrorState onRetry={refetch} />
      ) : complaints.length === 0 ? (
        <EmptyState title="No complaints logged" description="No students have logged administrative feedback on this server." />
      ) : (
        <div className="grid gap-6 lg:grid-cols-3 items-start">
          {/* List panel */}
          <div className="lg:col-span-2 space-y-4">
            {complaints.map((item) => (
              <Card
                key={item.id || item._id}
                onClick={() => handleOpenDetail(item)}
                className={`overflow-hidden border rounded-2xl cursor-pointer hover:border-primary/20 transition ${
                  activeComplaint?.id === item.id || activeComplaint?._id === item._id
                    ? "border-primary bg-primary/5 ring-1 ring-primary"
                    : "border-muted bg-card"
                }`}
              >
                <CardContent className="p-5 flex justify-between items-center gap-4">
                  <div className="space-y-2 overflow-hidden flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[9px] font-bold text-muted-foreground uppercase bg-muted px-2 py-0.5 rounded-full">
                        Ref: {item.referenceId || item.id?.substring(0, 8) || item._id?.substring(0, 8)}
                      </span>
                      {item.isAnonymous ? (
                        <span className="inline-flex items-center gap-0.5 text-[9px] font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded-md dark:bg-indigo-950/20">
                          <ShieldCheck className="h-3 w-3" />
                          Anonymous
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-0.5 text-[9px] font-bold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded-md dark:bg-slate-950/20">
                          <User className="h-3 w-3" />
                          Named
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-foreground text-sm truncate">{item.title}</h3>
                    <p className="text-xs text-muted-foreground leading-normal flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      <span>Filed {new Date(item.createdAt).toLocaleDateString()}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusStyle(item.status)}`}>
                      {item.status || "Pending"}
                    </span>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Details & Resolution panel */}
          <div className="space-y-4">
            {activeComplaint ? (
              <Card className="border border-muted rounded-3xl p-6 shadow-md bg-card/60 sticky top-24">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-3">
                    <h3 className="font-bold text-base text-foreground font-serif">Complaint File</h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStatusStyle(activeComplaint.status)}`}>
                      {activeComplaint.status || "Pending"}
                    </span>
                  </div>

                  <div className="space-y-3.5 text-xs text-muted-foreground leading-relaxed">
                    <div>
                      <p className="font-semibold text-foreground uppercase tracking-wider text-[10px] mb-1">Grievance</p>
                      <h4 className="font-bold text-foreground text-sm leading-snug mb-1">{activeComplaint.title}</h4>
                      <p className="bg-muted/40 p-3 rounded-xl border border-muted/50 leading-normal max-h-36 overflow-y-auto">
                        {activeComplaint.description}
                      </p>
                    </div>

                    <div className="border-t pt-3 flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-foreground uppercase tracking-wider text-[10px]">Author Profile</p>
                        {activeComplaint.isAnonymous ? (
                          <p className="text-indigo-600 font-bold flex items-center gap-1 text-[11px] mt-0.5">
                            <ShieldCheck className="h-3.5 w-3.5" />
                            Redacted (Anonymous)
                          </p>
                        ) : (
                          <p className="text-foreground font-semibold flex items-center gap-1 text-[11px] mt-0.5">
                            <User className="h-3.5 w-3.5 text-primary" />
                            {activeComplaint.author?.name || "Student"} ({activeComplaint.author?.email})
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Resolution Input form */}
                  <form onSubmit={handleUpdateStatusSubmit} className="space-y-4 border-t pt-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-foreground uppercase tracking-wider">Update Status</label>
                      <Select value={statusVal} onValueChange={setStatusVal}>
                        <SelectTrigger className="h-10 rounded-xl w-full">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Pending">Pending (Not Reviewed)</SelectItem>
                          <SelectItem value="Under Review">Under Review (Investigating)</SelectItem>
                          <SelectItem value="Resolved">Resolved (Grievance Settled)</SelectItem>
                          <SelectItem value="Rejected">Rejected (Declined)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-foreground uppercase tracking-wider">Resolution Comments</label>
                      <textarea
                        value={resolutionText}
                        onChange={(e) => setResolutionText(e.target.value)}
                        placeholder="Append official response comments detailing investigation logs or action items..."
                        className="w-full min-h-24 rounded-xl border bg-background p-3 text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary border-muted"
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full h-10 rounded-xl gap-2 font-semibold" disabled={isUpdating}>
                      <Send className="h-4 w-4" />
                      <span>{isUpdating ? "Saving..." : "Save Resolution"}</span>
                    </Button>
                  </form>
                </div>
              </Card>
            ) : (
              <Card className="border border-muted rounded-3xl p-8 text-center text-xs text-muted-foreground border-dashed">
                Select a complaint from the listing to review details and document resolution.
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
