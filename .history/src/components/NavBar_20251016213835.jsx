import React, { useState, useEffect } from "react";
import { Menu, X, ShoppingCart, Heart, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from ",/useCart/useCart";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { productCart } = useCart();
  const navigate = useNavigate();

  // Close account dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".account-dropdown")) {
        setIsAccountOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsAccountOpen(false);
    setIsOpen(false); // close mobile menu if open
  };

  const handleLinkClick = () => {
    setIsAccountOpen(false);
    setIsOpen(false); // close mobile menu when link clicked
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md px-4 py-3 z-50">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold text-gray-800">
          <Link to="/" onClick={handleLinkClick}>Pahiran</Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 flex-1 justify-end">
          <NavigationMenu>
            <NavigationMenuList className="flex space-x-8 items-center">
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

              { isAuthenticated && productCart.length > 0 &&
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link to="/cart" className="flex items-center gap-1">
                      <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-blue-600" />
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
           
             
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link to="/wishlist" className="flex items-center gap-1">
                      <Heart className="h-6 w-6 text-gray-700 hover:text-red-600" />
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
               }


              {/* Account Dropdown */}
              {isAuthenticated ? (
                <div className="relative account-dropdown">
                  <Button
                    onClick={() => setIsAccountOpen((prev) => !prev)}
                    className="flex items-center gap-2 font-medium bg-white text-gray-800 hover:bg-gray-100"
                  >
                    {user?.name ? user.name.toUpperCase() : "ACCOUNT"}
                    <User className="h-5 w-5" />
                  </Button>

                  {isAccountOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg py-2 z-50">
                      <Link
                        to="/myprofile"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={handleLinkClick}
                      >
                        Manage My Account
                      </Link>
                      <Link
                        to="/myorders"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={handleLinkClick}
                      >
                        My Orders
                      </Link>
                      <Link
                        to="/wishlist"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={handleLinkClick}
                      >
                        My Wishlist & Followed Stores
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                      >
                        Log out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <NavigationMenuLink asChild>
                  <Link to="/login">Login</Link>
                </NavigationMenuLink>
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            className="p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-3 space-y-4 px-4 pb-4 border-t pt-4">
          <div className="flex flex-col space-y-3">
            <Link to="/products" className="text-gray-700" onClick={handleLinkClick}>
              Products
            </Link>
            <Link to="/about" className="text-gray-700" onClick={handleLinkClick}>
              About
            </Link>
            <Link to="/contact" className="text-gray-700" onClick={handleLinkClick}>
              Contact
            </Link>
            <Link to="/cart" className="flex items-center gap-2 text-gray-700" onClick={handleLinkClick}>
              <ShoppingCart className="h-6 w-6" />
            </Link>
            <Link to="/wishlist" className="flex items-center gap-2 text-gray-700" onClick={handleLinkClick}>
              <Heart className="h-6 w-6" />
            </Link>

            {/* Mobile Account Dropdown */}
            {isAuthenticated ? (
              <div className="relative account-dropdown">
                <button
                  onClick={() => setIsAccountOpen((prev) => !prev)}
                  className="flex items-center gap-2 font-medium text-gray-800 hover:bg-gray-100 px-2 py-1 rounded"
                >
                  {user?.name ? user.name.toUpperCase() : "ACCOUNT"}
                  <User className="h-5 w-5" />
                </button>
                {isAccountOpen && (
                  <div className="mt-2 w-full bg-white border rounded-lg shadow-lg py-2 z-50 flex flex-col">
                    <Link
                      to="/myprofile"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={handleLinkClick}
                    >
                      Manage My Account
                    </Link>
                    <Link
                      to="/myorders"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={handleLinkClick}
                    >
                      My Orders
                    </Link>
                    <Link
                      to="/wishlist"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={handleLinkClick}
                    >
                      My Wishlist & Followed Stores
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                    >
                      Log out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="text-gray-700 hover:underline"
                onClick={handleLinkClick}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
