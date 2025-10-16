import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const OrderPage = () => {
  const [showPayment, setShowPayment] = useState(false);
  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    province: "",
    district: "",
    zone: "",
    fullAddress: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleProceedToPay = () => {
    setShowPayment(true);
  };

  // Example static values for demo (replace with dynamic data later)
  const cartItems = [{ id: 1, name: "Product A" }];
  const totalQuantity = 2;
  const itemsTotal = 2000;
  const deliveryFee = 150;
  const grandTotal = itemsTotal + deliveryFee;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 p-4 sm:p-8 max-w-6xl mx-auto">
      {/* ---------------- Left Column - Shipping Address ---------------- */}
      <Card className="p-4 sm:p-6">
        <CardHeader>
          <CardTitle className="text-base sm:text-lg md:text-xl">
            Shipping Address
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4">
          <div>
            <Label htmlFor="fullName" className="text-sm sm:text-base">
              Full Name
            </Label>
            <Input
              id="fullName"
              name="fullName"
              value={address.fullName}
              onChange={handleInputChange}
              placeholder="Enter full name"
              className="text-sm sm:text-base"
            />
          </div>

          <div>
            <Label htmlFor="phone" className="text-sm sm:text-base">
              Phone Number
            </Label>
            <Input
              id="phone"
              name="phone"
              value={address.phone}
              onChange={handleInputChange}
              placeholder="Enter phone number"
              className="text-sm sm:text-base"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <Label htmlFor="province" className="text-sm sm:text-base">
                Province
              </Label>
              <Input
                id="province"
                name="province"
                value={address.province}
                onChange={handleInputChange}
                placeholder="Province"
                className="text-sm sm:text-base"
              />
            </div>
            <div>
              <Label htmlFor="district" className="text-sm sm:text-base">
                District
              </Label>
              <Input
                id="district"
                name="district"
                value={address.district}
                onChange={handleInputChange}
                placeholder="District"
                className="text-sm sm:text-base"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="zone" className="text-sm sm:text-base">
              Zone
            </Label>
            <Input
              id="zone"
              name="zone"
              value={address.zone}
              onChange={handleInputChange}
              placeholder="Zone"
              className="text-sm sm:text-base"
            />
          </div>

          <div>
            <Label htmlFor="fullAddress" className="text-sm sm:text-base">
              Full Address
            </Label>
            <Input
              id="fullAddress"
              name="fullAddress"
              value={address.fullAddress}
              onChange={handleInputChange}
              placeholder="e.g. Bijuwar, Pyuthan"
              className="text-sm sm:text-base"
            />
          </div>
        </CardContent>
      </Card>

      {/* ---------------- Right Column - Order Summary ---------------- */}
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

              {/* Proceed to Pay Button */}
              <Button
                onClick={handleProceedToPay}
                className="text-sm sm:text-base mt-2"
                disabled={cartItems.length === 0}
              >
                Proceed to Pay
              </Button>

              {/* Payment Method Section (Shown after clicking Proceed to Pay) */}
              {showPayment && (
                <div className="mt-3 border-t pt-3">
                  <p className="text-sm sm:text-base font-medium">
                    Payment Method:{" "}
                    <span className="font-bold text-green-700">
                      Cash on Delivery
                    </span>
                  </p>

                  <Link to="/order">
                    <Button className="text-sm sm:text-base mt-2 w-full">
                      Confirm Order
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default OrderPage;
