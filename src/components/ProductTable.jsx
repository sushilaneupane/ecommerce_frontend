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
import { Edit, Trash2, Search } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Link } from "react-router-dom";

export default function ProductTable({ products = [], onEdit, onDelete, onAdd }) {
  const [query, setQuery] = useState("");
  const [selectedProductId, setSelectedProductId] = useState(null);

  const filtered = products.filter(
    (p) =>
      p.productName?.toLowerCase().includes(query.toLowerCase()) ||
      p.description?.toLowerCase().includes(query.toLowerCase()) ||
      p.categoryName?.toLowerCase().includes(query.toLowerCase())
  );

  const handleDelete = () => {
    if (selectedProductId) {
      onDelete(selectedProductId);
      setSelectedProductId(null);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <CardTitle>Products</CardTitle>
        <div className="flex w-full sm:w-auto gap-2">
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

          <Button onClick={onAdd}>Add Product</Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="max-h-[550px] overflow-y-auto">
          <Table className="min-w-full table-auto">
            <TableHeader className="sticky top-0 bg-background z-10">
              <TableRow>
                <TableHead className="w-[110px]">S.N</TableHead>
                <TableHead className="w-[120px]">Image</TableHead>
                <TableHead className="w-[130px]">Name</TableHead>
                <TableHead className="w-[140px]">Category</TableHead>
                <TableHead className="w-[150px]">Price</TableHead>
                <TableHead className="max-w-[300px]">Description</TableHead>
                <TableHead className="w-[110px] text-right">Actions</TableHead>
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

                    <TableCell>
                      <Avatar className="w-12 h-12">
                        {product.images?.[0] ? (
                          <Link to={`/product/${product.id}`}>
                            <AvatarImage
                              src={`${import.meta.env.VITE_IMAGE_BASEURL}/${product.images[0].image}`}
                              alt={product.productName}
                            />
                          </Link>
                        ) : (
                          <AvatarFallback>
                            {product.productName?.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        )}
                      </Avatar>
                    </TableCell>

                    <TableCell>{product.productName}</TableCell>
                    <TableCell>{product.categoryName || "—"}</TableCell>
                    <TableCell>Rs. {Number(product.price).toFixed(2)}</TableCell>
                    <TableCell className="whitespace-pre-wrap max-w-[300px] text-sm text-muted-foreground">
                      {product.description || "—"}
                    </TableCell>

                    <TableCell className="text-right flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onEdit(product)}
                      >
                        <Edit size={16} />
                      </Button>

                     
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedProductId(product.id)}
                          >
                            <Trash2 className="w-4 h-4" color="red" />
                          </Button>
                        </AlertDialogTrigger>

                      
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently remove the product from your database.
                            </AlertDialogDescription>
                          </AlertDialogHeader>

                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={handleDelete}
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>

                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-between items-center mt-4 text-sm text-muted-foreground">
          <div>
            Showing {filtered.length} of {products.length} products
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
