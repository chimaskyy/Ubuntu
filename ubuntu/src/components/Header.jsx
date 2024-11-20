import { Search, Heart, User } from "lucide-react";
// import {Link} from "react-router-dom";
import { ShoppingCart, Menu } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   NavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   NavigationMenuTrigger,
// } from "@/components/ui/navigation-menu";
function Header() {
  return (
    <>
      <header className="border-b pt-4 sticky top-0 z-50 w-full bg-white">
        <div className="container mx-auto px-4">
          {/* Top bar */}
          <div className="flex items-center justify-between h-16">
            {/* Mobile menu */}
            <button className="lg:hidden p-2">
              <Menu className="w-6 h-6" />
            </button>

            {/* Logo */}
            <div className="flex-shrink-0">
              <a href="/" className="flex items-center space-x-2">
                <img
                  src="https://scontent.flos5-3.fna.fbcdn.net/v/t39.30808-6/369696228_2053136978364665_5390676064914487004_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHqn7-2da7hlbPK4_Z7oiJYkYh0yVdKtGmRiHTJV0q0aTLV27I7tn8hQL2VJ9dMxsxqXi1jgKNkQOTOG67rhvHT&_nc_ohc=1z6KvXMxS90Q7kNvgH-vyjX&_nc_zt=23&_nc_ht=scontent.flos5-3.fna&_nc_gid=AFWMdGNmo_xQ28TcJ6QEY33&oh=00_AYB4CLPxl_JlZOEet5fr1psNueXrwbkWKNkTxuiAAB2aEQ&oe=67413503"
                  alt="Logo"
                  width={50}
                  height={50}
                />
              </a>
            </div>

            {/* Search bar - hidden on mobile */}
            <div className="hidden lg:flex flex-1 max-w-xl mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="w-full pl-4 pr-10 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                />
                <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-4">
              <button className="hidden lg:block p-2 hover:text-blue-600">
                <User className="w-6 h-6" />
              </button>
              <button className="p-2 hover:text-blue-600">
                <Heart className="w-6 h-6" />
              </button>
              <button className="p-2 hover:text-blue-600 relative">
                <ShoppingCart className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  0
                </span>
              </button>
            </div>
          </div>

          {/* Search bar - mobile only */}
          <div className="lg:hidden px-4 pb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full pl-4 pr-10 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
              <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
