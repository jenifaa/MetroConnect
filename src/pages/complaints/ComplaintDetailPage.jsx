import { useParams, useNavigate } from "react-router";
import { ArrowLeft, Clock, ShieldCheck, User, CheckCircle2, MessageSquare, AlertCircle } from "lucide-react";
import { useGetComplaintByIdQuery } from "@/redux/features/complaint/complaint.api";
import { LoadingState, ErrorState } from "@/components/common/States";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function ComplaintDetailPage() {
  const { complaintId } = useParams();
  const navigate = useNavigate();

  const {
    data: complaintResponse,
    isLoading,
    isError,
    refetch,
  } = useGetComplaintByIdQuery(complaintId);

  const complaint = complaintResponse?.data || {};

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-3xl mt-14">
        <LoadingState message="Loading complaint details..." items={1} />
      </div>
    );
  }

  if (isError || !complaint.title) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-3xl mt-14">
        <ErrorState
          title="Complaint Record Not Found"
          message="This complaint does not exist or you lack sufficient access permissions."
          onRetry={refetch}
        />
        <div className="text-center mt-4">
          <Button onClick={() => navigate("/complaints")} variant="outline" className="rounded-xl">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Complaints
          </Button>
        </div>
      </div>
    );
  }

  // Helper for complaint status badges
  const getStatusStyle = (status) => {
    switch (status) {
      case "Resolved":
        return "bg-green-500/10 text-green-700 dark:text-green-400 border-green-200";
      case "Under Review":
        return "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-200";
      case "Rejected":
        return "bg-red-500/10 text-red-700 dark:text-red-400 border-red-200";
      default:
        return "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200";
    }
  };

  const getStatusStep = (status) => {
    switch (status) {
      case "Under Review":
        return 2;
      case "Resolved":
      case "Rejected":
        return 3;
      default:
        return 1;
    }
  };

  const currentStep = getStatusStep(complaint.status);

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl space-y-6 mt-14">
      <div>
        <Button onClick={() => navigate("/complaints")} variant="ghost" className="rounded-xl gap-2 text-muted-foreground">
          <ArrowLeft className="h-4 w-4" />
          Back to Complaints
        </Button>
      </div>

      <Card className="border border-muted rounded-3xl overflow-hidden shadow-xs">
        <CardContent className="p-6 md:p-8 space-y-6">
          {/* Header row */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-muted-foreground uppercase bg-muted px-2 py-0.5 rounded-full">
                Ref ID: {complaint.referenceId || complaint.id || complaint._id}
              </span>
              <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 dark:bg-indigo-950/20 px-2 py-0.5 rounded-full uppercase ml-2">
                {complaint.category || "General"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {complaint.isAnonymous ? (
                <span className="inline-flex items-center gap-0.5 text-xs font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-md dark:bg-indigo-950/20">
                  <ShieldCheck className="h-4 w-4" />
                  Anonymous Filing
                </span>
              ) : (
                <span className="inline-flex items-center gap-0.5 text-xs font-bold text-slate-600 bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-md dark:bg-slate-950/20">
                  <User className="h-4 w-4" />
                  Named Submission
                </span>
              )}
            </div>
          </div>

          {/* Title & Description */}
          <div className="space-y-4">
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-foreground font-serif">
              {complaint.title}
            </h1>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed whitespace-pre-line bg-muted/20 p-4 rounded-2xl border border-muted/50">
              {complaint.description}
            </p>
          </div>

          {/* Metadata */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Submitted {new Date(complaint.createdAt).toLocaleString()}</span>
            {complaint.updatedAt && (
              <>
                <span>•</span>
                <span>Last Updated {new Date(complaint.updatedAt).toLocaleDateString()}</span>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Visual Resolution Timeline Progress */}
      <Card className="border border-muted rounded-3xl p-6 shadow-xs">
        <h3 className="font-bold text-sm text-foreground uppercase tracking-wider mb-6">
          Investigation Progress
        </h3>
        <div className="relative flex justify-between items-center max-w-md mx-auto">
          {/* Connector Line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-muted -translate-y-1/2 -z-10" />
          <div
            className="absolute top-1/2 left-0 h-0.5 bg-primary -translate-y-1/2 -z-10 transition-all duration-300"
            style={{ width: currentStep === 1 ? "0%" : currentStep === 2 ? "50%" : "100%" }}
          />

          {/* Step 1: Submitted */}
          <div className="flex flex-col items-center gap-2 bg-card px-2">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold border transition ${
              currentStep >= 1 ? "bg-primary border-primary text-primary-foreground" : "bg-muted border-muted text-muted-foreground"
            }`}>
              1
            </div>
            <span className="text-[10px] font-bold text-muted-foreground uppercase">Submitted</span>
          </div>

          {/* Step 2: Under Review */}
          <div className="flex flex-col items-center gap-2 bg-card px-2">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold border transition ${
              currentStep >= 2 ? "bg-primary border-primary text-primary-foreground" : "bg-muted border-muted text-muted-foreground"
            }`}>
              2
            </div>
            <span className="text-[10px] font-bold text-muted-foreground uppercase">Reviewing</span>
          </div>

          {/* Step 3: Resolved */}
          <div className="flex flex-col items-center gap-2 bg-card px-2">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold border transition ${
              currentStep >= 3
                ? complaint.status === "Rejected"
                  ? "bg-red-500 border-red-500 text-white"
                  : "bg-green-500 border-green-500 text-white"
                : "bg-muted border-muted text-muted-foreground"
            }`}>
              3
            </div>
            <span className="text-[10px] font-bold text-muted-foreground uppercase">
              {complaint.status === "Rejected" ? "Rejected" : "Resolved"}
            </span>
          </div>
        </div>
      </Card>

      {/* Admin feedback / Resolution comments */}
      {complaint.resolutionDetails && (
        <Card className="border border-muted rounded-3xl overflow-hidden shadow-xs border-green-200/50 dark:border-green-950/30">
          <div className="bg-green-500/5 p-4 border-b border-green-200/30 dark:bg-green-950/10 flex items-center gap-2">
            {complaint.status === "Rejected" ? (
              <>
                <AlertCircle className="h-5 w-5 text-red-500" />
                <h3 className="font-bold text-sm text-red-700 dark:text-red-400 uppercase tracking-wider">
                  Rejection Reason
                </h3>
              </>
            ) : (
              <>
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                <h3 className="font-bold text-sm text-green-700 dark:text-green-400 uppercase tracking-wider">
                  Administrative Resolution Feedback
                </h3>
              </>
            )}
          </div>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
              {complaint.resolutionDetails}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
