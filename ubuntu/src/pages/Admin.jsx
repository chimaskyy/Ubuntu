import { Route, Routes} from "react-router-dom";
import AdminDashboard from "../components/admin/AdminDAshboard";
// import ProductManager from "../components/admin/ProductManger";
// import Dashboard from "../components/admin/Dash";
import DashboardContent from "../components/admin/Dash";
import ProductManager from "../components/admin/ProductManger";
import CustomersContent from "../components/admin/Customer";
import OrdersContent from "../components/admin/Orders";
import SettingsContent from "../components/admin/Settings";
import AdminHeader from "@/components/admin/AdminHeader";
function Admin() {
  return (
    <>
      <AdminHeader />
      <Routes>
        {/* All routes under AdminDashboard is here */}
        <Route path="/" element={<AdminDashboard />}>
          <Route path="dashboard" element={<DashboardContent />} />
          <Route path="products" element={<ProductManager />} />
          <Route path="customers" element={<CustomersContent />} />
          <Route path="orders" element={<OrdersContent />} />
          <Route path="settings" element={<SettingsContent />} />
          <Route index element={<DashboardContent />} /> {/* Default route */}
        </Route>
      </Routes>
    </>
  );
}

export default Admin;
