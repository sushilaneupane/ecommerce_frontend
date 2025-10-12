import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function OrderHistory() {
  // Dummy data for example
  const orders = [
    {
      id: "ORD-1001",
      product: "Wireless Headphones",
      totalAmount: 3200,
      paymentStatus: "Paid",
      orderStatus: "Delivered",
      date: "2025-10-05",
    },
    {
      id: "ORD-1002",
      product: "Bluetooth Speaker",
      totalAmount: 2100,
      paymentStatus: "Pending",
      orderStatus: "Processing",
      date: "2025-10-08",
    },
    {
      id: "ORD-1003",
      product: "Smartwatch",
      totalAmount: 5600,
      paymentStatus: "Paid",
      orderStatus: "Shipped",
      date: "2025-10-09",
    },
    {
      id: "ORD-1004",
      product: "Gaming Mouse",
      totalAmount: 1800,
      paymentStatus: "Failed",
      orderStatus: "Cancelled",
      date: "2025-10-10",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 mt-20">
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-semibold mb-6">Order History</h1>

        <Card className="p-4 shadow-sm">
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="text-left p-3 font-medium border-b">Order ID</th>
                <th className="text-left p-3 font-medium border-b">
                  Product
                </th>
                <th className="text-left p-3 font-medium border-b">
                  Payment Status
                </th>
                <th className="text-left p-3 font-medium border-b">
                  Order Status
                </th>
                <th className="text-left p-3 font-medium border-b">Total</th>
                <th className="text-left p-3 font-medium border-b">Date</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-3 font-medium text-gray-800">{order.id}</td>
                  <td className="p-3 text-gray-700">{order.product}</td>

                  <td className="p-3">
                    <Badge
                      className={`${
                        order.paymentStatus === "Paid"
                          ? "bg-green-100 text-green-700"
                          : order.paymentStatus === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {order.paymentStatus}
                    </Badge>
                  </td>

                  <td className="p-3">
                    <Badge
                      className={`${
                        order.orderStatus === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : order.orderStatus === "Shipped"
                          ? "bg-blue-100 text-blue-700"
                          : order.orderStatus === "Processing"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {order.orderStatus}
                    </Badge>
                  </td>

                  <td className="p-3 text-gray-800 font-semibold">
                    Rs. {order.totalAmount.toLocaleString()}
                  </td>
                  <td className="p-3 text-gray-600">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </main>
    </div>
  );
}
