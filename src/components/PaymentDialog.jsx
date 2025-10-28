import React, { useState, useEffect } from "react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

export default function OrderDialog({ open, onClose, payment, onUpdate }) {
  const [status, setStatus] = useState("");

  useEffect(() => {
    setStatus(payment?.paymentStatus || "");
  }, [payment]);

  const handleUpdate = async (id) => {
    await onUpdate(id, status);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Payment Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex justify-between"><span>Transaction ID:</span><span>{payment.id}</span></div>
          <div className="flex justify-between"><span>User Name:</span><span>{payment.firstName} {payment.lastName}</span></div>
          <div className="flex justify-between"><span>Total Amount:</span><span>Rs {payment.amount}</span></div>
          <div className="flex justify-between"><span>PaymentDate Date:</span><span>{new Date(payment.createdAt).toLocaleString()}</span></div>

          <div className="space-y-2">
            <Label>Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger><SelectValue placeholder="Select Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Close</Button>
          <Button onClick={() => handleUpdate(payment.id)}>Update Status</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
