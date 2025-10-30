import React, { useState } from "react";
import ProductDialog from "../../components/ProductDialog";
import ProductTable from "../../components/ProductTable";
import { useProducts } from "../../hooks/useProducts";
import { useAuth } from "@/context/AuthContext";

export default function ProductManagement() {
  const { productsData, isLoading, isError, create, update, remove } = useProducts();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleAdd = () => {
    setSelectedProduct(null);
    setDialogOpen(true);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setDialogOpen(true);
  };

  const handleDelete = (productId) => {
      remove.mutate(productId);
    
  };

  const handleSubmit = (formData) => {
    if (selectedProduct) {
      console.log(selectedProduct.id, "productId");
      update.mutate({ id: selectedProduct.id, data: formData });
    } else {
      create.mutate(formData);
    }
  };

  return (
      <div className="p-3 space-y-6">
     <h4 className="text-2xl font-semibold mb-4">Product Management</h4>
      <ProductTable
        products={productsData || []}
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
