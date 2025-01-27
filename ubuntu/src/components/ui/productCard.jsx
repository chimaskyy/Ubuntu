/* eslint-disable react/prop-types */
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ImageCard from "./ImageCard";
import { useDispatch, useSelector } from "react-redux";
import { addToCartAndSave, removeFromCartAndSave } from "@/reducers/cartSlice";
import { addToWishlist, removeFromWishlist } from "@/reducers/wishListSlice";
import toast from "react-hot-toast";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { items } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);

  const isInWishlist = wishlist.some((item) => item.id === product.id);
  const isInCart = items.some((item) => item.id === product.id);

  const handleAddToCart = () => {
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

  const handleRemoveFromCart = () => {
    if (!user) {
      toast.error("Please log in to modify your cart.");
      return;
    }
    dispatch(removeFromCartAndSave(user.uid, product.id));
    toast.success("Item removed from cart");
  };

  const handleWishlistToggle = () => {
    if (!user) {
      toast.error("Please login to manage your wishlist.");
      return;
    }
    if (isInWishlist) {
      dispatch(removeFromWishlist({ userId: user.uid, productId: product.id }));
      toast.success(`${product.name} removed from wishlist`);
    } else {
      dispatch(addToWishlist({ userId: user.uid, product }));
      toast.success(`${product.name} added to wishlist`);
    }
  };

  return (
    <div className="relative group overflow-hidden">
      <ImageCard
        image={product.imageUrls?.[0]}
        link={`/product/${product.id}`}
        product={product}
        isInWishlist={isInWishlist}
        onWishlistToggle={handleWishlistToggle}
      />
      <div className="mt-4">
        <div className="flex flex-col gap-2">
          <Link
            to={`/product/${product.id}`}
            className="text-sm font-medium text-gray-900 hover:text-gray-700"
          >
            {product.name}
          </Link>
          <div className="flex items-center justify-between w-full">
            <p className="text-xs font-semibold text-gray-500">
              ₦{product.price.toLocaleString()}.00
            </p>
            {user ? (
              isInCart ? (
                <Button
                  onClick={handleRemoveFromCart}
                  variant="outline"
                  size="sm"
                  className="flex items-center text-xs rounded-full border border-gray-700"
                >
                  Remove from Cart
                </Button>
              ) : (
                <Button
                  onClick={handleAddToCart}
                  variant="outline"
                  size="sm"
                  className="flex items-center text-xs rounded-full border border-gray-700"
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span className="hidden md:hidden lg:block">
                    Add to Cart
                  </span>{" "}
                </Button>
              )
            ) : (
              <Button
                onClick={() =>
                  toast.error("Please login to add items to the cart.")
                }
                variant="outline"
                size="sm"
                className="flex items-center text-xs rounded-full border border-gray-700"
              >
                <ShoppingCart className="h-4 w-4" />
                <span className="hidden md:hidden lg:block">
                  Add to Cart
                </span>{" "}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
