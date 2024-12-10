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
import AdminHeader from "./AdminHeader";

export default function AdminDashboard() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "dashboard" },
    { icon: Package, label: "Products", path: "products" },
    { icon: Users, label: "Customers", path: "customers" },
    { icon: ShoppingCart, label: "Orders", path: "orders" },
    { icon: Settings, label: "Settings", path: "settings" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Mobile menu toggle button */}
      <button
        className="md:hidden fixed top-4 left-4 z-20 p-2 bg-white rounded-md shadow-md"
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
        <div className="p-6">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
        </div>
        <div className="px-4 space-y-2 mb-6">
          <div className="flex items-center mb-6">
            <div className="bg-gray-900 p-2 rounded-lg mr-2">
              <Package className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold">Ubuntu Stores</span>
          </div>
          <div className="flex items-center bg-gray-100 rounded-lg p-2 mb-6">
            <img
              src="/placeholder.svg"
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full mr-3"
            />
            <div>
              <p className="font-semibold">Oshoke Idaewor</p>
              <p className="text-xs text-gray-600">idaewor@gmail.com</p>
            </div>
            <ChevronDown className="ml-auto h-4 w-4" />
          </div>
        </div>

        <nav className="px-4 space-y-2">
          {menuItems.map(({ icon: Icon, label, path }) => (
            <Link
              to={path}
              key={path}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Icon className="w-5 h-5" />
              <span className="md:inline hidden">{label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}
