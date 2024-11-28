import { Link, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  Settings,
} from "lucide-react";

export default function AdminDashboard() {
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "dashboard" },
    { icon: Package, label: "Products", path: "products" },
    { icon: Users, label: "Customers", path: "customers" },
    { icon: ShoppingCart, label: "Orders", path: "orders" },
    { icon: Settings, label: "Settings", path: "settings" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r">
        <div className="p-6">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
        </div>
        <nav className="px-4 space-y-2">
          {menuItems.map(({ icon: Icon, label, path }) => (
            <Link
              to={path}
              key={path}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
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
