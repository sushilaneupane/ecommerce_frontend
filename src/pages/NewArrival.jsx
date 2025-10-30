import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/hooks/useProducts";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
function NewArrival() {
  const { productsData, isLoading, isError, error } = useProducts();

  if (isLoading) {
    return <p className="text-center py-6">Loading latest products...</p>;
  }

  if (isError) {
    return (
      <p className="text-center text-red-500 py-6">
        Error: {error?.message || "Something went wrong"}
      </p>
    );
  }

  console.log(productsData, "produts data");
  

  const latestProducts = productsData?.slice(-8).reverse();

  return (
    <section className="container mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">🆕 Newly Arrived</h2>

        {/* ✅ Navigate to All Products */}
        <Link to="/products">
          <Button
            variant="outline"
            className="hover:bg-blue-600 hover:text-white transition-colors"
          >
            View All
          </Button>
        </Link>
      </div>

      {latestProducts?.length ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {latestProducts.map((product) => (
           <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No new products available.</p>
      )}
    </section>
  );
}

export default NewArrival;
