import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useProductById } from "../hooks/useProducts";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const ProductOverview = () => {
  const { id } = useParams(); // ✅ always runs
  const { data: product, isLoading, isError } = useProductById(id); // ✅ always runs, but query is disabled when id is falsy

  if (!id) return <p>No product found</p>; // ✅ safe conditional (after hook calls)
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load product</p>;

  return (

    <div className="flex justify-center p-4 mt-20">
      <div className="flex flex-col md:flex-row h-[70vh] gap-8 max-w-5xl w-full">
        {/* Left Column */}
        <Card className="md:w-1/2 bg-gray-100 flex justify-center items-center p-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full max-w-lg rounded-lg shadow-lg"
          />
        </Card>

        {/* Right Column */}
        <Card className="md:w-1/2 bg-gray-50 p-6 flex flex-col justify-start">
          {/* Card Header: Title */}
          <CardHeader className="p-0">
            <CardTitle className="text-2xl font-bold">{product.productName}</CardTitle>
          </CardHeader>

          {/* Description */}
          <CardDescription className="text-gray-700">
            {product.description}
          </CardDescription>
          <p className="text-m font-bold"> Price:{product.price}</p>

          {/* Size Options */}
          <div className="mt-2">
            <span className="font-semibold mr-4">Size:</span>
            <div className="flex space-x-2">
              {["XS", "S", "M", "L", "XL"].map((size) => (
                <button
                  key={size}
                  className="border border-gray-300 rounded px-3 py-1 hover:bg-gray-200 transition"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart Button */}
          <Button className=" text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition w-30">
            Add to Cart
          </Button>
        </Card>

      </div>
    </div>


  );
};



export default ProductOverview;
