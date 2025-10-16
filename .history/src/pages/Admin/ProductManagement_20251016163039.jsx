import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Edit, Trash, Search } from "lucide-react";

// Example Admin Product Table component (shadcn UI + Tailwind)
// Props:
// - products: optional array of products to display
// - onEdit(product): callback when edit clicked
// - onDelete(product): callback when delete clicked

export default function AdminProductTable({ products: initialProducts = null, onEdit, onDelete }) {
  // sample data used when none provided
  const sampleProducts = [
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
    {
      id: 3,
      name: "Wooden Dining Chair",
      images: [],
      sku: "CH-778",
      category: "Furniture",
      price: 49.0,
      stock: 12,
    },
  ];

  const [query, setQuery] = useState("");
  const [products, setProducts] = useState(initialProducts ?? sampleProducts);

  function handleEdit(product) {
    if (onEdit) return onEdit(product);
    // fallback behavior: log to console
    console.log("Edit product", product);
  }

  function handleDelete(product) {
    if (onDelete) return onDelete(product);
    // fallback: simple confirmation and local remove
    if (!confirm(`Are you sure you want to delete '${product.name}'?`)) return;
    setProducts((prev) => prev.filter((p) => p.id !== product.id));
  }

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()) || p.sku?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <CardTitle>Products</CardTitle>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Input
              placeholder="Search by name or SKU..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pr-10"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" size={16} />
          </div>
          <Button onClick={() => alert('Add product flow -> open product create modal')}>
            Add product
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto">
          <Table className="min-w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">#</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    No products found.
                  </TableCell>
                </TableRow>
              )}

              {filtered.map((product, idx) => (
                <TableRow key={product.id} className="align-top">
                  <TableCell>{idx + 1}</TableCell>

                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-12 h-12">
                        {product.images?.[0] ? (
                          <AvatarImage src={product.images[0]} alt={product.name} />
                        ) : (
                          <AvatarFallback>{product.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                        )}
                      </Avatar>

                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-xs text-muted-foreground">{product.sku}</div>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>{product.category}</TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>
                    {product.stock > 0 ? (
                      <span className="text-sm">{product.stock} available</span>
                    ) : (
                      <span className="text-sm text-rose-600">Out of stock</span>
                    )}
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="inline-flex items-center gap-2">
                      <Button size="sm" variant="ghost" onClick={() => handleEdit(product)} title="Edit">
                        <Edit size={16} />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(product)} title="Delete">
                        <Trash size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Simple pagination placeholder */}
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-muted-foreground">Showing {filtered.length} of {products.length} products</div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => alert('Prev page')}>
              Prev
            </Button>
            <Button size="sm" onClick={() => alert('Next page')}>
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
