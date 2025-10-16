import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Toaster } from "sonner";
import { Outlet } from "react-router-dom"; // ✅ import Outlet

export default function MainLayout() {
  return (
    <>
      <NavBar />
      <main className="min-h-screen">
        <Outlet /> {/* ✅ Nested routes will render here */}
      </main>
      <Footer />
      <Toaster richColors position="top-right" />
    </>
  );
}
