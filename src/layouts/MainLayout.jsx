import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Toaster } from "sonner";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <>
      <NavBar />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
      <Toaster richColors position="top-right" />
    </>
  );
}
