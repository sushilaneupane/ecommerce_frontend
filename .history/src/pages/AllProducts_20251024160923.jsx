import React, { useState, useMemo } from "react";
import { FolderOpen, Folder, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCategories } from "../hooks/useCategories";
import { useProducts } from "../hooks/useProducts";
import ProductCard from "@/components/ProductCard";

function AllProducts() {
  const [showCategories, setShowCategories] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("LowToHigh");

  const {
    data: categories = [],
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
    error: categoriesError,
  } = useCategories();
  console.log(categories, "data");
  

  const {
    data: productsResponse,
    isLoading: isProductsLoading,
    isError: isProductsError,
    error: productsError,
  } = useProducts();

  console.log(productsResponse, "products");
  

  const products = productsResponse?.data || [];

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory !== "All") {
      result = result.filter(
        (p) => p.categoryName?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (searchQuery.trim()) {
      result = result.filter((p) =>
        p.productName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    switch (sortOption) {
      case "LowToHigh":
        result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case "HighToLow":
        result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case "AZ":
        result.sort((a, b) => a.productName.localeCompare(b.productName));
        break;
      case "ZA":
        result.sort((a, b) => b.productName.localeCompare(a.productName));
        break;
      case "Newest":
        result.sort((a, b) => b.id - a.id);
        break;
      default:
        break;
    }

    return result;
  }, [products, selectedCategory, searchQuery, sortOption]);

  return (
    <div className="container mx-auto px-4 py-8 mt-9">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <aside className="col-span-1 bg-gray-50 p-4 rounded-lg shadow flex flex-col">
          <div className="flex justify-end mb-4">
            <Button
              onClick={() => setShowCategories(!showCategories)}
              className="flex items-center gap-2 bg-white hover:bg-gray-100 shadow-sm"
            >
              {showCategories ? (
                <FolderOpen className="h-4 w-4 text-black" />
              ) : (
                <Folder className="h-4 w-4 text-black" />
              )}
            </Button>
          </div>

          {showCategories && (
            <>
              {/* Search Box */}
              <div className="flex gap-2 mb-6">
                <Input
                  type="text"
                  placeholder="Search..."
                  className="flex-1"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button className="flex items-center gap-2">
                  <Search className="h-4 w-4" /> Search
                </Button>
              </div>

              {/* Categories */}
              <h2 className="text-xl font-semibold mb-3">Categories</h2>
              {isCategoriesLoading && <p>Loading categories...</p>}
              {isCategoriesError && (
                <p className="text-red-500">Error: {categoriesError.message}</p>
              )}
              <ul className="space-y-2">
                <li
                  className={`cursor-pointer capitalize ${
                    selectedCategory === "All" ? "text-blue-600 font-semibold" : ""
                  }`}
                  onClick={() => setSelectedCategory("All")}
                >
                  All
                </li>
                {categories?.map((cat, index) => (
                  <li
                    key={index}
                    className={`cursor-pointer capitalize hover:text-blue-600 ${
                      selectedCategory === cat.name
                        ? "text-blue-600 font-semibold"
                        : ""
                    }`}
                    onClick={() => setSelectedCategory(cat.name)}
                  >
                    {cat.name}
                  </li>
                ))}
              </ul>
            </>
          )}
        </aside>

        {/* Main Content */}
        <main className={showCategories ? "md:col-span-3" : "md:col-span-4"}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <h3 className="text-2xl font-semibold">
              {selectedCategory === "All" ? "All Products" : selectedCategory}
            </h3>
            <span className="text-sm text-gray-500">
              {filteredProducts.length} products
            </span>
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="LowToHigh">Price Low to High</SelectItem>
                <SelectItem value="HighToLow">Price High to Low</SelectItem>
                <SelectItem value="AZ">Name A-Z</SelectItem>
                <SelectItem value="ZA">Name Z-A</SelectItem>
                <SelectItem value="Newest">Newest</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Product Grid */}
          {isProductsLoading && <p>Loading products...</p>}
          {isProductsError && (
            <p className="text-red-500">Error: {productsError.message}</p>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}

            {filteredProducts?.length === 0 && !isProductsLoading && (
              <p className="text-center col-span-full">No products found.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default AllProducts;
