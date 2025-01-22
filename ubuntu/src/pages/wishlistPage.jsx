import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";
import { fetchWishlist, removeFromWishlist } from "@/reducers/wishListSlice";
import { addToCartAndSave } from "@/reducers/cartSlice";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import ImageCard from "@/components/ui/ImageCard";

export default function WishlistPage() {
  const dispatch = useDispatch();
  const user = useAuth();
  const { wishlist, status } = useSelector((state) => state.wishlist);

  // Fetch wishlist on mount
  useEffect(() => {
    if (user?.uid) {
      dispatch(fetchWishlist(user.uid));
    }
  }, [dispatch, user?.uid]);

  const handleRemoveFromWishlist = (productId) => {
    if (user?.uid) {
      dispatch(removeFromWishlist({ userId: user.uid, productId }));
    }
  };

  const handleAddToCart = (product) => {
    if (user?.uid) {
      dispatch(addToCartAndSave(user.uid, product));
      dispatch(removeFromWishlist({ userId: user.uid, productId: product.id }));
    }
  };

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>

      {wishlist.length === 0 ? (
        <div className="text-center py-12">
          <Heart className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Your wishlist is empty</h2>
          <p className="text-gray-600 mb-6">
            Add products you love to your wishlist. Review them anytime and
            easily move them to the cart.
          </p>
          <Button asChild>
            <Link to="/">Continue Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className=""
            >
              <Link to={`/product/${item.id}`} className="block relative">
                <ImageCard
                  image={item.imageUrls?.[0]}
                  link={`/product/${item.id}`}
                />
              </Link>
              <div className="p-4">
                <Link
                  to={`/product/${item.id}`}
                  className="text-lg font-semibold hover:text-gray-600 transition-colors"
                >
                  {item.name}
                </Link>
                <p className="text-gray-600 mt-1">
                  ₦{item.price.toLocaleString()}.00
                </p>

                <div className="flex gap-2 mt-4">
                  <Button
                    className="flex-1"
                    onClick={() => handleAddToCart(item)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleRemoveFromWishlist(item.id)}
                  >
                    <Heart className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
