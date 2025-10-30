import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";

export default function OrderTable({ orders = [], onView }) {
  const [query, setQuery] = useState("");

  const filtered = orders.filter(
    (o) =>
      o.id?.toString().includes(query.toLowerCase()) ||
      o.firstName?.toLowerCase().includes(query.toLowerCase()) ||
      o.lastName?.toLowerCase().includes(query.toLowerCase()) ||
      o.orderStatus?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Card className="w-full">
      {/* HEADER */}
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-o gap-4">
        <CardTitle>Orders List</CardTitle>

      </CardHeader>

      {/* TABLE */}
      <CardContent>
        <div className="max-h-[550px] overflow-y-auto">
          <Table className="min-w-full table-auto">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Order ID</TableHead>
                <TableHead className="w-[100px]">User Name</TableHead>
                <TableHead className="w-[140px]">Date</TableHead>
                <TableHead className="w-[120px]">Amount</TableHead>
                <TableHead className="w-[120px]">Status</TableHead>
                <TableHead className="w-[100px] text-right">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                    No orders found.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.firstName} {order.lastName}</TableCell>
                    <TableCell>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>Rs. {Number(order.totalAmount).toFixed(2)}</TableCell>
                    <TableCell className="capitalize">
                      {order.orderStatus || "—"}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="outline" onClick={() => onView(order)}>
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
