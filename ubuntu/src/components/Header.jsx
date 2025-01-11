import { useState } from "react";
import { Search, Heart, User, ShoppingCart } from "lucide-react";

import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/logo.jpg";
import { Link } from "react-router-dom";
import CategoryNav from "./Category";

export default function Header() {
  const { user } = useSelector((state) => state.user);
  const { items } = useSelector((state) => state.cart);

  return (
    <header className="border-b pt-4 sticky top-0 z-50 w-full bg-white">
      <div className="container lg:mx-auto lg:px-4 max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16 mx-4">
          <Link href="/" className="flex-shrink-0">
            <img src={logo} alt="Logo" width={50} height={50} />
          </Link>

          <div className="flex justify-center mt-4  px-4 pb-4">
            <div className="relative hidden lg:block">
              <Input
                type="search"
                placeholder="Search for products...."
                className="w-90% pl-10"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
            </div>
          </div>

          <div className="flex items-center pr-6 space-x-8">
            {user ? (
              <Link to="/profile">
                <button size="icon" className="lg:inline-flex">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Account</span>
                </button>
              </Link>
            ) : (
              <Link to="/sign-up">
                <button size="icon" className="lg:inline-flex">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Account</span>
                </button>
              </Link>
            )}

            <button size="icon">
              <Heart className="h-5 w-5" />
              <span className="sr-only">Wishlist</span>
            </button>
            <Link to="/cart">
              <button size="icon" className="relative">
                <ShoppingCart className="h-8 w-8" />
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {items.length}
                </span>
                <span className="sr-only">Cart</span>
              </button>
            </Link>
          </div>
        </div>

        <div className="flex justify-center mt-4 lg:hidden px-4 pb-4">
          <div className="relative">
            <Input
              type="search"
              placeholder="Search for products...."
              className="w-90% pl-10"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
          </div>
        </div>
      </div>
      <CategoryNav />
    </header>
  );
}
