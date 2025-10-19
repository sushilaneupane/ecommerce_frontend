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
import { useCategories } from "../hooks/useCategories";
import { toast } from "sonner";

const categorySchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
});

export default function CategoryDialog({ open, setOpen, initialData = null }) {
  const { create, update, remove } = useCategories();

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

  // 🟢 Prefill form if editing
  useEffect(() => {
    if (initialData) {
      setValue("name", initialData.name);
      setValue("description", initialData.description);
    } else {
      reset();
    }
  }, [initialData, reset, setValue]);

  // 🟢 Handle Create / Update
  const handleFormSubmit = async (data) => {
    try {
      if (initialData) {
        await update.mutateAsync({
          categoryId: initialData.id,
          categoryData: data,
        });
        toast.success("Category updated successfully!");
      } else {
        await create.mutateAsync(data);
        toast.success("Category created successfully!");
      }
      reset();
      setOpen(false);
    } catch (error) {
      toast.error(initialData ? "Failed to update category" : "Failed to create category");
      console.error("Error saving category:", error);
    }
  };

  const handleDelete = async (categoryId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this category?");
    if (!confirmDelete) return;

    try {
      await remove.mutateAsync(categoryId);
      toast.success("Category deleted successfully!");
      setOpen(false);  // ✅ Close dialog
      reset();         // ✅ Reset form
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to delete category");
      console.error("Error deleting category:", err);
    }
  };


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Category" : "Add Category"}
          </DialogTitle>
          <DialogDescription>
            {initialData
              ? "Update or delete the category details below."
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

          <DialogFooter className="flex justify-between">
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>

              {initialData && (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => handleDelete(initialData.id)} 
                  disabled={remove.isPending}
                >
                  {remove.isPending ? "Deleting..." : "Delete"}
                </Button>

              )}
            </div>

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
