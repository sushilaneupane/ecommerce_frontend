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
    remove,
  } = useCategories();

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

 const handleDelete = async (categoryId) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this category?");
  if (!confirmDelete) return;

  try {
    await remove.mutateAsync(categoryId);
    toast.success("Category deleted successfully!");
    setOpen(false);  // ✅ Close dialog
    reset();         // ✅ Reset form
  } catch (err) {
    toast.error(err?.response?.data?.message || "Failed to delete category");
    console.error("Error deleting category:", err);
  }
};

  const handleSubmit = async (data) => {
    try {
      if (selectedCategory) {
      
        await update.mutateAsync({
          categoryId: selectedCategory.id,
          categoryData: data,
        });
        toast.success("Category updated successfully!");
      } else {
       
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
