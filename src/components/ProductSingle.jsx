import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProductById } from "../hooks/useProducts";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/context/AuthContext";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {toast } from "sonner";

const ProductOverview = () => {
  const { loggedInUser, token, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: product, isLoading, isError } = useProductById(id);
  const { create } = useCart(loggedInUser, token);
  const [selectedImage, setSelectedImage] = useState("/image/cardimage.jpg");
   const [formData, setFormData] = useState({
        quantity: "1",
    });

  useEffect(() => {
    if (product?.images && product.images.length > 0) {
      setSelectedImage(`http://localhost:3001/uploads/${product.images[0]}`);
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = {
        ...formData,
        productId: product.id,
      };

      await create.mutateAsync(data);
       toast.success("product added successfully!");
      navigate("/cart");
    } catch (error) {
      toast.error( error?.response?.data)
      console.log(error);
    }
  };

  if (!id) return <p className="text-center mt-10">No product found</p>;
  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (isError) return <p className="text-center mt-10">Failed to load product</p>;

  return (
    <div className="flex justify-center p-5 mt-15">
      <div className="flex flex-col lg:flex-row lg:gap-1 max-w-6xl w-full">

        <Card className="lg:w-1/2 flex flex-col justify-center items-center">
          <div className="w-full h-64 sm:h-80 md:h-[60vh] lg:h-[70vh] overflow-y-auto">
            <img
              src={selectedImage}
              alt={product.productName || "Product"}
              className="w-full object-contain rounded-lg shadow-lg"
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
          <CardHeader className="p-0">
            <CardTitle className="text-xl sm:text-2xl font-bold">
              {product.productName}
            </CardTitle>
          </CardHeader>

          <CardDescription className="text-gray-700 mb-4 text-sm sm:text-base">
            {product.description}
          </CardDescription>

          <p className="text-lg sm:text-xl font-bold ">
            Price: Rs: {product.price}
          </p>
          <form onSubmit={handleSubmit} className="space-y-4 w-1/4">
            <div className="flex flex-col">
              <Label  htmlFor="quantity"className="font-bold mb-3">Quantity:</Label>
              <Input
                id="quantity"
                name="quantity"
                type="number"
                min={1}
                value={formData.quantity}
                defaultValue={1}
                onChange={handleChange}
              />
            </div>
             <Button
          
            className="px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-blue-700 transition w-full sm:w-40 bg-gray-800 text-white"
          >
            Add to Cart
          </Button>
          </form>
         
           <div>
                        <h5 className="text-lg sm:text-xl font-bold mb-4">Return and Refund Policy</h5>
                        <p>
                           Returns accepted within 14 days in original condition. Refunds processed after inspection. For damaged or defective items, contact us for a full refund or replacement.
                        </p>
                    </div>
        </Card>
        
      </div>
    </div>
  );
};

export default ProductOverview;
