import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  Settings,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { useSelector } from "react-redux";

export default function AdminDashboard() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const {user} = useSelector(state => state.user);

  const menuItems = [
    { icon: LayoutDashboard, label: "Overview", path: "dashboard" },
    { icon: Package, label: "Products", path: "products" },
    { icon: Users, label: "Customers", path: "customers" },
    { icon: ShoppingCart, label: "Orders", path: "orders" },
    { icon: Settings, label: "Settings", path: "settings" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Mobile menu toggle button */}
      <button
        className="md:hidden fixed top-14 left-4 z-20 p-2 bg-white rounded-md shadow-md"
        onClick={toggleMobileMenu}
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={`${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out fixed md:static inset-y-0 left-0 z-10 w-64 bg-white border-r overflow-y-auto`}
      >
        <div className="px-4 space-y-2 mb-6">
          <div className="flex items-center mb-6 pt-12">
            <div className="bg-gray-900 p-2 rounded-lg mr-2">
              <Package className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold">Ubuntu Store</span>
          </div>
        </div>

        <nav className="px-4 space-y-2">
          {menuItems.map(({ icon: Icon, label, path }) => (
            <Link
              to={path}
              key={path}
              className="flex items-center space-x-2 px-4 py-2 text-gray-900 hover:bg-gray-50 rounded-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Icon className="w-5 h-5" />
              <span className="md:inline  pl-2">{label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="p-6">
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        </div>
        <Outlet />
      </main>
    </div>
  );
}
