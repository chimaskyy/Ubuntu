/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Package, MapPin, Heart, Settings, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

function ProfileSidebar({ user, onLogout }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col items-center">
          <Avatar className="h-24 w-24">
            <AvatarImage src={user.photoURL} alt="Profile picture" />
            <AvatarFallback>
              {user.displayName ? user.displayName[0] : "U"}
            </AvatarFallback>
          </Avatar>
          <h2 className="mt-4 text-xl font-semibold">{user.displayName}</h2>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
        <div className="mt-6 space-y-2">
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link to={`/orders/${user.uid}`}>
              <Package className="mr-2 h-4 w-4" />
              My Orders
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link to="/profile/wishlist">
              <Heart className="mr-2 h-4 w-4" />
              Wishlist
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link to="/profile/settings">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Link>
          </Button>
          <Button
            onClick={onLogout}
            variant="ghost"
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProfileSidebar;
