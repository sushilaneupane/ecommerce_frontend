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
import { useProducts } from "../hooks/useProducts";  
import { useCategories } from "../hooks/useCategories";

const productSchema = z.object({
  name: z.string().min(3, "Product name must be at least 3 characters"),
  categoryId: z.string().min(1, "Category is required"),
  price: z
    .string()
    .min(1, "Price is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Price must be a positive number",
    }),
  description: z.string().optional(),
});

export default function ProductDialog({ open, setOpen, initialData = null, onSubmit }) {
  const { categories, isLoading } = useCategories();
   const { create } = useProducts();

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
      categoryId: "",
      price: "",
      description: "",
    },
  });

  const [previewImages, setPreviewImages] = useState([]);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (initialData) {
      setValue("name", initialData.productName);
      setValue("price", initialData.price);
      setValue("description", initialData.description || "");

      // 🔹 Find categoryId by categoryName from backend response
      const matchedCategory = categories.find(
        (cat) => cat.name === initialData.categoryName
      );
      setValue("categoryId", matchedCategory?.id?.toString() || "");

      if (initialData.images?.length > 0) {
        setPreviewImages(
          initialData.images.map((img) => `http://localhost:3001/uploads/${img.image}`)
        );
      }
    } else {
      reset();
      setPreviewImages([]);
      setFiles([]);
    }
  }, [initialData, categories, reset, setValue]);

const handleFormSubmit = (data) => {
  const formattedData = {
    name: data.name,
    categoryId: Number(data.categoryId),
    price: Number(data.price),
    description: data.description || "",
    files: files, // ✅ correct, but now actually used
  };

  create.mutate(formattedData); // ✅ call React Query mutation directly

  reset();
  setPreviewImages([]);
  setFiles([]);
  setOpen(false);
};



  const handleImagesChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    setPreviewImages(selectedFiles.map((file) => URL.createObjectURL(file)));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit Product" : "Add Product"}</DialogTitle>
          <DialogDescription>
            {initialData ? "Update product details." : "Enter new product details."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 mt-2">
          {/* Product Name */}
          <div className="space-y-2">
            <Label>Product Name</Label>
            <Input {...register("name")} placeholder="Enter product name" />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          {/* Category Select */}
          <div className="space-y-2">
            <Label>Category</Label>
            <select
              {...register("categoryId")}
              className="w-full border rounded px-3 py-2 bg-white text-gray-700"
            >
              <option value="">-- Select Category --</option>
              {!isLoading &&
                categories?.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
            </select>
            {errors.categoryId && (
              <p className="text-red-500 text-sm">{errors.categoryId.message}</p>
            )}
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
            <Textarea {...register("description")} placeholder="Product description" />
          </div>

          {/* Multiple Images */}
          <div className="space-y-2">
            <Label>Upload Images</Label>
            <Input type="file" accept="image/*" multiple onChange={handleImagesChange} />
            <div className="flex flex-wrap gap-2 mt-2">
              {previewImages.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt="Preview"
                  className="w-24 h-24 object-cover rounded border"
                />
              ))}
            </div>
          </div>

          <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline" type="button" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">{initialData ? "Update" : "Save"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
