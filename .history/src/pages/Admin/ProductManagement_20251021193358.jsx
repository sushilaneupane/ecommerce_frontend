import React, { useState } from "react";
import ProductDialog from "../../components/ProductDialog";
import ProductTable from "../../components/ProductTable";
import { useProducts } from "../../hooks/useProducts";

export default function ProductManagement() {
  const { products, isLoading, isError, create, update, remove } = useProducts();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Add Product
  const handleAdd = () => {
    setSelectedProduct(null);
    setDialogOpen(true);
  };

  // Edit Product
  const handleEdit = (product) => {
    setSelectedProduct(product);
    setDialogOpen(true);
  };

  // Delete Product
  const handleDelete = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      remove.mutate(productId);
    }
  };

  // Submit from Dialog (for create or update)
  const handleSubmit = (formData) => {
    if (selectedProduct) {
      update.mutate({ id: selectedProduct.id, data: formData });
    } else {
      create.mutate(formData);
    }
    setDialogOpen(false);
  };

  return (
    <>
      <ProductTable
        products={products || []}
        isLoading={isLoading}
        isError={isError}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

    v
    </>
  );
}
