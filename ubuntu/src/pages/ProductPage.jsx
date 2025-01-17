import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "@/reducers/productSlice";
import {
  Heart,
  Share2,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { addToCartAndSave, removeFromCartAndSave } from "@/reducers/cartSlice";
import toast, { Toaster } from "react-hot-toast";
import { useSwipeable } from "react-swipeable";

function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((state) => state.products);
  const [selectedImage, setSelectedImage] = useState(0);
   const { user } = useSelector((state) => state.user);
   const { items } = useSelector((state) => state.cart);



  useEffect(() => {
    if (!product || product.id !== id) {
      dispatch(fetchProductById(id));
    }
  }, [dispatch, product, id]);


  const nextImage = () => {
    if(product?.imageUrls) {
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

  const handleAddToCart = (product) => {
    if (!product?.price) {
      toast.error("Product data is invalid.");
      return;
    }
    if (user) {
      dispatch(addToCartAndSave(user.uid, product));
      toast.success(`${product.name} added to cart`);
    } else {
      toast.error("Please sign up or login to add items to the cart.");
      
    }
  };

  
  const handleremoveFromCartAndSave = (productId) => {
    if (!user) {
      toast.error("Please log in to modify your cart.");
      return;
    }
    dispatch(removeFromCartAndSave(user.uid, productId));
    toast.success("Item removed from cart");
  };

  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
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

  return (
    <div className="container mx-auto px-4 py-8 lg:mx-16">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="relative" >
          <div className="relative h-[400px] rounded-lg overflow-hidden mb-2 group" {...handlers}>
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
          <h1 className="text-3xl font-bold mb-4 capitalize">{product.name}</h1>
          <p className="text-2xl font-bold text-gray-900 mb-6">
            ₦{product.price.toLocaleString()}.00
          </p>

          <p className="text-gray-600 mb-8">{product.description}</p>

          {/* Actions */}
          <div className="flex space-x-4 mb-8">
            {user ? (
              items.some((item) => item.id === product.id) ? ( // Check if the product is already in the cart
                <button
                  className="flex-1 bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-1000 transition-colors flex items-center justify-center space-x-2"
                  onClick={() => handleremoveFromCartAndSave(product.id)}
                >
                  <ShoppingCart className="w-5 h-5" />
                   {" "} Remove from Cart
                </button>
              ) : (
                <button
                  className="flex-1 bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-1000 transition-colors flex items-center justify-center space-x-2"
                  onClick={() => handleAddToCart(product)}
                >
                  <ShoppingCart className="h-4 w-4" />
                  {" "} Add to Cart
                </button>
              )
            ) : (
              <button
                className="flex-1 bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-1000 transition-colors flex items-center justify-center space-x-2"
                onClick={() =>
                  toast.error("Please login to add items to the cart.")
                }
              >
                <ShoppingCart className="h-4 w-4" />
                {" "} Add to Cart
              </button>
            )}
            <button className="p-3 border rounded-lg hover:bg-gray-100">
              <Heart className="w-5 h-5" />
            </button>
            <button className="p-3 border rounded-lg hover:bg-gray-100">
              <Share2 className="w-5 h-5" />
            </button>
          </div>

          {/* Specifications */}
          <div className="border-t pt-8">
            <h2 className="text-xl font-bold mb-4">Specifications</h2>
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
        </div>
      </div>
    </div>
  );
}

export default ProductPage;

<button className="flex-1 bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-1000 transition-colors flex items-center justify-center space-x-2">
  <ShoppingCart className="w-5 h-5" />
  <span>Add to Cart</span>
</button>;