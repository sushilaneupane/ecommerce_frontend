import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePayments } from "@/hooks/usePayment";
import PaymentTable from "@/components/PaymentTable";
import PaymentDialog from "@/components/PaymentDialog";

export default function OrderManagement() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("");

  const { paymentsData, isLoading, isError, update, refetch } = usePayments();

  const filteredPayments = filterStatus
    ? paymentsData.filter((payment) => payment.paymentStatus === filterStatus)
    : paymentsData;

  const handleUpdate = (paymentId, newStatus) => {    
    update.mutate({ paymentId, paymentStatus: newStatus });
    setDialogOpen(false);
  };

  if (isLoading) return <div className="p-6">Loading payments...</div>;
  if (isError) return <div className="p-6 text-red-500">Error loading payments: {error.message}</div>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-semibold">Payment Management</h1>

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
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payments</CardTitle>
        </CardHeader>
        <CardContent>
          <PaymentTable
            payments={filteredPayments}
            onView={(payment) => {
              setSelectedOrder(payment);
              setDialogOpen(true);
            }}
          />
        </CardContent>
      </Card>

      {selectedOrder && (
        <PaymentDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          payment={selectedOrder}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}
