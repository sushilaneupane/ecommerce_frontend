import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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

export default function CategoryTable({ categories = [], onAdd, onEdit, onDelete }) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null); 

  const filteredCategories = categories.filter(
    (category) =>
      category.name?.toLowerCase().includes(query.toLowerCase()) ||
      category.description?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <CardTitle>Categories</CardTitle>
        <div className="flex w-full sm:w-auto gap-2">
          <div className="relative flex-1 sm:flex-none">
            <Input
              placeholder="Search by name or description..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pr-10"
            />
            <Search
              className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
              size={16}
            />
          </div>
          <Button onClick={onAdd}>Add Category</Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="max-h-[550px] overflow-y-auto">
          <Table className="min-w-full table-auto">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">S.N</TableHead>
                <TableHead className="w-[0px]">Name</TableHead>
                <TableHead className="max-w-[300px]">Description</TableHead>
                <TableHead className="w-[100px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredCategories.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                    No categories found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredCategories.map((category, idx) => (
                  <TableRow key={category.id}>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>{category.name}</TableCell>
                    <TableCell className="whitespace-pre-wrap max-w-[300px] text-sm text-muted-foreground">
                      {category.description || "—"}
                    </TableCell>
                    <TableCell className="text-right flex justify-end gap-2">
                      <Button size="sm" variant="outline" onClick={() => onEdit(category)}>
                        <Edit size={16} />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedCategory(category)}
                          >
                           <Trash2 className="w-4 h-4" color="red" />
                          </Button>
                        </AlertDialogTrigger>

                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure you want to delete?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently remove the category.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => setSelectedCategory(null)}>
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => {
                                onDelete(selectedCategory.id);
                                setSelectedCategory(null);
                              }}
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
          Showing {filteredCategories.length} of {categories.length} categories
        </div>
      </CardContent>
    </Card>
  );
}
