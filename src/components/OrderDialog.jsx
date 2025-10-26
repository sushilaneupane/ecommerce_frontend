import React, { useState, useEffect } from "react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

export default function OrderDialog({ open, onClose, order, onUpdate }) {
  const [status, setStatus] = useState("");

  useEffect(() => {
    setStatus(order?.orderStatus || "");
  }, [order]);

  const handleUpdate = async (id) => {
    await onUpdate(id, status);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex justify-between"><span>Order ID:</span><span>{order.id}</span></div>
          <div className="flex justify-between"><span>User Name:</span><span>{order.firstName} {order.lastName}</span></div>
          <div className="flex justify-between"><span>Total Amount:</span><span>Rs {order.totalAmount}</span></div>
          <div className="flex justify-between"><span>Shipping Cost:</span><span>Rs {order.shippingCost}</span></div>
          <div className="flex justify-between"><span>Order Date:</span><span>{new Date(order.createdAt).toLocaleString()}</span></div>

          <div className="space-y-2">
            <Label>Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger><SelectValue placeholder="Select Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">processing</SelectItem>
                <SelectItem value="shipped">shipped</SelectItem>
                <SelectItem value="delivered">delivered</SelectItem>
                <SelectItem value="cancelled">cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Close</Button>
          <Button onClick={() => handleUpdate(order.id)}>Update Status</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
