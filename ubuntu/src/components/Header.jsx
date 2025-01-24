/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from "react";
import {
  Search,
  Heart,
  User,
  ShoppingCart,
  LayoutDashboard,
} from "lucide-react";
import { useSelector } from "react-redux";
import logo from "../assets/logo.jpg";
import { Link, useNavigate } from "react-router-dom";
import CategoryNav from "./Category";
import { Button } from "./ui/button";

export default function Header() {
  const { user } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.products);
  const { items } = useSelector((state) => state.cart);
  const [searchValue, setsearchValue] = useState("");
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
    setsearchValue("");
    navigate(`/product/${productId}`);
  };

  const handleSearchChange = (e) => {
    setsearchValue(e.target.value);
  };

  const SearchResults = () => (
    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
      {searchedProducts.length > 0 ? (
        searchedProducts.map((product) => (
          <div
            key={product.id}
            className="p-3 hover:bg-gray-50 cursor-pointer flex items-center gap-3"
            onClick={() => handleProductClick(product.id)}
          >
            <div>
              <p className="text-sm font-medium">{product.name}</p>
            </div>
          </div>
        ))
      ) : (
        <div className="p-3 text-center text-gray-500">No products found</div>
      )}
    </div>
  );

  const SearchInput = () => {
    // useEffect(() => {
    //   if (inputRef.current) {
    //     inputRef.current.focus();
    //   }
    // }, [searchValue]);

    return (
      <div className="relative" ref={searchRef}>
        <input
          ref={inputRef}
          type="text"
          className={`w-full border border-gray-300 rounded-full pl-10 pr-6 py-2 focus:outline-none`}
          placeholder="Search products"
          value={searchValue}
          onChange={handleSearchChange}
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
        {showResults && <SearchResults />}
      </div>
    );
  };

  return (
    <header className="border-b pt-4 sticky top-0 z-50 w-full bg-white w-full">
      <div className=" lg:mx-auto lg:px-4 max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16 mx-4">
          <Link to="/" className="flex-shrink-0">
            <img src={logo} alt="Logo" width={50} height={50} />
          </Link>

          <div className="hidden flex justify-center mt-4 px-4 pb-4 md:block lg:block">
            <div className="relative lg:block">
              <SearchInput className="sm:py-2 sm:w-72 md:py-1 md:w-80" />
            </div>
          </div>

          <div className="flex items-center pr-6 space-x-6">
            <Link to="/my-wishlist">
              <button size="icon">
                <Heart className="h-5 w-5" />
                <span className="sr-only">Wishlist</span>
              </button>
            </Link>
            <Link to="/cart">
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
                <Link to="/profile">
                  <button size="icon" className="lg:inline-flex">
                    <User className="h-5 w-5" />
                    <span className="sr-only">Account</span>
                  </button>
                </Link>
                {user && user.role && user.role.includes("admin") && (
                  <Link to="/admin">
                    <Button size="lg" className="lg:inline-flex">
                      {/* <LayoutDashboard className="h-5 w-5" /> */}
                      Admin Dashboard
                    </Button>
                  </Link>
                )}
              </>
            ) : (
              <Link to="/login">
                {/* <button size="icon" className="lg:inline-flex"> */}
                {/* <User className="h-5 w-5" /> */}
                <Button
                  // variant="outline"
                  size="sm"
                  className="flex items-center text-xs rounded-full border border-gray-700"
                >
                  Sign In
                </Button>
                <span className="sr-only">Create Account</span>
                {/* </button> */}
              </Link>
            )}
          </div>
        </div>

        <div className="flex justify-center mt-4 lg:hidden sm:hidden md:hidden px-4 pb-4">
          <SearchInput className="sm:py-2 sm:w-72 md:py-1 md:w-80 " />
        </div>
      </div>
    </header>
  );
}
