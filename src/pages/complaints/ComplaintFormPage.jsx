import { useNavigate } from "react-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { ArrowLeft, AlertTriangle, ShieldCheck, FileText } from "lucide-react";
import { useCreateComplaintMutation } from "@/redux/features/complaint/complaint.api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldError, FieldGroup, FieldDescription } from "@/components/ui/field";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { toast } from "@/components/ui/toast";

const COMPLAINT_CATEGORIES = [
  "Academic",
  "Facilities",
  "Administrative",
  "Cafeteria",
  "Hostel",
  "Others",
];

const complaintSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters long",
  }),
  category: z.string().min(1, {
    message: "Please select a category",
  }),
  description: z.string().min(15, {
    message: "Description must be at least 15 characters long",
  }),
  isAnonymous: z.boolean().default(false),
});

export default function ComplaintFormPage() {
  const navigate = useNavigate();
  const [createComplaint, { isLoading }] = useCreateComplaintMutation();

  const form = useForm({
    resolver: zodResolver(complaintSchema),
    defaultValues: {
      title: "",
      category: "Academic",
      description: "",
      isAnonymous: false,
    },
  });

  const isAnonymousValue = form.watch("isAnonymous");

  const onSubmit = async (data) => {
    try {
      await createComplaint(data).unwrap();
      toast.success("Complaint submitted successfully! 🎉");
      navigate("/complaints");
    } catch (err) {
      toast.error(err?.data?.message || "Could not file complaint");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl space-y-6 mt-14">
      <div>
        <Button onClick={() => navigate("/complaints")} variant="ghost" className="rounded-xl gap-2 text-muted-foreground">
          <ArrowLeft className="h-4 w-4" />
          Back to complaints
        </Button>
      </div>

      <Card className="border border-muted rounded-3xl overflow-hidden shadow-md">
        <CardHeader className="border-b bg-muted/20">
          <CardTitle className="text-2xl font-bold tracking-tight font-serif text-foreground flex items-center gap-2">
            <FileText className="h-6 w-6 text-red-500" />
            File Formal Complaint
          </CardTitle>
          <CardDescription>
            Submit complaints or administrative feedback securely to Metropolitan University administration.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FieldGroup className="space-y-4">
              {/* Title */}
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-foreground font-semibold">Complaint Title</FieldLabel>
                    <Input {...field} placeholder="e.g. Broken projector in Room 302" className="h-11 rounded-xl" />
                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              {/* Category */}
              <Controller
                name="category"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-foreground font-semibold">Category</FieldLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="h-11 rounded-xl w-full">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {COMPLAINT_CATEGORIES.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              {/* Description */}
              <Controller
                name="description"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-foreground font-semibold">Details / Description</FieldLabel>
                    <textarea
                      {...field}
                      placeholder="Explain your grievance in details. Provide locations, names, or timelines (minimum 15 characters)..."
                      className="w-full min-h-36 rounded-xl border bg-background p-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary border-muted"
                    />
                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              {/* Anonymous Checkbox Toggle */}
              <Controller
                name="isAnonymous"
                control={form.control}
                render={({ field }) => (
                  <div className="flex items-start gap-3 p-4 border border-dashed border-muted rounded-2xl bg-muted/20">
                    <input
                      type="checkbox"
                      id="isAnonymous"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      className="h-4 w-4 mt-1 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                    />
                    <div className="space-y-1">
                      <label htmlFor="isAnonymous" className="text-sm font-bold text-foreground cursor-pointer">
                        File Anonymously
                      </label>
                      <p className="text-xs text-muted-foreground leading-normal">
                        Check this box if you want to hide your student ID, name, and email from university administrators.
                      </p>
                    </div>
                  </div>
                )}
              />
            </FieldGroup>

            {/* Privacy Warning Notice */}
            {isAnonymousValue ? (
              <div className="flex gap-3 bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-200/50 p-4 rounded-2xl text-xs leading-relaxed animate-in fade-in slide-in-from-top-1">
                <ShieldCheck className="h-5 w-5 text-indigo-500 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-bold uppercase tracking-wider">Confidential Mode Active</p>
                  <p>
                    Your student identifiers will be completely redacted from this record before it is delivered to administrators. The system assigns a secure hash/reference code so you can still track status.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex gap-3 bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-200/50 p-4 rounded-2xl text-xs leading-relaxed">
                <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-bold uppercase tracking-wider">Public Submission</p>
                  <p>
                    Your name, student ID, and email address will be visible to university administrators reviewing this complaint. This facilitates follow-up communication if further clarification is required.
                  </p>
                </div>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button type="button" variant="ghost" onClick={() => navigate("/complaints")} className="rounded-xl h-11" disabled={isLoading}>
                Cancel
              </Button>
              <Button type="submit" className="rounded-xl h-11 px-5 gap-2 font-semibold shadow-md bg-red-600 hover:bg-red-700 text-white" disabled={isLoading}>
                Submit Complaint
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
