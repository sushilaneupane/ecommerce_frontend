import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { getCategories } from "../../api/categoriesApi";
import { getProductsByCategoryId } from "../../api/productsApi";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Alert, AlertDescription } from "@/components/ui/alert";
import ProductCard from "../Product";

function CategoryPage() {
 

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <ul className="space-y-2 mb-6">
            {categories.map((cat) => (
              <li key={cat.id}>
                <Link
                  to={`/category/${cat.id}`}
                  className="hover:text-blue-600 transition-colors capitalize"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>

          <h5 className="text-lg font-semibold mb-3">Filter by</h5>

          {/* Price Range */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Price</label>
            <Slider defaultValue={[25]} min={25} max={400} step={5} />
            <div className="flex justify-between text-sm mt-2 text-gray-500">
              <span>25.00</span>
              <span>400.00</span>
            </div>
          </div>

          {/* Model Filter */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Model</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="A">Model A</SelectItem>
                <SelectItem value="B">Model B</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Size Filter */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Size</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Small</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="large">Large</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </aside>

        {/* Products Section */}
        <main className="md:col-span-3">
        

          <div className="grid [grid-template-columns:repeat(auto-fit,minmax(16rem,1fr))] gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default CategoryPage;
