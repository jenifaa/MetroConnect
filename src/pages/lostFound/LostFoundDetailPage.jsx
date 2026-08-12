import { useState } from "react";
import {  useParams, useNavigate } from "react-router";
import {
  ArrowLeft,

  MapPin,
  Phone,

  Trash2,
  Calendar,
  Info,
} from "lucide-react";
import {
  useGetLostFoundByIdQuery,
  useDeleteLostFoundMutation,
} from "@/redux/features/lost-found/lostFound.api";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { LoadingState,  ErrorState } from "@/components/common/States";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/toast";

export default function LostFoundDetailPage() {
  const { itemId } = useParams();
  const navigate = useNavigate();

  const { data: userResponse } = useUserInfoQuery(undefined);
  const {
    data: itemResponse,
    isLoading,
    isError,
    refetch,
  } = useGetLostFoundByIdQuery(itemId);

  const [deleteItem] = useDeleteLostFoundMutation();

  const currentUser = userResponse?.data || {};
  const item = itemResponse?.data || {};

  const [isDeleting, setIsDeleting] = useState(false);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl mt-14">
        <LoadingState message="Loading listing details..." items={1} />
      </div>
    );
  }

  if (isError || !item.itemName) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl mt-14">
        <ErrorState
          title="Listing Not Found"
          message="This listing has expired or was removed by moderators."
          onRetry={refetch}
        />
        <div className="text-center mt-4">
          <Button onClick={() => navigate("/lost-found")} variant="outline" className="rounded-xl">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Board
          </Button>
        </div>
      </div>
    );
  }

  const isOwner = currentUser?.id === item?.reporter?.id || currentUser?._id === item?.reporter?._id || currentUser?.role === "ADMIN" || currentUser?.role === "SUPER_ADMIN";

  const handleDelete = async () => {
    try {
      await deleteItem(item.id || item._id).unwrap();
      toast.success("Listing deleted successfully");
      navigate("/lost-found");
    } catch (err) {
      toast.error(err?.data?.message || "Could not delete listing");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl space-y-6 mt-14">
      <div>
        <Button onClick={() => navigate("/lost-found")} variant="ghost" className="rounded-xl gap-2 text-muted-foreground">
          <ArrowLeft className="h-4 w-4" />
          Back to Board
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Left 2 Columns: Image & details */}
        <div className="md:col-span-2 space-y-6">
          <Card className="border border-muted rounded-3xl overflow-hidden shadow-xs">
            <div className="relative h-72 md:h-96 bg-muted border-b">
              <img
                src={item.image || "https://i.ibb.co.com/47C2Fh6L/placeholder.jpg"}
                alt={item.itemName}
                className="w-full h-full object-cover"
              />
              <span
                className={`absolute top-4 left-4 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase border text-white shadow-md ${
                  item.type === "lost"
                    ? "bg-red-600 border-red-500"
                    : "bg-green-600 border-green-500"
                }`}
              >
                {item.type}
              </span>
            </div>

            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between border-b pb-4">
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground font-serif">
                  {item.itemName}
                </h1>

                {isOwner && (
                  <Button
                    onClick={() => setIsDeleting(true)}
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-xl text-red-500 hover:text-red-600 hover:bg-red-500/5"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-sm text-foreground flex items-center gap-1.5">
                  <Info className="h-4 w-4 text-primary" />
                  Description
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed whitespace-pre-line">
                  {item.description}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right 1 Column: Location & Contact */}
        <div className="space-y-6">
          <Card className="border border-muted rounded-3xl p-6 shadow-xs space-y-5 bg-card">
            <h2 className="font-bold text-sm text-foreground uppercase tracking-wider border-b pb-2">
              Listing Metadata
            </h2>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground">Location</p>
                  <p className="text-xs text-muted-foreground">{item.location}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground">Date Listed</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(item.date).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 border-t pt-4">
                <Phone className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                <div className="overflow-hidden">
                  <p className="font-semibold text-foreground">Contact Info</p>
                  <p className="text-xs font-mono text-muted-foreground break-all bg-muted/40 p-2 rounded-lg mt-1">
                    {item.contact}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t pt-4 flex items-center gap-3">
              <img
                src={item.reporter?.picture || "https://i.ibb.co.com/xttK0CDW/pp.jpg"}
                alt="Reporter"
                className="h-8 w-8 rounded-full border object-cover"
              />
              <div className="overflow-hidden">
                <span className="text-xs text-muted-foreground">Reported By</span>
                <p className="text-xs font-bold text-foreground truncate">
                  {item.reporter?.name || "MU Student"}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={isDeleting}
        title="Delete Listing"
        description="Are you sure you want to delete this listing? This listing will immediately expire from the public notice board."
        onConfirm={handleDelete}
        onClose={() => setIsDeleting(false)}
      />
    </div>
  );
}
