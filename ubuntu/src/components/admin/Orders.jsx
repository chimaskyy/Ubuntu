import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { fetchAllOrders, updateOrderStatus } from "@/reducers/orderSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { usePagination } from "@/hooks/usePaginate";
import Pagination from "../ui/pagination";
import { toast } from "react-hot-toast";

const orderStatuses = [
  { value: "pending", label: "Pending" },
  { value: "processing", label: "Processing" },
  { value: "shipped", label: "Shipped" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
];

const paymentStatuses = [
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Confirmed" },
  { value: "failed", label: "Failed" },
];

const getStatusColor = (status) => {
  if (!status) return "bg-gray-100 text-gray-800";

  switch (status.toLowerCase()) {
    case "delivered":
      return "bg-green-100 text-green-800";
    case "confirmed":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "processing":
      return "bg-blue-100 text-blue-800";
    case "shipped":
      return "bg-purple-100 text-purple-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    case "failed":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function OrdersContent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orders, loading } = useSelector((state) => state.orders);

  const fetchOrders = () => {
    dispatch(fetchAllOrders());
  };

  useEffect(() => {
    fetchOrders();
  }, [dispatch]);

  const handleStatusChange = async (orderId, updates) => {
    try {
      await dispatch(updateOrderStatus({ orderId, updates })).unwrap();
      toast.success("Order status updated successfully");
      // Refetch orders after successful update
      fetchOrders();
    } catch (error) {
      toast.error("Failed to update order status");
    }
  };

  const handleRowClick = (orderId, e) => {
    // Prevent navigation when clicking on select elements
    if (e.target.closest(".status-select")) return;
    navigate(`/admin/orders/${orderId}`);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const pagination = usePagination({
    data: orders,
    itemsPerPage: 5,
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!orders?.length) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <Package className="h-12 w-12 text-gray-400" />
        <h3 className="text-lg font-medium text-gray-900">No Orders Found</h3>
        <p className="text-gray-500">
          There are no orders to display at the moment.
        </p>
      </div>
    );
  }


  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Package className="h-6 w-6" />
          <h2 className="text-2xl font-bold">Orders Management</h2>
        </div>
        <Badge variant="secondary">{orders.length} Orders</Badge>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 hover:bg-gray-50">
                <TableHead className="font-semibold">Order ID</TableHead>
                <TableHead className="font-semibold">Customer</TableHead>
                <TableHead className="font-semibold">Date</TableHead>
                <TableHead className="font-semibold">Total</TableHead>
                <TableHead className="font-semibold">Payment</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pagination.displayedItems.map((order) => (
                <TableRow
                  key={order.orderId}
                  onClick={(e) => handleRowClick(order.orderId, e)}
                  className="cursor-pointer hover:bg-gray-50"
                >
                  <TableCell className="font-medium">
                    #{order.orderId?.slice(-8) || "N/A"}
                  </TableCell>
                  <TableCell>{order.shippingDetails?.name || "N/A"}</TableCell>
                  <TableCell>
                    {order.createdAt ? formatDate(order.createdAt) : "N/A"}
                  </TableCell>
                  <TableCell>
                    ₦{order.totalAmount?.toLocaleString() || 0}.00
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(order.paymentStatus)}>
                      {order.paymentStatus || "Unknown"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status || "Unknown"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2 status-select">
                      <Select
                        value={order.paymentStatus || ""}
                        onValueChange={(value) =>
                          handleStatusChange(order.orderId, {
                            paymentStatus: value,
                          })
                        }
                      >
                        <SelectTrigger className="w-[130px]">
                          <SelectValue placeholder="Payment" />
                        </SelectTrigger>
                        <SelectContent>
                          {paymentStatuses.map((status) => (
                            <SelectItem key={status.value} value={status.value}>
                              {status.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Select
                        value={order.status || ""}
                        onValueChange={(value) =>
                          handleStatusChange(order.orderId, { status: value })
                        }
                      >
                        <SelectTrigger className="w-[130px]">
                          <SelectValue placeholder="Order Status" />
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
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Pagination
            hasMoreItems={pagination.hasMoreItems}
            onLoadMore={pagination.loadMore}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}
