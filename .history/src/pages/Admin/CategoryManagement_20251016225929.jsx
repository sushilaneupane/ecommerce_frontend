import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Zod schema
const categorySchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
});

export default function CategoryManagement() {
  const [categories, setCategories] = useState([]);
  const [editId, setEditId] = useState(null);

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

  const onSubmit = (data) => {
    if (editId) {
      setCategories(
        categories.map((cat) => (cat.id === editId ? { ...cat, ...data } : cat))
      );
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

  const handleDelete = (id) => {
    setCategories(categories.filter((cat) => cat.id !== id));
    toast.success("Category deleted successfully!");
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex flex-col lg:flex-row gap-6">
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
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    {...register("description")}
                    placeholder="Enter category description"
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                  )}
                </div>

                <Button type="submit" className="w-full">
                  {editId ? "Update Category" : "Add Category"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Category List Side */}
        <div className="lg:w-2/3">
          {categories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {categories.map((cat) => (
                <Card key={cat.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle>{cat.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-2">{cat.description}</p>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(cat)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(cat.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No categories added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
