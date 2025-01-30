import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCartAndSave,
  decrementItemAndSave,
  incrementItemAndSave,
  clearCartAndSave,
  fetchCart,
} from "@/reducers/cartSlice";
import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { SelectZone } from "@/components/ui/SelectZone";
import { getShippingFee } from "@/lib/Shipping";

export default function CartPage() {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);
  const {user} = useSelector((state) => state.user);
  const [selectedState, setSelectedState] = useState("");

  const subtotal = items.reduce(
    (acc, item) => acc + parseFloat(item.price) * item.quantity,
    0
  );

  const shipping = getShippingFee(selectedState);
  const total = subtotal + shipping;

  useEffect(() => {
    if (user?.uid) {
      dispatch(fetchCart(user.uid));
    }
  }, [user?.uid, dispatch]);

  const handleIncrease = (itemId) => {
    dispatch(incrementItemAndSave(user?.uid, itemId));
  };

  const handleDecrease = (itemId) => {
    dispatch(decrementItemAndSave(user?.uid, itemId));
  };

  const handleRemove = (itemId) => {
    dispatch(removeFromCartAndSave(user?.uid, itemId));
  };

  const handleClearCart = () => {
    dispatch(clearCartAndSave(user?.uid));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-0">
            {user ? `${user.displayName}'s Cart` : "Shopping Cart"}
          </h1>
          <Button
            className="bg-black text-white hover:bg-gray-800"
            onClick={handleClearCart}
            variant="outline"
            size="lg"
          >
            Clear Cart
          </Button>
        </div>

        {items.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="lg:w-2/3 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-row sm:flex-row items-center gap-4 bg-white p-4 rounded-lg shadow-sm"
                >
                  <img
                    src={item.imageUrls?.[0] || ""}
                    alt={item.name}
                    width={100}
                    height={100}
                    className="rounded-md object-cover"
                  />
                  <div className="flex-grow text-center sm:text-left">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-600">
                      ₦{item.price.toLocaleString()}.00
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mt-4 sm:mt-0">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDecrease(item.id)}
                      disabled={item.quantity <= 1}
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      type="number"
                      value={item.quantity}
                      className="w-16 text-center"
                      readOnly
                      aria-label="Item quantity"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleIncrease(item.id)}
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemove(item.id)}
                    aria-label="Remove item"
                  >
                    <Trash2 className="h-6 w-6 text-red-700" />
                  </Button>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3 mt-8 lg:mt-0">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                {/* Shipping Zone Selection */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Location
                  </label>
                  <SelectZone
                    value={selectedState}
                    onValueChange={setSelectedState}
                  />
                  {/* {selectedState === "Enugu" && ( */}
                  <p className="text-lg text-green-600 mt-1">
                    Free delivery available in Enugu!
                  </p>
                </div>

                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>₦{subtotal.toLocaleString()}.00</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Shipping</span>
                  <span>₦{shipping.toLocaleString()}.00</span>
                </div>
                <div className="flex justify-between font-semibold text-lg mt-4 pt-4 border-t">
                  <span>Total</span>
                  <span>₦{total.toLocaleString()}.00</span>
                </div>
                <Button
                  className="w-full mt-6"
                  asChild
                  disabled={!selectedState}
                >
                  <Link
                    to="/checkout"
                    state={{ total, shipping, selectedState }}
                  >
                    Proceed to Checkout
                  </Link>
                </Button>
                {!selectedState && (
                  <p className="text-sm text-red-500 mt-2 text-center">
                    Please select your delivery location
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl font-semibold mb-4">Your cart is empty.</p>
            <Button variant="outline" size="lg" asChild>
              <Link to="/shop">Go to Shop</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
