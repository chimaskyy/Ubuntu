"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { PaystackButton } from "react-paystack";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {createOrderFromCart} from "@/reducers/orderSlice";
import { clearCartAndSave } from "@/reducers/cartSlice";
import useAuth from "@/hooks/useAuth";

export default function CheckoutPage() {
  const user  = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const total = location.state?.total || 0;

  const publicKey = "pk_test_484fd7fadd7812f81081d295a694b8fb4e697e60";

  const [paymentMethod, setPaymentMethod] = useState("card");

  // Initialize state variables with values from the Redux store
  const [email, setEmail] = useState(user?.email || "");
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");
  const [transferEvidence, setTransferEvidence] = useState(null);

 const handlePaymentSuccess = async () => {
  const shippingDetails = {
    name,
    address,
    city,
    state,
    zip: zipCode,
    country,
  };

  const success = await dispatch(
    createOrderFromCart(user.uid, cartItems, total, shippingDetails)
  );

  if (success) {
    dispatch(clearCartAndSave(user.uid));
    toast.success("Order placed successfully!");
    navigate("/orders");
  }

 }

  const componentProps = {
    email,
    amount: total * 100,
    metadata: {
      name,
      phone,
    },
    publicKey,
    text: "Pay Now",
    onSuccess: handlePaymentSuccess,
    onClose: () => toast.error("Payment failed, please try again!"),
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    toast.success("Order placed successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        <form
          className="bg-white p-6 rounded-lg shadow-sm"
          onSubmit={handleSubmit}
        >
          <div className="space-y-6">
            {/* Contact Information */}
            <div>
              <h2 className="text-xl font-semibold mb-4">
                Contact Information
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Select
                    onValueChange={(value) => setState(value)}
                    value={state}
                  >
                    <SelectTrigger id="state">
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ca">California</SelectItem>
                      <SelectItem value="ny">New York</SelectItem>
                      <SelectItem value="tx">Texas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input
                    id="zipCode"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Select
                    onValueChange={(value) => setCountry(value)}
                    value={country}
                  >
                    <SelectTrigger id="country">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
              <RadioGroup
                value={paymentMethod}
                onValueChange={setPaymentMethod}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="paypal" id="paypal" />
                  <Label htmlFor="paypal">PayStack</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Transfer Evidence */}
            {/* {paymentMethod === "transfer" && (
              <div className="space-y-4">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold mb-2">
                      Bank Transfer Details
                    </h3>
                    <p className="text-sm text-gray-600">
                      Please use the following details to make your transfer:
                    </p>
                    <div className="mt-4 space-y-2">
                      <p>
                        <strong>Bank Name:</strong> Ubuntu Elite Bank
                      </p>
                      <p>
                        <strong>Account Name:</strong> Ubuntu Elite Fashion Ltd
                      </p>
                      <p>
                        <strong>Account Number:</strong> 1234567890
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <div>
                  <Label htmlFor="transferEvidence">
                    Upload Transfer Evidence
                  </Label>
                  <Input
                    id="transferEvidence"
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) =>
                      setTransferEvidence(e.target.files[0] || null)
                    }
                    className="mt-1"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Please upload an image or PDF of your transfer receipt.
                  </p>
                </div>
              </div>
            )} */}

            {/* Order Summary */}
            <div>
              <div>Order Summary</div>
              <div className="font-semibold text-lg">
                Total Amount:{" "}
                <span className="text-green-600">₦{total.toFixed(2)}</span>
              </div>
            </div>

            {/* Submit Button */}
            <PaystackButton
              className="block w-full px-4 py-2 bg-gray-800 text-white rounded-md"
              {...componentProps}
            />
          </div>
        </form>
        <div className="mt-4 text-center">
          <Link to="/cart" className="text-blue-600 hover:underline">
            Return to Cart
          </Link>
        </div>
      </div>
    </div>
  );
}
