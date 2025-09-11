import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "../hooks/useCart";

function ShoppingCart() {

  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const { cartItems, isLoading, isError, updateMutation, deleteMutation } =
    useCart(loggedInUser, token);

  const shippingCost = 50;
  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      navigate("/Orders", { state: { cartItems } });
    }
  };

  if (isLoading) return <p className="text-center py-6">Loading cart...</p>;
  if (isError) return <p className="text-center text-red-500">Failed to load cart.</p>;

  return (
    <div className="container mx-auto my-10 px-4 ">
      <div className="grid md:grid-cols-3 gap-6 mt-20">
        {/* Cart Items */}
        <Card className="md:col-span-2 p-4">
          <CardHeader>
            <CardTitle>Shopping Cart ({cartItems.length} Items)</CardTitle>
          </CardHeader>
          <CardContent>
            {cartItems.length === 0 ? (
              <p className="text-center text-muted">Your cart is empty.</p>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <Card key={item.id} className="p-4">
                    <div className="grid grid-cols-6 items-center gap-4">
                      <div className="col-span-1">
                        <img
                          src={
                            item.images?.[0]
                              ? `http://localhost:3001/uploads/${item.images[0]}`
                              : "/image/cardimage.jpg"
                          }
                          alt={item.productName || "Product"}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      </div>
                      <div className="col-span-2">
                        <p className="font-semibold">{item.productName}</p>
                      </div>
                      <div className="col-span-1 text-center">
                        <Input
                          type="number"
                          value={item.quantity}
                          min="1"
                          onChange={(e) =>
                            updateMutation.mutate({
                              cartItemId: item.id,
                              productId: item.productId,
                              newQuantity: parseInt(e.target.value) || 1,
                            })
                          }
                        />
                      </div>
                      <div className="col-span-1 font-bold text-right">
                        Rs. {item.price}
                      </div>
                      <div className="col-span-1 text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteMutation.mutate(item.cartId)}
                        >
                          🗑️
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card className="p-4">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between mb-2">
              <span>Subtotal ({cartItems.length} items)</span>
              <span>Rs. {calculateTotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping Fee</span>
              <span>Rs. {shippingCost.toFixed(2)}</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between font-bold mb-4">
              <span>Total</span>
              <span>Rs. {(calculateTotal() + shippingCost).toFixed(2)}</span>
            </div>
            <Button
              className="w-full"
              variant="success"
              disabled={cartItems.length === 0}
              onClick={handleCheckout}
            >
              Proceed to Checkout ({cartItems.length})
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default ShoppingCart;
