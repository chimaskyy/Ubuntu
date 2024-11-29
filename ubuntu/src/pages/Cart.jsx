import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementItem,
  decrementItem,
  removeFromCart,
} from "@/reducers/cartSlice";

export default function CartPage() {
  const dispatch = useDispatch();
  const { items: items } = useSelector((state) => state.cart); // Get items from Redux state

  const subtotal = items.reduce(
    (acc, item) => acc + parseFloat(item.price) * item.quantity,
    0
  );
  const shipping = 10; // Placeholder shipping cost
  const total = subtotal + shipping;

  const handleIncrease = (itemId) => {
    dispatch(incrementItem({ id: itemId }));
  };

  const handleDecrease = (itemId) => {
    dispatch(decrementItem({ id: itemId }));
  };

  const handleRemove = (itemId) => {
    dispatch(removeFromCart({ id: itemId }));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        {items.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="lg:w-2/3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 bg-white p-4 rounded-lg mb-4 shadow-sm"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    width={100}
                    height={100}
                    className="rounded-md"
                  />
                  <div className="flex-grow">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-600">₦{item.price}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDecrease(item.id)}
                      disabled={item.quantity <= 1} // Disable if quantity is 1
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      type="number"
                      value={item.quantity}
                      className="w-16 text-center"
                      readOnly
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleIncrease(item.id)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemove(item.id)}
                  >
                    <Trash2 className="h-6 w-6 text-red-700" />
                  </Button>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>₦{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Shipping</span>
                  <span>₦{shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg mt-4 pt-4 border-t">
                  <span>Total</span>
                  <span>₦{total.toFixed(2)}</span>
                </div>
                <Button className="w-full mt-6" asChild>
                  <Link to="/checkout">Proceed to Checkout</Link>
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-xl font-semibold mb-4">Your cart is empty.</p>
            <Link to="/shop">
              <Button variant="outline" size="lg">
                Go to Shop
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
