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

                <TabsContent value="wishlist">
                  <Card>
                    <CardHeader>
                      <CardTitle>Wishlist</CardTitle>
                      <CardDescription>
                        Items you&lsquo;ve saved for later
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
