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
import { AlignLeft, Mail, ChevronDown, Heart, Phone, User } from "lucide-react";
import { categories } from "@/Data/Categories";
import logo from "../assets/logo.jpg";
import Footer from "./Footer";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";

export function MobileNav({ user, isOpen, onOpenChange }) {
  const handleLinkClick = () => {
    onOpenChange(false);
  };
  return (
    <>
      <Sheet open={isOpen} onOpenChange={onOpenChange}>
        <SheetTrigger asChild>
          <button variant="ghost" size="icon" className="ml-1 lg:hidden">
            <AlignLeft className="h-15 w-15" />
            <span className="sr-only">Toggle menu</span>
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] p-0">
          <ScrollArea className="h-full py-6 px-4">
            <div className="flex flex-col space-y-3 mb-6 mt-6">
              <Link
                to="/"
                onClick={handleLinkClick}
                className="flex-1 lg:flex-none text-center"
              >
                <img src={logo} alt="Logo" className="h-12 w-auto mx-auto" />
              </Link>
              {user ? (
                <>
                  <Link
                    to={`/profile/${user.uid}`}
                    onClick={handleLinkClick}
                    className="flex items-center space-x-2 px-2"
                  >
                    <User className="h-5 w-5" />
                    <span>My Account</span>
                  </Link>
                  <Link
                    to="/my-wishlist"
                    onClick={handleLinkClick}
                    className="flex items-center space-x-2 px-2"
                  >
                    <Heart className="h-5 w-5" />
                    <span>My Wishlist</span>
                  </Link>
                  {user.role?.includes("admin") && (
                    <Link to="/admin" onClick={handleLinkClick}>
                      <Button variant="default" className="w-full">
                        Admin Dashboard
                      </Button>
                    </Link>
                  )}
                </>
              ) : (
                <Link to="/login" onClick={handleLinkClick}>
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
                    <Link
                      to={`collection/${category.link}`}
                      onClick={handleLinkClick}
                    >
                      {category.name}
                    </Link>
                    <ChevronDown className="h-4 w-4" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pl-4">
                    <ul className="space-y-1 py-2">
                      {category.subcategory.map((item) => (
                        <li key={item}>
                          <Link
                            to={`collection/${category.link}/${item
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
            <div className="border-t border-gray-300 mt-6 pt-4">
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
            <div className="border-t border-gray-300 mt-4 pt-2"></div>
            <div className="flex flex-col mt-2 gap-4 text-sm text-gray-900 mt">
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5" />
                <span className="underline -ml-1">
                  <a href="tel:(+234)8166753751%E2%80%8B" target="_blank">
                    (+234) 8166753751
                  </a>
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5" />{" "}
                <span>
                  <a target="_blank" href="mailto:info@ubuntu.com">
                    contact@ubuntu.com
                  </a>{" "}
                </span>
              </div>
            </div>
            <div className="flex justify-center space-x-6 mt-6">
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
