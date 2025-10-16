"use client"

import { useState, useEffect } from "react"
import { AdminLayout } from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Eye, DollarSign, TrendingUp, TrendingDown, CreditCard } from "lucide-react"
import { useRouter } from "next/navigation"

export default function PaymentsPage() {
  const router = useRouter()
  const [payments, setPayments] = useState([])
  const [filteredPayments, setFilteredPayments] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [methodFilter, setMethodFilter] = useState("all")
  const [selectedPayment, setSelectedPayment] = useState(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("authToken")
    if (!token) {
      router.push("/login")
      return
    }

    // Mock payment data
    const mockPayments = [
      {
        id: "PAY001",
        orderId: "ORD001",
        customerName: "John Doe",
        email: "john@example.com",
        amount: 299.99,
        paymentMethod: "Credit Card",
        paymentStatus: "Paid",
        transactionId: "TXN123456789",
        date: "2024-01-15",
        refundAmount: 0,
      },
      {
        id: "PAY002",
        orderId: "ORD002",
        customerName: "Jane Smith",
        email: "jane@example.com",
        amount: 149.99,
        paymentMethod: "COD",
        paymentStatus: "Pending",
        transactionId: "TXN987654321",
        date: "2024-01-14",
        refundAmount: 0,
      },
      {
        id: "PAY003",
        orderId: "ORD003",
        customerName: "Bob Johnson",
        email: "bob@example.com",
        amount: 499.99,
        paymentMethod: "UPI",
        paymentStatus: "Paid",
        transactionId: "TXN456789123",
        date: "2024-01-13",
        refundAmount: 0,
      },
      {
        id: "PAY004",
        orderId: "ORD004",
        customerName: "Alice Brown",
        email: "alice@example.com",
        amount: 199.99,
        paymentMethod: "Debit Card",
        paymentStatus: "Refunded",
        transactionId: "TXN789123456",
        date: "2024-01-12",
        refundAmount: 199.99,
      },
      {
        id: "PAY005",
        orderId: "ORD005",
        customerName: "Charlie Wilson",
        email: "charlie@example.com",
        amount: 349.99,
        paymentMethod: "Online Banking",
        paymentStatus: "Paid",
        transactionId: "TXN321654987",
        date: "2024-01-11",
        refundAmount: 0,
      },
    ]

    setPayments(mockPayments)
    setFilteredPayments(mockPayments)
  }, [router])

  useEffect(() => {
    let filtered = payments

    if (searchTerm) {
      filtered = filtered.filter(
        (payment) =>
          payment.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          payment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          payment.orderId.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((payment) => payment.paymentStatus === statusFilter)
    }

    if (methodFilter !== "all") {
      filtered = filtered.filter((payment) => payment.paymentMethod === methodFilter)
    }

    setFilteredPayments(filtered)
  }, [searchTerm, statusFilter, methodFilter, payments])

  const handleViewPayment = (payment) => {
    setSelectedPayment(payment)
    setIsViewDialogOpen(true)
  }

  const handleUpdateStatus = (paymentId, newStatus) => {
    setPayments(
      payments.map((payment) => (payment.id === paymentId ? { ...payment, paymentStatus: newStatus } : payment)),
    )
    if (selectedPayment && selectedPayment.id === paymentId) {
      setSelectedPayment({ ...selectedPayment, paymentStatus: newStatus })
    }
  }

  const handleRefund = (paymentId, refundAmount) => {
    setPayments(
      payments.map((payment) =>
        payment.id === paymentId ? { ...payment, paymentStatus: "Refunded", refundAmount: refundAmount } : payment,
      ),
    )
    if (selectedPayment && selectedPayment.id === paymentId) {
      setSelectedPayment({
        ...selectedPayment,
        paymentStatus: "Refunded",
        refundAmount: refundAmount,
      })
    }
  }

  const totalRevenue = payments.filter((p) => p.paymentStatus === "Paid").reduce((sum, p) => sum + p.amount, 0)

  const totalRefunds = payments.reduce((sum, p) => sum + p.refundAmount, 0)

  const pendingPayments = payments.filter((p) => p.paymentStatus === "Pending").length

  const getStatusBadge = (status) => {
    const variants = {
      Paid: "default",
      Pending: "secondary",
      Refunded: "destructive",
      Failed: "destructive",
    }
    return <Badge variant={variants[status] || "default"}>{status}</Badge>
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Payment Management</h1>
          <p className="text-muted-foreground">View and manage payment transactions</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="bg-white text-black">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">From paid orders</p>
            </CardContent>
          </Card>

          <Card className="bg-white text-black">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Refunds</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalRefunds.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Refunded to customers</p>
            </CardContent>
          </Card>

          <Card className="bg-white text-black">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
              <CreditCard className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingPayments}</div>
              <p className="text-xs text-muted-foreground">Awaiting confirmation</p>
            </CardContent>
          </Card>

          <Card className="bg-white text-black">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Net Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${(totalRevenue - totalRefunds).toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">After refunds</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-white text-black">
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-end">
              <div className="flex-1">
                <Label htmlFor="search">Search</Label>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Search by customer, email, payment ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>

              <div className="w-full md:w-48">
                <Label htmlFor="status-filter">Payment Status</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger id="status-filter">
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="Paid">Paid</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Refunded">Refunded</SelectItem>
                    <SelectItem value="Failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="w-full md:w-48">
                <Label htmlFor="method-filter">Payment Method</Label>
                <Select value={methodFilter} onValueChange={setMethodFilter}>
                  <SelectTrigger id="method-filter">
                    <SelectValue placeholder="All Methods" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Methods</SelectItem>
                    <SelectItem value="Credit Card">Credit Card</SelectItem>
                    <SelectItem value="Debit Card">Debit Card</SelectItem>
                    <SelectItem value="UPI">UPI</SelectItem>
                    <SelectItem value="COD">COD</SelectItem>
                    <SelectItem value="Online Banking">Online Banking</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payments Table */}
        <Card className="bg-white text-black">
          <CardContent className="pt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Payment ID</TableHead>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center">
                      No payments found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPayments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{payment.id}</TableCell>
                      <TableCell>{payment.orderId}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{payment.customerName}</div>
                          <div className="text-sm text-muted-foreground">{payment.email}</div>
                        </div>
                      </TableCell>
                      <TableCell className="font-semibold">${payment.amount.toFixed(2)}</TableCell>
                      <TableCell>{payment.paymentMethod}</TableCell>
                      <TableCell>{getStatusBadge(payment.paymentStatus)}</TableCell>
                      <TableCell>{payment.date}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => handleViewPayment(payment)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* View Payment Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="bg-white text-black max-w-2xl">
            <DialogHeader>
              <DialogTitle>Payment Details</DialogTitle>
              <DialogDescription>View and manage payment transaction</DialogDescription>
            </DialogHeader>

            {selectedPayment && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground">Payment ID</Label>
                    <p className="font-medium">{selectedPayment.id}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Order ID</Label>
                    <p className="font-medium">{selectedPayment.orderId}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Customer Name</Label>
                    <p className="font-medium">{selectedPayment.customerName}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Email</Label>
                    <p className="font-medium">{selectedPayment.email}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Amount</Label>
                    <p className="text-lg font-bold">${selectedPayment.amount.toFixed(2)}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Payment Method</Label>
                    <p className="font-medium">{selectedPayment.paymentMethod}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Transaction ID</Label>
                    <p className="font-mono text-sm">{selectedPayment.transactionId}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Date</Label>
                    <p className="font-medium">{selectedPayment.date}</p>
                  </div>
                  {selectedPayment.refundAmount > 0 && (
                    <div>
                      <Label className="text-muted-foreground">Refund Amount</Label>
                      <p className="font-bold text-red-600">${selectedPayment.refundAmount.toFixed(2)}</p>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="payment-status">Payment Status</Label>
                    <Select
                      value={selectedPayment.paymentStatus}
                      onValueChange={(value) => handleUpdateStatus(selectedPayment.id, value)}
                    >
                      <SelectTrigger id="payment-status">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Paid">Paid (Verified)</SelectItem>
                        <SelectItem value="Failed">Failed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedPayment.paymentStatus === "Paid" && selectedPayment.refundAmount === 0 && (
                    <div>
                      <Button
                        variant="destructive"
                        onClick={() => handleRefund(selectedPayment.id, selectedPayment.amount)}
                        className="w-full"
                      >
                        Process Full Refund
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  )
}
