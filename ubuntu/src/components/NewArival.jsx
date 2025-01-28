import { ShoppingCart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { fetchProducts } from "@/reducers/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addToWishlist, removeFromWishlist } from "@/reducers/wishListSlice";
import {
  addToCartAndSave,
  removeFromCartAndSave,
  fetchCart,
} from "@/reducers/cartSlice";
import toast, { Toaster } from "react-hot-toast";
import ImageCard from "./ui/ImageCard";

export function NewArrivals() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.user);
  const { items } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);

  useEffect(() => {
    if (user && !items.length) {
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

  const handleRemoveFromCart = (productId) => {
    if (!user) {
      toast.error("Please log in to modify your cart.");
      return;
    }
    dispatch(removeFromCartAndSave(user.uid, productId));
    toast.success("Item removed from cart");
  };

  const handleWishlistToggle = (product) => {
    if (!user) {
      toast.error("Please login to manage your wishlist.");
      return;
    }
    const isInWishlist = wishlist.some((item) => item.id === product.id);
    if (isInWishlist) {
      dispatch(removeFromWishlist({ userId: user.uid, productId: product.id }));
      toast.success(`${product.name} removed from wishlist`);
    } else {
      dispatch(addToWishlist({ userId: user.uid, product }));
      toast.success(`${product.name} added to wishlist`);
    }
  };

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts({ category: "all" }));
    }
  }, [dispatch, products.length]);

  return (
    <section className="container mx-auto px-2 py-16 lg:px-2">
      <Toaster />
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          New Arrivals
        </h2>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 lg:grid-cols-4">
          {products.map((product) => {
            const isInWishlist = wishlist.some(
              (item) => item.id === product.id
            );

            return (
              <div key={product.id} className="relative group overflow-hidden">
                <ImageCard
                  image={product.imageUrls?.[0]}
                  link={`/product/${product.id}`}
                  product={product}
                  isInWishlist={isInWishlist}
                  onWishlistToggle={() => handleWishlistToggle(product)}
                />
                <div className="pt-4">
                  <Link to={`/product/${product.id}`} className="block">
                    <h3 className="capitalize text-sm font-medium leading-tight tracking-tight text-gray-900 line-clamp-2 group-hover:underline">
                      {product.name}
                    </h3>
                  </Link>
                </div>
                <div className="flex items-center justify-between w-full mt-2">
                  <p className="text-xs font-semibold text-gray-500">
                    ₦{product.price.toLocaleString()}.00
                  </p>
                  {user ? (
                    items.some((item) => item.id === product.id) ? (
                      <Button
                        onClick={() => handleRemoveFromCart(product.id)}
                        variant="outline"
                        size="sm"
                        className="mr-3 flex items-center text-xs rounded-full border border-gray-700"
                      >
                        <span className=" md:hidden lg:block ">
                          Remove from Cart
                        </span>
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handleAddToCart(product)}
                        variant="outline"
                        size="sm"
                        className="mr-3 flex items-center text-xs rounded-full border border-gray-700"
                      >
                        <ShoppingCart className="h-6 w-6" />
                        <span className="hidden md:hidden lg:block">
                          Add to cart
                        </span>
                      </Button>
                    )
                  ) : (
                    <Button
                      onClick={() =>
                        toast.error("Please login to add items to the cart.")
                      }
                      variant="outline"
                      size="sm"
                      className="mr-3 flex items-center text-xs rounded-full border border-gray-700"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      <span className="hidden md:hidden lg:block">
                        Add to Cart
                      </span>{" "}
                     
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-12 text-center">
          <Button
            asChild
            size="lg"
            className="bg-black text-white hover:bg-gray-900 transform transition-transform hover:scale-105"
          >
            <Link to="/new-arrival">
              SHOP NEW ARRIVALS
              <ArrowRight className="w-10 h-10 transition-transform group-hover:translate-x-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default NewArrivals;
