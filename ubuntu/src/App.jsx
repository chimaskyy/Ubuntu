// import { CategoryNav } from "./components/Category";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import {Header, Footer, CatgoryNav, SignUp, Login  } from "./components";
import {
  Accessories,
  ArivalList,
  Footings,
  HeadWear,
  Couple,
  Men,
  Undies,
  UnisexShorts,
  Kids
} from "./pages/Product";
import {
  Admin,
  CartPage,
  CheckoutPage,
  HomePage,
  OrdersPage,
  ProductPage,
  ProfilePage,
} from "./pages";
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
        <Header />

        {/* Render CategoryNav only if not on an Admin route */}
        {!isAdminRoute && <CatgoryNav />}

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/new-arrival" element={<ArivalList />} />
          <Route path="/head-wear" element={<HeadWear />} />
          <Route path="/unisex-shorts" element={<UnisexShorts />} />
          <Route path="/men" element={<Men />} />
          <Route path="/accessories" element={<Accessories />} />
          <Route path="/undies" element={<Undies />} />
          <Route path="/kids" element={<Kids />} />
          <Route path="/footings" element={<Footings />} />
          <Route path="/his-hers" element={<Couple />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
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
