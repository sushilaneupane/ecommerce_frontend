import React, { useState } from "react";
import ProductDialog from "../../components/ProductDialog";
import ProductTable from "../../components/ProductTable";
import { useProducts } from "../../hooks/useProducts";

export default function ProductManagement() {
  const { products: fetchedProducts, isLoading, isError } = useProducts();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Product Management</h1>

      <ProductTable
        products={fetchedProducts || []}
        isLoading={isLoading}
        isError={isError}
      />

      <ProductDialog
        open={dialogOpen}
        setOpen={setDialogOpen}
        initialData={selectedProduct}
      />
    </div>
  );
}
