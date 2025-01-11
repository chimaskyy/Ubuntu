/* eslint-disable react/prop-types */
// ProductGrid.jsx
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

const ProductGrid = ({
  title,
  description,
  category, // This will be the main category filter
  showFilters = true,
  categories = [
    { value: "all", label: "All" }, // Changed 'all' to empty string to match fetchProducts logic
    { value: "men", label: "Men" },
    { value: "kids", label: "Kids" },
    { value: "footings", label: "Footings" },
    { value: "beauty", label: "Beauty" },
    { value: "accessories", label: "Accessories" },
    {value: "unisex shorts", label: "Unisex Shorts"},
    {value: "his & hers", label: "His & Hers"},
  ],
}) => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.user);
  const { items } = useSelector((state) => state.cart);

  const [selectedCategory, setSelectedCategory] = useState(category || "");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    if (user && !items.length) {
      dispatch(fetchCart(user.uid));
    }
  }, [user, dispatch, items.length]);

  // Update selectedCategory when category prop changes
  useEffect(() => {
    setSelectedCategory(category || "");
  }, [category]);

  // Fetch products when filters change
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {(title || description) && (
          <div className="text-center mb-8">
            {title && (
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl mb-4">
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
            <div className="flex flex-wrap gap-4">
              {!category && ( // Only show category filter if no category is provided as prop
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
                  <SelectItem value="low-to-high">
                    Price: Low to High
                  </SelectItem>
                  <SelectItem value="high-to-low">
                    Price: High to Low
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <div className="relative w-full overflow-hidden">
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.imageUrls?.[0] || ""}
                    alt={product.name}
                    className="h-full w-full object-cover"
                    width={400}
                    height={600}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2 h-8 w-8 rounded-full bg-white/80 hover:bg-white"
                  >
                    <Heart className="h-4 w-4" />
                    <span className="sr-only">Add to wishlist</span>
                  </Button>
                </Link>
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-900">
                  <Link to={`/product/${product.id}`}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.name}
                  </Link>
                </h3>
                <div className="flex items-center justify-between w-full">
                  <p className="text-base font-semibold text-gray-900">
                    ₦{product.price}
                  </p>
                  {user ? (
                    items.some((item) => item.id === product.id) ? (
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
