import React, { useState } from "react";
import CategoryDialog from "../../components/CategoryDialog";
import CategoryTable from "../../components/CategoryTable";
import { useCategories } from "../../hooks/useCategories";

export default function CategoryManagement() {
  const { categories: categoriesData, isLoading, isError, create, update, remove } = useCategories();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleAdd = () => {
    setSelectedCategory(null);
    setDialogOpen(true);
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setDialogOpen(true);
  };

  const handleDelete = (categoryId) => {
      remove.mutate(categoryId);
  };

  const handleSubmit = (formData) => {
    if (selectedCategory) {
      update.mutate({ id: selectedCategory.id, data: formData });
    } else {
      create.mutate(formData);
    }
  };

  return (
    <div className="p-3 space-y-6">
      <h4 className="text-2xl font-semibold mb-4">Category Management</h4>

      <CategoryTable
        categories={categoriesData || []}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <CategoryDialog
        open={dialogOpen}
        setOpen={setDialogOpen}
        initialData={selectedCategory}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
