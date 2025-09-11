import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import LoginForm from "./components/LoginForm";
import Footer from "./components/Footer";
import AllProducts from "./components/AllProducts";
import NewArrival from "./components/NewArrival";
import Featured from "./components/Featured";
import Contact from "./components/Contact"; 
import RegisterForm from "./components/RegisterForm";
import AboutPage from "./components/AboutPage";
import InfoCard from "./components/InfoCard";
import ProfileCard from "./components/ProfileCard"; 
import WishlistContext from "./components/WishlistContext";
import ShoppingCart from "./components/CartContext";
import Product from "./components/ProductSingle";

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
  <Route path="/wishlist" element={<WishlistContext />} />
  <Route path="/cart" element={<ShoppingCart />} />
  <Route path="/product/:id" element={<Product />} />
</Routes>

      </main>

      <Footer />
    </>
  );
}

export default App;
