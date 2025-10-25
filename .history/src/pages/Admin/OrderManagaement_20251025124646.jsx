import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import OrderTable from "../../components/OrderTable";
import OrderDialog from "../../components/OrderDialog";   

export default function  OrderManagement() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("");

  const orders = [
    { id: "ORD001", customer: "John Doe", date: "2025-10-20", amount: "$150", status: "Pending" },
    { id: "ORD002", customer: "Jane Smith", date: "2025-10-21", amount: "$220", status: "Completed" },
    { id: "ORD003", customer: "Michael Lee", date: "2025-10-22", amount: "$99", status: "Processing" },
  ];

  const filteredOrders = filterStatus ? orders.filter((o) => o.status === filterStatus) : orders;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-semibold">Order Management</h1>

      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input placeholder="Search by Order ID or Customer Name" />

          <Select onValueChange={setFilterStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Processing">Processing</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>

          <Button className="w-full md:w-auto">Add New Order</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <OrderTable orders={filteredOrders} onView={(order) => { setSelectedOrder(order); setDialogOpen(true); }} />
        </CardContent>
      </Card>

      <OrderDialog open={dialogOpen} onClose={() => setDialogOpen(false)} order={selectedOrder} />
    </div>
  );
}
