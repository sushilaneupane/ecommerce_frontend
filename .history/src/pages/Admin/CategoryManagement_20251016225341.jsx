import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function CategoryManagement() {
  const [form, setForm] = useState({ name: "", description: "" });
  const [categories, setCategories] = useState([]);
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.description) {
      toast.error("Please fill out all fields!");
      return;
    }

    if (editId) {
      // Update existing category
      setCategories(
        categories.map((cat) =>
          cat.id === editId ? { ...cat, name: form.name, description: form.description } : cat
        )
      );
      toast.success("Category updated successfully!");
      setEditId(null);
    } else {
      // Add new category
      const newCategory = { id: Date.now(), name: form.name, description: form.description };
      setCategories([...categories, newCategory]);
      toast.success("Category added successfully!");
    }

    setForm({ name: "", description: "" });
  };

  const handleEdit = (category) => {
    setForm({ name: category.name, description: category.description });
    setEditId(category.id);
  };

  const handleDelete = (id) => {
    setCategories(categories.filter((cat) => cat.id !== id));
    toast.success("Category deleted successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-4">
      {/* Add/Edit Category Form */}
      <Card>
        <CardHeader>
          <CardTitle>{editId ? "Edit Category" : "Add New Category"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Category Name</Label>
              <Input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter category name"
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Enter category description"
              />
            </div>

            <Button type="submit" className="w-full">
              {editId ? "Update Category" : "Add Category"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Category List */}
      {categories.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4 text-center">Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
        </div>
      )}
    </div>
  );
}
