import React, { useState } from "react";
import ProductDialog from "../../components/ProductDialog";
import ProductTable from "../../components/ProductTable";
import { toast } from "sonner";
import { useProducts } from "../../hooks/useProducts";

export default function ProductManagement() {
  const {
    products: fetchedProducts,
    isLoading,
    isError,
  } = useProducts();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Open dialog for adding new product (UI only — no backend create)
  const handleAdd = () => {
    setSelectedProduct(null);
    setDialogOpen(true);
  };

  // Open dialog for editing existing product (UI only — no backend update)
  const handleEdit = (product) => {
    setSelectedProduct(product);
    setDialogOpen(true);
  };

  // Delete from UI only (optional local removal)
  // const handleDelete = (productId) => {
  //   toast.info("Delete functionality is not implemented yet.");
  // };

  // Submit form (UI only)
  // const handleSubmit = (data) => {
  //   toast.info("Save functionality is not connected to the backend yet.");
  //   setDialogOpen(false);
  //   setSelectedProduct(null);
  // };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Product Management</h1>

      <ProductTable
        products={fetchedProducts || []}
        isLoading={isLoading}
        isError={isError}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <ProductDialog
        open={dialogOpen}
        setOpen={setDialogOpen}
        initialData={selectedProduct}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
