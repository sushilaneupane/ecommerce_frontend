{/* Right Column - Order Summary */}
<div className="space-y-3 sm:space-y-4 md:mt-20">
  <Card className="p-4 sm:p-6">
    <div className="flex flex-col">
      <CardTitle className="text-sm md:text-base mb-2 p-0">
        Order Summary
      </CardTitle>
      <CardContent className="p-0 space-y-1 sm:space-y-2">
        <p className="text-sm sm:text-base">
          Items Total ({totalQuantity} Item
          {totalQuantity > 1 ? "s" : ""}):{" "}
          <strong>Rs. {itemsTotal}</strong>
        </p>
        <p className="text-sm sm:text-base">
          Delivery Fee: <strong>Rs. {deliveryFee}</strong>
        </p>

        {/* New: Payment Method Section */}
        <div className="border-t border-gray-300 pt-2 mt-2">
          <p className="text-sm sm:text-base font-medium">
            Payment Method: <span className="font-bold text-green-700">Cash on Delivery</span>
          </p>
        </div>

        <h4 className="text-red-600 font-bold text-base sm:text-lg mt-2">
          Total: Rs. {grandTotal}
        </h4>

        <Link to="/order">
          <Button
            className="text-sm sm:text-base mt-3"
            disabled={cartItems.length === 0}
          >
            Place Order
          </Button>
        </Link>
      </CardContent>
    </div>
  </Card>
</div>
