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
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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
    },
  });

  const [previewImages, setPreviewImages] = useState([]);
  const [files, setFiles] = useState([]);

  // Prefill form when editing
  useEffect(() => {
    if (initialData) {
      setValue("name", initialData.productName);
      setValue("category", initialData.categoryName);
      setValue("price", initialData.price);
      setValue("description", initialData.description || "");

      if (initialData.images?.length > 0) {
        const existingImages = initialData.images.map(
          (img) => `http://localhost:3001/uploads/${img.image}`
        );
        setPreviewImages(existingImages);
      }
    } else {
      reset();
      setPreviewImages([]);
      setFiles([]);
    }
  }, [initialData, reset, setValue]);

  const handleFormSubmit = (data) => {
    const formattedData = {
      productName: data.name,
      categoryName: data.category,
      price: Number(data.price),
      description: data.description || "",
      files: files, // Multiple files
    };

    onSubmit(formattedData);
    reset();
    setPreviewImages([]);
    setFiles([]);
    setOpen(false);
  };

  const handleImagesChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    setFiles(selectedFiles);

    const previews = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-lg">
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
            <Textarea {...register("description")} placeholder="Enter description" />
          </div>

          {/* Multiple Images */}
          <div className="space-y-2">
            <Label>Upload Images (Multiple Allowed)</Label>
            <Input type="file" accept="image/*" multiple onChange={handleImagesChange} />

            {/* Preview Area */}
            <div className="flex flex-wrap gap-2 mt-2">
              {previewImages.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt="Preview"
                  className="w-24 h-24 object-cover rounded-md border"
                />
              ))}
            </div>
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