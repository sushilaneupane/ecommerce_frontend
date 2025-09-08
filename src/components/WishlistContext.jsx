import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
// import {wishlist, isLoading, addItem, removeItem } from "../hooks/useWishlist";

const WishlistLayout = () => {

  const wishlistItems = [
    {
      id: 1,
      productName: "Product 1",
      price: 1200,
      image: "/image/cardimage.jpg",
      wishlistId: 101,
    },
    {
      id: 2,
      productName: "Product 2",
      price: 2500,
      image: "/image/cardimage.jpg",
      wishlistId: 102,
    },
    {
      id: 3,
      productName: "Product 3",
      price: 1800,
      image: "/image/cardimage.jpg",
      wishlistId: 103,
    },
    {
      id: 4,
      productName: "Product 4",
      price: 3200,
      image: "/image/cardimage.jpg",
      wishlistId: 104,
    },
  ];

  return (
    <div className="my-10 px-4 mt-20">
      <h2 className="text-2xl font-semibold mb-6 text-center ">My Wishlist</h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {wishlistItems.map((item) => (
          <Card key={item.id} className="relative shadow-md hover:shadow-lg transition">
            <Link to={`/product/${item.id}`} className="block">
              <img
                src={item.image}
                alt={item.productName}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <CardContent className="p-4 text-center">
                <CardHeader className="p-0">
                  <CardTitle className="text-sm font-semibold text-gray-800">{item.productName}</CardTitle>
                </CardHeader>
                <p className="text-sm text-gray-600">RS {item.price}</p>
              </CardContent>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 rounded-full bg-white shadow-sm hover:bg-red-100"
            >
              <Heart className="h-4 w-4 text-red-500 fill-red-500" />
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WishlistLayout;
