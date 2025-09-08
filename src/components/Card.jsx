import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const ProductList = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <Card key={product.id} className="h-full hover:shadow-lg transition-shadow duration-300">
          <div className="w-full h-48 flex items-center justify-center overflow-hidden rounded-t-md bg-gray-100">
            <img
              src={
                product.images.length > 0
                  ? `http://localhost:3001/uploads/${product.images[0].image}`
                  : "/image/cardimage.jpg"
              }
              alt={product.productName || "Product Image"}
              className="object-contain w-full h-full"
            />
          </div>
          <CardContent className="text-center">
            <CardTitle className="text-lg font-semibold">
              {product.productName || "Unknown Product"}
            </CardTitle>
            <p className="mt-2 text-sm text-gray-600">${product.price}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProductList;
