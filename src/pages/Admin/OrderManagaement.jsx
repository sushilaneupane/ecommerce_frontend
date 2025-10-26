import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import OrderTable from "../../components/OrderTable";
import OrderDialog from "../../components/OrderDialog";
import { useOrders } from "../../hooks/useOrder";


export default function OrderManagement() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("");

  const { allOrders = [], isErrorAll, isLoadingAll, errorAll, update } = useOrders();

  const filteredOrders = filterStatus
    ? allOrders.filter((order) => order.orderStatus === filterStatus)
    : allOrders;

  const handleUpdate = (orderId, newStatus) => {
    update({ orderId, orderStatus: newStatus });
    setDialogOpen(false);
  };

  if (isLoadingAll) return <div className="p-6">Loading orders...</div>;
  if (isErrorAll) return <div className="p-6 text-red-500">Error loading orders: {errorAll.message}</div>;

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
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <OrderTable
            orders={filteredOrders}
            onView={(order) => {
              setSelectedOrder(order);
              setDialogOpen(true);
            }}
          />
        </CardContent>
      </Card>

      {selectedOrder && (
        <OrderDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          order={selectedOrder}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}
