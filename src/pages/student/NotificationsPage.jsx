import { Bell, Check, Clock, Trash2, MailOpen, Eye } from "lucide-react";
import {
  useGetNotificationsQuery,
  useMarkNotificationReadMutation,
  useMarkAllNotificationsReadMutation,
} from "@/redux/features/notification/notification.api";
import { LoadingState, EmptyState, ErrorState } from "@/components/common/States";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/toast";

export default function NotificationsPage() {
  const { data: notificationsResponse, isLoading, isError, refetch } = useGetNotificationsQuery(undefined);
  const [markRead] = useMarkNotificationReadMutation();
  const [markAllRead] = useMarkAllNotificationsReadMutation();

  const notifications = notificationsResponse?.data || [];
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleMarkRead = async (id) => {
    try {
      await markRead(id).unwrap();
      toast.success("Notification marked as read");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update notification");
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await markAllRead(undefined).unwrap();
      toast.success("All notifications marked as read! 🎉");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update notifications");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl space-y-6 mt-14">
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-foreground font-serif flex items-center gap-2">
            <Bell className="h-7 w-7 text-primary" />
            Notifications
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground mt-1">
            Stay up to date with community activity, Q&A responses, and complaints tracking status.
          </p>
        </div>

        {unreadCount > 0 && (
          <Button
            onClick={handleMarkAllRead}
            variant="outline"
            className="rounded-xl text-xs gap-1 h-9 font-semibold"
          >
            <Check className="h-3.5 w-3.5" />
            <span>Mark all read</span>
          </Button>
        )}
      </div>

      {/* Notifications list */}
      {isLoading ? (
        <LoadingState message="Loading your alerts..." items={3} />
      ) : isError ? (
        <ErrorState onRetry={refetch} />
      ) : notifications.length === 0 ? (
        <EmptyState
          title="All caught up!"
          description="You don't have any notifications at the moment. We'll alert you here when new replies or actions occur."
          icon={Bell}
        />
      ) : (
        <div className="space-y-3">
          {notifications.map((item) => (
            <Card
              key={item.id || item._id}
              className={`overflow-hidden border rounded-2xl transition duration-200 ${
                item.isRead
                  ? "bg-card border-muted/50 text-muted-foreground"
                  : "bg-primary/5 border-primary/20 text-foreground"
              }`}
            >
              <CardContent className="p-4 flex gap-4 items-start">
                {/* Visual indicator dot */}
                {!item.isRead && (
                  <span className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0 animate-pulse" />
                )}

                <div className="flex-1 space-y-1 overflow-hidden">
                  <p className="text-sm leading-relaxed">
                    {item.message || "A notification occurred on your account."}
                  </p>

                  <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-mono">
                    <Clock className="h-3 w-3" />
                    <span>{new Date(item.createdAt).toLocaleString()}</span>
                  </div>
                </div>

                {!item.isRead && (
                  <Button
                    onClick={() => handleMarkRead(item.id || item._id)}
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-lg text-primary hover:bg-primary/10 hover:text-primary shrink-0 self-center"
                    aria-label="Mark as read"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
