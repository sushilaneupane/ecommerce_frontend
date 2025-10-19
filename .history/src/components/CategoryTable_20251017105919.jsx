import React, { useState } from "react";
import CategoryTable from "./CategoryTable";
import CategoryDialog from "./CategoryDialog";
import { useCategories } from "../hooks/useCategories";

export default function CategoryDashboard() {
  const { categories } = useCategories();
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

  const handleDelete = (category) => {
    // delete logic here
  };

  return (
    <>
      <CategoryTable
        categories={categories || []}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <CategoryDialog
        open={dialogOpen}
        setOpen={setDialogOpen}
        initialData={selectedCategory}
      />
    </>
  );
}
