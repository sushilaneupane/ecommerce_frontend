import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useOrders } from "@/hooks/useOrder";
import { Link } from "react-router-dom";


export default function OrderHistory() {
  const { orders, isLoading, isError, error } = useOrders();
  const deliveryFee = 50;

  if (isLoading) return <p className="p-8">Loading...</p>;
  if (isError) return <p className="p-8 text-red-600">Error: {error.message}</p>;

  return (
    <div className="flex min-h-screen bg-gray-50 mt-20">
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-semibold mb-6">Order History</h1>

        <Card className="p-4 shadow-sm">
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="text-left p-3 font-medium border-b">Order ID</th>
                <th className="text-left p-3 font-medium border-b">Product</th>
                <th className="text-left p-3 font-medium border-b">Payment Status</th>
                <th className="text-left p-3 font-medium border-b">Order Status</th>
                <th className="text-left p-3 font-medium border-b">Shipping Cost</th>
                <th className="text-left p-3 font-medium border-b">Total Amount</th>
                <th className="text-left p-3 font-medium border-b">Date</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => {
                // Sum all product prices
                const productsTotal = order.products?.reduce(
                  (sum, product) => sum + Number(product.price || 0),
                  0
                ) || 0;

                const shipping = deliveryFee;
                const totalAmount = productsTotal + shipping;

                return (
                  <tr key={order.orderId} className="border-b hover:bg-gray-50 transition">
                    <td className="p-3 font-medium text-gray-800">{order.orderId}</td>

                    <td className="p-3 text-gray-700">
                      <div className="flex flex-wrap gap-2">
                        {order.products?.map((product, index) => (
                          <Link
                            key={index}
                            to={`/product/${product.productId || product.id}`} // Dynamic link
                            className="bg-gray-100 text-gray-800 hover:bg-gray-200 px-2 py-1 rounded-md text-sm transition-colors duration-200"
                          >
                            {product.productName}
                          </Link>
                        ))}
                      </div>
                    </td>

                    <td className="p-3">
                      <Badge
                        className={
                          order.payments?.[0]?.paymentStatus === "paid"
                            ? "bg-green-100 text-green-700"
                            : order.payments?.[0]?.paymentStatus === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                        }
                      >
                        {order.payments?.[0]?.paymentStatus || "N/A"}
                      </Badge>
                    </td>

                    <td className="p-3">
                      <Badge
                        className={
                          order.orderStatus === "Delivered"
                            ? "bg-green-100 text-green-700"
                            : order.orderStatus === "Shipped"
                              ? "bg-blue-100 text-blue-700"
                              : order.orderStatus === "Processing"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                        }
                      >
                        {order.orderStatus || "N/A"}
                      </Badge>
                    </td>

                    <td className="p-3 text-gray-800 font-semibold">
                      Rs. {shipping.toLocaleString()}
                    </td>

                    <td className="p-3 text-gray-800 font-semibold">
                      Rs. {totalAmount.toLocaleString()}
                    </td>

                    <td className="p-3 text-gray-700">
                      {order.createdAt?.slice(0, 10) || "-"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      </main>
    </div>
  );
}
