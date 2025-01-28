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
        <div className="flex items-center justify-between mt-2">
          <p className="text-xs font-semibold text-gray-500">
            ₦{product.price.toLocaleString()}.00
          </p>
          <Button
            onClick={isInCart ? handleRemoveFromCart : handleAddToCart}
            variant="outline"
            size="sm"
            className="flex items-center text-xs rounded-full border border-gray-700"
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden lg:block ml-2">
              {isInCart ? "Remove from Cart" : "Add to Cart"}
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
