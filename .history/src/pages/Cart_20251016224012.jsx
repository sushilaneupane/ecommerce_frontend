import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "../hooks/useCart";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";


function ShoppingCart() {
  const navigate = useNavigate();
  const { cartItems, isLoading, isError, remove, update } = useCart();
  const shippingCost = 50;
  const [loadingId, setLoadingId] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  // ✅ Remove cart item
  const handleRemove = (cartId) => {
    setLoadingId(cartId);
    remove.mutate(
      { id: cartId },
      {
        onSuccess: () => {
          setLoadingId(null);
          toast.success("Item removed from cart!");
        },
        onError: () => {
          setLoadingId(null);
          toast.error("Failed to remove item");
        },
      }
    );
  };



  const handleUpdateCart = (cartItemId, newQuantity, userId, productId) => {
    if (newQuantity < 1) return;
    setUpdatingId(cartItemId);

    console.log({ cartItemId, newQuantity, userId, productId }, "Updating cart...");

    update.mutate(
      {
        id: cartItemId,
        cartData: {
          quantity: newQuantity,
          userId,
          productId,
        },
      },
      {
        onSuccess: () => {
          setUpdatingId(null);
          toast.success("Cart updated successfully");
        },
        onError: () => {
          setUpdatingId(null);
          toast.error("Failed to update cart");
        },
      }
    );
  };


  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      navigate("/Orders", { state: { cartItems } });
      toast.success("Order added successfully!");
    }
  };

  if (isLoading) return <p className="text-center py-6">Loading cart...</p>;
  if (isError) return <p className="text-center text-red-500">Failed to load cart.</p>;

  return (
    <div className="container mx-auto my-10 px-2 sm:px-4 mt-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">

        {/* Cart Items */}
        <Card className="col-span-1 md:col-span-2 p-4 overflow-x-auto">

          <CardHeader>
            <CardTitle>Shopping Cart ({cartItems.length} Items)</CardTitle>
          </CardHeader>
          <CardContent>
            {cartItems.length === 0 ? (
              <p className="text-center text-muted">Your cart is empty.</p>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <Card key={item.cartId || item.id} className="p-4">
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
                      </Link
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
                            handleUpdateCart(
                              item.cartId,
                              parseInt(e.target.value) || 1,
                              item.userId,
                              item.productId
                            )}
                        />
                      </div>

                      {/* Price */}
                      <div className="col-span-1 flex justify-end font-bold">
                        Rs. {item.price}
                      </div>

                      {/* Remove Button */}
                      <div className="col-span-1 flex justify-end">
                        <Button
                          disabled={loadingId === item.cartId || updatingId === item.cartId}
                          onClick={() => handleRemove(item.cartId)}
                          className="bg-red-500 text-white px-3 py-1 rounded flex items-center justify-center"
                        >
                          {loadingId === item.cartId
                            ? "Removing..."
                            : updatingId === item.cartId
                              ? "Updating..."
                              : <Trash2 className="w-4 h-4" />}
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
        <Card className="col-span-1 p-4 mt-10">
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


            <Link
              to="/order"
              state={{ cartItems }}
            >
              <Button
                variant="default"
                className="bg-gray-800  text-white text-sm sm:text-base mt-2 sm:mt-0 w-full sm:w-auto"
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout ({cartItems.length})
              </Button>
            </Link>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default ShoppingCart;
