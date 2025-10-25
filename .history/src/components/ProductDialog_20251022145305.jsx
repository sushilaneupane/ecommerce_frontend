import React, { useEffect, useState } from "react";
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
  description: z.string().optional(),
  image: z.string().optional().or(z.literal("")),
});

export default function ProductDialog({ open, setOpen, initialData = null, onSubmit }) {
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
      description: "",
      image: "",
    },
  });

  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);

  // Prefill form when editing
  useEffect(() => {
    if (initialData) {
      setValue("name", initialData.productName);
      setValue("category", initialData.categoryName);
      setValue("price", initialData.price);
      setValue("description", initialData.description || "");
      const imageUrl = initialData.images?.[0]?.image
        ? `http://localhost:3001/uploads/${initialData.images[0].image}`
        : "";
      setValue("image", imageUrl);
      setPreview(imageUrl);
    } else {
      reset();
      setPreview(null);
      setFile(null);
    }
  }, [initialData, reset, setValue]);

  const handleFormSubmit = (data) => {
    const formattedData = {
      productName: data.name,
      categoryName: data.category,
      price: Number(data.price),
      description: data.description || "",
      image: file ? [] : data.image ? [{ image: data.image }] : [],
    };
    onSubmit(formattedData);
    setOpen(false);
    reset();
    setPreview(null);
    setFile(null);
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
      setFile(selectedFile);
      setValue("image", ""); 
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit Product" : "Add Product"}</DialogTitle>
          <DialogDescription>
            {initialData
              ? "Update the product details below."
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

          {/* Description */}
          <div className="space-y-2">
            <Label>Description</Label>
            <Input {...register("description")} placeholder="Enter description" />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>

          {/* Image */}
          <div className="space-y-2">
            <Label>Upload Image</Label>
            <Input type="file" accept="image/*" onChange={handleImageChange} />
            {preview && <img src={preview} alt="Preview" className="w-32 h-32 mt-2 object-cover" />}
            {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
          </div>

          <DialogFooter className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">{initialData ? "Update" : "Save"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
