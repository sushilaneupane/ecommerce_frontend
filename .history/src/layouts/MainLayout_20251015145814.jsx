import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Toaster } from "sonner";

export default function MainLayout({ children }) {
  return (
    <>
      <NavBar />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <Toaster richColors position="top-right" />
    </>
  );
}
