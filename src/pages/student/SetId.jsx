
import { Label } from "@/components/ui/label";
import { useUpdateUserMutation } from "@/redux/features/auth/auth.api";
import { useAppSelector } from "@/redux/hook";
import { Button, Input } from "@base-ui/react";
import { useForm } from "react-hook-form";

const SetId = () => {
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  // Get logged-in user
  const currentUser = useAppSelector((state) => state.auth.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await updateUser({
        id: currentUser._id,
        data: {
          studentId: data.studentId.trim(),
        },
      }).unwrap();

      console.log("Student id added");
    } catch (error) {
    //   toast.error(error?.data?.message || "Failed to add Student ID");

      console.error("Student ID Update Error:", error);
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl border bg-card p-6 shadow-sm">
        <h2 className="text-2xl font-bold">Set Your Student ID</h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Add your Metropolitan University student ID to your account.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="studentId">Student ID</Label>

            <Input
              id="studentId"
              type="text"
              inputMode="numeric"
              maxLength={9}
              placeholder="Enter your 9-digit student ID"
              {...register("studentId", {
                required: "Student ID is required",
                pattern: {
                  value: /^\d{9}$/,
                  message: "Student ID must contain exactly 9 digits",
                },
              })}
            />

            {errors.studentId && (
              <p className="text-sm text-destructive">
                {errors.studentId.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Student ID"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SetId;
