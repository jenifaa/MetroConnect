import { useNavigate } from "react-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { ArrowLeft, Key, Save } from "lucide-react";
import { useChangePasswordMutation } from "@/redux/features/auth/auth.api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldError, FieldGroup } from "@/components/ui/field";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "@/components/ui/toast";

const passwordSchema = z
  .object({
    oldPassword: z.string().min(8, {
      message: "Password must be at least 8 characters",
    }),
    newPassword: z.string().min(8, {
      message: "New password must be at least 8 characters",
    }),
    confirmPassword: z.string().min(8, {
      message: "Please confirm your new password",
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "New passwords do not match",
    path: ["confirmPassword"],
  });

export default function ChangePasswordPage() {
  const navigate = useNavigate();
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const form = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await changePassword({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      }).unwrap();
      toast.success("Password changed successfully! 🎉");
      navigate("/profile");
    } catch (err) {
      toast.error(err?.data?.message || "Could not change password");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-md space-y-6 mt-14">
      <div>
        <Button onClick={() => navigate("/profile")} variant="ghost" className="rounded-xl gap-2 text-muted-foreground">
          <ArrowLeft className="h-4 w-4" />
          Back to Profile
        </Button>
      </div>

      <Card className="border border-muted rounded-3xl overflow-hidden shadow-md">
        <CardHeader className="border-b bg-muted/20">
          <CardTitle className="text-2xl font-bold tracking-tight font-serif text-foreground flex items-center gap-2">
            <Key className="h-6 w-6 text-primary animate-pulse" />
            Update Password
          </CardTitle>
          <CardDescription>
            Change your Metropolitan University account password.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FieldGroup className="space-y-4">
              {/* Old Password */}
              <Controller
                name="oldPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-foreground font-semibold">Current Password</FieldLabel>
                    <Input {...field} type="password" placeholder="••••••••" className="h-11 rounded-xl" />
                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              {/* New Password */}
              <Controller
                name="newPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-foreground font-semibold">New Password</FieldLabel>
                    <Input {...field} type="password" placeholder="••••••••" className="h-11 rounded-xl" />
                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              {/* Confirm Password */}
              <Controller
                name="confirmPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-foreground font-semibold">Confirm New Password</FieldLabel>
                    <Input {...field} type="password" placeholder="••••••••" className="h-11 rounded-xl" />
                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </FieldGroup>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button type="button" variant="ghost" onClick={() => navigate("/profile")} className="rounded-xl h-11" disabled={isLoading}>
                Cancel
              </Button>
              <Button type="submit" className="rounded-xl h-11 px-5 gap-2 font-semibold shadow-md" disabled={isLoading}>
                <Save className="h-4 w-4" />
                <span>{isLoading ? "Updating..." : "Save Password"}</span>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
