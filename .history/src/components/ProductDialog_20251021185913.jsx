import React, { useState } from "react";
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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct, updateProduct } from "../api/productApi";
import { toast } from "sonner";

export default function ProductDialog({ open, setOpen, initialData = null }) {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("authToken");

  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    category: initialData?.category || "",
    price: initialData?.price || "",
    image: initialData?.image || "",
  });

  // ✅ React Query mutation for CREATE
  const createMutation = useMutation({
    mutationFn: (data) => createProduct(data, token),
    onSuccess: () => {
      toast.success("Product created successfully!");
      queryClient.invalidateQueries(["products"]);
      setOpen(false);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to create product");
    },
  });

  // ✅ React Query mutation for UPDATE
  const updateMutation = useMutation({
    mutationFn: (data) => updateProduct(initialData.id, data, token),
    onSuccess: () => {
      toast.success("Product updated successfully!");
      queryClient.invalidateQueries(["products"]);
      setOpen(false);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to update product");
    },
  });

  // ✅ handle change for input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (initialData) {
      updateMutation.mutate(formData);
    } else {
      createMutation.mutate(formData);
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

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label>Product Name</Label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Category</Label>
            <Input
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Price (Rs)</Label>
            <Input
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
         
          <div className="space-y-2">
            <Label>Image URL</Label>
            <Input
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={createMutation.isPending || updateMutation.isPending}
            >
              {initialData
                ? updateMutation.isPending
                  ? "Updating..."
                  : "Update"
                : createMutation.isPending
                ? "Saving..."
                : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
