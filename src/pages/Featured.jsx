import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { Link } from "react-router-dom";
import ProductCard from "@/components/ProductCard";

function Featured() {
  const { productsData, isLoading, isError, error } = useProducts();

  if (isLoading) {
    return <p className="text-center py-6">Loading featured products...</p>;
  }

  if (isError) {
    return (
      <p className="text-center text-red-500 py-6">
        Error: {error.message}
      </p>
    );
  }

  const featuredProducts = productsData?.slice(0, 4);

  return (
    <section className="container mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-center">⭐ Featured Products</h2>
        <Button
          variant="outline"
          className="hover:bg-blue-600 hover:text-white"
        >
          View All
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {featuredProducts?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default Featured;
