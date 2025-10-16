import React from "react";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import ProtectedRoute from "./middleware/ProtectedRoute";

import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";

// User pages
import Hero from "./Pages/Hero";
import LoginForm from "./pages/LoginForm";
import AllProducts from "./pages/AllProducts";
import NewArrival from "./pages/NewArrival";
import Contact from "./pages/Contact";
import RegisterForm from "./pages/RegisterForm";
import AboutPage from "./pages/About";
import InfoCard from "./components/InfoCard";
import ProfileCard from "./components/ProfileCard";
import Wishlist from "./pages/Wishlist";
import ShoppingCart from "./pages/Cart";
import Product from "./pages/ProductOverview";
import Featured from "./pages/Featured";
import CheckoutPage from "./pages/Checkout";
import MyOrders from "./pages/MyOrder";
import MyProfile from "./pages/MyProfile";
i


// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import CategoryManagement from "./pages/admin/CategoryManagement";

function App() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* 🌐 MAIN WEBSITE ROUTES */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/newarrival" element={<NewArrival />} />
        <Route path="/featured" element={<Featured />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/order" element={<CheckoutPage />} />
        <Route path="/myorders" element={<MyOrders />} />
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/infocard" element={<InfoCard />} />
        <Route path="/profilecard" element={<ProfileCard />} />
      </Route>

      {/* 🧑‍💼 ADMIN DASHBOARD ROUTES */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="categories" element={<CategoryManagement />} />
        <Route path="products" element={<ProductTable />} />
      </Route>
    </Routes>
  );
}

export default App;
