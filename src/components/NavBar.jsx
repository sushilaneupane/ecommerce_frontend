import React, { useState } from "react";
import { Search, Menu, X, ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { useAuth } from "@/context/AuthContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md px-4 py-3 z-50">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold text-gray-800">
          <Link to="/">Pahiran</Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 flex-1 justify-end">
          <NavigationMenu>
            <NavigationMenuList className="flex space-x-8">
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/products">Products</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/about">About</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/contact">Contact</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                {isAuthenticated ? (
                  <button
                    onClick={handleLogout}
                    className="text-red-600 hover:underline"
                  >
                    Logout
                  </button>
                ) : (
                  <NavigationMenuLink asChild>
                    <Link to="/login">Login</Link>
                  </NavigationMenuLink>
                )}
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Icons */}
          <div className="flex items-center gap-4 ml-4">
            <Link to="/cart">
              <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-blue-600 cursor-pointer" />
            </Link>

            <Link to="/wishlist">
              <Heart className="h-6 w-6 text-gray-700 hover:text-red-600 cursor-pointer" />
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="flex items-center gap-4 md:hidden">
          <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-blue-600 cursor-pointer" />
          <Heart className="h-6 w-6 text-gray-700 hover:text-red-600 cursor-pointer" />

          {isAuthenticated ? (
            <button onClick={handleLogout} className="text-red-600">
              Logout
            </button>
          ) : (
            <Link to="/login" className="text-gray-700">
              Login
            </Link>
          )}

          <button
            className="p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden mt-3 space-y-4 px-4 pb-4 border-t pt-4">
          <div className="flex items-center space-x-2">
            <Input type="text" placeholder="Search..." className="w-full" />
            <Button type="submit">
              <Search className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex flex-col space-y-3">
            <Link to="/products" className="text-gray-700">Products</Link>
            <Link to="/about" className="text-gray-700">About</Link>
            <Link to="/contact" className="text-gray-700">Contact</Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
