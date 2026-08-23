import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { ArrowLeft, Save, PlusCircle } from "lucide-react";
import {
  useCreatePostMutation,
  useUpdatePostMutation,
  useGetPostByIdQuery,
} from "@/redux/features/post/post.api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldError, FieldGroup } from "@/components/ui/field";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
// import { toast } from "@/components/ui/toast";

const CATEGORIES = [
  "GENERAL",
  "ACADEMIC",
  "DISCUSSION",
  "ANNOUNCEMENT",
  "CAMPUS",
  "HELP",
  "Other",
];

const postSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters long",
  }),
  category: z.string().min(1, {
    message: "Please select a category",
  }),
  description: z.string().min(10, {
    message: "Content description must be at least 10 characters long",
  }),
  image: z.string().url({ message: "Must be a valid image URL" }).or(z.literal("")),
});

export default function PostFormPage() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!postId;

  // Mutations/Queries
  const [createPost, { isLoading: isCreating }] = useCreatePostMutation();
  const [updatePost, { isLoading: isUpdating }] = useUpdatePostMutation();
  const { data: postResponse, isLoading: isFetching } = useGetPostByIdQuery(postId, {
    skip: !isEditMode,
  });

  const form = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      category: "General",
      description: "",
      image: "",
    },
  });

  // Pre-populate form in edit mode
  useEffect(() => {
    if (isEditMode && postResponse?.data) {
      const post = postResponse.data;
      form.reset({
        title: post.title || "",
        category: post.category || "General",
        description: post.description || post.content || "",
        image: post.image || "",
      });
    }
  }, [isEditMode, postResponse, form]);

  const onSubmit = async (data) => {
    try {
      if (isEditMode) {
        await updatePost({ id: postId, ...data }).unwrap();
        // toast.success("Post updated successfully! 🎉");
      } else {
        await createPost(data).unwrap();
        // toast.success("Post published to community feed! 🎉");
      }
      navigate("/feed");
    } catch (err) {
      // toast.error(err?.data?.message || "Could not save community post");
      console.log(err)
    }
  };

  if (isEditMode && isFetching) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl text-center mt-14">
        <p className="text-muted-foreground animate-pulse">Loading post contents...</p>
      </div>
    );
  }

  const isSubmitting = isCreating || isUpdating;

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl space-y-6 mt-14">
      {/* Return button */}
      <div>
        <Button onClick={() => navigate("/feed")} variant="ghost" className="rounded-xl gap-2 text-muted-foreground">
          <ArrowLeft className="h-4 w-4" />
          Cancel and return
        </Button>
      </div>

      <Card className="border border-muted rounded-3xl overflow-hidden shadow-md">
        <CardHeader className="border-b bg-muted/20">
          <CardTitle className="text-2xl font-bold tracking-tight font-serif text-foreground">
            {isEditMode ? "Edit Community Post" : "Create New Post"}
          </CardTitle>
          <CardDescription>
            {isEditMode
              ? "Modify details of your post. Keep in mind community standards."
              : "Share university news, questions, or general discussions with Metropolitan students."}
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
                    <FieldLabel className="text-foreground font-semibold">Post Title</FieldLabel>
                    <Input {...field} placeholder="e.g. Tips for upcoming final examinations" className="h-11 rounded-xl" />
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
                        {CATEGORIES.map((cat) => (
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
                    <FieldLabel className="text-foreground font-semibold">Content</FieldLabel>
                    <textarea
                      {...field}
                      placeholder="Write your discussion description here (minimum 10 characters)..."
                      className="w-full min-h-36 rounded-xl border bg-background p-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary border-muted"
                    />
                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              {/* Image URL */}
              <Controller
                name="image"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-foreground font-semibold">Image URL (Optional)</FieldLabel>
                    <Input {...field} type="url" placeholder="https://example.com/image.jpg" className="h-11 rounded-xl" />
                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </FieldGroup>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button type="button" variant="ghost" onClick={() => navigate("/feed")} className="rounded-xl h-11" disabled={isSubmitting}>
                Cancel
              </Button>
              <Button type="submit" className="rounded-xl h-11 px-5 gap-2 font-semibold shadow-md" disabled={isSubmitting}>
                {isEditMode ? <Save className="h-4 w-4" /> : <PlusCircle className="h-4 w-4" />}
                <span>{isEditMode ? "Save Changes" : "Publish Post"}</span>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
