import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Edit, Trash, Search } from "lucide-react";

export default function ProductTable({ products = [], onEdit, onDelete, onAdd }) {
  const [query, setQuery] = useState("");

  // 🔍 Filter products by name, description, or category
  const filtered = products.filter(
    (p) =>
      p.productName?.toLowerCase().includes(query.toLowerCase()) ||
      p.description?.toLowerCase().includes(query.toLowerCase()) ||
      p.categoryName?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Card className="w-full">
      {/* ===== Header Section ===== */}
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <CardTitle>Products</CardTitle>

        <div className="flex w-full sm:w-auto gap-2">
          {/* 🔍 Search Input */}
          <div className="relative flex-1 sm:flex-none">
            <Input
              placeholder="Search by name, description, or category..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pr-10"
            />
            <Search
              className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
              size={16}
            />
          </div>

          {/* ➕ Add Product Button */}
          <Button onClick={onAdd}>Add Product</Button>
        </div>
      </CardHeader>

      {/* ===== Table Section ===== */}
      <CardContent>
        <div className="max-h-[550px] overflow-y-auto">
          <Table className="min-w-full table-auto">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">S.N</TableHead>
                <TableHead className="w-[60px]">Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="w-[100px]">Price</TableHead>
                <TableHead className="max-w-[300px]">Description</TableHead>
                <TableHead className="w-[120px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-6 text-muted-foreground"
                  >
                    No products found.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((product, idx) => (
                  <TableRow key={product.id}>
                    <TableCell>{idx + 1}</TableCell>

                    {/* Product Image */}
                    <TableCell>
                      <Avatar className="w-12 h-12">
                        {product.images?.length > 0 ? (
                          <AvatarImage
                            src={`http://localhost:3001/uploads/${product.images[0].image}`}
                            alt={product.productName}
                          />
                        ) : (
                          <AvatarFallback>
                            {product.productName?.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        )}
                      </Avatar>
                    </TableCell>

                    {/* Product Name */}
                    <TableCell>{product.productName}</TableCell>

                    {/* Category */}
                    <TableCell>{product.categoryName || "—"}</TableCell>

                    {/* Price */}
                    <TableCell>Rs. {Number(product.price).toFixed(2)}</TableCell>

                    {/* Description */}
                    <TableCell className="whitespace-pre-wrap max-w-[300px] text-sm text-muted-foreground">
                      {product.description || "—"}
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="text-right flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onEdit(product)}
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => ha(product.id)}
                      >
                        <Trash size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* ===== Footer Section ===== */}
        <div className="flex justify-between items-center mt-4 text-sm text-muted-foreground">
          <div>
            Showing {filtered.length} of {products.length} products
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
