import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Box, DollarSign, ShoppingCart, Tag } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useProducts } from "../../hooks/useProducts";
import { useOrders } from "../../hooks/useOrder";

export default function Dashboard() {
  const { totalProductCount, isTotalLoading: isTotalProductsLoading } = useProducts();

  const { totalOrderCount, isTotalLoading: isTotalOrdersLoading } = useOrders();

  console.log("Total Orders in Dashboard:", totalProductCount);

  const salesData = [
    { month: "Jan", sales: 400 },
    { month: "Feb", sales: 300 },
    { month: "Mar", sales: 500 },
    { month: "Apr", sales: 700 },
    { month: "May", sales: 600 },
    { month: "Jun", sales: 800 },
  ];

  return (
    <div className="space-y-6 p-4">
      <h3 className="text-xl font-semibold">Admin Dashboard Overview</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
          <CardContent className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Total Products</p>
              <p className="text-2xl font-bold mt-1">
                {isTotalProductsLoading ? "Loading..." : totalProductCount?.totalProducts || 0 }
              </p>
            </div>
            <div className="p-3 bg-white/20 rounded-full">
              <Box size={24} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-teal-500 text-white">
          <CardContent className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Monthly Sales</p>
              <p className="text-2xl font-bold mt-1">$12,000</p>
            </div>
            <div className="p-3 bg-white/20 rounded-full">
              <DollarSign size={24} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
          <CardContent className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Orders</p>
              <p className="text-2xl font-bold mt-1">
                {isTotalOrdersLoading ? "Loading..." : totalOrderCount?.totalOrders || 0}
              </p>
            </div>
            <div className="p-3 bg-white/20 rounded-full">
              <ShoppingCart size={24} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-pink-500 to-rose-500 text-white">
          <CardContent className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Revenue</p>
              <p className="text-2xl font-bold mt-1">$45,000</p>
            </div>
            <div className="p-3 bg-white/20 rounded-full">
              <Tag size={24} />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Sales</CardTitle>
        </CardHeader>
        <CardContent style={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={salesData}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#7c3aed" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
