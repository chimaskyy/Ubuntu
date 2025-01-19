import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrendingProducts } from "@/reducers/productSlice";
import { Link } from "react-router-dom";
import { ShoppingCart, Heart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ImageCard from "./ui/ImageCard";

import {
  addToCartAndSave,
  fetchCart,
  removeFromCartAndSave,
} from "@/reducers/cartSlice";
import toast from "react-hot-toast";

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

  const handleAddToCart = (product) => {
    if (!product?.price) {
      toast.error("Product data is invalid.");
      return;
    }
    if (user) {
      dispatch(addToCartAndSave(user.uid, product));
      toast.success(`${product.name} added to cart`);
    } else {
      toast.error("Please login to add items to the cart.");
    }
  };

  const handleremoveFromCartAndSave = (productId) => {
    if (!user) {
      toast.error("Please log in to modify your cart.");
      return;
    }
    dispatch(removeFromCartAndSave(user.uid, productId));
    toast.success("Item reomoved from cart");
  };
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

  // Add debug information
  console.log("Trending Products:", trendingProducts);

  return (
    <section className="container mx-auto px-2 py-16">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-2">
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
            {trendingProducts?.map((product) => (
              <div key={product.id} className="relative group overflow-hidden">
                <div className="">
                  <ImageCard
                    image={product.imageUrls?.[0]}
                    title={product.name}
                    link={`/product/${product.id}`}
                    overlay={false}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2 h-8 w-8 rounded-full bg-white/80 hover:bg-white"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>

                <div className="pt-4 pb-2 flex justify-between">
                  <Link to={`/product/${product.id}`} className="block">
                    <h3 className="capitalize text-sm font-medium leading-tight tracking-tight text-gray-900 line-clamp-2 group-hover:underline">
                      {product.name}
                    </h3>
                  </Link>

                  <div className="ml-12 text-sm text-gray-500">
                    {product.orderCount} sold{" "}
                  </div>
                </div>
                <div className="flex items-center justify-between w-full mt-2">
                  <p className="text-xs font-semibold text-gray-500">
                    ₦{product.price}
                  </p>
                  {user ? (
                    items.some((item) => item.id === product.id) ? ( // Check if the product is already in the cart
                      <Button
                        onClick={() => handleremoveFromCartAndSave(product.id)}
                        variant="outline"
                        size="sm"
                        className="flex items-center rounded-full border-2 border-gray-700"
                      >
                        Remove from Cart
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handleAddToCart(product)}
                        variant="outline"
                        size="sm"
                        className="flex items-center rounded-full border-2 border-gray-700"
                      >
                        <ShoppingCart className="h-4 w-4" />
                      </Button>
                    )
                  ) : (
                    <Button
                      onClick={() =>
                        toast.error("Please login to add items to the cart.")
                      }
                      variant="outline"
                      size="sm"
                      className="flex items-center text-xs rounded-full border border-gray-700" njjuu
                    >
                      <ShoppingCart className="h-4 w-4" />
                      Add to Cart
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
