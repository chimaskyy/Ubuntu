// import { CategoryNav } from "./components/Category";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import ProductModal from "./components/ui/productModal";
import { Header, Footer, CatgoryNav, SignUp, Login } from "./components";
import {
  Admin,
  CartPage,
  CheckoutPage,
  HomePage,
  OrdersPage,
  ProductPage,
  ProfilePage,
  WishlistPage,
  ArivalList,
} from "./pages";
import orderDetailsPage from "./components/admin/OrderDetailsPage";
import { monitorAuthState } from "./reducers/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchCart } from "./reducers/cartSlice";
import WithAdminAuth from "./HOC/WithAdminAuth";
import WithUserAuth from "./HOC/WithUserAuth";
import AuthWrapper from "./utils/AuthWrapper";
import OrderDetailsPage from "./components/admin/OrderDetailsPage";
import CategoryPage from "./pages/CategoryPage";
import { CircleLoader } from "react-spinners";
import OrderConfirmationPage from "./pages/OrderCornfirmation";
import { Toaster } from "react-hot-toast";
function App() {
  const location = useLocation(); // Get the current route
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.user);
  
  // Check if the current route starts with "/admin"
  const isAdminRoute = location.pathname.startsWith("/admin");

  useEffect(() => {
    const unsubscribe = dispatch(monitorAuthState());
    return () => unsubscribe; // Cleanup subscription
  }, [dispatch]);

 

useEffect(() => {
  if (user?.uid) {
    dispatch(fetchCart(user.uid));
  }
}, [dispatch, user?.uid]);




  return (
    <>
      {!isAdminRoute && <Header />}

      {/* Render CategoryNav only if not on an Admin route */}
      {/* {!isAdminRoute && <CatgoryNav />} */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#1f2937", // Tailwind's bg-gray-900
            color: "#ffffff", // White text
          },
        }}
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="/new-arrival" element={<ArivalList />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/cart/:id" element={<CartPage />} />
        <Route path="/collection" element={<ArivalList />} />

        <Route path="/collection/:category" element={<CategoryPage />} />
        <Route
          path="/collection/:category/:subcategory"
          element={<CategoryPage />}
        />

        <Route
          path="/checkout"
          element={
            // <WithUserAuth>
            <CheckoutPage />
            //  </WithUserAuth>
          }
        />
        <Route path="/orders/:userId" element={<OrdersPage />} />
        <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
        <Route path="/my-wishlist" element={<WishlistPage />} />
        <Route
          path="/admin/*"
          element={
            <WithAdminAuth>
              <Admin />
            </WithAdminAuth>
          }
        />
        <Route
          path="/admin/orders/:orderId"
          element={
            <WithAdminAuth>
              <OrderDetailsPage />
            </WithAdminAuth>
          }
        />

        <Route
          path="/admin/products/new"
          element={
            <WithAdminAuth>
              <ProductModal />
            </WithAdminAuth>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {!isAdminRoute && (
        <Footer
          className={`bg-black text-gray-300 `}
          className2={`max-w-7xl mx-auto px-4 sm:px-6 lg:mx-1 py-12`}
        />
      )}
    </>
  );
}

export default function Root() {

  const [loading, setLoading] = useState(true);
   useEffect(() => {
     const timer = setTimeout(() => {
       setLoading(false);
     }, 2000);
     // Clear timeout if the component is unmounted
     return () => clearTimeout(timer);
   }, []);

   const ScrollToTop = () => {
     window.scrollTo(0, 0);
     return null;
   };
  return (
    <div>
    {loading ? (
      <div className="fixed top-0 left-0 z-50 w-screen h-screen flex items-center justify-center bg-white">
        <CircleLoader color="#333" size={50} />
      </div>
    ) : (
      <Router>
        <ScrollToTop />
        <App />
      </Router>
    )}
    </div>
  );
}
