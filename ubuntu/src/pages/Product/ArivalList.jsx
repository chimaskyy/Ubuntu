import { Heart, ShoppingCart } from "lucide-react";
// import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

export default function ProductsPage() {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.user);
  const { items } = useSelector((state) => state.cart);

  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    if (user && !items.length) {
      // Fetch only if the cart is not already loaded
      dispatch(fetchCart(user.uid));
    }
  }, [user, dispatch, items.length]);

  useEffect(() => {
    dispatch(
      fetchProducts({ category: category === "all" ? "" : category, sortBy })
    );
  }, [category, sortBy, dispatch]);

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
  if (loading){
    return <div>Loading...</div>
  }

  

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl mb-4">
            NEW ARRIVALS OF MODERN AFRICAN PRINT CLOTHING
          </h1>
          <p className="text-gray-600 text-sm max-w-3xl mx-auto">
            Be a trendsetter in our latest modern African clothing arrivals!
            Enjoy vibrant collections where contemporary fashion meets
            traditional African prints. Shop the latest trends.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 items-center justify-between mb-8">
          <div className="flex flex-wrap gap-4">
            <Select>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="xs">XS</SelectItem>
                <SelectItem value="s">S</SelectItem>
                <SelectItem value="m">M</SelectItem>
                <SelectItem value="l">L</SelectItem>
                <SelectItem value="xl">XL</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex flex-wrap gap-4 items-center justify-between mb-8">
              <div className="flex flex-wrap gap-4">
                <Select onValueChange={(value) => setCategory(value)}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="men">Men</SelectItem>
                    <SelectItem value="footings">Footings</SelectItem>
                    <SelectItem value="bottoms">Bottoms</SelectItem>
                    <SelectItem value="accessories">Accessories</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Select onValueChange={(value) => setSortBy(value)}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="low-to-high">
                    Price: Low to High
                  </SelectItem>
                  <SelectItem value="high-to-low">
                    Price: High to Low
                  </SelectItem>
                </SelectContent>
              </Select>

              {/* <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Sort By</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setSortBy("newest")}>
                    Newest
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("low-to-high")}>
                    Price: Low to High
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("high-to-low")}>
                    Price: High to Low
                  </DropdownMenuItem>
                  <DropdownMenuItem>Most Popular</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu> */}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="group relative">
                <div className="relative  w-full overflow-hidden ">
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
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      <a href={`/product/${product.id}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </a>
                    </h3>
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <p className="text-base font-semibold text-gray-900">
                      ₦{product.price}
                    </p>
                    {user ? (
                      items.some((item) => item.id === product.id) ? ( // Check if the product is already in the cart
                        <Button
                          onClick={() =>
                            handleremoveFromCartAndSave(product.id)
                          }
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
    </div>
  );
}
