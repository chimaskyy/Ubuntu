"use client";

import { useState } from "react";
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

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("card");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
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
            <div>
              <h2 className="text-xl font-semibold mb-4">
                Contact Information
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" required />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" required />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" required />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" required />
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" required />
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" required />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Select>
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
                  <Input id="zipCode" required />
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Select>
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
            <div>
              <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
              <RadioGroup
                value={paymentMethod}
                onValueChange={setPaymentMethod}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card">Credit Card</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="paypal" id="paypal" />
                  <Label htmlFor="paypal">PayPal</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="transfer" id="transfer" />
                  <Label htmlFor="transfer">Bank Transfer</Label>
                </div>
              </RadioGroup>
            </div>
            {paymentMethod === "transfer" && (
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
                    required
                    className="mt-1"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Please upload an image or PDF of your transfer receipt.
                  </p>
                </div>
              </div>
            )}
            <Button className="w-full" type="submit">
              Place Order
            </Button>
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
