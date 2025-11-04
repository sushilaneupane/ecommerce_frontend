import React, { useState } from "react";
import OrderTable from "../../components/OrderTable";
import OrderDialog from "../../components/OrderDialog";
import { useOrders } from "../../hooks/useOrder";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function OrderManagement() {
  const { allOrders = [], isLoadingAll, isErrorAll, errorAll, update } = useOrders();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOrders = allOrders.filter((order) => {
    const statusMatch = filterStatus ? order.orderStatus === filterStatus : true;
    const searchMatch =
      order.id.toString().includes(searchQuery.toLowerCase()) ||
      order.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.lastName.toLowerCase().includes(searchQuery.toLowerCase());
    return statusMatch && searchMatch;
  });

  const handleUpdate = (orderId, newStatus) => {
    update.mutate({ orderId, orderStatus: newStatus });
    setDialogOpen(false);
  };

  if (isLoadingAll) return <div className="p-6">Loading orders...</div>;
  if (isErrorAll) return <div className="p-6 text-red-500">Error loading orders: {errorAll?.message}</div>;

  return (
    <div className="space-y-6 w-full">
     <h4 className="text-2xl font-semibold mb-4">Order Management</h4>

      <Card className="w-full">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle>Orders</CardTitle>

          <div className="flex w-full sm:w-auto gap-2">
            <Input
              placeholder="Search by Order ID or Customer Name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="sm:w-60"
            />
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
          </div>
        </CardHeader>

        <CardContent>
          <div className="max-h-[550px] overflow-y-auto">
            <OrderTable
              orders={filteredOrders}
              onView={(order) => {
                setSelectedOrder(order);
                setDialogOpen(true);
              }}
            />
          </div>

          <div className="flex justify-between items-center mt-4 text-sm text-muted-foreground">
            Showing {filteredOrders.length} of {allOrders.length} orders
          </div>
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
