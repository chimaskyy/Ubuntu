import { useEffect, useState } from "react";
import { Heart, User, ShoppingCart, LayoutDashboard } from "lucide-react";
import { useSelector } from "react-redux";
import logo from "../assets/logo.jpg";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import SearchInput from "./ui/searchInput";

export default function Header() {
  const { user } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.products);
  const { items } = useSelector((state) => state.cart);
  const [searchValue, setSearchValue] = useState("");
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (searchValue) {
        const search = products.filter((product) =>
          product.name.toLowerCase().includes(searchValue.toLowerCase())
        );
        setSearchedProducts(search);
        setShowResults(true);
      } else {
        setSearchedProducts([]);
        setShowResults(false);
      }
    }, 300);

    return () => clearTimeout(debounce);
  }, [searchValue, products]);

  const handleProductClick = (productId) => {
    setShowResults(false);
    setSearchValue("");
    navigate(`/product/${productId}`);
  };

  return (
    <header className="border-b pt-4 sticky top-0 z-50 w-full bg-white">
      <div className="lg:mx-auto lg:px-4 max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16 mx-4">
          <Link to="/" className="flex-shrink-0">
            <img src={logo} alt="Logo" width={50} height={50} />
          </Link>

          <div className="hidden flex justify-center mt-4 px-4 pb-4 md:block lg:block">
            <SearchInput
              searchValue={searchValue}
              onSearchChange={(e) => setSearchValue(e.target.value)}
              showResults={showResults}
              searchedProducts={searchedProducts}
              onProductClick={handleProductClick}
            />
          </div>

          <div className="flex items-center pr-1 space-x-6">
            <Link to="/my-wishlist">
              <button size="icon">
                <Heart className="h-8 w-8" />
                <span className="sr-only">Wishlist</span>
              </button>
            </Link>
            <Link to={`/cart/${user?.uid}`}>
              <button size="icon" className="relative">
                <ShoppingCart className="h-8 w-8" />
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {items.length}
                </span>
                <span className="sr-only">Cart</span>
              </button>
            </Link>
            {user ? (
              <>
                <Link to={`/profile/${user?.uid}`}>
                  <button size="icon" className="lg:inline-flex">
                    <User className="h-5 w-5" />
                    <span className="sr-only">Account</span>
                  </button>
                </Link>
                {user.role?.includes("admin") && (
                  <Link to="/admin">
                    <Button
                      size="sm"
                      className="bg-gray-900 text-white p-4 rounded-lg shadow-lg hover:bg-gray-800 hover:text-gray-100"
                    >
                      <LayoutDashboard className="h-5 w-5" />
                      Admin
                    </Button>
                  </Link>
                )}
              </>
            ) : (
              <Link to="/login">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-gray-900 text-white p-4 rounded-lg shadow-lg hover:bg-gray-800 hover:text-gray-100"
                >
                  Sign In
                </Button>
                <span className="sr-only">Create Account</span>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile search input */}
        <div className="flex justify-center mt-4 lg:hidden sm:hidden md:hidden px-4 pb-4">
          <SearchInput
            searchValue={searchValue}
            onSearchChange={(e) => setSearchValue(e.target.value)}
            showResults={showResults}
            searchedProducts={searchedProducts}
            onProductClick={handleProductClick}
          />
        </div>
      </div>
    </header>
  );
}
