import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProductById } from "../hooks/useProducts";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/context/AuthContext";

const ProductOverview = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: product, isLoading, isError } = useProductById(id);
  const { create } = useCart();

 
  const [selectedImage, setSelectedImage] = useState("/image/cardimage.jpg");

 
  useEffect(() => {
    if (product?.images && product.images.length > 0) {
      setSelectedImage(`http://localhost:3001/uploads/${product.images[0]}`);
    }
  }, [product]);

  const handleAddToCart = async () => {
    try {
      if (!isAuthenticated) {
        navigate("/login");
        return;
      }

      await create.mutateAsync({ productId: product.id });
      console.log(" Added to cart:", product.id);
      navigate("/cart");
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  if (!id) return <p className="text-center mt-10">No product found</p>;
  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (isError) return <p className="text-center mt-10">Failed to load product</p>;

  return (
    <div className="flex justify-center p-5 mt-10">
      <div className="flex flex-col lg:flex-row lg:gap-1 max-w-6xl w-full ">
     
        <Card className="lg:w-1/2 flex flex-col justify-center items-center mt-0">
         
          <div className="w-full h-64 sm:h-80 md:h-[60vh] lg:h-[70vh] mt-0 overflow-auto">
            <img
              src={selectedImage}
              alt={product.productName || "Product"}
              className="w-full object-contain rounded-lg shadow-lg bg-red-500"
            />
          </div>

       
          <div className="flex gap-2 overflow-x-auto">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={`http://localhost:3001/uploads/${img}`}
                alt={`${product.productName} ${index + 1}`}
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover cursor-pointer border-2 ${selectedImage === `http://localhost:3001/uploads/${img}`
                  ? "border-blue-500"
                  : "border-transparent"
                  }`}
                onClick={() => setSelectedImage(`http://localhost:3001/uploads/${img}`)}
              />
            ))}
          </div>
        </Card>

  
        <Card className="lg:w-1/2 bg-gray-50 p-4 sm:p-6 flex flex-col justify-start">
          <CardHeader className="p-0 mb-2">
            <CardTitle className="text-xl sm:text-2xl font-bold">
              {product.productName}
            </CardTitle>
          </CardHeader>

          <CardDescription className="text-gray-700 mb-4 text-sm sm:text-base">
            {product.description}
          </CardDescription>

          <p className="text-lg sm:text-xl font-bold mb-4">
            Price: ${product.price}
          </p>

       
          <div className="mb-6">
            <span className="font-semibold mr-4 text-sm sm:text-base">Size:</span>
            <div className="flex flex-wrap gap-2">
              {["XS", "S", "M", "L", "XL"].map((size) => (
                <button
                  key={size}
                  className="border border-gray-300 rounded px-3 py-1 text-sm sm:text-base hover:bg-gray-200 transition"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

       
          <Button
            onClick={handleAddToCart}
            variant="ghost"
            className="px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-blue-700 transition w-full sm:w-40 bg-gray-800 text-white text-sm sm:text-base"
          >
            Add to Cart
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default ProductOverview;
