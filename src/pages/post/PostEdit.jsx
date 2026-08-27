import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import {
  ArrowLeft,
  Save,
  FileText,
  Tag,
  EyeOff,
  Image as ImageIcon,
  Loader2,
  X,
} from "lucide-react";

import { LoadingState, ErrorState } from "@/components/common/States";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  useGetPostByIdQuery,
  useUpdatePostMutation,
} from "@/redux/features/post/post.api";

const CATEGORIES = [
  "GENERAL",
  "ACADEMIC",
  "DISCUSSION",
  "ANNOUNCEMENT",
  "CAMPUS",
  "HELP",
  "OTHER",
];

function PostEdit() {
  const { postId } = useParams();
  const navigate = useNavigate();

  const {
    data: postResponse,
    isLoading,
    isError,
    refetch,
  } = useGetPostByIdQuery(postId);

  const [updatePost, { isLoading: isUpdating }] = useUpdatePostMutation();

  const post = postResponse?.data;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "GENERAL",
    isAnonymous: false,
    images: [],
  });

  const [newImage, setNewImage] = useState("");

  useEffect(() => {
    if (post) {
      setFormData({
        title: post?.title || "",
        description: post?.description || "",
        category: post?.category || "GENERAL",
        isAnonymous: post?.isAnonymous || false,
        images: post?.images || [],
      });
    }
  }, [post]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAnonymousChange = () => {
    setFormData((prev) => ({
      ...prev,
      isAnonymous: !prev.isAnonymous,
    }));
  };

  const handleAddImage = () => {
    if (!newImage.trim()) return;

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, newImage.trim()],
    }));

    setNewImage("");
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updatePost({
        id: postId,
        data: formData,
      }).unwrap();

      navigate(`/posts/${postId}`);
    } catch (error) {
      console.error("Failed to update post:", error);
    }
  };

  if (isLoading) {
    return <LoadingState message="Loading post..." />;
  }

  if (isError) {
    return <ErrorState onRetry={refetch} />;
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 mt-14">
      {/* Back Button */}
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="gap-2 rounded-xl"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Post
        </Button>
      </div>

      <Card className="overflow-hidden rounded-2xl border shadow-sm">
        {/* Header */}
        <CardHeader className="border-b bg-muted/20">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <FileText className="h-6 w-6 text-primary" />
            </div>

            <div>
              <CardTitle className="text-2xl font-bold">Edit Post</CardTitle>

              <CardDescription className="mt-1">
                Update your post information and save your changes.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-7">
            {/* Title */}
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-semibold">
                Post Title
              </label>

              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter your post title"
                className="h-11 rounded-xl"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-semibold">
                Description
              </label>

              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Write your post description..."
                className="min-h-40 resize-y rounded-xl"
                required
              />

              <p className="text-xs text-muted-foreground">
                Share details, questions, updates, or anything relevant to the
                university community.
              </p>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label
                htmlFor="category"
                className="flex items-center gap-2 text-sm font-semibold"
              >
                <Tag className="h-4 w-4 text-primary" />
                Category
              </label>

              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="h-11 w-full rounded-xl border bg-background px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                {CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0) + category.slice(1).toLowerCase()}
                  </option>
                ))}
              </select>
            </div>

            {/* Anonymous */}
            <div className="rounded-2xl border bg-muted/20 p-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                    <EyeOff className="h-5 w-5 text-primary" />
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold">Post Anonymously</h3>

                    <p className="mt-1 text-xs text-muted-foreground">
                      Your identity will not be publicly shown with this post.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleAnonymousChange}
                  className={`relative h-6 w-11 rounded-full transition-colors ${
                    formData.isAnonymous
                      ? "bg-primary"
                      : "bg-muted-foreground/30"
                  }`}
                >
                  <span
                    className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-all ${
                      formData.isAnonymous ? "left-6" : "left-1"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Images */}
            <div className="space-y-3">
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold">
                  <ImageIcon className="h-4 w-4 text-primary" />
                  Images
                </label>

                <p className="mt-1 text-xs text-muted-foreground">
                  Add image URLs or manage your existing images.
                </p>
              </div>

              {/* Add Image */}
              <div className="flex flex-col gap-2 sm:flex-row">
                <Input
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  placeholder="Paste image URL..."
                  className="h-11 rounded-xl"
                />

                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddImage}
                  className="h-11 rounded-xl"
                >
                  Add Image
                </Button>
              </div>

              {/* Image Preview */}
              {formData.images.length > 0 && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {formData.images.map((image, index) => (
                    <div
                      key={`${image}-${index}`}
                      className="group relative overflow-hidden rounded-xl border"
                    >
                      <img
                        src={image}
                        alt={`Post attachment ${index + 1}`}
                        className="h-48 w-full object-cover"
                      />

                      <Button
                        type="button"
                        size="icon"
                        variant="destructive"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute right-3 top-3 h-8 w-8 rounded-lg opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Information */}
            <div className="rounded-xl border border-primary/10 bg-primary/5 p-4">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Note:</span>{" "}
                Updating this post will not affect existing reactions or
                comments.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:justify-end">
              <Link to={`/posts/${postId}`}>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full rounded-xl sm:w-auto"
                >
                  Cancel
                </Button>
              </Link>

              <Button
                type="submit"
                disabled={isUpdating}
                className="gap-2 rounded-xl shadow-md"
              >
                {isUpdating ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving Changes...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default PostEdit;
