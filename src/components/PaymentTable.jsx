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
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function PaymentTable({ payments = [], onView }) {
  const [query, setQuery] = useState("");

  const filtered = payments.filter(
    (p) =>
      p.transactionId?.toLowerCase().includes(query.toLowerCase()) ||
      p.firstName?.toLowerCase().includes(query.toLowerCase()) ||
      p.lastName?.toLowerCase().includes(query.toLowerCase()) ||
      p.paymentStatus?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-4">
        <CardTitle>Payments List</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="max-h-[450px] overflow-y-auto p-4 m-4">
          <Table className="min-w-full table-fixed">
            <TableHeader className="sticky top-0 z-20 bg-gray-200">
              <TableRow>
                <TableHead className="w-1/6">Transaction ID</TableHead>
                <TableHead className="w-1/6">User Name</TableHead>
                <TableHead className="w-1/6">Date</TableHead>
                <TableHead className="w-1/6">Amount</TableHead>
                <TableHead className="w-1/6">Status</TableHead>
                <TableHead className="w-1/6 text-right">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                    No payments found.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((payment) => (
                  <TableRow key={payment.paymentId || payment.id}>
                    <TableCell className="truncate">{payment.transactionId}</TableCell>
                    <TableCell className="truncate">
                      {payment.firstName} {payment.lastName}
                    </TableCell>
                    <TableCell>
                      {new Date(payment.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      Rs. {Number(payment.amount || payment.totalAmount).toFixed(2)}
                    </TableCell>
                    <TableCell className="capitalize">
                      {payment.paymentStatus || "—"}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onView(payment)}
                      >
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
