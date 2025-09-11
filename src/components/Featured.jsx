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

function Featured() {
  const { data: products, isLoading, isError, error } = useProducts();

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

  const featuredProducts = products?.data.slice(0, 4);

  return (
    <section className="container mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">⭐Featured Products</h2>
        <Button variant="outline" className="hover:bg-blue-600 hover:text-white">
          View All
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {featuredProducts?.map((product) => (
          <Card
            key={product.id}
            className="w-full hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={product.images[0].image}
              alt={product.productName}
              className="w-full h-40 object-contain rounded-t-md bg-white"
            />
            <CardContent className="p-3">
              <CardHeader className="p-0 mb-2">
                <CardTitle className="text-base">{product.productName}</CardTitle>
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
        ))}
      </div>
    </section>
  );
}

export default Featured;
