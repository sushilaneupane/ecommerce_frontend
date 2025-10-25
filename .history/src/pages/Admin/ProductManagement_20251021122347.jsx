import React, { useState, useEffect } from "react";
import ProductDialog from "../../components/ProductDialog";
import ProductTable from "../../components/ProductTable";
import { useProducts } from "../../hooks/useProducts";
import { toast } from "sonner";

export default function ProductManagement() {
  const { products: fetchProducts, isLoading, isError } = useProducts();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [localProducts, setLocalProducts] = useState([]);

  // ✅ Ensure data is always an array
  const products = Array.isArray(fetchProducts?.data)
    ? fetchProducts.data
    : Array.isArray(fetchProducts)
    ? fetchProducts
    : [];

  // ✅ Sync fetched products into local state (for UI-only CRUD)
  useEffect(() => {
    setLocalProducts(products);
  }, [products]);

  // ➕ Add new product
  const handleAdd = () => {
    setSelectedProduct(null);
    setDialogOpen(true);
  };

  // ✏️ Edit product
  const handleEdit = (product) => {
    setSelectedProduct(product);
    setDialogOpen(true);
  };

  // ❌ Delete product
  const handleDelete = (product) => {
    if (!window.confirm(`Delete "${product.productName}"?`)) return;
    setLocalProducts((prev) => prev.filter((p) => p.id !== product.id));
    toast.success("Product deleted (UI only)");
  };

  // 💾 Submit form (Add / Edit)
  const handleSubmit = (data) => {
    if (selectedProduct) {
      // Update product
      setLocalProducts((prev) =>
        prev.map((p) =>
          p.id === selectedProduct.id ? { ...p, ...data } : p
        )
      );
      toast.success("Product updated (UI only)");
    } else {
      // Add new product
      const newProduct = {
        id: Date.now(),
        productName: data.name,
        price: data.price,
        categoryName: data.category,
        stock: data.stock,
        images: data.image ? [{ image: data.image }] : [],
      };
      setLocalProducts((prev) => [...prev, newProduct]);
      toast.success("Product added (UI only)");
    }

    setDialogOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Product Management</h1>

      <ProductTable
        products={localProducts}
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
