import { useNavigate } from "react-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { ArrowLeft, HelpCircle } from "lucide-react";
import { useCreateQuestionMutation } from "@/redux/features/question/question.api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldError, FieldGroup } from "@/components/ui/field";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
// import { toast } from "@/components/ui/toast";

const SUBJECTS = [
  "CSE",
  "Mathematics",
  "Programming",
  "Database",
  "Networking",
  "General Academic",
];

const questionSchema = z.object({
  title: z.string().min(10, {
    message: "Question title must be at least 10 characters",
  }),
  category: z.string().min(1, {
    message: "Please select a subject category",
  }),
  description: z.string().min(15, {
    message: "Please describe your problem in at least 15 characters",
  }),
});

export default function QuestionFormPage() {
  const navigate = useNavigate();
  const [createQuestion, { isLoading }] = useCreateQuestionMutation();

  const form = useForm({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      title: "",
      category: "General Academic",
      description: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await createQuestion(data).unwrap();
      // toast.success("Question submitted! 🎉");
      console.log("Question submitted! 🎉");
      navigate("/questions");
    } catch (err) {
      // toast.error(err?.data?.message || "Could not publish question");
      console.log(err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl space-y-6 mt-14">
      <div>
        <Button onClick={() => navigate("/questions")} variant="ghost" className="rounded-xl gap-2 text-muted-foreground">
          <ArrowLeft className="h-4 w-4" />
          Back to list
        </Button>
      </div>

      <Card className="border border-muted rounded-3xl overflow-hidden shadow-md">
        <CardHeader className="border-b bg-muted/20">
          <CardTitle className="text-2xl font-bold tracking-tight font-serif text-foreground flex items-center gap-2">
            <HelpCircle className="h-6 w-6 text-indigo-500" />
            Ask Academic Question
          </CardTitle>
          <CardDescription>
            Stuck on a course topic? Detail your problem clearly below to receive assistance from other students and teachers.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FieldGroup className="space-y-4">
              {/* Title */}
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-foreground font-semibold">Question Title</FieldLabel>
                    <Input {...field} placeholder="e.g. How to solve recursive relations in Math II?" className="h-11 rounded-xl" />
                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              {/* Subject Category */}
              <Controller
                name="category"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-foreground font-semibold">Subject Category</FieldLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="h-11 rounded-xl w-full">
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {SUBJECTS.map((sub) => (
                          <SelectItem key={sub} value={sub}>
                            {sub}
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
                    <FieldLabel className="text-foreground font-semibold">Details / Problem Context</FieldLabel>
                    <textarea
                      {...field}
                      placeholder="Detail your question here. Include code samples, theorems, or error logs if applicable (minimum 15 characters)..."
                      className="w-full min-h-36 rounded-xl border bg-background p-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary border-muted"
                    />
                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </FieldGroup>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button type="button" variant="ghost" onClick={() => navigate("/questions")} className="rounded-xl h-11" disabled={isLoading}>
                Cancel
              </Button>
              <Button type="submit" className="rounded-xl h-11 px-5 gap-2 font-semibold shadow-md bg-indigo-600 hover:bg-indigo-700 text-white" disabled={isLoading}>
                Ask Question
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
