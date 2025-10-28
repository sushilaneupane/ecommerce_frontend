import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "../hooks/useUser";

export default function MyProfile() {
  const { userProfile, isLoading, isError, update } = useUser();
  const [editData, setEditData] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  
  useEffect(() => {
    if (userProfile) {
      setEditData({
        firstName: userProfile.firstName || "",
        lastName: userProfile.lastName || "",
        email: userProfile.email || "",
        phone: userProfile.phone || "",
        // birthday: userProfile.birthday || "",
        // gender: userProfile.gender || "",
      });
    }
  }, [userProfile]);

 
  useEffect(() => {
    if (update.isSuccess) {
      setIsDialogOpen(false);
    }
  }, [update.isSuccess]);

  if (isLoading) return <p className="p-8">Loading profile...</p>;
  if (isError) return <p className="p-8 text-red-500">Failed to load profile.</p>;
  if (!editData) return null;

  const handleSave = () => {
    update.mutate({ id: userProfile.id, payload: editData });
  };

  const handleCancel = () => {
    setEditData({
      firstName: userProfile.firstName,
      lastName: userProfile.lastName,
      email: userProfile.email,
      phone: userProfile.phone,
      // birthday: userProfile.birthday,
      // gender: userProfile.gender,
    });
    setIsDialogOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 mt-10">
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-semibold mb-6">My Profile</h1>

        <Card className="p-6 bg-white shadow-sm">
          <CardContent className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-gray-700">
              <div>
                <p className="font-semibold text-gray-800">Full Name</p>
                <p className="mt-1">{userProfile.firstName} {userProfile.lastName}</p>
              </div>

              <div>
                <p className="font-semibold text-gray-800">Email Address</p>
                <p className="mt-1">{userProfile.email}</p>
              </div>

              <div>
                <p className="font-semibold text-gray-800">Mobile</p>
                <p className="mt-1 text-gray-500">{userProfile.phone || "Please enter your mobile"}</p>
              </div>
            </div>

            <Separator />

            {/* Edit Button with Dialog */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-6">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-2 rounded-md w-full sm:w-auto">
                    EDIT PROFILE
                  </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                  </DialogHeader>

                  <div className="space-y-4 py-2">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={editData.firstName}
                        onChange={(e) => setEditData({ ...editData, firstName: e.target.value })}
                        placeholder="Enter first name"
                      />
                    </div>

                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={editData.lastName}
                        onChange={(e) => setEditData({ ...editData, lastName: e.target.value })}
                        placeholder="Enter last name"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={editData.email}
                        onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                        placeholder="Enter email"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Mobile</Label>
                      <Input
                        id="phone"
                        value={editData.phone}
                        onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                        placeholder="Enter mobile number"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end mt-4 gap-3">
                    <Button variant="outline" onClick={handleCancel}>
                      Cancel
                    </Button>
                    <Button
                      className="bg-teal-600 hover:bg-teal-700 text-white"
                      onClick={handleSave}
                      disabled={update.isLoading}
                    >
                      {update.isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
