import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAddress } from "../hooks/useAddress";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
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
    isCreating,
    updateAddress,
    isUpdating,
    clearCache,
  } = useAddress(loggedInUser?.id, token);

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    province: "",
    district: "",
    zone: "",
    fullAddress: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [selectedProvince, setSelectedProvince] = useState("");

  const provincesWithDistricts = {
    Koshi: ["Bhojpur", "Dhankuta", "Ilam", "Jhapa", "Khotang", "Morang"],
    Madhesh: ["Bara", "Dhanusha", "Mahottari", "Parsa"],
    Bagmati: ["Bhaktapur", "Chitwan", "Dhading", "Kathmandu", "Lalitpur"],
    Gandaki: ["Baglung", "Gorkha", "Kaski", "Lamjung"],
    Lumbini: ["Banke", "Bardiya", "Dang", "Pyuthan", "Kapilvastu"],
    Karnali: ["Dailekh", "Dolpa", "Humla", "Jajarkot"],
    Sudurpashchim: ["Achham", "Baitadi", "Bajhang", "Kailali"],
  };

  useEffect(() => {
    if (address && !editMode) {
      setFormData({
        province: address.province || "",
        district: address.district || "",
        zone: address.zone || "",
        fullAddress: address.fullAddress || "",
        firstName: address.firstName || "",
        lastName: address.lastName || "",
        email: address.email || "",
        phone: address.phone || "",
      });
      setSelectedProvince(address.province || "");
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
    if (!loggedInUser?.id) return toast.error("User is not logged in.");
    if (
      !formData.province ||
      !formData.district ||
      !formData.zone ||
      !formData.fullAddress
    )
      return toast.error("Please fill all required fields.");

    const payload = { ...formData, userId: loggedInUser.id };
    address
      ? updateAddress({ id: address.id, payload })
      : createAddress(payload);
    setEditMode(false);
  };

  const totalQuantity = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );
  const itemsTotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const deliveryFee = 50;
  const grandTotal = itemsTotal + deliveryFee;

  if (isLoading)
    return <p className="text-center py-6">Loading address...</p>;
  if (isError)
    return (
      <p className="text-center text-red-500">Failed to load address.</p>
    );

  return (
    <div className="relative flex justify-center px-2 sm:px-4 mt-15 md:mt-20">

      <div className="grid md:grid-cols-3 gap-4 md:gap-6 w-full max-w-full">
        {/* Left Column */}
        <div className="md:col-span-2 space-y-4 md:space-y-6">
          {/* Address Section */}
          {!editMode && address ? (
            <Card className="p-4">
              <CardHeader className="flex justify-between items-center">
                <CardTitle className="text-sm md:text-base">
                  Shipping Address
                </CardTitle>
                <Button
                  variant="link"
                  onClick={() => {
                    clearCache();
                    setFormData({
                      province: "",
                      district: "",
                      zone: "",
                      fullAddress: "",
                    });
                    setSelectedProvince("");
                    setEditMode(true);
                  }}
                  className="text-xs md:text-sm"
                >
                  Add New
                </Button>
              </CardHeader>
              <CardContent className="text-sm md:text-base space-y-1">
                <p>
                  <strong>First Name:</strong> {address.firstName}
                </p>
                <p>
                  <strong>Last Name:</strong> {address.lastName}
                </p>
                <p>
                  <strong>Province:</strong> {address.province}
                </p>
                <p>
                  <strong>District:</strong> {address.district}
                </p>
                <p>
                  <strong>Zone:</strong> {address.zone}
                </p>
                <p>
                  <strong>Address:</strong> {address.fullAddress}
                </p>
                <p>
                  <strong>Email:</strong> {address.email}
                </p>
                <p>
                  <strong>Phone:</strong> {address.phone}
                </p>
              </CardContent>
            </Card>
          ) : (
            <Card className="p-4 sm:p-6">
              <CardHeader>
                <CardTitle className="text-sm md:text-base">
                  {address ? "Edit Shipping Address" : "Add Shipping Address"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                <form
                  className="space-y-3 sm:space-y-4"
                  onSubmit={handleSubmit}
                >
                  {/* Two Column Layout */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Province */}
                    <div>
                      <Label className="text-sm">Province</Label>
                      <Select
                        value={selectedProvince}
                        onValueChange={handleProvinceChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Province *" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.keys(provincesWithDistricts).map(
                            (province) => (
                              <SelectItem key={province} value={province}>
                                {province}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* District */}
                    <div>
                      <Label className="text-sm">District</Label>
                      <Select
                        value={formData.district}
                        onValueChange={(value) =>
                          handleChange("district", value)
                        }
                        disabled={!selectedProvince}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select District *" />
                        </SelectTrigger>
                        <SelectContent>
                          {selectedProvince &&
                            provincesWithDistricts[selectedProvince].map(
                              (district) => (
                                <SelectItem key={district} value={district}>
                                  {district}
                                </SelectItem>
                              )
                            )}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Zone */}
                    <div>
                      <Label className="text-sm">Zone</Label>
                      <Input
                        type="text"
                        placeholder="Zone *"
                        value={formData.zone}
                        onChange={(e) =>
                          handleChange("zone", e.target.value)
                        }
                        className="text-sm"
                      />
                    </div>

                    {/* Address */}
                    <div>
                      <Label className="text-sm">Address</Label>
                      <Input
                        type="text"
                        placeholder="Address *"
                        value={formData.fullAddress}
                        onChange={(e) =>
                          handleChange("fullAddress", e.target.value)
                        }
                        className="text-sm"
                      />
                    </div>
                  </div>

                  {/* Save Button */}
                  <Button
                    type="submit"
                    className="text-sm sm:text-base "
                    disabled={isCreating || isUpdating}
                  >
                    {isCreating
                      ? "Saving..."
                      : isUpdating
                      ? "Updating..."
                      : address
                      ? "Update Address"
                      : "Save Address"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Cart Items */}
          {cartItems.length > 0 ? (
            cartItems.map((product) => (
              <Card
                key={product.cartId || product.id}
                className="p-3 sm:p-4"
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <img
                    src={
                      product.images?.[0]
                        ? `http://localhost:3001/uploads/${product.images[0]}`
                        : "/image/cardimage.jpg"
                    }
                    alt={product.productName || "Product"}
                    className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg"
                  />
                  <div className="text-sm sm:text-base">
                    <h5 className="font-medium">{product.productName}</h5>
                    <p>Price: Rs. {product.price}</p>
                    <p>Qty: {product.quantity}</p>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <p className="text-center text-gray-500 text-sm sm:text-base">
              Your cart is empty.
            </p>
          )}
        </div>

        {/* Right Column - Order Summary */}
        <div className="space-y-3 sm:space-y-4 md:mt-20">
          <Card className="p-4 sm:p-6">
            <div className="flex flex-col">
              <CardTitle className="text-sm md:text-base mb-2 p-0">
                Order Summary
              </CardTitle>
              <CardContent className="p-0 space-y-1 sm:space-y-2">
                <p className="text-sm sm:text-base">
                  Items Total ({totalQuantity} Item
                  {totalQuantity > 1 ? "s" : ""}):{" "}
                  <strong>Rs. {itemsTotal}</strong>
                </p>
                <p className="text-sm sm:text-base">
                  Delivery Fee: <strong>Rs. {deliveryFee}</strong>
                </p>
                <h4 className="text-red-600 font-bold text-base sm:text-lg">
                  Total: Rs. {grandTotal}
                </h4>
                <Button
                  className=" text-sm sm:text-base"
                  disabled={cartItems.length === 0}
                >
                  Proceed to Pay
                </Button>
              </CardContent>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;