/* eslint-disable react/prop-types */
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchProducts } from "@/reducers/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useMemo } from "react";
import ProductCard from "./ui/productCard";
import { fetchCart } from "@/reducers/cartSlice";
import { Loader2 } from "lucide-react";
import { usePagination } from "../hooks/usePaginate";
import Pagination from "./ui/pagination";

const PRODUCTS_PER_PAGE = 12;

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
  const { products: fetchedProducts, loading } = useSelector(
    (state) => state.products
  );
  const { user } = useSelector((state) => state.user);
  const { items } = useSelector((state) => state.cart);
  const [selectedCategory, setSelectedCategory] = useState(category || "all");
  const [sortBy, setSortBy] = useState("");
  const [allProducts, setAllProducts] = useState([]);

  // Fetch products and cart on component mount
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (user && !items.length) {
      dispatch(fetchCart(user.uid));
    }
  }, [user, dispatch, items.length]);

  // Update local state when products are fetched
  useEffect(() => {
    setAllProducts(fetchedProducts);
  }, [fetchedProducts]);

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    pagination.reset(); // Reset to first page when category changes
  };

  const handleSortByChange = (value) => {
    setSortBy(value);
    pagination.reset(); // Reset to first page when sort changes
  };

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = allProducts;

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) =>
          product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (sortBy) {
      filtered = [...filtered].sort((a, b) => {
        if (sortBy === "newest") {
          return new Date(b.createdAt) - new Date(a.createdAt);
        } else if (sortBy === "oldest") {
          return new Date(a.createdAt) - new Date(b.createdAt);
        } else if (sortBy === "low-to-high") {
          return a.price - b.price;
        } else if (sortBy === "high-to-low") {
          return b.price - a.price;
        }
        return 0;
      });
    }

    return filtered;
  }, [allProducts, selectedCategory, sortBy]);

  const pagination = usePagination({
    data: filteredAndSortedProducts,
    itemsPerPage: PRODUCTS_PER_PAGE,
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
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
                onValueChange={handleCategoryChange}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Filter" />
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
            <Select value={sortBy} onValueChange={handleSortByChange}>
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

        {filteredAndSortedProducts.length === 0 ? (
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
          <>
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
              {pagination.displayedItems.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <Pagination
              hasMoreItems={pagination.hasMoreItems}
              onLoadMore={pagination.loadMore}
              loading={loading}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ProductGrid;
