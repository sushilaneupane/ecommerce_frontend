import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCategories } from "@/hooks/useCategories";
import { toast } from "sonner";

const categorySchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
});

export default function CategoryDialog({ open, setOpen, initialData = null }) {
  const { create, update } = useCategories();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: { name: "", description: "" },
  });

  // ✅ Fill form fields in edit mode
  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name || "",
        description: initialData.description || "",
      });
    } else {
      reset({ name: "", description: "" });
    }
  }, [initialData, reset]);

  // ✅ Handle create or update
  const handleFormSubmit = async (data) => {
    try {
      if (initialData) {
        // 🔹 Update category
        await update.mutateAsync({
          categoryId: initialData._id,
          categoryData: data,
        });
        toast.success("Category updated successfully!");
      } else {
        // 🔹 Create new category
        await create.mutateAsync(data);
        toast.success("Category created successfully!");
      }

      reset();
      setOpen(false);
    } catch (error) {
      toast.error("Something went wrong while saving the category!");
      console.error("Category error:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit Category" : "Add Category"}</DialogTitle>
          <DialogDescription>
            {initialData
              ? "Update the category details below."
              : "Enter details for the new category below."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label>Category Name</Label>
            <Input {...register("name")} placeholder="Enter category name" />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              {...register("description")}
              placeholder="Enter category description"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={create.isPending || update.isPending}
            >
              {create.isPending || update.isPending
                ? "Saving..."
                : initialData
                ? "Update"
                : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
