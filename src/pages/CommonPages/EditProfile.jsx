import { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import {
  ArrowLeft,
  User,
  Mail,
  GraduationCap,
  Phone,
  MapPin,
  Save,
  Loader2,
  Camera,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  useUpdateUserMutation,
  useUserInfoQuery,
} from "@/redux/features/auth/auth.api";

function EditProfile() {
  const navigate = useNavigate();

  const { data, isLoading: isUserLoading } =
    useUserInfoQuery(undefined);

  const [updateUser, { isLoading: isUpdating }] =
    useUpdateUserMutation();

  const user = data?.data;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      studentId: "",
      phone: "",
      address: "",
      picture: "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || "",
        email: user.email || "",
        studentId: user.studentId || "",
        phone: user.phone || "",
        address: user.address || "",
        picture: user.picture || "",
      });
    }
  }, [user, reset]);

  const onSubmit = async (formData) => {
    try {
      await updateUser({
        id: user.id || user._id,
        ...formData,
      }).unwrap();

      navigate("/profile");
    } catch (error) {
      console.error("Profile update failed:", error);
    }
  };

  if (isUserLoading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Button
              variant="ghost"
              className="mb-3 -ml-3"
              asChild
            >
              <Link to="/profile">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Profile
              </Link>
            </Button>

            <h1 className="text-3xl font-bold tracking-tight">
              Edit Profile
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              Update your personal information and profile details.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6">
            {/* Profile Preview */}
            <Card className="overflow-hidden shadow-sm">
              <div className="h-28 bg-linear-to-r from-primary via-primary/80 to-primary/40" />

              <CardContent className="relative flex flex-col gap-4 p-6 sm:flex-row sm:items-end">
                <div className="-mt-16 flex items-end gap-4">
                  <div className="relative">
                    <img
                      src={
                        user?.picture ||
                        "https://i.ibb.co.com/xttK0CDW/pp.jpg"
                      }
                      alt={user?.name}
                      className="h-28 w-28 rounded-full border-4 border-background object-cover shadow-lg"
                    />

                    <div className="absolute bottom-0 right-0 rounded-full bg-primary p-2 text-primary-foreground shadow">
                      <Camera className="h-4 w-4" />
                    </div>
                  </div>

                  <div className="mb-2">
                    <h2 className="text-xl font-bold">
                      {user?.name}
                    </h2>

                    <p className="text-sm text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Personal Information */}
            <Card className="shadow-sm">
              <CardContent className="p-6">
                <div className="mb-6">
                  <h2 className="text-lg font-bold">
                    Personal Information
                  </h2>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Update the information displayed on your profile.
                  </p>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      Full Name
                    </Label>

                    <div className="relative">
                      <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                      <Input
                        id="name"
                        className="pl-10"
                        placeholder="Enter your full name"
                        {...register("name", {
                          required: "Name is required",
                        })}
                      />
                    </div>

                    {errors.name && (
                      <p className="text-xs text-destructive">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email">
                      Email Address
                    </Label>

                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                      <Input
                        id="email"
                        type="email"
                        className="pl-10"
                        placeholder="Enter your email"
                        {...register("email")}
                      />
                    </div>
                  </div>

                  {/* Student ID */}
                  <div className="space-y-2">
                    <Label htmlFor="studentId">
                      Student ID
                    </Label>

                    <div className="relative">
                      <GraduationCap className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                      <Input
                        id="studentId"
                        className="pl-10"
                        placeholder="Enter your student ID"
                        {...register("studentId")}
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      Phone Number
                    </Label>

                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                      <Input
                        id="phone"
                        className="pl-10"
                        placeholder="Enter your phone number"
                        {...register("phone")}
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">
                      Address
                    </Label>

                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

                      <Input
                        id="address"
                        className="pl-10"
                        placeholder="Enter your address"
                        {...register("address")}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Profile Picture */}
            <Card className="shadow-sm">
              <CardContent className="p-6">
                <div className="mb-5">
                  <h2 className="text-lg font-bold">
                    Profile Picture
                  </h2>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Update your profile picture URL.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="picture">
                    Image URL
                  </Label>

                  <Input
                    id="picture"
                    placeholder="https://example.com/profile.jpg"
                    {...register("picture")}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/profile")}
                disabled={isUpdating}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={isUpdating || !isDirty}
              >
                {isUpdating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving Changes...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;