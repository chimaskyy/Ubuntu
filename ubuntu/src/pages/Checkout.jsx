import { useState, useEffect } from "react";
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
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { PaystackButton } from "react-paystack";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { createOrderFromCart } from "@/reducers/orderSlice";
import { clearCartAndSave } from "@/reducers/cartSlice";
import useAuth from "@/hooks/useAuth";
import { nigerianStates } from "@/Data/Data";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function CheckoutPage() {
  const user = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const total = location.state?.total || 0;

  const publicKey = "pk_test_484fd7fadd7812f81081d295a694b8fb4e697e60";

  const [paymentMethod, setPaymentMethod] = useState("paystack");
  const [formData, setFormData] = useState({
    email: user?.email || "",
    name: user?.name || "",
    phone: user?.phone || "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "Nigeria",
  });
  const [transferProof, setTransferProof] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    // Required fields validation
    const requiredFields = [
      "name",
      "email",
      "phone",
      "address",
      "city",
      "state",
      "zipCode",
    ];
    requiredFields.forEach((field) => {
      if (!formData[field]?.trim()) {
        newErrors[field] = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } is required`;
      }
    });

    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation
    if (
      formData.phone &&
      !/^\d{10,}$/.test(formData.phone.replace(/[^\d]/g, ""))
    ) {
      newErrors.phone = "Please enter a valid phone number";
    }

    // Transfer proof validation
    if (paymentMethod === "transfer" && !transferProof) {
      newErrors.transferProof = "Please upload payment proof";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handlePaymentSuccess = async (response) => {
    try {
      setIsSubmitting(true);

      let paymentDetails = {
        method: paymentMethod,
        status: "completed",
        reference: response?.reference,
      };

      if (paymentMethod === "transfer") {
        // Convert file to base64 if it's a transfer payment
        const base64File = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(transferProof);
        });

        paymentDetails = {
          ...paymentDetails,
          transferProof: base64File,
          status: "pending", // Transfer payments start as pending
          bankDetails: {
            accountName: "Ubuntu Store",
            accountNumber: "0123456789",
            bankName: "Your Bank Name",
          },
        };
      }

      const shippingDetails = {
        ...formData,
        transferProof: paymentDetails.transferProof,
      };

      const success = await dispatch(
        createOrderFromCart(
          user.uid,
          cartItems,
          total,
          shippingDetails,
          paymentDetails
        )
      );

      if (success) {
        dispatch(clearCartAndSave(user.uid));
        toast.success("Order placed successfully!");
        navigate(`/orders/${user.uid}`);
      }
    } catch (error) {
      toast.error("Failed to process order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const componentProps = {
    email: formData.email,
    amount: total * 100,
    metadata: {
      name: formData.name,
      phone: formData.phone,
    },
    publicKey,
    text: "Pay with Paystack",
    onSuccess: handlePaymentSuccess,
    onClose: () => toast.error("Payment cancelled"),
  };

  const handleTransferSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fill in all required fields correctly");
      return;
    }

    await handlePaymentSuccess();
  };

  const isFormValid = () => {
    return (
      formData.name &&
      formData.email &&
      formData.phone &&
      formData.address &&
      formData.city &&
      formData.state &&
      formData.zipCode &&
      (paymentMethod !== "transfer" || transferProof)
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        <form
          className="bg-white p-6 rounded-lg shadow-sm space-y-8"
          onSubmit={
            paymentMethod === "transfer"
              ? handleTransferSubmit
              : (e) => e.preventDefault()
          }
        >
          {/* Contact Information */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div className="sm:col-span-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div className="sm:col-span-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={errors.phone ? "border-red-500" : ""}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
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
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={errors.address ? "border-red-500" : ""}
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                )}
              </div>

              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className={errors.city ? "border-red-500" : ""}
                />
                {errors.city && (
                  <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                )}
              </div>

              <div>
                <Label htmlFor="country">Country</Label>
                <Select
                  name="country"
                  onValueChange={(value) =>
                    handleInputChange({ target: { name: "country", value } })
                  }
                  value={formData.country}
                  defaultValue="Nigeria"
                >
                  <SelectTrigger id="country">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Nigeria">Nigeria</SelectItem>
                    <SelectItem value="Outside Nigeria">
                      Outside Nigeria
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="state">State</Label>
                <Select
                  name="state"
                  onValueChange={(value) =>
                    handleInputChange({ target: { name: "state", value } })
                  }
                  value={formData.state}
                >
                  <SelectTrigger id="state">
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {formData.country === "Nigeria" ? (
                      nigerianStates.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="international">
                        International Shipping
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
                {errors.state && (
                  <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                )}
              </div>

              <div>
                <Label htmlFor="zipCode">ZIP/Postal Code</Label>
                <Input
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className={errors.zipCode ? "border-red-500" : ""}
                />
                {errors.zipCode && (
                  <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>
                )}
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="paystack" id="paystack" />
                <Label htmlFor="paystack">PayStack</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="transfer" id="transfer" />
                <Label htmlFor="transfer">Bank Transfer</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Bank Transfer Details */}
          {paymentMethod === "transfer" && (
            <div className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Bank Details</h3>
                      <p>Bank Name: Your Bank Name</p>
                      <p>Account Name: Ubuntu Store</p>
                      <p>Account Number: 0123456789</p>
                    </div>

                    <div>
                      <Label htmlFor="transferProof">
                        Upload Payment Proof
                      </Label>
                      <Input
                        id="transferProof"
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => {
                          setTransferProof(e.target.files[0] || null);
                          if (errors.transferProof) {
                            setErrors((prev) => ({
                              ...prev,
                              transferProof: "",
                            }));
                          }
                        }}
                        className={errors.transferProof ? "border-red-500" : ""}
                      />
                      {errors.transferProof && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.transferProof}
                        </p>
                      )}
                      <p className="text-sm text-gray-500 mt-1">
                        Please upload an image or PDF of your transfer receipt
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Order Summary */}
          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₦{total.toLocaleString()}.00</span>
              </div>
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span className="text-green-600">
                  ₦{total.toLocaleString()}.00
                </span>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          {paymentMethod === "paystack" ? (
            <PaystackButton
              {...componentProps}
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!isFormValid() || isSubmitting}
            />
          ) : (
            <Button
              type="submit"
              className="w-full"
              disabled={!isFormValid() || isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : null}
              Complete Order
            </Button>
          )}
        </form>

        <div className="mt-4 text-center">
          <Link to={`/cart/${user.uid}`} className="text-blue-600 hover:underline">
            Return to Cart
          </Link>
        </div>
      </div>
    </div>
  );
}
