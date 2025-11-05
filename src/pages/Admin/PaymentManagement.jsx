import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePayments } from "@/hooks/usePayment";
import PaymentTable from "@/components/PaymentTable";
import PaymentDialog from "@/components/PaymentDialog";

export default function PaymentManagement() {
  const { paymentsData = [], isLoading, isError, error, update } = usePayments();
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPayments = paymentsData.filter((payment) => {
    const statusMatch = filterStatus ? payment.paymentStatus === filterStatus : true;

    const searchMatch =
      payment.transactionId?.toString()?.includes(searchQuery.toLowerCase()) ||
      payment.firstName?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
      payment.lastName?.toLowerCase()?.includes(searchQuery.toLowerCase());

    return statusMatch && searchMatch;
  });

  const handleUpdate = (paymentId, newStatus) => {
    update.mutate({ paymentId, paymentStatus: newStatus });
    setDialogOpen(false);
  };

  if (isLoading) return <div className="p-6">Loading payments...</div>;
  if (isError) return <div className="p-6 text-red-500">Error loading payments: {error?.message}</div>;

  return (
    <div className="space-y-6 w-full">
      <h4 className="text-2xl font-semibold mb-4">Payment Management</h4>

      <Card className="w-full ">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle>Payments</CardTitle>

          <div className="flex w-full sm:w-auto gap-2">
            <Input
              placeholder="Search by Transaction ID or Customer Name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="sm:w-60"
            />
            <Select onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Filter Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent>
          <div className="max-h-[600px]">
            <PaymentTable
              payments={filteredPayments}
              onView={(payment) => {
                setSelectedPayment(payment);
                setDialogOpen(true);
              }}
            />
          </div>

          <div className="flex justify-between items-center mt-4 text-sm text-muted-foreground">
            Showing {filteredPayments.length} of {paymentsData.length} payments
          </div>
        </CardContent>
      </Card>

      {selectedPayment && (
        <PaymentDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          payment={selectedPayment}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}
