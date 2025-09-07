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

function NewArrival() {
  const { data: products, isLoading, isError, error } = useProducts();

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

  // ✅ Show only latest 6 products
  const latestProducts = products?.slice(-8).reverse();

  return (
    <section className="container mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">🆕 Newly Arrived</h2>

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
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {latestProducts.map((product) => (
            <Card
              key={product.id}
              className="w-full hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-40 object-contain rounded-t-md bg-white"
              />
              <CardContent className="p-3">
                <CardHeader className="p-0 mb-2">
                  <CardTitle className="text-base">{product.title}</CardTitle>
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
      ) : (
        <p className="text-center text-gray-500">No new products available.</p>
      )}
    </section>
  );
}

export default NewArrival;
