import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import {
  CheckCircle,
  Package,
  Mail,
  ArrowRight,
  ShoppingBag,
} from "lucide-react";

export default function OrderConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderId, userId, email } = location.state || {};

  useEffect(() => {
    if (!orderId || !email) {
      toast.error("Invalid order confirmation.");
      navigate("/");
    }
  }, [orderId, email, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Success Header */}
        <div className="bg-green-50 p-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Order Confirmed!</h1>
          <p className="text-gray-600 mt-2">Thank you for your purchase</p>
        </div>

        {/* Order Details */}
        <div className="p-6 space-y-6">
          {/* Order Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-gray-700">
              <Package className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Order ID</p>
                <p className="font-medium">#{orderId.slice(-8)}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 text-gray-700">
              <Mail className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Confirmation will be sent to</p>
                <p className="font-medium">{email}</p>
              </div>
            </div>
          </div>

          {/* Status Timeline */}
          <div className="border border-green-100 rounded-lg p-4 bg-green-50">
            <div className="flex items-center space-x-2 text-green-700">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <p className="text-sm font-medium">Order confirmed</p>
            </div>
            <div className="ml-1 mt-3 space-y-3">
              <div className="flex items-center space-x-2 text-gray-500">
                <div className="w-[1px] h-8 bg-gray-300"></div>
                <p className="text-xs">Processing order</p>
              </div>
             
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            {userId && (
              <Button
                onClick={() => navigate(`/orders/${userId}`)}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white flex items-center justify-center space-x-2"
              >
                <span>View Order Details</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            )}

            <Button
              onClick={() => navigate("/")}
              variant="outline"
              className="w-full border-gray-300 hover:bg-gray-50 flex items-center justify-center space-x-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Continue Shopping</span>
            </Button>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t px-6 py-4">
          <p className="text-xs text-center text-gray-500">
            Need help? Contact our support team at support@example.com
          </p>
        </div>
      </div>
    </div>
  );
}
