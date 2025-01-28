import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrendingProducts } from "@/reducers/productSlice";
import {
  fetchCart,
} from "@/reducers/cartSlice";
import ProductCard from "./ui/productCard";

export default function TrendingProducts() {
  const dispatch = useDispatch();
  const { trendingProducts, loading } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.user);
  const { items } = useSelector((state) => state.cart);


  useEffect(() => {
    if (user && !items.length) {
      // Fetch only if the cart is not already loaded
      dispatch(fetchCart(user.uid));
    }
  }, [user, dispatch, items.length]);

  useEffect(() => {
    dispatch(fetchTrendingProducts());
  }, [dispatch]);

  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <section className="container mx-auto px-2 py-8 lg:px-2">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Trending Products
        </h2>

        {trendingProducts?.length === 0 ? (
          <div className="text-center mt-8 text-gray-500">
            No products found. Start adding some orders!
          </div>
        ) : (
          // <div className="mt-6 grid grid-cols-2 gap-y-10 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 lg:grid-cols-4">
            {trendingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
