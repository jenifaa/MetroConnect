import { Link } from "react-router";
import {
  Mail,
  User,
  Shield,
  CalendarDays,
  GraduationCap,
  Pencil,
  MapPin,
  Phone,
  BadgeCheck,
  Loader2,
  AlertCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import { useUserInfoQuery } from "@/redux/features/auth/auth.api";

function MyProfile() {
  const { data, isLoading, isError } = useUserInfoQuery(undefined);

  const user = data?.data;

  if (isLoading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">
            Loading your profile...
          </p>
        </div>
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
            <div className="rounded-full bg-destructive/10 p-4">
              <AlertCircle className="h-8 w-8 text-destructive" />
            </div>

            <div>
              <h2 className="text-xl font-bold">
                Unable to load profile
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Something went wrong while loading your profile information.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getInitials = (name = "") => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const formatDate = (date) => {
    if (!date) return "Not available";

    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const roleColor =
    user.role === "SUPER_ADMIN"
      ? "bg-red-500/10 text-red-600 dark:text-red-400"
      : user.role === "ADMIN"
        ? "bg-purple-500/10 text-purple-600 dark:text-purple-400"
        : "bg-blue-500/10 text-blue-600 dark:text-blue-400";

  return (
    <div className="min-h-screen bg-muted/30 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-primary">
              Account Settings
            </p>

            <h1 className="mt-1 text-3xl font-bold tracking-tight">
              My Profile
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              View and manage your personal information.
            </p>
          </div>

          <Button asChild>
            <Link to="/profile/edit">
              <Pencil className="mr-2 h-4 w-4" />
              Edit Profile
            </Link>
          </Button>
        </div>

        {/* Profile Hero */}
        <Card className="overflow-hidden border shadow-sm">
          {/* Cover */}
          <div className="h-36 bg-linear-to-r from-primary via-primary/80 to-primary/40 md:h-48" />

          <CardContent className="relative px-6 pb-6 md:px-8">
            <div className="-mt-16 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                <Avatar className="h-28 w-28 border-4 border-background shadow-lg">
                  <AvatarImage
                    src={user.picture}
                    alt={user.name}
                  />

                  <AvatarFallback className="text-2xl font-bold">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>

                <div className="pb-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-2xl font-bold">
                      {user.name}
                    </h2>

                    {user.isVerified && (
                      <BadgeCheck className="h-5 w-5 text-primary" />
                    )}
                  </div>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {user.email}
                  </p>

                  <Badge
                    className={`mt-3 border-0 ${roleColor}`}
                  >
                    {user.role?.replace("_", " ")}
                  </Badge>
                </div>
              </div>

              <Button
                variant="outline"
                asChild
                className="mb-1"
              >
                <Link to="/profile/edit">
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit Profile
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Information Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Personal Information */}
          <Card className="lg:col-span-2 shadow-sm">
            <CardContent className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-bold">
                  Personal Information
                </h3>

                <p className="mt-1 text-sm text-muted-foreground">
                  Your personal details and contact information.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <InfoItem
                  icon={User}
                  label="Full Name"
                  value={user.name}
                />

                <InfoItem
                  icon={Mail}
                  label="Email Address"
                  value={user.email}
                />

                <InfoItem
                  icon={GraduationCap}
                  label="Student ID"
                  value={user.studentId || "Not provided"}
                />

                <InfoItem
                  icon={Phone}
                  label="Phone Number"
                  value={user.phone || "Not provided"}
                />

                <InfoItem
                  icon={MapPin}
                  label="Address"
                  value={user.address || "Not provided"}
                />

                <InfoItem
                  icon={CalendarDays}
                  label="Joined"
                  value={formatDate(user.createdAt)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Account Status */}
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-bold">
                  Account Status
                </h3>

                <p className="mt-1 text-sm text-muted-foreground">
                  Your current account information.
                </p>
              </div>

              <div className="space-y-4">
                <StatusItem
                  icon={Shield}
                  title="Account Role"
                  value={user.role?.replace("_", " ")}
                  color="text-purple-600"
                />

                <StatusItem
                  icon={BadgeCheck}
                  title="Verification"
                  value={
                    user.isVerified
                      ? "Verified"
                      : "Not Verified"
                  }
                  color={
                    user.isVerified
                      ? "text-green-600"
                      : "text-amber-600"
                  }
                />

                <StatusItem
                  icon={User}
                  title="Account Status"
                  value={
                    user.status ||
                    (user.isActive
                      ? "Active"
                      : "Inactive")
                  }
                  color={
                    user.status === "suspended"
                      ? "text-red-600"
                      : "text-green-600"
                  }
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Account Actions */}
        <Card className="shadow-sm">
          <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-semibold">
                Account Security
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Keep your account secure by regularly updating your password.
              </p>
            </div>

            <Button variant="outline" asChild>
              <Link to="/change-password">
                <Shield className="mr-2 h-4 w-4" />
                Change Password
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

/* Information Card */
function InfoItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-4 rounded-xl border bg-background p-4 transition hover:bg-muted/40">
      <div className="rounded-xl bg-primary/10 p-3 text-primary">
        <Icon className="h-5 w-5" />
      </div>

      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">
          {label}
        </p>

        <p className="mt-1 truncate font-medium">
          {value}
        </p>
      </div>
    </div>
  );
}

/* Account Status Item */
function StatusItem({ icon: Icon, title, value, color }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border p-4">
      <div className={`rounded-lg bg-muted p-2 ${color}`}>
        <Icon className="h-5 w-5" />
      </div>

      <div>
        <p className="text-xs text-muted-foreground">
          {title}
        </p>

        <p className="mt-1 font-semibold">
          {value}
        </p>
      </div>
    </div>
  );
}

export default MyProfile;