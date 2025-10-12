import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import NavBar from "./components/NavBar";
import Hero from "./Pages/Hero";
import LoginForm from "./pages/LoginForm";
import Footer from "./components/Footer";
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
import CheckoutPage from "./pages/Order";
import MyOrders from "./pages/MyOrder";
import MyProfile from "./pages/MyProfile";



function App() {
  return (
    <>
      <NavBar />

      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/newarrival" element={<NewArrival />} />
          <Route path="/featured" element={<Featured />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/infocard" element={<InfoCard />} />
          <Route path="/profilecard" element={<ProfileCard />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/order" element={<CheckoutPage/>}/>
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/myprofile" element={<MyProfile />} />
         
        </Routes>
      </main>

      <Footer />

      <Toaster richColors position="top-right" />
    </>
  );
}

export default App;
