import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrderById,
  updateOrderStatus,
} from "@/reducers/orderSlice";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Package, Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const orderStatuses = [
  { value: "pending", label: "Pending" },
  { value: "processing", label: "Processing" },
  { value: "shipped", label: "Shipped" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
];

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case "delivered":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "processing":
      return "bg-blue-100 text-blue-800";
    case "shipped":
      return "bg-purple-100 text-purple-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function OrderDetailsPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    currentOrder: order,
    loading,
    pendingUpdates,
  } = useSelector((state) => state.orders);

  useEffect(() => {
    if (orderId) {
      dispatch(fetchOrderById({ orderId }));
    }
  }, [dispatch, orderId]);

  const handleStatusChange = async (orderId, newStatus) => {
      await dispatch(updateOrderStatus({ orderId, status: newStatus }));
    };;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading || !order) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">
                Order #{order.orderId.slice(-8)}
              </h1>
              <p className="text-sm text-gray-500">
                Placed on {formatDate(order.createdAt)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Badge className={getStatusColor(order.status)}>
                {order.status}
              </Badge>
              
            </div>
            <Select
              value={order.status}
              onValueChange={(value) =>
                handleStatusChange(order.orderId, value)
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Update status" />
              </SelectTrigger>
              <SelectContent>
                {orderStatuses.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Order Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Customer Information */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Customer Information</h2>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Name:</span>{" "}
                {order.shippingDetails.name}
              </p>
              <p>
                <span className="font-medium">Email:</span>{" "}
                {order.shippingDetails.email}
              </p>
              <p>
                <span className="font-medium">Phone:</span>{" "}
                {order.shippingDetails.phone}
              </p>
            </div>
          </Card>

          {/* Shipping Information */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
            <div className="space-y-2">
              <p>{order.shippingDetails.address}</p>
              <p>
                {order.shippingDetails.city}, {order.shippingDetails.state}{" "}
                {order.shippingDetails.zip}
              </p>
              <p>{order.shippingDetails.country}</p>
            </div>
          </Card>
        </div>

        {/* Order Items */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Order Items</h2>
          <div className="space-y-4">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 border-b last:border-0 pb-4 last:pb-0"
              >
                <div className="h-20 w-20 flex-shrink-0">
                  <img
                    src={item.imageUrls[0]}
                    alt={item.name}
                    className="h-full w-full object-cover rounded-md"
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    ₦{item.price.toLocaleString()}.00
                  </p>
                  <p className="text-sm text-gray-500">
                    Total: ₦{(item.price * item.quantity).toLocaleString()}.00
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="mt-6 border-t pt-6">
            <div className="flex justify-between items-center">
              <span className="font-medium">Total Amount</span>
              <span className="text-xl font-bold">
                ₦{order.totalAmount.toLocaleString()}.00
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
