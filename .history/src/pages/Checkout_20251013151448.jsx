import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAddress } from "../hooks/useAddress";
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

  if (isLoading) return <p className="text-center py-6">Loading address...</p>;
  if (isError) return <p className="text-center text-red-500">Failed to load address.</p>;

  return (
    <div className="min-h-screen flex justify-center bg-gray-50 py-10 px-4">
      <div className="grid md:grid-cols-3 gap-6 w-full max-w-6xl">
        {/* LEFT SIDE */}
        <div className="md:col-span-2 space-y-6">
          {/* Shipping Address */}
          {!editMode && address ? (
            <Card className="p-5">
              <CardHeader className="flex justify-between items-center p-0 mb-2">
                <CardTitle className="text-lg font-semibold">Shipping Address</CardTitle>
                <Button variant="link" onClick={() => setEditMode(true)}>
                  Edit
                </Button>
              </CardHeader>
              <CardContent className="text-sm space-y-1">
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                  <div className="flex gap-3">
                    <Button type="submit" disabled={isCreating || isUpdating}>
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
          <div className="space-y-3">
            {cartItems.length > 0 ? (
              cartItems.map((product) => (
                <Card key={product.id} className="p-4 flex items-center gap-4">
                  <img
                    src={
                      product.images?.[0]
                        ? `http://localhost:3001/uploads/${product.images[0]}`
                        : "/image/cardimage.jpg"
                    }
                    alt={product.productName}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <h5 className="font-medium">{product.productName}</h5>
                    <p>Price: Rs. {product.price}</p>
                    <p>Qty: {product.quantity}</p>
                  </div>
                </Card>
              ))
            ) : (
              <p className="text-gray-500 text-center">Your cart is empty.</p>
            )}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6 md:mt-10">
          <Card className="p-5">
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
                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setShowPayment(false)}>
                      Back
                    </Button>
                    <Button
                      className="flex-1"
                      onClick={() => toast.success("Order Confirmed Successfully!")}
                    >
                      Confirm Order
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
