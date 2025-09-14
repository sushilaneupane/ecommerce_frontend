import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "../hooks/useCart";

function ShoppingCart() {
  const navigate = useNavigate();
  const { cartItems, isLoading, isError, updateMutation, deleteMutation } = useCart();
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
    <div className="container mx-auto my-10 px-2 sm:px-4 mt-15">
      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {/* Cart Items */}
        <Card className="col-span-1 md:col-span-2 p-4 order-1 md:order-1 overflow-x-auto">
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
                    <div className="grid grid-cols-6 items-center gap-4 min-w-[600px]">
                      {/* Product Image */}
                      <div className="col-span-1 flex justify-center">
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

                      {/* Product Name */}
                      <div className="col-span-2 flex items-center">
                        <p className="font-semibold">{item.productName}</p>
                      </div>

                      {/* Quantity Input */}
                      <div className="col-span-1 flex justify-center">
                        <Input
                          type="number"
                          value={item.quantity}
                          min="1"
                          className="w-20 text-center"
                          onChange={(e) =>
                            updateMutation.mutate({
                              cartItemId: item.id,
                              productId: item.productId,
                              newQuantity: parseInt(e.target.value) || 1,
                            })
                          }
                        />
                      </div>

                      {/* Price */}
                      <div className="col-span-1 flex justify-end font-bold">
                        Rs. {item.price}
                      </div>

                      {/* Delete Button */}
                      <div className="col-span-1 flex justify-end">
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
        <Card className="col-span-1 p-4 order-2 md:order-2">
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
