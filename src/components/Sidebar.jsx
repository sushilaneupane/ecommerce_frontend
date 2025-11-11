import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Tags, ShoppingBag, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Sidebar() {
  const location = useLocation();
  const navItems = [
    { path: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/admin/dashboard/categories", label: "Categories", icon: Tags },
    { path: "/admin/dashboard/products", label: "Products", icon: ShoppingBag },
    { path: "/admin/dashboard/orders", label: "Orders", icon: ShoppingBag },
    { path: "/admin/dashboard/payments", label: "Payments", icon: ShoppingBag },
  ];

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <aside className="w-64 bg-white border-r shadow-md p-5 flex flex-col justify-between h-screen">
      <div>
        <h2 className="text-2xl font-bold mb-8 text-blue-600">Admin Panel</h2>

        <nav className="space-y-3">
          {navItems.map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-100 transition ${location.pathname === path ? "bg-blue-200" : ""
                }`}
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </Link>
          ))}
        </nav>
      </div>


      <Button
        variant="outline"
        className="w-fit px-2 py-2 flex justify-end items-center"
        onClick={handleLogout}
      >
        <User className="w-4 h-4 ml-2" />
      </Button>

    </aside>
  );
}
