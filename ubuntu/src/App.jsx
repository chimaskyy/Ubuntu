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
import {monitorAuthState} from "./reducers/userSlice";
import {useDispatch} from "react-redux";
import {useEffect} from "react";

function App() {
  const location = useLocation(); // Get the current route
  const dispatch = useDispatch();
  // Check if the current route starts with "/admin"
  const isAdminRoute = location.pathname.startsWith("/admin");

  useEffect(() => {
    dispatch(monitorAuthState());
  }
  , [dispatch]);
  return (
    <>
      {/* Render CategoryNav only if not on an Admin route */}
      {!isAdminRoute && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/new-arival" element={<Arival />} />
        <Route path="/head-wear" element={<Headwear />} />
        <Route path="/shorts" element={<UnisexShort />} />
        <Route path="/men" element={<MenList />} />
        <Route path="/accessories" element={<Accessories />} />
        <Route path="/undies" element={<Undies />} />
        <Route path="/footings" element={<Footings />} />
        <Route path="/his-hers" element={<HisHers />} />
        <Route path="/product-page/:id" element={<ProductPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <Footer />
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
