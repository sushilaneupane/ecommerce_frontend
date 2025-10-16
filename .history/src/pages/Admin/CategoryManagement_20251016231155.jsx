import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, Trash } from "lucide-react";
import ProductTable from "../../components/CategoryTable";
import C

// Zod schema
const categorySchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
});

export default function CategoryManagement() {
  const [categories, setCategories] = useState([]);
  const [editId, setEditId] = useState(null);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: { name: "", description: "" },
  });

  const onSubmit = (data) => {
    if (editId) {
      setCategories(categories.map(cat => cat.id === editId ? { ...cat, ...data } : cat));
      toast.success("Category updated successfully!");
      setEditId(null);
    } else {
      const newCategory = { id: Date.now(), ...data };
      setCategories([...categories, newCategory]);
      toast.success("Category added successfully!");
    }
    reset();
  };

  const handleEdit = (category) => {
    setValue("name", category.name);
    setValue("description", category.description);
    setEditId(category.id);
  };

  const handleDelete = (category) => {
    setCategories(categories.filter(cat => cat.id !== category.id));
    toast.success("Category deleted successfully!");
  };

  return (
    <div className="max-w-6xl mx-auto p-4 flex flex-col lg:flex-row gap-6">
      {/* Form Side */}
      <div className="lg:w-1/3">
        <Card>
          <CardHeader>
            <CardTitle>{editId ? "Edit Category" : "Add New Category"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="name">Category Name</Label>
                <Input
                  id="name"
                  {...register("name")}
                  placeholder="Enter category name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  {...register("description")}
                  placeholder="Enter category description"
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
              </div>

              <Button type="submit" className="w-full">
                {editId ? "Update Category" : "Add Category"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Table Side */}
      <div className="lg:w-2/3">
        <ProductTable
          products={categories.map(cat => ({
            id: cat.id,
            name: cat.name,
            sku: cat.description, // using description in place of SKU
            category: "-", // unused
            price: 0, // unused
            stock: 0, // unused
            images: [], // no images
          }))}
          onEdit={(product) => handleEdit(categories.find(cat => cat.id === product.id))}
          onDelete={(product) => handleDelete(categories.find(cat => cat.id === product.id))}
          onAdd={() => {}}
        />
      </div>
    </div>
  );
}
