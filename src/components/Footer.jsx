import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between gap-8">
          {/* About */}
          <Card className="bg-gray-800 md:w-1/3 shadow-none border-0 w-full">
            <CardHeader>
              <CardTitle className="text-xl text-white">Pahiran</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Welcome to our e-commerce platform where you can find the best products at unbeatable prices.
                Start your shopping journey with us today!
              </p>
            </CardContent>
          </Card>

          {/* Quick Links */}
          <Card className="bg-gray-800 md:w-1/3 shadow-none border-0 w-full">
            <CardHeader>
              <CardTitle className="text-xl text-white">Quick Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link to="/" className="text-gray-300 hover:text-blue-400 block">
                Home
              </Link>
              <Link to="/about" className="text-gray-300 hover:text-blue-400 block">
                About
              </Link>
              <Link to="/products" className="text-gray-300 hover:text-blue-400 block">
                All Products
              </Link>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="bg-gray-800 md:w-1/3 shadow-none border-0 w-full">
            <CardHeader>
              <CardTitle className="text-xl text-white">Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <p className="text-gray-300">Email: support@pahiran.com</p>
              <p className="text-gray-300">Phone: 9863476766</p>
            </CardContent>
          </Card>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Pahiran. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
