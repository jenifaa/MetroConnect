import { Controller, useForm } from "react-hook-form";

import { Link, useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import { useLoginMutation } from "@/redux/features/auth/auth.api";
import config from "@/config";

export function LoginForm({ className, ...props }) {
  const navigate = useNavigate();
  const [login] = useLoginMutation();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await login(data).unwrap();

      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className={cn(
        "relative min-h-screen overflow-hidden bg-slate-50",
        className
      )}
      {...props}
    >
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 h-80 w-80 rounded-full bg-indigo-200/40 blur-3xl" />

        <div className="absolute top-1/3 -right-32 h-96 w-96 rounded-full bg-violet-200/40 blur-3xl" />

        <div className="absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-blue-200/30 blur-3xl" />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:40px_40px] opacity-30" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">

          {/* Brand */}
          <div className="mb-8 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-3 transition-transform duration-200 hover:scale-[1.02]"
            >
              {/* Logo */}
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 via-violet-600 to-blue-600 shadow-lg shadow-indigo-500/25">
                <span className="text-xl font-black text-white">
                  M
                </span>
              </div>

              <div className="text-left">
                <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
                  Metro<span className="text-indigo-600">Connect</span>
                </h1>

                <p className="text-xs font-medium text-slate-500">
                  University Community Platform
                </p>
              </div>
            </Link>
          </div>

          {/* Login Card */}
          <Card className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white/95 shadow-2xl shadow-slate-900/10 backdrop-blur-xl">

            {/* Top Accent */}
            <div className="h-1.5 w-full bg-gradient-to-r from-indigo-600 via-violet-600 to-blue-600" />

            <CardHeader className="px-7 pt-8 pb-5 sm:px-9">
              <div className="mb-3 inline-flex w-fit items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
                🎓 Student Community
              </div>

              <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">
                Welcome back
              </CardTitle>

              <CardDescription className="mt-1 text-sm text-slate-500">
                Sign in to connect with your university community.
              </CardDescription>
            </CardHeader>

            <CardContent className="px-7 pb-8 sm:px-9">
              <form
                id="login-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <FieldGroup className="space-y-5">

                  {/* EMAIL */}
                  <Controller
                    name="email"
                    control={form.control}
                    rules={{
                      required: "Email is required",
                    }}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel className="mb-2 text-sm font-semibold text-slate-700">
                          University Email
                        </FieldLabel>

                        <div className="relative">
                          <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <rect
                                width="20"
                                height="16"
                                x="2"
                                y="4"
                                rx="2"
                              />
                              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                            </svg>
                          </div>

                          <Input
                            {...field}
                            type="email"
                            placeholder="you@metrouni.edu.bd"
                            className={cn(
                              "h-12 rounded-xl border-slate-200 bg-slate-50/70 pl-11 text-sm",
                              "transition-all duration-200",
                              "placeholder:text-slate-400",
                              "focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10",
                              fieldState.invalid &&
                                "border-red-400 focus:border-red-500 focus:ring-red-500/10"
                            )}
                          />
                        </div>

                        {fieldState.error && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  {/* PASSWORD */}
                  <Controller
                    name="password"
                    control={form.control}
                    rules={{
                      required: "Password is required",
                    }}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel className="mb-2 text-sm font-semibold text-slate-700">
                          Password
                        </FieldLabel>

                        <div className="relative">
                          <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <rect
                                width="18"
                                height="11"
                                x="3"
                                y="11"
                                rx="2"
                                ry="2"
                              />
                              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                          </div>

                          <Input
                            {...field}
                            type="password"
                            placeholder="Enter your password"
                            className={cn(
                              "h-12 rounded-xl border-slate-200 bg-slate-50/70 pl-11 text-sm",
                              "transition-all duration-200",
                              "placeholder:text-slate-400",
                              "focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10",
                              fieldState.invalid &&
                                "border-red-400 focus:border-red-500 focus:ring-red-500/10"
                            )}
                          />
                        </div>

                        <FieldDescription className="mt-1.5 text-xs text-slate-400">
                          Your password must be at least 6 characters.
                        </FieldDescription>

                        {fieldState.error && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  {/* Forgot Password */}
                  <div className="flex justify-end -mt-1">
                    <Link
                      to="/forgot-password"
                      className="text-sm font-semibold text-indigo-600 transition-colors hover:text-indigo-700 hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </FieldGroup>

                {/* Login Button */}
                <Button
                  type="submit"
                  className="group relative h-12 w-full overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 bg-[length:200%_100%] text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:bg-right hover:shadow-xl hover:shadow-indigo-500/30"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Sign in to MetroConnect

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </span>
                </Button>
              </form>

              {/* Divider */}
              <div className="my-6 flex items-center gap-4">
                <div className="h-px flex-1 bg-slate-200" />

                <span className="text-[11px] font-semibold tracking-wider text-slate-400">
                  OR CONTINUE WITH
                </span>

                <div className="h-px flex-1 bg-slate-200" />
              </div>

              {/* Google Login */}
              <Button
                onClick={() =>
                  window.open(
                    `${config.baseUrl}/auth/google`,
                    "_self"
                  )
                }
                type="button"
                variant="outline"
                className="h-12 w-full rounded-xl border-slate-200 bg-white text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:shadow-md"
              >
                <svg
                  className="mr-2.5 h-5 w-5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.75h3.57c2.09-1.92 3.28-4.74 3.28-8.07z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.68l-3.57-2.75c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.15v2.84A11 11 0 0 0 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.1A6.62 6.62 0 0 1 5.5 12c0-.73.12-1.44.34-2.1V7.06H2.15A11 11 0 0 0 1 12c0 1.79.43 3.48 1.15 4.94l3.69-2.84z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.37c1.62 0 3.08.56 4.23 1.66l3.17-3.17C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.15 7.06l3.69 2.84C6.71 7.3 9.14 5.37 12 5.37z"
                    fill="#EA4335"
                  />
                </svg>

                Continue with Google
              </Button>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="mt-7 space-y-4 text-center">
            <p className="text-sm text-slate-500">
              Don&apos;t have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-indigo-600 transition-colors hover:text-indigo-700 hover:underline"
              >
                Create your account
              </Link>
            </p>

            <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
              <span className="h-1 w-1 rounded-full bg-slate-300" />
              <span>Built for the Metro University community</span>
              <span className="h-1 w-1 rounded-full bg-slate-300" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}