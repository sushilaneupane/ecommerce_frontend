import React from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function PaymentTable({ payments, onView }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Transaction ID</TableHead>
          <TableHead>User Name</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {payments.map((payment) => (
          <TableRow key={payment.id}>
            <TableCell>{payment.transactionId}</TableCell>
            <TableCell>{payment.firstName} {payment.lastName}</TableCell>
            <TableCell>{new Date(payment.createdAt).toLocaleDateString()}</TableCell>
            <TableCell>Rs{payment.amount}</TableCell>
            <TableCell>{payment.paymentStatus}</TableCell>
            <TableCell>
              <Button size="sm" variant="outline" onClick={() => onView(payment)}>
                View
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
