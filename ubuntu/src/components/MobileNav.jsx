/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { AlignLeft, ChevronDown, Heart, User } from "lucide-react";
import { categories } from "@/Data/Categories";
import logo from "../assets/logo.jpg";
import Footer from "./Footer";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";

export function MobileNav({ user, isOpen, onOpenChange }) {
  return (
    <>
      <Sheet open={isOpen} onOpenChange={onOpenChange}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden">
            <AlignLeft className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] p-0">
          <ScrollArea className="h-full py-6 px-4">
            <div className="flex flex-col space-y-3 mb-6 mt-6">
              <Link to="/" className="flex-1 lg:flex-none text-center">
                <img src={logo} alt="Logo" className="h-12 w-auto mx-auto" />
              </Link>
              {user ? (
                <>
                  <Link
                    to={`/profile/${user.uid}`}
                    className="flex items-center space-x-2 px-2"
                  >
                    <User className="h-5 w-5" />
                    <span>My Account</span>
                  </Link>
                  <Link
                    to="/my-wishlist"
                    className="flex items-center space-x-2 px-2"
                  >
                    <Heart className="h-5 w-5" />
                    <span>My Wishlist</span>
                  </Link>
                  {user.role?.includes("admin") && (
                    <Link to="/admin">
                      <Button variant="default" className="w-full">
                        Admin Dashboard
                      </Button>
                    </Link>
                  )}
                </>
              ) : (
                <Link to="/login">
                  <Button variant="default" className="w-full">
                    Sign In
                  </Button>
                </Link>
              )}
            </div>
            <div className="space-y-2">
              {categories.map((category) => (
                <Collapsible key={category.name}>
                  <CollapsibleTrigger className="flex items-center text-xs justify-between w-full p-2 text-left font-medium hover:bg-accent rounded-md">
                    {category.name}
                    <ChevronDown className="h-4 w-4" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pl-4">
                    <ul className="space-y-1 py-2">
                      {category.items.map((item) => (
                        <li key={item}>
                          <Link
                            to={`${category.link}/${item
                              .toLowerCase()
                              .replace(" ", "-")}`}
                            className="block py-2 px-2 text-sm rounded hover:bg-accent"
                            onClick={() => onOpenChange(false)}
                          >
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
            <div className="border-t border-gray-500 mt-6 pt-4">
              <ul className="space-y-3 p-2 text-left  capitalize text-sm text-gray-900">
                <li>
                  <a href="#" className="">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="">
                    Terms of service
                  </a>
                </li>
                <li>
                  <a href="#" className="">
                    Shippng policy
                  </a>
                </li>
                <li>
                  <a href="#" className="">
                    Return policy
                  </a>
                </li>
              </ul>
            </div>
            <div className="flex justify-center space-x-6 mt-4">
              <a href="#" className="">
                <FaFacebook className="h-5 w-5" />
              </a>
              <a href="#" className="">
                <FaTiktok className="h-5 w-5" />
              </a>
              <a href="#" className="">
                <FaInstagram className="h-5 w-5" />
              </a>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </>
  );
}
