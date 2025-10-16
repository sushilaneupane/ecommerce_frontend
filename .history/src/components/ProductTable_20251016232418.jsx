import React, { useState } from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Edit, Trash, Search } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function ProductTable({ products: initialProducts = [], onEdit, onDelete, onAdd }) {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState(initialProducts);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()) || p.sku?.toLowerCase().includes(query.toLowerCase())
  );

  function handleDelete(product) {
    if (onDelete) return onDelete(product);
    if (!confirm(`Delete '${product.name}'?`)) return;
    setProducts((prev) => prev.filter((p) => p.id !== product.id));
  }

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
          <Button onClick={onAdd}>Add Product</Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto">
          <Table className="min-w-full">
            <TableHeader>
              <TableRow>
                <TableHead>S.</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                    No products found.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((product, idx) => (
                  <TableRow key={product.id}>
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
                      <div className="inline-flex gap-2">
                        <Button size="sm" variant="ghost" onClick={() => onEdit?.(product)}>
                          <Edit size={16} />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDelete(product)}>
                          <Trash size={16} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination info */}
        <div className="flex justify-between items-center mt-4 text-sm text-muted-foreground">
          <div>Showing {filtered.length} of {products.length} products</div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">Prev</Button>
            <Button size="sm">Next</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
