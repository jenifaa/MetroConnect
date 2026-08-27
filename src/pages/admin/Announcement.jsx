import { useMemo, useState } from "react";
import { Link } from "react-router";

import {
  Bell,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Eye,
  Megaphone,
  Pencil,
  Plus,
  Search,
  Send,
  Trash2,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Badge } from "@/components/ui/badge";

import {
  useGetAnnouncementsQuery,
  useCreateAnnouncementMutation,
  useUpdateAnnouncementMutation,
  useDeleteAnnouncementMutation,
} from "@/redux/features/announcement/announcement.api";

function Announcement() {
  // =========================================================
  // STATE
  // =========================================================

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  // =========================================================
  // GET ANNOUNCEMENTS
  // =========================================================

  const { data, isLoading, isFetching, isError, refetch } =
    useGetAnnouncementsQuery({
      searchTerm: searchTerm || undefined,
      page,
      limit: 8,
    });

  // =========================================================
  // MUTATIONS
  // =========================================================

  const [createAnnouncement, { isLoading: isCreating }] =
    useCreateAnnouncementMutation();

  const [updateAnnouncement, { isLoading: isUpdating }] =
    useUpdateAnnouncementMutation();

  const [deleteAnnouncement, { isLoading: isDeleting }] =
    useDeleteAnnouncementMutation();

  // =========================================================
  // DATA
  // =========================================================

  const announcements = data?.data || [];

  const meta = data?.meta;

  const totalAnnouncements =
    meta?.total || meta?.totalItems || announcements.length;

  const totalPages = meta?.totalPage || meta?.totalPages || 1;

  const visibleCount = announcements.length;

  const latestAnnouncement = useMemo(() => {
    if (!announcements.length) {
      return null;
    }

    return [...announcements].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    )[0];
  }, [announcements]);

  // =========================================================
  // FORM HANDLING
  // =========================================================

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
    });

    setSelectedAnnouncement(null);
  };

  // =========================================================
  // CREATE ANNOUNCEMENT
  // =========================================================

  const handleCreate = async (event) => {
    event.preventDefault();

    const title = formData.title.trim();
    const description = formData.description.trim();

    // Frontend validation
    if (!title) {
      console.log("Announcement title is required.");
      return;
    }

    if (!description) {
      console.log("Announcement description is required.");
      return;
    }

    try {
      const payload = {
        title,
        description,
      };

      console.log("Creating announcement with payload:", payload);

      const response = await createAnnouncement(payload).unwrap();

      console.log("Announcement created successfully:", response);

      setCreateOpen(false);
      resetForm();
      setPage(1);

      await refetch();
    } catch (error) {
      console.log("Failed to create announcement:", error);

      console.error(
        "Backend error message:",
        error?.data?.message ||
          error?.data?.err?.message ||
          "Failed to create announcement.",
      );

      console.log(
        "Validation errors:",
        error?.data?.err || error?.data?.errorSources || null,
      );
    }
  };

  // =========================================================
  // OPEN EDIT
  // =========================================================

  const openEdit = (announcement) => {
    setSelectedAnnouncement(announcement);

    setFormData({
      title: announcement?.title || "",
      description: announcement?.description || "",
    });

    setEditOpen(true);
  };

  // =========================================================
  // UPDATE ANNOUNCEMENT
  // =========================================================

  const handleUpdate = async (event) => {
    event.preventDefault();

    if (!selectedAnnouncement?._id) {
      console.error("Announcement ID is missing.");
      return;
    }

    const title = formData.title.trim();
    const description = formData.description.trim();

    if (!title) {
      console.log("Announcement title is required.");
      return;
    }

    if (!description) {
      console.log("Announcement description is required.");
      return;
    }

    try {
      const payload = {
        id: selectedAnnouncement._id,
        data: {
          title,
          description,
        },
      };

      console.log("Updating announcement with payload:", payload);

      const response = await updateAnnouncement(payload).unwrap();

      console.log("Announcement updated successfully:", response);

      setEditOpen(false);
      resetForm();

      await refetch();
    } catch (error) {
      console.error("Failed to update announcement:", error);

      console.error(
        "Backend error message:",
        error?.data?.message ||
          error?.data?.err?.message ||
          "Failed to update announcement.",
      );

      console.error(
        "Validation errors:",
        error?.data?.err || error?.data?.errorSources || null,
      );
    }
  };

  // =========================================================
  // OPEN DELETE
  // =========================================================

  const openDelete = (announcement) => {
    setSelectedAnnouncement(announcement);
    setDeleteOpen(true);
  };

  // =========================================================
  // DELETE ANNOUNCEMENT
  // =========================================================

  const handleDelete = async () => {
    if (!selectedAnnouncement?._id) {
      console.error("Announcement ID is missing.");
      return;
    }

    try {
      console.log("Deleting announcement:", selectedAnnouncement._id);

      const response = await deleteAnnouncement(
        selectedAnnouncement._id,
      ).unwrap();

      console.log("Announcement deleted successfully:", response);

      setDeleteOpen(false);
      setSelectedAnnouncement(null);

      if (announcements.length === 1 && page > 1) {
        setPage((previous) => previous - 1);
      }

      await refetch();
    } catch (error) {
      console.error("Failed to delete announcement:", error);

      console.error(
        "Backend error message:",
        error?.data?.message ||
          error?.data?.err?.message ||
          "Failed to delete announcement.",
      );
    }
  };

  // =========================================================
  // DATE FORMATTER
  // =========================================================

  const formatDate = (date) => {
    if (!date) {
      return "Unknown date";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Unknown date";
    }

    return parsedDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // =========================================================
  // LOADING STATE
  // =========================================================

  if (isLoading) {
    return (
      <div className="space-y-6 pb-8">
        {/* Header Skeleton */}
        <div className="animate-pulse space-y-3">
          <div className="h-8 w-64 rounded-md bg-muted" />
          <div className="h-4 w-96 rounded-md bg-muted" />
        </div>

        {/* Statistics Skeleton */}
        <div className="grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <Card key={item}>
              <CardContent className="p-6">
                <div className="h-20 animate-pulse rounded-lg bg-muted" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Cards Skeleton */}
        <div className="grid gap-5 lg:grid-cols-2">
          {[1, 2, 3, 4].map((item) => (
            <Card key={item}>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="h-5 animate-pulse rounded bg-muted" />
                  <div className="h-24 animate-pulse rounded bg-muted" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // =========================================================
  // ERROR STATE
  // =========================================================

  if (isError) {
    return (
      <div className="flex min-h-125 items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center p-10 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
              <Bell className="h-7 w-7 text-destructive" />
            </div>

            <h2 className="text-xl font-semibold">
              Unable to load announcements
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Something went wrong while loading announcements.
            </p>

            <Button className="mt-6" onClick={() => refetch()}>
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // =========================================================
  // MAIN PAGE
  // =========================================================

  return (
    <div className="space-y-7 pb-8">
      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="relative overflow-hidden rounded-2xl border bg-card">
        <div className="absolute -right-16 -top-20 h-52 w-52 rounded-full bg-primary/10 blur-3xl" />

        <div className="relative flex flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
              <Megaphone className="h-7 w-7 text-primary" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  Announcements
                </h1>

                <Badge variant="secondary">Admin</Badge>
              </div>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                Create and manage important university announcements. Every
                announcement is automatically delivered to your users.
              </p>
            </div>
          </div>

          <Button
            size="lg"
            className="shrink-0"
            onClick={() => {
              resetForm();
              setCreateOpen(true);
            }}
          >
            <Plus className="mr-2 h-5 w-5" />
            New Announcement
          </Button>
        </div>
      </div>

      {/* =====================================================
          STATISTICS
      ====================================================== */}

      <div className="grid gap-4 md:grid-cols-3">
        {/* Total */}
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Announcements
                </p>

                <p className="mt-2 text-3xl font-bold">{totalAnnouncements}</p>

                <p className="mt-1 text-xs text-muted-foreground">
                  Published announcements
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Megaphone className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current Results */}
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Current Results
                </p>

                <p className="mt-2 text-3xl font-bold">{visibleCount}</p>

                <p className="mt-1 text-xs text-muted-foreground">
                  Showing on this page
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10">
                <CheckCircle2 className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Audience */}
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Audience
                </p>

                <p className="mt-2 text-2xl font-bold">All Users</p>

                <p className="mt-1 text-xs text-muted-foreground">
                  Notifications are sent automatically
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* =====================================================
          SEARCH
      ====================================================== */}

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                value={searchTerm}
                placeholder="Search announcements by title or description..."
                className="h-11 pl-9"
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                  setPage(1);
                }}
              />
            </div>

            {isFetching && !isLoading && (
              <div className="flex items-center justify-center px-3 text-sm text-muted-foreground">
                Updating...
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* =====================================================
          LATEST ANNOUNCEMENT
      ====================================================== */}

      {!searchTerm && latestAnnouncement && page === 1 && (
        <Card className="overflow-hidden border-primary/20">
          <CardContent className="p-0">
            <div className="flex flex-col lg:flex-row">
              <div className="flex w-full items-center justify-center bg-primary/5 p-8 lg:w-1/4">
                <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10">
                  <Bell className="h-9 w-9 text-primary" />
                </div>
              </div>

              <div className="flex-1 p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge>Latest Announcement</Badge>

                  <span className="text-xs text-muted-foreground">
                    {formatDate(latestAnnouncement.createdAt)}
                  </span>
                </div>

                <h2 className="mt-3 text-xl font-bold">
                  {latestAnnouncement.title}
                </h2>

                <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">
                  {latestAnnouncement.description}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* =====================================================
          SECTION HEADER
      ====================================================== */}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">All Announcements</h2>

          <p className="text-sm text-muted-foreground">
            Manage published announcements.
          </p>
        </div>
      </div>

      {/* =====================================================
          EMPTY STATE / ANNOUNCEMENT CARDS
      ====================================================== */}

      {announcements.length === 0 ? (
        <Card>
          <CardContent className="flex min-h-90 flex-col items-center justify-center p-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
              <Bell className="h-8 w-8 text-muted-foreground" />
            </div>

            <h3 className="mt-5 text-lg font-semibold">
              No announcements found
            </h3>

            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              {searchTerm
                ? "No announcements match your search."
                : "There are no announcements yet. Create one to notify your users."}
            </p>

            {!searchTerm && (
              <Button
                className="mt-5"
                onClick={() => {
                  resetForm();
                  setCreateOpen(true);
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Announcement
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-5 lg:grid-cols-2">
          {announcements.map((announcement) => {
            const creator = announcement?.createdBy;

            return (
              <Card
                key={announcement._id}
                className="group overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                {/* Card Header */}
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                      <Bell className="h-5 w-5 text-primary" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <CardTitle className="line-clamp-2 text-lg leading-6">
                            {announcement.title}
                          </CardTitle>

                          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <CalendarDays className="h-3.5 w-3.5" />

                              {formatDate(announcement.createdAt)}
                            </span>

                            <span>•</span>

                            <span>{creator?.name || "Admin"}</span>
                          </div>
                        </div>

                        <Badge variant="secondary" className="shrink-0">
                          Published
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                {/* Card Content */}
                <CardContent className="space-y-5">
                  <p className="line-clamp-4 whitespace-pre-wrap text-sm leading-6 text-muted-foreground">
                    {announcement.description}
                  </p>

                  {/* Notification Information */}
                  <div className="flex items-center gap-3 rounded-lg bg-muted/50 px-3 py-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Send className="h-4 w-4 text-primary" />
                    </div>

                    <div>
                      <p className="text-xs font-medium">
                        Notification Delivered
                      </p>

                      <p className="text-xs text-muted-foreground">
                        Sent automatically to users
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2 border-t pt-4">
                    {/* VIEW */}
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="flex-1 sm:flex-none"
                    >
                      <Link to={`/announcements/${announcement._id}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Link>
                    </Button>

                    {/* EDIT */}
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 sm:flex-none"
                      onClick={() => openEdit(announcement)}
                    >
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </Button>

                    {/* DELETE */}
                    <Button
                      variant="destructive"
                      size="sm"
                      className="flex-1 sm:flex-none"
                      onClick={() => openDelete(announcement)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* =====================================================
          PAGINATION
      ====================================================== */}

      {totalPages > 1 && (
        <div className="flex flex-col items-center justify-between gap-4 border-t pt-5 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </p>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1 || isFetching}
              onClick={() => setPage((current) => current - 1)}
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Previous
            </Button>

            <Button
              variant="outline"
              size="sm"
              disabled={page >= totalPages || isFetching}
              onClick={() => setPage((current) => current + 1)}
            >
              Next
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* =====================================================
          CREATE DIALOG
      ====================================================== */}

      <Dialog
        open={createOpen}
        onOpenChange={(open) => {
          setCreateOpen(open);

          if (!open) {
            resetForm();
          }
        }}
      >
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-155">
          <form onSubmit={handleCreate}>
            <DialogHeader>
              <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                <Megaphone className="h-5 w-5 text-primary" />
              </div>

              <DialogTitle>Create Announcement</DialogTitle>

              <DialogDescription>
                Create an important announcement. Users will automatically
                receive a notification after it is published.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-5 py-6">
              {/* TITLE */}
              <div className="space-y-2">
                <label
                  htmlFor="announcement-title"
                  className="text-sm font-medium"
                >
                  Announcement Title
                </label>

                <Input
                  id="announcement-title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g. Final Exam Schedule Released"
                  disabled={isCreating}
                  maxLength={200}
                  required
                />

                <p className="text-right text-xs text-muted-foreground">
                  {formData.title.length}/200
                </p>
              </div>

              {/* DESCRIPTION */}
              <div className="space-y-2">
                <label
                  htmlFor="announcement-description"
                  className="text-sm font-medium"
                >
                  Announcement Description
                </label>

                <Textarea
                  id="announcement-description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Write the announcement details here..."
                  rows={8}
                  disabled={isCreating}
                  maxLength={10000}
                  required
                />

                <p className="text-right text-xs text-muted-foreground">
                  {formData.description.length}
                  /10000
                </p>
              </div>

              {/* NOTIFICATION INFO */}
              <div className="rounded-xl border bg-muted/30 p-4">
                <div className="flex gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Users className="h-4 w-4 text-primary" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold">User Notification</p>

                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                      Once published, the announcement will be created and your
                      backend notification system can notify users according to
                      your configured service.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setCreateOpen(false);
                  resetForm();
                }}
                disabled={isCreating}
              >
                Cancel
              </Button>

              <Button type="submit" disabled={isCreating}>
                <Send className="mr-2 h-4 w-4" />

                {isCreating ? "Publishing..." : "Create & Send"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* =====================================================
          EDIT DIALOG
      ====================================================== */}

      <Dialog
        open={editOpen}
        onOpenChange={(open) => {
          setEditOpen(open);

          if (!open) {
            resetForm();
          }
        }}
      >
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-155">
          <form onSubmit={handleUpdate}>
            <DialogHeader>
              <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                <Pencil className="h-5 w-5 text-primary" />
              </div>

              <DialogTitle>Edit Announcement</DialogTitle>

              <DialogDescription>
                Update the announcement title or description.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-5 py-6">
              {/* TITLE */}
              <div className="space-y-2">
                <label
                  htmlFor="edit-announcement-title"
                  className="text-sm font-medium"
                >
                  Announcement Title
                </label>

                <Input
                  id="edit-announcement-title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  disabled={isUpdating}
                  maxLength={200}
                  required
                />

                <p className="text-right text-xs text-muted-foreground">
                  {formData.title.length}/200
                </p>
              </div>

              {/* DESCRIPTION */}
              <div className="space-y-2">
                <label
                  htmlFor="edit-announcement-description"
                  className="text-sm font-medium"
                >
                  Announcement Description
                </label>

                <Textarea
                  id="edit-announcement-description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={8}
                  disabled={isUpdating}
                  maxLength={10000}
                  required
                />

                <p className="text-right text-xs text-muted-foreground">
                  {formData.description.length}
                  /10000
                </p>
              </div>
            </div>

            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setEditOpen(false);
                  resetForm();
                }}
                disabled={isUpdating}
              >
                Cancel
              </Button>

              <Button type="submit" disabled={isUpdating}>
                <Pencil className="mr-2 h-4 w-4" />

                {isUpdating ? "Updating..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* =====================================================
          DELETE CONFIRMATION
      ====================================================== */}

      <AlertDialog
        open={deleteOpen}
        onOpenChange={(open) => {
          setDeleteOpen(open);

          if (!open) {
            setSelectedAnnouncement(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-xl bg-destructive/10">
              <Trash2 className="h-5 w-5 text-destructive" />
            </div>

            <AlertDialogTitle>Delete Announcement?</AlertDialogTitle>

            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-medium text-foreground">
                "{selectedAnnouncement?.title}"
              </span>
              ? This announcement will no longer be available to users.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>

            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Delete Announcement"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default Announcement;
