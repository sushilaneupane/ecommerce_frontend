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
         className="fixed top-1/2 left-1/2 h-auto max-h-[90vh] w-full max-w-md p-6 rounded-lg shadow-xl overflow-y-auto bg-white transform -translate-x-1/2 -translate-y-1/2 border"
      >
        <DialogHeader className="p-4 border-b">
          <DialogTitle className="text-xl font-semibold">Order Details</DialogTitle>
          <DialogDescription>View full order summary and information.</DialogDescription>
        </DialogHeader>

        <div className="p-4 space-y-4 text-sm">
          <div className="flex justify-between">
            <span className="font-medium">Order ID:</span>
            <span>{order.orderId}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">User ID:</span>
            <span>{order.userId}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Date:</span>
            <span>{new Date(order.createdAt).toLocaleString()}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Amount:</span>
            <span>${order.totalAmount}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Status:</span>
            <span className="px-2 py-1 rounded bg-gray-100 text-gray-700 text-xs font-medium">
              {order.orderStatus}
            </span>
          </div>

          {order.products && order.products.length > 0 && (
            <div>
              <h3 className="font-medium mt-4 mb-2">Products:</h3>
              <ul className="space-y-1">
                {order.products.map((p, index) => (
                  <li key={index} className="flex justify-between">
                    <span>{p.productName || "N/A"}</span>
                    <span>{p.quantity ? `x${p.quantity}` : ""}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {order.payments && order.payments.length > 0 && (
            <div>
              <h3 className="font-medium mt-4 mb-2">Payments:</h3>
              <ul className="space-y-1 text-sm">
                {order.payments.map((p, index) => (
                  <li key={index} className="flex justify-between">
                    <span>{p.paymentMethod}</span>
                    <span>${p.amount} - {p.paymentStatus}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="border-t p-4 flex justify-end">
          <Button variant="secondary" onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
