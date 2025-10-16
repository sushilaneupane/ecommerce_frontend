import React from "react";
import ProductTable from "@/components/admin/ProductTable";

export default function ProductManagement() {
  const products = [
    {
      id: 1,
      name: "Classic Leather Jacket",
      images: ["/images/products/jacket-1.jpg"],
      sku: "JKT-001",
      category: "Apparel",
      price: 129.99,
      stock: 24,
    },
    {
      id: 2,
      name: "Wireless Headphones",
      images: ["/images/products/headphone-1.jpg"],
      sku: "HP-220",
      category: "Electronics",
      price: 79.5,
      stock: 0,
    },
  ];

  const handleEdit = (product) => {
    alert(`Edit product: ${product.name}`);
  };

  const handleDelete = (product) => {
    alert(`Delete product: ${product.name}`);
  };

  const handleAdd = () => {
    alert("Open add product modal");
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
    </div>
  );
}
