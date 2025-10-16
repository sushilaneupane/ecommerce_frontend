import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAddress } from "../hooks/useAddress";
import { useOrders } from "../hooks/useOrder";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems = [] } = location.state || {};

  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("authToken");

  const {
    address,
    isLoading,
    isError,
    createAddress,
    updateAddress,
    isCreating,
    isUpdating,
  } = useAddress(loggedInUser?.id, token);

  const { createOrder } = useOrders();
  const [editMode, setEditMode] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [formData, setFormData] = useState({
    province: "",
    district: "",
    zone: "",
    address: "",
  });
  const [selectedProvince, setSelectedProvince] = useState("");

  const provincesWithDistricts = {
    Koshi: ["Bhojpur", "Dhankuta", "Ilam", "Jhapa", "Morang"],
    Madhesh: ["Bara", "Dhanusha", "Parsa"],
    Bagmati: ["Bhaktapur", "Chitwan", "Kathmandu", "Lalitpur"],
    Gandaki: ["Baglung", "Gorkha", "Kaski"],
    Lumbini: ["Dang", "Pyuthan", "Kapilvastu"],
    Karnali: ["Dailekh", "Dolpa", "Humla"],
    Sudurpashchim: ["Achham", "Bajhang", "Kailali"],
  };

  useEffect(() => {
    if (address && !editMode) {
      const normalizedProvince =
        Object.keys(provincesWithDistricts).find(
          (p) => p.toLowerCase() === address.province?.toLowerCase()
        ) || "";

      setFormData({
        province: normalizedProvince,
        district: address.district || "",
        zone: address.zone || "",
        address: address.address || "",
      });
      setSelectedProvince(normalizedProvince);
    }
  }, [address, editMode]);

  const handleProvinceChange = (value) => {
    setSelectedProvince(value);
    setFormData((prev) => ({ ...prev, province: value, district: "" }));
  };

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!loggedInUser?.id) return toast.error("User not logged in.");
    if (!formData.province || !formData.district || !formData.zone || !formData.address)
      return toast.error("Please fill all fields.");

    const payload = { ...formData, userId: loggedInUser.id };
    address ? updateAddress({ id: address.id, payload }) : createAddress(payload);
    setEditMode(false);
  };

  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const itemsTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = 50;
  const grandTotal = itemsTotal + deliveryFee;

  const handleCreateOrder = () => {
    if (!address) return toast.error("Please add your address before placing the order.");
    if (cartItems.length === 0) return toast.error("Your cart is empty.");

    createOrder.mutate(
      {
        userId: loggedInUser?.id,
        shippingCost: deliveryFee,
        totalAmount: itemsTotal,
        addressId: address?.id,
        products: cartItems.map((item) => ({
          productId: item.productId || item.id,
          quantity: item.quantity,
          price: item.price,
        })),
        transactionId: "COD-" + Date.now(),
        paymentMethod: "Cash on Delivery",
      },
      {
        onSuccess: () => {
          toast.success("Order placed successfully!");
          navigate("/");
        },
        onError: (error) => {
          toast.error(
            error?.response?.data?.message || "Failed to place order. Try again."
          );
        },
      }
    );
  };

  if (isLoading) return <p className="text-center py-6">Loading address...</p>;
  if (isError) return <p className="text-center text-red-500">Failed to load address.</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 flex justify-center mt-15">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full max-w-7xl">
        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-6">
          {/* Address Section */}
          {!editMode && address ? (
            <Card className="p-5">
              <CardHeader className="flex justify-between items-center p-0 mb-3">
                <CardTitle className="text-lg font-semibold">
                  Shipping Address
                </CardTitle>
                <Button variant="link" onClick={() => setEditMode(true)}>
                  Edit
                </Button>
              </CardHeader>
              <CardContent className="text-sm space-y-1">
                <p><strong>Name:</strong> {address.firstName} {address.lastName}</p>
                <p><strong>Phone:</strong> {address.phone}</p>
                

                <p><strong>Province:</strong> {address.province}</p>
                <p><strong>District:</strong> {address.district}</p>
                <p><strong>Zone:</strong> {address.zone}</p>
                <p><strong>Address:</strong> {address.address}</p>
              </CardContent>
            </Card>
          ) : (
            <Card className="p-5">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  {address ? "Edit Address" : "Add Address"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Province */}
                    <div>
                      <Label>Province</Label>
                      <Select value={selectedProvince} onValueChange={handleProvinceChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Province" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.keys(provincesWithDistricts).map((province) => (
                            <SelectItem key={province} value={province}>
                              {province}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* District */}
                    <div>
                      <Label>District</Label>
                      <Select
                        value={formData.district}
                        onValueChange={(value) => handleChange("district", value)}
                        disabled={!selectedProvince}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select District" />
                        </SelectTrigger>
                        <SelectContent>
                          {provincesWithDistricts[selectedProvince]?.map((district) => (
                            <SelectItem key={district} value={district}>
                              {district}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Zone */}
                    <div>
                      <Label>Zone</Label>
                      <Input
                        value={formData.zone}
                        onChange={(e) => handleChange("zone", e.target.value)}
                        placeholder="Zone"
                      />
                    </div>

                    {/* Address */}
                    <div>
                      <Label>Full Address</Label>
                      <Input
                        value={formData.address}
                        onChange={(e) => handleChange("address", e.target.value)}
                        placeholder="Full Address"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      type="submit"
                      disabled={isCreating || isUpdating}
                      className="flex-1"
                    >
                      {isCreating || isUpdating
                        ? "Saving..."
                        : address
                        ? "Update Address"
                        : "Save Address"}
                    </Button>
                    {address && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setEditMode(false)}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Cart Items */}
          <Card className="p-5">
            <CardHeader className="p-0 mb-3">
              <CardTitle className="text-lg font-semibold">Your Items</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {cartItems.length > 0 ? (
                cartItems.map((product) => (
                  <div
                    key={product.id}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b last:border-0 pb-3 gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          product.images?.[0]
                            ? `http://localhost:3001/uploads/${product.images[0]}`
                            : "/image/cardimage.jpg"
                        }
                        alt={product.productName}
                        className="w-20 h-20 object-cover rounded-md border"
                      />
                      <div>
                        <p className="font-medium text-sm">{product.productName}</p>
                        <p className="text-gray-500 text-xs">
                          Qty: {product.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="font-semibold text-sm sm:text-base text-right sm:text-left">
                      Rs. {product.price}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center">Your cart is empty.</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">
          <Card className="p-5 sticky top-20">
            <CardTitle className="text-lg mb-3">Order Summary</CardTitle>
            <CardContent className="space-y-2">
              <p>
                Items ({totalQuantity}): <strong>Rs. {itemsTotal}</strong>
              </p>
              <p>
                Delivery Fee: <strong>Rs. {deliveryFee}</strong>
              </p>
              <h4 className="text-red-600 font-bold text-lg">
                Total: Rs. {grandTotal}
              </h4>

              {!showPayment ? (
                <Button
                  onClick={() => setShowPayment(true)}
                  disabled={cartItems.length === 0}
                  className="w-full mt-4"
                >
                  Proceed to Pay
                </Button>
              ) : (
                <div className="mt-4 space-y-4">
                  <div className="flex items-center gap-2">
                    <input type="radio" id="cod" name="paymentMethod" defaultChecked />
                    <Label htmlFor="cod">Cash on Delivery (COD)</Label>
                  </div>
                  <p className="text-gray-600 text-sm">
                    You can pay for your order when it’s delivered.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button variant="outline" onClick={() => setShowPayment(false)} className="flex-1">
                      Back
                    </Button>
                    <Button
                      className="flex-1"
                      onClick={handleCreateOrder}
                      disabled={createOrder.isPending}
                    >
                      {createOrder.isPending ? "Placing Order..." : "Confirm Order"}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
