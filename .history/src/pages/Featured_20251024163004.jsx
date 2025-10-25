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
          <Link
            key={product.id}
            to={`/product/${product.id}`} // 👈 navigate to product overview
            className="group"
          >
            <Card className="w-full hover:shadow-lg transition-all duration-300 cursor-pointer">
              <img
                src={
                  product?.images?.length
                    ? `http://localhost:3001/uploads/${product.images[0].image}`
                    : "/placeholder.jpg"
                }
                alt={product?.productName || "Product"}
                className="w-full h-36 sm:h-40 md:h-48 object-cover rounded-t-xl group-hover:opacity-90"
              />

              <CardContent className="p-3">
                <CardHeader className="p-0 mb-2">
                  <CardTitle className="text-base group-hover:text-blue-600 transition-colors">
                    {product.productName}
                  </CardTitle>
                  <CardDescription className="text-sm line-clamp-2">
                    {product.description}
                  </CardDescription>
                </CardHeader>

                <div className="mt-2 flex items-center justify-between">
                  <span className="font-bold text-sm">${product.price}</span>
                  <Heart className="h-5 w-5 text-gray-700 hover:text-red-600 cursor-pointer" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Featured;
