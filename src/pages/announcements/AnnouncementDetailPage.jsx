import { useParams, useNavigate } from "react-router";
import { ArrowLeft, Clock, Megaphone, Calendar, Shield } from "lucide-react";
import { useGetAnnouncementByIdQuery } from "@/redux/features/announcement/announcement.api";
import { LoadingState, ErrorState } from "@/components/common/States";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function AnnouncementDetailPage() {
  const { announcementId } = useParams();
  const navigate = useNavigate();

  const {
    data: announcementResponse,
    isLoading,
    isError,
    refetch,
  } = useGetAnnouncementByIdQuery(announcementId);

  const announcement = announcementResponse?.data || {};

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-3xl mt-14">
        <LoadingState message="Loading announcement detail..." items={1} />
      </div>
    );
  }

  if (isError || !announcement.title) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-3xl mt-14">
        <ErrorState
          title="Announcement Not Found"
          message="This notice may have expired or been withdrawn by the administrative team."
          onRetry={refetch}
        />
        <div className="text-center mt-4">
          <Button onClick={() => navigate("/announcements")} variant="outline" className="rounded-xl">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Notices
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl space-y-6 mt-14">
      <div>
        <Button onClick={() => navigate("/announcements")} variant="ghost" className="rounded-xl gap-2 text-muted-foreground">
          <ArrowLeft className="h-4 w-4" />
          Back to Announcements
        </Button>
      </div>

      <Card className="border border-muted border-t-8 border-t-primary rounded-3xl overflow-hidden shadow-md">
        <CardContent className="p-6 md:p-10 space-y-6">
          {/* Metadata Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-primary bg-primary/10 border border-primary/20 px-3.5 py-1 rounded-full uppercase">
              <Megaphone className="h-3.5 w-3.5" />
              {announcement.category || "Official Broadcast"}
            </span>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Published {new Date(announcement.createdAt).toLocaleString()}</span>
            </div>
          </div>

          {/* Title & Body */}
          <div className="space-y-6">
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-foreground font-serif leading-tight">
              {announcement.title}
            </h1>
            <p className="text-sm md:text-base text-foreground leading-relaxed whitespace-pre-line">
              {announcement.content}
            </p>
          </div>

          {/* Optional Attachment Image */}
          {announcement.image && (
            <div className="rounded-2xl overflow-hidden border max-h-120">
              <img
                src={announcement.image}
                alt="Announcement attachment"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Administrator Seal */}
          <div className="flex items-center gap-3 pt-6 border-t mt-8 bg-muted/20 p-4 rounded-2xl border border-muted/50">
            <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-foreground">Metropolitan University Registrar</p>
              <p className="text-[10px] text-muted-foreground">Signed & approved under official campus authority</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
