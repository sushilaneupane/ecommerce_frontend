import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAddress } from "../hooks/useAddress";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

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
        address: "",
    });
    const [selectedProvince, setSelectedProvince] = useState("");

    useEffect(() => {
        if (address && editMode) {
            setFormData({
                province: address.province || "",
                district: address.district || "",
                zone: address.zone || "",
                address: address.address || "",
            });
            setSelectedProvince(address.province || "");
        }
    }, [address, editMode]);

    const provincesWithDistricts = {
        Koshi: ["Bhojpur", "Dhankuta", "Ilam", "Jhapa", "Khotang", "Morang"],
        Madhesh: ["Bara", "Dhanusha", "Mahottari", "Parsa"],
        Bagmati: ["Bhaktapur", "Chitwan", "Dhading", "Kathmandu", "Lalitpur"],
        Gandaki: ["Baglung", "Gorkha", "Kaski", "Lamjung"],
        Lumbini: ["Banke", "Bardiya", "Dang", "Kapilvastu"],
        Karnali: ["Dailekh", "Dolpa", "Humla", "Jajarkot"],
        Sudurpashchim: ["Achham", "Baitadi", "Bajhang", "Kailali"],
    };

    const handleProvinceChange = (value) => {
        setSelectedProvince(value);
        setFormData((prev) => ({ ...prev, province: value, district: "" }));
    };

    const handleChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!loggedInUser?.id) {
            toast.error("User is not logged in.");
            return;
        }

        if (!formData.province || !formData.district || !formData.zone || !formData.address) {
            toast.error("Please fill all required fields.");
            return;
        }

        const payload = { ...formData, userId: loggedInUser.id };
        if (address) {
            updateAddress({ id: address.id, data: payload });
        } else {
            createAddress(payload);
        }
        setEditMode(false);
    };

    const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const itemsTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const deliveryFee = 50;
    const grandTotal = itemsTotal + deliveryFee;

    if (isLoading) return <p className="text-center py-6">Loading address...</p>;
    if (isError) return <p className="text-center text-red-500">Failed to load address.</p>;

    return (
        <div className="flex justify-center mt-20 px-4">
            <div className="grid md:grid-cols-3 gap-6 w-full max-w-6xl">
                {/* Left Column */}
                <div className="md:col-span-2 space-y-6">
                   
                    {/* Address Section */}
                    {!editMode && address ? (
                        <Card className="p-6">
                            <CardHeader className="flex justify-between items-center">
                                <CardTitle>Shipping Address</CardTitle>
                                     <div className="space-y-4">
                        {/* Sheet Section */}
                        <Sheet>
                            <SheetTrigger>Edit</SheetTrigger>
                            <SheetContent>
                                <SheetHeader>
                                    <SheetTitle>Are you absolutely sure?</SheetTitle>
                                    <SheetDescription>
                                        This action cannot be undone. This will permanently delete your account
                                        and remove your data from our servers.
                                    </SheetDescription>
                                </SheetHeader>
                            </SheetContent>
                        </Sheet>
                    </div>
                             
                            </CardHeader>
                            <CardContent>
                                <p><strong>Province:</strong> {address.province}</p>
                                <p><strong>District:</strong> {address.district}</p>
                                <p><strong>Zone:</strong> {address.zone}</p>
                                <p><strong>Address:</strong> {address.address}</p>
                            </CardContent>
                        </Card>
                    ) : (
                        <Card className="p-6">
                            <CardHeader className="flex justify-between items-center">
                                <CardTitle>{address ? "Edit Shipping Address" : "Add Shipping Address"}</CardTitle>
                                {address && (
                                    <Button
                                        variant="link"
                                        onClick={() => {
                                            clearCache();
                                            setFormData({ province: "", district: "", zone: "", address: "" });
                                            setSelectedProvince("");
                                            setEditMode(true);
                                        }}
                                    >
                                        Clear & Add New
                                    </Button>
                                )}
                            </CardHeader>
                            <CardContent>
                                <form className="space-y-4" onSubmit={handleSubmit}>
                                    <div>
                                        <Label>Province</Label>
                                        <Select value={selectedProvince} onValueChange={handleProvinceChange}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Province *" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {Object.keys(provincesWithDistricts).map((province) => (
                                                    <SelectItem key={province} value={province}>{province}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <Label>District</Label>
                                        <Select
                                            value={formData.district}
                                            onValueChange={(value) => handleChange("district", value)}
                                            disabled={!selectedProvince}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select District *" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {selectedProvince && provincesWithDistricts[selectedProvince].map((district) => (
                                                    <SelectItem key={district} value={district}>{district}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <Label>Zone</Label>
                                        <Input
                                            type="text"
                                            placeholder="Zone *"
                                            value={formData.zone}
                                            onChange={(e) => handleChange("zone", e.target.value)}
                                        />
                                    </div>

                                    <div>
                                        <Label>Address</Label>
                                        <Input
                                            type="text"
                                            placeholder="Address *"
                                            value={formData.address}
                                            onChange={(e) => handleChange("address", e.target.value)}
                                        />
                                    </div>

                                    <Button type="submit" disabled={isCreating || isUpdating}>
                                        {isCreating ? "Saving..." : isUpdating ? "Updating..." : address ? "Update Address" : "Save Address"}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    )}

                    {/* Cart Items */}
                    {cartItems.length > 0 ? (
                        cartItems.map((product) => (
                            <Card key={product.cartId || product.id} className="p-4">
                                <div className="flex items-center gap-4">
                                    <img
                                        src={
                                            product.images?.[0]
                                                ? `http://localhost:3001/uploads/${product.images[0]}`
                                                : "/image/cardimage.jpg"
                                        }
                                        alt={product.productName || "Product"}
                                        className="w-24 h-24 object-cover rounded-lg"
                                    />
                                    <div>
                                        <h5 className="font-medium">{product.productName}</h5>
                                        <p>Price: Rs. {product.price}</p>
                                        <p>Qty: {product.quantity}</p>
                                    </div>
                                </div>
                            </Card>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">Your cart is empty.</p>
                    )}
                </div>

                {/* Right Column - Order Summary */}


                {/* Order Summary Card Section */}
                <div className="space-y-4">
                    {/* Order Summary Card Section */}
                    <Card className="p-6">
                        <CardTitle>Order Summary</CardTitle>
                        <CardContent className="space-y-2">
                            <p>
                                Items Total ({totalQuantity} Item{totalQuantity > 1 ? "s" : ""}):{" "}
                                <strong>Rs. {itemsTotal}</strong>
                            </p>
                            <p>Delivery Fee: <strong>Rs. {deliveryFee}</strong></p>
                            <h4 className="text-red-600 font-bold">Total: Rs. {grandTotal}</h4>
                            <Button className="w-full" disabled={cartItems.length === 0}>
                                Proceed to Pay
                            </Button>
                        </CardContent>
                    </Card>
                </div>

            </div>


        </div>
    );
};

export default CheckoutPage;
