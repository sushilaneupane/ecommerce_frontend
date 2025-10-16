import React, { useState } from "react";
import CategoryDialog from "../../components/CategoryDialog";
import CategoryTable from "../../components/CategoryTable";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import ca

export default function CategoryManagement() {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Apparel",
      description: "Clothing and fashion items",
    },
    {
      id: 2,
      name: "Electronics",
      description: "Devices and gadgets",
    },
  ]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editCategory, setEditCategory] = useState(null);

  const handleAdd = () => {
    setEditCategory(null);
    setDialogOpen(true);
  };

  const handleEdit = (category) => {
    setEditCategory(category);
    setDialogOpen(true);
  };

  const handleDelete = (category) => {
    if (confirm(`Delete category "${category.name}"?`)) {
      setCategories(categories.filter((cat) => cat.id !== category.id));
      toast.success("Category deleted successfully!");
    }
  };

  const handleSubmit = (data) => {
    if (editCategory) {
      setCategories(
        categories.map((cat) => (cat.id === editCategory.id ? { ...cat, ...data } : cat))
      );
      toast.success("Category updated successfully!");
    } else {
      setCategories([...categories, { id: Date.now(), ...data }]);
      toast.success("Category added successfully!");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Category Management</h1>

      <CategoryTable
        categories={categories}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAdd={handleAdd} // optional add button in table header
      />

      <CategoryDialog
        open={dialogOpen}
        setOpen={setDialogOpen}
        onSubmit={handleSubmit}
        initialData={editCategory}
      />
    </div>
  );
}
