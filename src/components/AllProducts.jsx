import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Heart, Search, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCategories } from "../hooks/useCategories";
import { useProducts } from "../hooks/useProducts";

function AllProducts() {
  const [showCategories, setShowCategories] = useState(true);

  const {
    data: categories,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
    error: categoriesError,
  } = useCategories();

  const {
    data: products,
    isLoading: isProductsLoading,
    isError: isProductsError,
    error: productsError,
  } = useProducts();

  return (
    <div className="container mx-auto px-4 py-8 mt-9">
      <h1 className="text-4xl font-bold text-center mb-6">All Products</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Left: Category panel */}
        {showCategories && (
          <div className="md:col-span-1 bg-gray-50 p-4 rounded-lg shadow flex flex-col">
           

              
              <div className="flex gap-2 mb-7">
                <Input type="text" placeholder="Search..." className="flex-1" />
                <Button className="flex items-center gap-2">
                  <Search className="h-4 w-4" /> Search
                </Button>
              </div>
           

            {/* Categories List */}
         <div className="mb-4 flex justify-between items-center">
  <h2 className="text-xl font-semibold">Categories</h2>
  <Button
    onClick={() => setShowCategories(!showCategories)}
    className="flex items-center gap-2 bg-white hover:bg-white-200"
  >
<EyeOff className="h-4 w-4 text-black" />

  </Button>
</div>

            {isCategoriesLoading && <p>Loading categories...</p>}
            {isCategoriesError && (
              <p className="text-red-500">Error: {categoriesError.message}</p>
            )}
            <ul className="space-y-2">
              {categories?.map((category, index) => (
                <li
                  key={index}
                  className="cursor-pointer hover:text-blue-600 capitalize"
                >
                  {category}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Right: Products grid */}
        <div className={showCategories ? "md:col-span-3" : "md:col-span-4"}>
          {isProductsLoading && <p>Loading products...</p>}
          {isProductsError && (
            <p className="text-red-500">Error: {productsError.message}</p>
          )}

          <div className="grid [grid-template-columns:repeat(auto-fit,minmax(16rem,1fr))] gap-3">
            {products?.map((product) => (
              <Card
                key={product.id}
                className="w-full sm:w-64 hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-36 object-contain rounded-t-md bg-white"
                />
                <CardContent className="p-3">
                  <CardHeader className="p-0 mb-2">
                    <CardTitle className="text-base line-clamp-1">
                      {product.title}
                    </CardTitle>
                    <CardDescription className="text-sm line-clamp-2">
                      {product.description}
                    </CardDescription>
                  </CardHeader>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-bold text-sm">${product.price}</span>
                    <Heart className="h-6 w-6 text-gray-700 hover:text-red-600 cursor-pointer" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllProducts;
