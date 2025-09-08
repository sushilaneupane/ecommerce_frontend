import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Link } from "react-router-dom";

const CartPage = () => {
  const cartItems = [
    { id: 1, name: "Product 1", price: 1200, quantity: 1, image: "/image/cardimage.jpg" },
    { id: 2, name: "Product 2", price: 2500, quantity: 2, image: "/image/cardimage.jpg" },
    { id: 3, name: "Product 3", price: 1800, quantity: 1, image: "/image/cardimage.jpg" },
  ];

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="my-10 px-4 mt-20">
      <h2 className="text-2xl font-semibold mb-6 text-center">My Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cartItems.map((item) => (
            <Card key={item.id} className="relative shadow-md hover:shadow-lg transition">
              <Link to={`/product/${item.id}`} className="block">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <CardContent className="p-4 text-center">
                  <CardHeader className="p-0">
                    <CardTitle className="text-sm font-semibold text-gray-800">{item.name}</CardTitle>
                  </CardHeader>
                  <p className="text-sm text-gray-600">RS {item.price}</p>
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                </CardContent>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 rounded-full bg-white shadow-sm hover:bg-red-100"
              >
                <Trash className="h-4 w-4 text-red-500" />
              </Button>
            </Card>
          ))}

          <div className="col-span-full mt-4 flex justify-end items-center gap-4">
            <p className="text-lg font-semibold">Total: RS {totalPrice}</p>
            <Button className="bg-blue-600 text-white hover:bg-blue-700">Checkout</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
