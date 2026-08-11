import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { User, Mail, Phone, BookOpen, GraduationCap, FileText, Save, Edit, Key } from "lucide-react";
import {
  useUserInfoQuery,
  useUpdateUserProfileMutation,
} from "@/redux/features/auth/auth.api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldError, FieldGroup } from "@/components/ui/field";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "@/components/ui/toast";

const profileSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 characters",
  }),
  department: z.string().min(2, {
    message: "Please state your academic department",
  }),
  studentId: z.string().min(4, {
    message: "Please provide a valid Student ID",
  }),
  bio: z.string().max(160, {
    message: "Bio cannot exceed 160 characters",
  }).optional(),
});

export default function ProfilePage() {
  const navigate = useNavigate();
  const { data: userResponse, isLoading } = useUserInfoQuery(undefined);
  const [updateProfile, { isLoading: isUpdating }] = useUpdateUserProfileMutation();

  const [isEditing, setIsEditing] = useState(false);
  const user = userResponse?.data || {};

  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      phone: "",
      department: "",
      studentId: "",
      bio: "",
    },
  });

  // Load user data into form
  useEffect(() => {
    if (user.email) {
      form.reset({
        name: user.name || "",
        phone: user.phone || "",
        department: user.department || "Computer Science & Engineering",
        studentId: user.studentId || "2026-MU-102",
        bio: user.bio || "Metropolitan University Student",
      });
    }
  }, [user, form]);

  const onSubmit = async (data) => {
    try {
      await updateProfile({ data }).unwrap();
      toast.success("Profile updated successfully! 🎉");
      setIsEditing(false);
    } catch (err) {
      toast.error(err?.data?.message || "Could not update profile info");
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-3xl text-center mt-14">
        <p className="text-muted-foreground animate-pulse">Loading profile files...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl space-y-6 mt-14">
      {/* Profile Overview Card */}
      <Card className="border border-muted rounded-3xl overflow-hidden shadow-md">
        <div className="relative h-32 bg-linear-to-r from-primary/80 to-indigo-600/80 dark:from-primary/20 dark:to-indigo-950/20" />
        <CardContent className="p-6 md:p-8 relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 -mt-16 md:-mt-20 border-b pb-6 mb-6">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-4 text-center md:text-left">
              <img
                src={user.picture || "https://i.ibb.co.com/xttK0CDW/pp.jpg"}
                alt="Avatar"
                className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-card object-cover shadow-lg"
              />
              <div className="space-y-1">
                <h1 className="text-2xl md:text-3xl font-black text-foreground tracking-tight font-serif">
                  {user.name}
                </h1>
                <p className="text-xs font-mono text-muted-foreground bg-muted px-2.5 py-0.5 rounded-full inline-block uppercase">
                  {user.role} Account
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-center md:self-end">
              <Button
                onClick={() => setIsEditing(!isEditing)}
                variant="outline"
                className="rounded-xl gap-1.5 h-10 font-semibold"
              >
                <Edit className="h-4 w-4" />
                <span>{isEditing ? "View Profile" : "Edit Profile"}</span>
              </Button>

              <Button
                onClick={() => navigate("/change-password")}
                variant="ghost"
                className="rounded-xl gap-1.5 h-10 font-semibold text-muted-foreground hover:text-foreground"
              >
                <Key className="h-4 w-4" />
                <span>Security</span>
              </Button>
            </div>
          </div>

          {!isEditing ? (
            /* View Details */
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <h3 className="font-bold text-sm text-foreground uppercase tracking-wider mb-2 border-b pb-2">
                  Academic details
                </h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <GraduationCap className="h-5 w-5 text-primary shrink-0" />
                    <div>
                      <p className="font-bold text-foreground">Department</p>
                      <p>{user.department || "Computer Science & Engineering"}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-primary shrink-0" />
                    <div>
                      <p className="font-bold text-foreground">Student ID</p>
                      <p className="font-mono">{user.studentId || "2026-MU-102"}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-sm text-foreground uppercase tracking-wider mb-2 border-b pb-2">
                  Contact details
                </h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary shrink-0" />
                    <div className="overflow-hidden">
                      <p className="font-bold text-foreground">Email Address</p>
                      <p className="truncate">{user.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary shrink-0" />
                    <div>
                      <p className="font-bold text-foreground">Phone Number</p>
                      <p className="font-mono">{user.phone || "Not specified"}</p>
                    </div>
                  </div>
                </div>
              </div>

              {user.bio && (
                <div className="md:col-span-2 space-y-2 border-t pt-4">
                  <h3 className="font-bold text-sm text-foreground uppercase tracking-wider">Bio</h3>
                  <p className="text-sm text-muted-foreground bg-muted/30 p-4 rounded-2xl leading-relaxed">
                    {user.bio}
                  </p>
                </div>
              )}
            </div>
          ) : (
            /* Editing Mode Form */
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FieldGroup className="space-y-4">
                <Controller
                  name="name"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel className="text-foreground font-semibold">Full Name</FieldLabel>
                      <Input {...field} placeholder="Full Name" className="h-11 rounded-xl" />
                      {fieldState.error && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />

                <Controller
                  name="phone"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel className="text-foreground font-semibold">Phone Number</FieldLabel>
                      <Input {...field} placeholder="Phone Number" className="h-11 rounded-xl" />
                      {fieldState.error && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />

                <Controller
                  name="department"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel className="text-foreground font-semibold">Academic Department</FieldLabel>
                      <Input {...field} placeholder="Department" className="h-11 rounded-xl" />
                      {fieldState.error && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />

                <Controller
                  name="studentId"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel className="text-foreground font-semibold">Student ID Reference</FieldLabel>
                      <Input {...field} placeholder="Student ID Reference" className="h-11 rounded-xl" />
                      {fieldState.error && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />

                <Controller
                  name="bio"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel className="text-foreground font-semibold">Short Bio</FieldLabel>
                      <textarea
                        {...field}
                        placeholder="Tell the campus community about yourself..."
                        className="w-full min-h-24 rounded-xl border bg-background p-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary border-muted"
                      />
                      {fieldState.error && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </FieldGroup>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button type="button" variant="ghost" onClick={() => setIsEditing(false)} className="rounded-xl h-11" disabled={isUpdating}>
                  Cancel
                </Button>
                <Button type="submit" className="rounded-xl h-11 px-5 gap-2 font-semibold shadow-md" disabled={isUpdating}>
                  <Save className="h-4 w-4" />
                  <span>{isUpdating ? "Saving..." : "Save Profile"}</span>
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
