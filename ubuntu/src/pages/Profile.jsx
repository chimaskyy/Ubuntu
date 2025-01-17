import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "@/reducers/userSlice";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import ProfileSidebar from "@/components/ui/ProfileSidebar";
import ProfileInfo from "@/components/ui/ProfileInfo";
import { OrderList } from "@/components/ui/OrderList";

import { fetchUserOrders } from "@/reducers/orderSlice";
export default function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const { orders, loading, error } = useSelector((state) => state.orders);
  
  useEffect(() => {
    if (user?.uid){
    dispatch(fetchUserOrders(user.uid));
  }
}, [dispatch, user?.uid]);

  if (!user) {
    return <p>Loading...</p>; // Handle the case when user is not yet loaded
  }

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <div className="w-full md:w-1/4">
              <ProfileSidebar user={user} onLogout={handleLogout} />
            </div>

            {/* Main Content */}
            <div className="flex-1">
              <Tabs defaultValue="profile" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="orders">Recent Orders</TabsTrigger>
                  <TabsTrigger value="addresses">Addresses</TabsTrigger>
                  <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
                </TabsList>

                <TabsContent value="profile">
                  <ProfileInfo user={user} />
                </TabsContent>

                <TabsContent value="orders">
                  <OrderList orders={orders} loading={loading} error={error} />
                </TabsContent>

                <TabsContent value="addresses">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>Saved Addresses</CardTitle>
                          <CardDescription>
                            Manage your delivery addresses
                          </CardDescription>
                        </div>
                        <Button>Add New Address</Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[1, 2].map((address) => (
                          <div key={address} className="p-4 border rounded-lg">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium">
                                  Home Address {address}
                                </p>
                                <p className="text-sm text-gray-500">
                                  123 Main St, Apt {address}
                                </p>
                                <p className="text-sm text-gray-500">
                                  New York, NY 10001
                                </p>
                              </div>
                              <div className="space-x-2">
                                <Button variant="outline" size="sm">
                                  Edit
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-red-600 hover:text-red-700"
                                >
                                  Delete
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="wishlist">
                  <Card>
                    <CardHeader>
                      <CardTitle>Wishlist</CardTitle>
                      <CardDescription>
                        Items you've saved for later
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[1, 2, 3].map((item) => (
                          <div
                            key={item}
                            className="border rounded-lg overflow-hidden"
                          >
                            <img
                              src="/placeholder.svg?height=200&width=200"
                              alt={`Wishlist item ${item}`}
                              width={200}
                              height={200}
                              className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                              <h3 className="font-medium">
                                Product Name {item}
                              </h3>
                              <p className="text-sm text-gray-500">$99.99</p>
                              <Button className="w-full mt-2">
                                Add to Cart
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
