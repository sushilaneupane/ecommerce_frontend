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
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useProducts } from "../hooks/useProducts";

// ✅ Zod validation schema
const productSchema = z.object({
  name: z.string().min(3, "Product name must be at least 3 characters"),
  category: z.string().min(2, "Category is required"),
  price: z
    .string()
    .min(1, "Price is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Price must be a positive number",
    }),
  image: z.string().url("Enter a valid image URL").optional().or(z.literal("")),
});

export default function ProductDialog({ open, setOpen, initialData = null }) {
  const { create, update, remove } = useProducts();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      category: "",
      price: "",
      image: "",
    },
  });

  // 🟢 Prefill form when editing
  useEffect(() => {
    if (initialData) {
      setValue("name", initialData.productName);
      setValue("category", initialData.categoryName);
      setValue("price", initialData.price);
      setValue("description", initialData.description);
      setValue("image", initialData.image || "");
    } else {
      reset();
    }
  }, [initialData, reset, setValue]);

  // 🟢 Handle form submit
  const handleFormSubmit = async (data) => {
    try {
      if (initialData) {
        await update.mutateAsync({ id: initialData.id, data });
      } else {
        await create.mutateAsync(data);
      }
      setOpen(false);
      reset();
    } catch (err) {
      console.error("Error saving product:", err);
    }
  };

  // 🗑️ Handle delete
  const handleDelete = async () => {
    if (!initialData) return;
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;
    try {
      await remove.mutateAsync(initialData.id);
      setOpen(false);
      reset();
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit Product" : "Add Product"}</DialogTitle>
          <DialogDescription>
            {initialData
              ? "Update or delete the product details below."
              : "Enter details for the new product below."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 mt-2">
          {/* Name */}
          <div className="space-y-2">
            <Label>Product Name</Label>
            <Input {...register("name")} placeholder="Enter product name" />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label>Category</Label>
            <Input {...register("category")} placeholder="Enter category" />
            {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
          </div>

          {/* Price */}
          <div className="space-y-2">
            <Label>Price (Rs)</Label>
            <Input {...register("price")} type="number" placeholder="Enter price" />
            {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
          </div>
           <div className="space-y-2">
            <Label>Description</Label>
            <Input {...register("description")} placeholder="Enter description" />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>

          {/* Image */}
          <div className="space-y-2">
            <Label>Image URL</Label>
            <Input {...register("image")} placeholder="https://example.com/image.jpg" />
            {errors.image && <p className="text-red-500 text-sm">{errors.imag.message}</p>}
          </div>

          {/* Footer */}
          <DialogFooter className="flex justify-between">
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              {initialData && (
                <Button type="button" variant="destructive" onClick={handleDelete} disabled={remove.isPending}>
                  {remove.isPending ? "Deleting..." : "Delete"}
                </Button>
              )}
            </div>
            <Button type="submit" disabled={create.isPending || update.isPending}>
              {create.isPending || update.isPending ? "Saving..." : initialData ? "Update" : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
