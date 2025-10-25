import React, { useState } from "react";
import ProductDialog from "../../components/ProductDialog";
import ProductTable from "../../components/ProductTable";
import { toast } from "sonner";


export default function ProductManagement() {
  const [products, setProducts] = useState([]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const handleAdd = () => {
    setEditProduct(null);
    setDialogOpen(true);
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    setDialogOpen(true);
  };

  const handleDelete = (product) => {
    setProducts((prev) => prev.filter((p) => p.id !== product.id));
  };

  const handleSubmit = (data) => {
    if (editProduct) {
      // update
      setProducts((prev) =>
        prev.map((p) => (p.id === editProduct.id ? { ...p, ...data } : p))
      );
    } else {
      // add new
      const newProduct = { ...data, id: Date.now() };
      setProducts((prev) => [...prev, newProduct]);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Product Management</h1>

      <ProductTable
        products={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAdd={handleAdd}
      />

      <ProductDialog
        open={dialogOpen}
        setOpen={setDialogOpen}
        onSubmit={handleSubmit}
        initialData={editProduct}
      />
    </div>
  );
}
