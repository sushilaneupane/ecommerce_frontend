import React, { useState } from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Edit, Trash, Search } from "lucide-react";

export default function CategoryTable({ categories = [], onEdit, onDelete, onAdd }) {
  const [query, setQuery] = useState("");

  const filtered = categories.filter(
    (cat) =>
      cat.name.toLowerCase().includes(query.toLowerCase()) ||
      cat.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <CardTitle>Categories</CardTitle>

        <div className="flex w-full sm:w-auto gap-2">
          {/* Search Input */}
          <div className="relative flex-1 sm:flex-none">
            <Input
              placeholder="Search by name or description..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pr-10"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" size={16} />
          </div>

          {/* Add Category Button */}
          <Button onClick={onAdd}>Add Category</Button>
        </div>
      </CardHeader>

      <CardContent>
        {/* Table container with vertical scroll */}
        <div className="max-h-[550px] overflow-y-auto">
          <Table className="min-w-full table-auto">
            <TableHeader>
              <TableRow>
                <TableHead>S.N</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                    No categories found.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((cat, idx) => (
                  <TableRow key={cat.id}>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>{cat.name}</TableCell>
                    {/* Allow description to wrap to next line */}
                    <TableCell className="whitespace-normal">{cat.description}</TableCell>
                    <TableCell className="text-right flex justify-end gap-2">
                      <Button size="sm" variant="outline" onClick={() => onEdit(cat)}>
                        <Edit size={16} />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => onDelete(cat)}>
                       
                        <Trash size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-between items-center mt-4 text-sm text-muted-foreground">
          <div>Showing {filtered.length} of {categories.length} categories</div>
        </div>
      </CardContent>
    </Card>
  );
}
