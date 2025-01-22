/* eslint-disable react/prop-types */
import { Heart, ShoppingCart } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { fetchProducts } from "@/reducers/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  addToCartAndSave,
  fetchCart,
  removeFromCartAndSave,
} from "@/reducers/cartSlice";
import { Link } from "react-router-dom";
import ImageCard from "./ui/ImageCard";
import { addToWishlist, removeFromWishlist } from "@/reducers/wishListSlice";

const ProductGrid = ({
  title,
  description,
  category,
  showFilters = true,
  categories = [
    { value: "all", label: "All" },
    { value: "men", label: "Men" },
    { value: "kids", label: "Kids" },
    { value: "footings", label: "Footings" },
    { value: "accessories", label: "Accessories" },
    { value: "unisex shorts", label: "Unisex Shorts" },
    { value: "his & hers", label: "His & Hers" },
  ],
}) => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.user);
  const { items } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const [selectedCategory, setSelectedCategory] = useState(category || "");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    if (user && !items.length) {
      dispatch(fetchCart(user.uid));
    }
  }, [user, dispatch, items.length]);

  useEffect(() => {
    setSelectedCategory(category || "");
  }, [category]);

  useEffect(() => {
    dispatch(
      fetchProducts({
        category: selectedCategory,
        sortBy,
      })
    );
  }, [selectedCategory, sortBy, dispatch]);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {(title || description) && (
          <div className="text-center mb-8">
            {title && (
              <h1 className="uppercase text-2xl font-bold text-gray-900 sm:text-3xl mb-4">
                {title}
              </h1>
            )}
            {description && (
              <p className="text-gray-600 text-sm max-w-3xl mx-auto">
                {description}
              </p>
            )}
          </div>
        )}

        {showFilters && (
          <div className="flex flex-wrap gap-4 items-center justify-between mb-8">
            {!category && (
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            <Select onValueChange={setSortBy}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
                <SelectItem value="low-to-high">Price: Low to High</SelectItem>
                <SelectItem value="high-to-low">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {products.length === 0 ? (
          <div className="text-center mt-12">
            <h2 className="text-lg font-bold text-gray-900">
              Oops! No products are available in the &quot;{selectedCategory}
              &quot; category at the moment.
            </h2>
            <p className="text-gray-600 mt-2">
              We&lsquo;re working hard to restock this category soon. Stay tuned
              for amazing products that you&apos;ll absolutely love!
            </p>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
            {products.map((product) => {
              const isInWishlist = wishlist.some(
                (item) => item.id === product.id
              );
              return (
                <div
                  key={product.id}
                  className="relative group overflow-hidden"
                >
                  <ImageCard
                    image={product.imageUrls?.[0]}
                    link={`/product/${product.id}`}
                    product={product}
                    isInWishlist={isInWishlist}
                    onWishlistToggle={() => handleWishlistToggle(product)}
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
                          items.some((item) => item.id === product.id) ? (
                            <Button
                              onClick={() =>
                                handleremoveFromCartAndSave(product.id)
                              }
                              variant="outline"
                              size="sm"
                              className="flex items-center text-xs rounded-full border border-gray-700"
                            >
                              Remove from Cart
                            </Button>
                          ) : (
                            <Button
                              onClick={() => handleAddToCart(product)}
                              variant="outline"
                              size="sm"
                              className="flex items-center text-xs rounded-full border border-gray-700"
                            >
                              <ShoppingCart className="h-4 w-4" />
                              Add to Cart
                            </Button>
                          )
                        ) : (
                          <Button
                            onClick={() =>
                              toast.error(
                                "Please login to add items to the cart."
                              )
                            }
                            variant="outline"
                            size="sm"
                            className="flex items-center text-xs rounded-full border border-gray-700"
                          >
                            <ShoppingCart className="h-4 w-4" />
                            Add to Cart
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductGrid;
