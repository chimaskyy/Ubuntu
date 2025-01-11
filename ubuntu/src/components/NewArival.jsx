import { Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { fetchProducts } from "@/reducers/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import {
  
  removeFromCartAndSave,
  addToCartAndSave,
} from "@/reducers/cartSlice";
import toast, { Toaster } from "react-hot-toast";
import { fetchCart } from "../reducers/cartSlice";
export function NewArrivals() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
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
    if (products.length === 0) {
      dispatch(fetchProducts({ category: "all" }));
    }
  }, [dispatch, products.length]);

  return (
    <section className="py-16">
      <Toaster />
      <div className="container max-w-7xl mx-auto lg:px-6  px-4 md:px-6">
        <h2 className="text-3xl font-bold text-left mb-12">New Arrivals</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group">
              <div className="relative overflow-hidden">
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.imageUrls?.[0] || ""}
                    alt={product.name}
                    className="h-full w-full object-cover"
                    width={400}
                    height={600}
                  />
                  <button
                    className="absolute top-4 right-4 p-2 rounded-full bg-white text-gray-700 hover:text-red-500 transition-colors duration-200"
                    aria-label={`Add ${product.name} to wishlist`}
                  >
                    <Heart className="h-5 w-5" />
                    <span className="sr-only">Add to wishlist</span>
                  </button>
                </Link>
              </div>
              <div className="pt-4">
                <Link to={`/product/${product.uid}`} className="block">
                  <h3 className="text-sm font-medium leading-tight tracking-tight text-gray-900 line-clamp-2 group-hover:underline">
                    {product.name}
                  </h3>
                </Link>
              </div>
              <div className="flex items-center justify-between w-full mt-2">
                <p className="text-base font-semibold text-gray-900">
                  ₦{product.price}
                </p>
                {user ? (
                  items.some((item) => item.id === product.id) ? ( // Check if the product is already in the cart
                    <Button
                      onClick={() => handleremoveFromCartAndSave(product.id)}
                      variant="outline"
                      size="sm"
                    >
                      Remove from Cart
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleAddToCart(product)}
                      variant="outline"
                      size="sm"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      Add to Cart
                    </Button>
                  )
                ) : (
                  <Button
                    onClick={() =>
                      toast.error("Please login to add items to the cart.")
                    }
                    variant="outline"
                    size="sm"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button
            asChild
            size="lg"
            className="bg-black text-white hover:bg-gray-900 transform transition-transform hover:scale-105"
          >
            <Link to="/new-arrivals">
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
