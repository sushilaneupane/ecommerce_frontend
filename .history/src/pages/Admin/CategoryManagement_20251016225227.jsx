import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

const initialCategories = [
  { id: 1, name: "Electronics", description: "Devices, gadgets, and accessories" },
  { id: 2, name: "Clothing", description: "Men and Women apparel" },
  { id: 3, name: "Books", description: "All genres of books" },
];

export default function CategoryDashboard() {
  const [categories, setCategories] = useState(initialCategories);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleAddCategory = () => {
    if (!name || !description) return;
    const newCategory = {
      id: Date.now(),
      name,
      description,
    };
    setCategories([...categories, newCategory]);
    setName("");
    setDescription("");
  };

  return (
    <div className="p-6">
      {/* Add Category Form */}
      <Card className="mb-6 max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Add New Category</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter category name"
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter category description"
            />
          </div>
          <Button onClick={handleAddCategory} className="w-full">
            Add Category
          </Button>
        </CardContent>
      </Card>

      {/* Categories List */}
      <h2 className="text-xl font-semibold mb-4 text-center">Categories</h2>
      <ScrollArea className="h-[400px] md:h-[600px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Card key={cat.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{cat.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{cat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
