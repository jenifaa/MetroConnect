import { useNavigate } from "react-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { ArrowLeft, Search, PlusCircle } from "lucide-react";
import { useCreateLostFoundMutation } from "@/redux/features/lost-found/lostFound.api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldError, FieldGroup } from "@/components/ui/field";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { toast } from "@/components/ui/toast";

const itemSchema = z.object({
  itemName: z.string().min(3, {
    message: "Item name must be at least 3 characters",
  }),
  type: z.enum(["lost", "found"], {
    message: "Please select whether the item is lost or found",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters long",
  }),
  location: z.string().min(3, {
    message: "Please specify where the item was lost or found",
  }),
  date: z.string().min(1, {
    message: "Date is required",
  }),
  contact: z.string().min(5, {
    message: "Please provide valid contact information",
  }),
  image: z.string().url({ message: "Must be a valid image URL" }).or(z.literal("")),
});

export default function LostFoundFormPage() {
  const navigate = useNavigate();
  const [createItem, { isLoading }] = useCreateLostFoundMutation();

  const form = useForm({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      itemName: "",
      type: "lost",
      description: "",
      location: "",
      date: new Date().toISOString().split("T")[0],
      contact: "",
      image: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await createItem(data).unwrap();
      toast.success("Listing published successfully! 🎉");
      navigate("/lost-found");
    } catch (err) {
      toast.error(err?.data?.message || "Could not publish listing");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl space-y-6 mt-14">
      <div>
        <Button onClick={() => navigate("/lost-found")} variant="ghost" className="rounded-xl gap-2 text-muted-foreground">
          <ArrowLeft className="h-4 w-4" />
          Back to board
        </Button>
      </div>

      <Card className="border border-muted rounded-3xl overflow-hidden shadow-md">
        <CardHeader className="border-b bg-muted/20">
          <CardTitle className="text-2xl font-bold tracking-tight font-serif text-foreground flex items-center gap-2">
            <Search className="h-6 w-6 text-amber-500" />
            Report Lost & Found Item
          </CardTitle>
          <CardDescription>
            Help reunite owners with their missing belongings. Provide precise locations and details.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FieldGroup className="space-y-4">
              {/* Item Name */}
              <Controller
                name="itemName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-foreground font-semibold">Item Name</FieldLabel>
                    <Input {...field} placeholder="e.g. Leather Wallet, Blue Calculator" className="h-11 rounded-xl" />
                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              {/* Type */}
              <Controller
                name="type"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-foreground font-semibold">Listing Type</FieldLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="h-11 rounded-xl w-full">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lost">Lost (I lost this item)</SelectItem>
                        <SelectItem value="found">Found (I found this item)</SelectItem>
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
                    <FieldLabel className="text-foreground font-semibold">Item Description</FieldLabel>
                    <textarea
                      {...field}
                      placeholder="Detail features, color, brand, or key markings of the item (minimum 10 characters)..."
                      className="w-full min-h-28 rounded-xl border bg-background p-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary border-muted"
                    />
                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              {/* Location */}
              <Controller
                name="location"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-foreground font-semibold">Approximate Location</FieldLabel>
                    <Input {...field} placeholder="e.g. Classroom 302, Library Ground Floor" className="h-11 rounded-xl" />
                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              {/* Date */}
              <Controller
                name="date"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-foreground font-semibold">Date Lost/Found</FieldLabel>
                    <Input {...field} type="date" className="h-11 rounded-xl" />
                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              {/* Contact */}
              <Controller
                name="contact"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-foreground font-semibold">Contact Information</FieldLabel>
                    <Input {...field} placeholder="e.g. Phone number, email or room number" className="h-11 rounded-xl" />
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
                    <Input {...field} type="url" placeholder="https://example.com/item.jpg" className="h-11 rounded-xl" />
                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </FieldGroup>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button type="button" variant="ghost" onClick={() => navigate("/lost-found")} className="rounded-xl h-11" disabled={isLoading}>
                Cancel
              </Button>
              <Button type="submit" className="rounded-xl h-11 px-5 gap-2 font-semibold shadow-md bg-amber-600 hover:bg-amber-700 text-white" disabled={isLoading}>
                <PlusCircle className="h-4 w-4" />
                Submit Listing
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
