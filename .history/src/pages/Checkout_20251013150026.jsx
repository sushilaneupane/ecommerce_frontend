import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function MyProfile() {
  const userFromStorage = JSON.parse(localStorage.getItem("user")) || {
    fullName: "sus Neupane",
    email: "sus*********@gmail.com",
    birthday: "",
    gender: "",
  };

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    fullName: userFromStorage.fullName,
    email: userFromStorage.email,
    birthday: userFromStorage.birthday,
    gender: userFromStorage.gender,
    receiveEmails: true,
    mobile: "",
  });

  // handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = () => {
    // you can call API here later
    localStorage.setItem("user", JSON.stringify(formData));
    setEditMode(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 mt-10">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-6 space-y-6">
        <div>
          <h1 className="text-sm text-gray-600">
            Hello, {userFromStorage.fullName}
          </h1>
        </div>

        <div className="space-y-4">
          {/* Manage Account */}
          <div>
            <h2 className="text-base font-semibold text-teal-600">
              Manage My Account
            </h2>
            <ul className="text-sm mt-2 space-y-1 text-gray-600">
              <li className="text-teal-600 font-medium">My Profile</li>
              <li>Address Book</li>
              <li>My Payment Options</li>
            </ul>
          </div>

          {/* Orders */}
          <div>
            <h2 className="text-base font-semibold">My Orders</h2>
            <ul className="text-sm mt-2 space-y-1 text-gray-600">
              <li>My Returns</li>
              <li>My Cancellations</li>
            </ul>
          </div>

          {/* Wishlist */}
          <div>
            <h2 className="text-base font-semibold">
              My Wishlist & Followed Stores
            </h2>
          </div>

        
        </div>
      </aside>

      {/* Main Profile Section */}
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-semibold mb-6">My profile</h1>

        <Card className="p-6 bg-white shadow-sm">
          <CardContent className="space-y-8">
            {!editMode ? (
              <>
                {/* Profile Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-gray-700">
                  <div>
                    <p className="font-semibold text-gray-800">Full Name</p>
                    <p className="mt-1">{formData.fullName}</p>
                  </div>

                  <div>
                    <p className="font-semibold text-gray-800">
                      Email Address{" "}
                      <span className="text-teal-600 cursor-pointer">| Change</span>
                    </p>
                    <p className="mt-1">{formData.email}</p>
                    <div className="flex items-center mt-2">
                      <Checkbox
                        id="marketing"
                        checked={formData.receiveEmails}
                        onCheckedChange={(checked) =>
                          setFormData((prev) => ({
                            ...prev,
                            receiveEmails: checked,
                          }))
                        }
                        className="mr-2 border-orange-500 text-orange-500"
                      />
                      <label htmlFor="marketing" className="text-sm text-gray-700">
                        Receive marketing emails
                      </label>
                    </div>
                  </div>

                  <div>
                    <p className="font-semibold text-gray-800">
                      Mobile <span className="text-teal-600 cursor-pointer">| Add</span>
                    </p>
                    <p className="mt-1 text-gray-400">
                      {formData.mobile || "Please enter your mobile"}
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold text-gray-800">Birthday</p>
                    <p className="mt-1 text-gray-400">
                      {formData.birthday || "Please enter your birthday"}
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold text-gray-800">Gender</p>
                    <p className="mt-1 text-gray-400">
                      {formData.gender || "Please enter your gender"}
                    </p>
                  </div>
                </div>

                <Separator />

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-6">
                  <Button
                    onClick={() => setEditMode(true)}
                    className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-2 rounded-md w-full sm:w-auto"
                  >
                    EDIT PROFILE
                  </Button>
                  <Button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-2 rounded-md w-full sm:w-auto">
                    SET PASSWORD
                  </Button>
                </div>
              </>
            ) : (
              <>
                {/* Editable Form */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-sm">Full Name</Label>
                    <Input
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label className="text-sm">Email</Label>
                    <Input
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label className="text-sm">Mobile</Label>
                    <Input
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="Enter your mobile"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label className="text-sm">Birthday</Label>
                    <Input
                      name="birthday"
                      type="date"
                      value={formData.birthday}
                      onChange={handleChange}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label className="text-sm">Gender</Label>
                    <Input
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      placeholder="Male / Female / Other"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="flex items-center mt-4">
                  <Checkbox
                    id="marketing"
                    checked={formData.receiveEmails}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({
                        ...prev,
                        receiveEmails: checked,
                      }))
                    }
                    className="mr-2 border-orange-500 text-orange-500"
                  />
                  <label htmlFor="marketing" className="text-sm text-gray-700">
                    Receive marketing emails
                  </label>
                </div>

                <Separator />

                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-6">
                  <Button
                    onClick={handleSave}
                    className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-2 rounded-md w-full sm:w-auto"
                  >
                    SAVE CHANGES
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setEditMode(false)}
                    className="px-8 py-2 w-full sm:w-auto"
                  >
                    CANCEL
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
