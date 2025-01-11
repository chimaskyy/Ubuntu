import Header from "./components/Header";
// import { CategoryNav } from "./components/Category";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import SignUp from "./components/forms/SignUp";
import Login from "./components/forms/Login";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Admin from "./pages/Admin";
import Arival from "./pages/Product/ArivalList";
import Headwear from "./pages/Product/HeadWear";
import UnisexShort from "./pages/Product/UnisexShort";
import HisHers from "./pages/Product/His&Hers";
import MenList from "./pages/Product/MenList";
import Undies from "./pages/Product/MenUndies";
import Footings from "./pages/Product/Footings";
import Accessories from "./pages/Product/Accessories";
import ProductPage from "./pages/ProductPage";
import Cart from "./pages/Cart";
import CheckoutPage from "./pages/Checkout";
import OrdersPage from "./pages/Order";
import {monitorAuthState} from "./reducers/userSlice";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import { fetchCart } from "./reducers/cartSlice";
import WithAdminAuth from "../src/hooks/WithAdminAuth";
import AuthWrapper from "./utils/AuthWrapper";

function App() {
  const location = useLocation(); // Get the current route
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.uid);
  // Check if the current route starts with "/admin"
  const isAdminRoute = location.pathname.startsWith("/admin");

  useEffect(() => {
    const unsubscribe = dispatch(monitorAuthState());
    return () => unsubscribe; // Cleanup subscription
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCart(userId));
  }
  , [dispatch, userId]);

  return (
    <>
      <AuthWrapper>
        {/* Render CategoryNav only if not on an Admin route */}
        {!isAdminRoute && <Header />}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/new-arival" element={<Arival />} />
          <Route path="/head-wear" element={<Headwear />} />
          <Route path="/uni-sex" element={<UnisexShort />} />
          <Route path="/men" element={<MenList />} />
          <Route path="/acessories" element={<Accessories />} />
          <Route path="/undies" element={<Undies />} />
          <Route path="/footings" element={<Footings />} />
          <Route path="/his-hers" element={<HisHers />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route
            path="/admin/*"
            element={
              <WithAdminAuth>
                <Admin />
              </WithAdminAuth>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        {!isAdminRoute && <Footer />}
      </AuthWrapper>
    </>
  );
}

export default function Root() {
  return (
    <Router>
      <App />
    </Router>
  );
}
