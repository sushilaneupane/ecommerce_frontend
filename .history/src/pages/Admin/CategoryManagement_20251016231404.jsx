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
import CTable from "../../components/CategoryTable";
import CategoryDialog from "../../components/CategoryDialog";


export default function CategoryManagement() {
  const [categories, setCategories] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editCategory, setEditCategory] = useState(null);

  const handleAddClick = () => {
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
    <div className="max-w-6xl mx-auto p-4 flex flex-col lg:flex-row gap-6">
      {/* Left side: Add/Edit Button */}
      <div className="lg:w-1/3">
        <Button className="w-full mb-4" onClick={handleAddClick}>
          Add Category
        </Button>
      </div>

      {/* Right side: Category Table */}
      <div className="lg:w-2/3">
        <CategoryTable
          categories={categories}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* Category Dialog */}
      <CategoryDialog
        open={dialogOpen}
        setOpen={setDialogOpen}
        onSubmit={handleSubmit}
        initialData={editCategory}
      />
    </div>
  );
}
