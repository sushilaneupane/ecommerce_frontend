import React, { useState } from "react";
import CategoryDialog from "../../components/CategoryDialog";
import CategoryTable from "../../components/CategoryTable";
import { toast } from "sonner";
import { useCategories } from "../../hooks/useCategories";

export default function CategoryManagement() {
  const {
    categories: fetchedCategories,
    isLoading,
    isError,
    create,
    update,
  } = useCategories();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // 🟢 Open dialog in "Add" mode
  const handleAdd = () => {
    setSelectedCategory(null);
    setDialogOpen(true);
  };

  // 🟢 Open dialog in "Edit" mode with existing data
  const handleEdit = (category) => {
    setSelectedCategory(category);
    setDialogOpen(true);
  };

  // 🟢 Handle both create and update
  const handleSubmit = async (data) => {
    try {
      if (selectedCategory) {
        // Update existing category
        await update.mutateAsync({
          categoryId: selectedCategory.id,
          categoryData: data,
        });
        toast.success("Category updated successfully!");
      } else {
        // Create new category
        await create.mutateAsync(data);
        toast.success("Category added successfully!");
      }

      setDialogOpen(false);
      setSelectedCategory(null);
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          (selectedCategory
            ? "Failed to update category"
            : "Failed to add category")
      );
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Category Management</h1>

      <CategoryTable
        categories={fetchedCategories || []}
        isLoading={isLoading}
        isError={isError}
        onAdd={handleAdd}
        onEdit={handleEdit}
        // you can also add onDelete later
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
