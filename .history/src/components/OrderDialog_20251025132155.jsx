import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function OrderDialog({ open, onClose, order }) {
  if (!order) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="fixed right-0 top-0 h-full w-full max-w-md p-0 rounded-none shadow-xl overflow-y-auto border-l bg-white"
      >
        <DialogHeader className="p-4 border-b">
          <DialogTitle className="text-xl font-semibold">Order Details</DialogTitle>
          <DialogDescription>View full order summary and information.</DialogDescription>
        </DialogHeader>

        <div className="p-4 space-y-4 text-sm">
          <div className="flex justify-between">
            <span className="font-medium">Order ID:</span>
            <span>{order.orderid}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Customer:</span>
            <span>{order.customer}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Date:</span>
            <span>{order.date}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Amount:</span>
            <span>{order.amount}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Status:</span>
            <span className="px-2 py-1 rounded bg-gray-100 text-gray-700 text-xs font-medium">
              {order.status}
            </span>
          </div>
        </div>

        <div className="border-t p-4 flex justify-end">
          <Button variant="secondary" onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
