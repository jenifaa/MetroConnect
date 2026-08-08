
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useNavigate, Link } from "react-router";





import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@base-ui/react";
import { cn } from "@/lib/utils";

const registerSchema = z
  .object({
    name: z.string().min(3, {
      message: "Name is too short",
    }),

    email: z.string().email({
      message: "Invalid email",
    }),

    phone: z.string().min(10, {
      message: "Invalid phone number",
    }),

    password: z.string().min(8, {
      message: "Password too short",
    }),

    confirmPassword: z.string().min(8, {
      message: "Confirm password must be at least 8 characters",
    }),

    role: z.enum(["USER", "AGENT"], {
      message: "Please select a role",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function RegisterForm({ className, ...props }) {


  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(registerSchema),

    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      role: "USER",
    },
  });

  const onSubmit = async (data) => {
    try {
      const userInfo = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
        role: data.role,
      };

    //   await register(userInfo).unwrap();

      toast.success("Account created successfully 🎉");

      navigate("/verify", {
        state: {
          email: data.email,
        },
      });
    } catch (err) {
      toast.error(err?.data?.message || "Registration failed");
    }
  };

  return (
    <div
      className={cn(
        "min-h-screen flex items-center justify-center px-4 bg-muted/30",
        className
      )}
      {...props}
    >
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Create account</h1>

          <p className="text-sm text-muted-foreground">
            Join us and start managing your wallet
          </p>
        </div>

        <Card className="shadow-lg border-muted/60">
          <CardHeader>
            <CardTitle>Register</CardTitle>

            <CardDescription>
              Fill in your details to create an account
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <FieldGroup className="space-y-4">
                <Controller
                  name="name"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>Name</FieldLabel>

                      <Input
                        {...field}
                        placeholder="John Doe"
                      />

                      {fieldState.error && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>Email</FieldLabel>

                      <Input
                        {...field}
                        type="email"
                        placeholder="you@example.com"
                      />

                      {fieldState.error && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="phone"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>Phone</FieldLabel>

                      <Input
                        {...field}
                        placeholder="+8801XXXXXXXXX"
                      />

                      {fieldState.error && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="role"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>Select Role</FieldLabel>

                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Choose role" />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectItem value="USER">
                            USER
                          </SelectItem>

                          <SelectItem value="AGENT">
                            AGENT
                          </SelectItem>
                        </SelectContent>
                      </Select>

                      {fieldState.error && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="password"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>Password</FieldLabel>

                      <Input
                        {...field}
                        type="password"
                        placeholder="••••••••"
                      />

                      {fieldState.error && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="confirmPassword"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>Confirm Password</FieldLabel>

                      <Input
                        {...field}
                        type="password"
                        placeholder="••••••••"
                      />

                      {fieldState.error && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>

              <Button
                type="submit"
                className="h-11 w-full"
              >
                Create account
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-primary hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

