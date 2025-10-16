import React, { useState } from "react";
import CategoryDialog from "../../components/CategoryDialog";
import CategoryTable from "../../components/CategoryTable";
import { toast } from "sonner";
import { useCategories } from "../../hooks/useCategories";

export default function CategoryManagement() {
  const { categories: fetchedCategories, isLoading, isError, create } = useCategories();

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleAdd = () => {
    setDialogOpen(true);
  };

  const handleSubmit = (data) => {
    create.mutate(data, {
      onSuccess: () => {
        toast.success("Category added successfully!");
        setDialogOpen(false);
      },
      onError: (err) => toast.error(err?.response?.data?.message || "Failed to add category"),
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Category Management</h1>

      <CategoryTable
        categories={fetchedCategories}
        isLoading={isLoading}
        isError={isError}
        onAdd={handleAdd} // Add button in table header
        // Remove onEdit and onDelete
      />

      <CategoryDialog
        open={dialogOpen}
        setOpen={setDialogOpen}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
