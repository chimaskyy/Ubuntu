import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "@/reducers/productSlice";
import {
  Heart,
  Share2,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  Check,
} from "lucide-react";
import { addToCartAndSave, removeFromCartAndSave } from "@/reducers/cartSlice";
import toast, { Toaster } from "react-hot-toast";
import { useSwipeable } from "react-swipeable";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { RotatingLines } from 'react-loader-spinner';
import { addToWishlist, removeFromWishlist } from "@/reducers/wishListSlice";
function ProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((state) => state.products);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState("");
  const { user } = useSelector((state) => state.user);
  const { items } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);

 const isInWishlist = wishlist.some((item) => item.id === product?.id);

const handleWishlistToggle = () => {
  if (!user) return toast.error("Please log in to manage your wishlist.");
  if (isInWishlist) {
    dispatch(removeFromWishlist({ userId: user.uid, productId: product.id }));
    toast.success(`Removed from wishlist.`);
  } else {
    dispatch(addToWishlist({ userId: user.uid, product }));
    toast.success(`Added to wishlist.`);
  }
};
  useEffect(() => {
    if (!product || product.id !== id) {
      dispatch(fetchProductById(id));
    }
  }, [dispatch, product, id]);

  useEffect(() => {
    // Reset selected variant when product changes
    setSelectedVariant("");
  }, [product]);

  const nextImage = () => {
    if (product?.imageUrls) {
      setSelectedImage((prev) => (prev + 1) % product.imageUrls.length);
    }
  };

  const previousImage = () => {
    if (product?.imageUrls) {
      setSelectedImage((prev) =>
        prev === 0 ? product.imageUrls.length - 1 : prev - 1
      );
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: nextImage,
    onSwipedRight: previousImage,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const handleAddToCart = () => {
    if (!product?.price) {
      toast.error("Product data is invalid.");
      return;
    }

    if (!selectedVariant && product.variants?.length > 0) {
      toast.error("Please select a size");
      return;
    }  

    dispatch(addToCartAndSave(user?.uid, product));
    toast.success(`Added to cart.`);
  };

  const handleRemoveFromCart = () => {
    dispatch(removeFromCartAndSave(user?.uid, product.id));
    toast.success(`Removed from cart.`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <RotatingLines height="50"
          width="50"
          strokeWidth="5"
          animationDuration="0.75"
          strokeColor="#848884" 
          ariaLabel="rotating-lines-loading"
          visible={true}
         />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Product not found</p>
      </div>
    );
  }

  const isInCart = items.some((item) => item.id === product.id);

  return (
    <div className="container mt-24 mx-auto px-4 py-8 lg:mx-16">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="relative">
          <div
            className="relative h-[400px] rounded-lg overflow-hidden mb-2 group"
            {...handlers}
          >
            <img
              src={product.imageUrls[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <button
              onClick={previousImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
          {/* Image Thumbnails */}
          <div className="grid grid-cols-3 gap-4">
            {product.imageUrls.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative h-24 rounded-lg overflow-hidden ${
                  selectedImage === index ? "ring-2 ring-gray-900" : ""
                }`}
              >
                <img
                  src={image}
                  alt={`Product image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-lg font-bold mb-4 capitalize">{product.name}</h1>

          <p className="text-gray-600 mb-8">{product.description}</p>

          {/* Variants Selection */}
          {product.variants && product.variants.length > 0 && (
            <div className="mb-8">
              <h3 className="text-sm font-medium mb-4">Select Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((variant) => (
                  <Button
                    key={variant}
                    variant="outline"
                    size="sm"
                    className={cn(
                      "min-w-[3rem] h-10",
                      selectedVariant === variant
                        ? "bg-gray-900 text-white hover:bg-gray-800"
                        : "hover:bg-gray-100"
                    )}
                    onClick={() => setSelectedVariant(variant)}
                  >
                    {variant}
                  </Button>
                ))}
              </div>
              {!selectedVariant && (
                <p className="text-sm text-red-500 mt-2">
                  Please select a size
                </p>
              )}
            </div>
          )}

          {/* Specifications */}
          <div className="border-t pt-8">
            <h2 className="text-lg font-bold mb-4">Specifications</h2>
            <dl className="grid grid-cols-1 gap-4">
              {product.specifications &&
                Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex">
                    <dt className="font-medium w-24">{key}:</dt>
                    <dd className="text-gray-600">{value}</dd>
                  </div>
                ))}
            </dl>
          </div>
          {/* link to shipping policy page */}
          <p className="text-sm font-bold mb-4 capitalize">Price</p>
          <p className="text-xl text-gray-900 mb-6">
            ₦{product.price.toLocaleString()}.00
          </p>
          <div>
            <h2 className="text-sm mb-4">
              <Link to={`/shipping-policy`} className="text-gray-600 underline">
                shipping
              </Link>
              &nbsp;calculated at checkout
            </h2>
          </div>

          {/* Actions */}
          <div className="flex space-x-4 mb-8 mt-8">
            {isInCart ? (
              <Button
                className="flex-1 bg-gray-900 text-white hover:bg-gray-800"
                onClick={() => handleRemoveFromCart(product.id)}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Remove from Cart
              </Button>
            ) : (
              <Button
                className="flex-1 bg-gray-900 text-white hover:bg-gray-800"
                onClick={handleAddToCart}
                disabled={product.variants?.length > 0 && !selectedVariant}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
            )}
            {/* Wishlist and Share buttons */}
            {user && (
              <Button
                variant="outline"
                size="icon"
                onClick={handleWishlistToggle}
              >
                <Heart
                  className={cn(
                    "w-5 h-5",
                    wishlist.some((item) => item.id === product.id)
                      ? "fill-red-500 text-red-500"
                      : ""
                  )}
                />
              </Button>
            )}

            <Button variant="outline" size="icon">
              <Share2 className="w-5 h-5" />
            </Button>
          </div>
          <div>
            <div className="flex items-center space-x-8 text-gray-700">
              <Check className="w-5 h-5 text-green-500" />
              <p className="text-xs text-gray-500">
                Pickup available at our &nbsp;
                <Link to={`/contact`} className="text-gray-600 underline">
                  store
                </Link>
                &nbsp; in Enugu, Nigeria. <br />
                Usually available in 24 hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
