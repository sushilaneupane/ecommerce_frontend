import React, { useState } from "react";
import ProductDialog from "../../components/ProductDialog";
import ProductTable from "../../components/ProductTable";
import { useProducts } from "../../hooks/useProducts";
import { toast } from "sonner";

export default function ProductManagement() {
  const { products: fetchProducts, isLoading, isError } = useProducts();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleAdd = () => setDialogOpen(true);

  // ✅ Safely ensure we have an array
  const products = Array.isArray(fetchProducts) ? fetchProducts : [];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Product Management</h1>

      <ProductTable
        products={products}  {/* ✅ use this, not fetchProducts */}
        isLoading={isLoading}
        isError={isError}
        onAdd={handleAdd}
      />

      <ProductDialog open={dialogOpen} setOpen={setDialogOpen} />
    </div>
  );
}
