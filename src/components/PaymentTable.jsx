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

export default function PaymentTable({ payments = [], onView }) {
  console.log(payments, "payments in table");
  const [query, setQuery] = useState("");

  const filtered = payments.filter(
    (p) =>
      p.transactionId?.toLowerCase().includes(query.toLowerCase()) ||
      p.firstName?.toLowerCase().includes(query.toLowerCase()) ||
      p.lastName?.toLowerCase().includes(query.toLowerCase()) ||
      p.paymentStatus?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Card className="w-full ">
         {/* HEADER */}
         <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-0 gap-4">
           <CardTitle>Payments List</CardTitle>
  
         </CardHeader>
      {/* TABLE */}
      <CardContent>
        <div className="max-h-[550px] overflow-y-auto">
          <Table className="min-w-full table-auto">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Transaction ID</TableHead>
                <TableHead className="w-[100px]">User Name</TableHead>
                <TableHead className="w-[120px]">Date</TableHead>
                <TableHead className="w-[140px]">Amount</TableHead>
                <TableHead className="w-[160px]">Status</TableHead>
                <TableHead className="w-[100px] text-right">Action</TableHead>
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
                    <TableCell>{payment.transactionId}</TableCell>
                    <TableCell>{payment.firstName} {payment.lastName}</TableCell>
                    <TableCell>{new Date(payment.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>Rs. {Number(payment.amount || payment.totalAmount).toFixed(2)}</TableCell>
                    <TableCell className="capitalize">{payment.paymentStatus || "—"}</TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="outline" onClick={() => onView(payment)}>
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
