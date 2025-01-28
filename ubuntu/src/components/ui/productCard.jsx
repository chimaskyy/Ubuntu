/* eslint-disable react/prop-types */
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ImageCard from "./ImageCard";
import { useDispatch, useSelector } from "react-redux";
import { addToCartAndSave, removeFromCartAndSave } from "@/reducers/cartSlice";
import { addToWishlist, removeFromWishlist } from "@/reducers/wishListSlice";
import toast, { Toaster } from "react-hot-toast";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { items: cartItems } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);

  const isInCart = cartItems.some((item) => item.id === product.id);
  const isInWishlist = wishlist.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    if (!user) return toast.error("Please log in to add items to your cart.");
    dispatch(addToCartAndSave(user.uid, product));
    toast.success(`${product.name} added to cart.`);
  };

  const handleRemoveFromCart = () => {
    if (!user) return toast.error("Please log in to modify your cart.");
    dispatch(removeFromCartAndSave(user.uid, product.id));
    toast.success(`${product.name} removed from cart.`);
  };

  const handleWishlistToggle = () => {
    if (!user) return toast.error("Please log in to manage your wishlist.");
    if (isInWishlist) {
      dispatch(removeFromWishlist({ userId: user.uid, productId: product.id }));
      toast.success(`${product.name} removed from wishlist.`);
    } else {
      dispatch(addToWishlist({ userId: user.uid, product }));
      toast.success(`${product.name} added to wishlist.`);
    }
  };

  return (
    <div className="relative group overflow-hidden">
      <Toaster position="top-right" reverseOrder={false} />
      <ImageCard
        image={product.imageUrls?.[0]}
        link={`/product/${product.id}`}
        product={product}
        isInWishlist={isInWishlist}
        onWishlistToggle={handleWishlistToggle}
      />
      <div className="mt-4">
        <Link
          to={`/product/${product.id}`}
          className="text-sm font-medium text-gray-900 hover:text-gray-700"
        >
          {product.name}
        </Link>
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold text-gray-500">
            ₦{product.price.toLocaleString()}.00
          </p>
          <div className="flex items-center space-x-2 ml-6">
            {/* Remove from Cart button - always visible if in cart */}
            {isInCart && (
              <Button
                onClick={handleRemoveFromCart}
                variant="outline"
                size="sm"
                className="flex items-center text-xs rounded-full border border-gray-700 lg:mr-5"
              >
                <ShoppingCart className="h-4 w-4" />
                <span className="">Remove</span>
              </Button>
            )}
            {/* Add to Cart button - visible only on large screens */}
            {!isInCart && (
              <Button
                onClick={handleAddToCart}
                variant="outline"
                size="sm"
                className="hidden mr-5 lg:flex items-center text-xs rounded-full border border-gray-700"
              >
                <ShoppingCart className="h-4 w-4" />
                <span>Add to cart</span>
              </Button>
            )}
            {/* Cart Icon - visible only on small and medium screens */}
            {!isInCart && (
              <Button
                onClick={handleAddToCart}
                variant="outline"
                size="sm"
                className="lg:hidden  flex items-center text-xs rounded-full border border-gray-700"
              >
                <ShoppingCart className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
