import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import Link from "next/link";
import {
  Search,
  Heart,
  User,
  ShoppingCart,
  Menu,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/logo.jpg";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Link } from "react-router-dom";

const categories = [
  {
    name: "New In",
    items: ["Latest Arrivals", "Trending Now", "Bestsellers"],
  },
  {
    name: "MEN",
    items: ["Shirts", "Pants", "Accessories", "Undies"],
  },
  {
    name: "Kids",
    items: ["Boys", "Girls"],
  },
  {
    name: "FOOTINGS",
    items: ["Men's Shoes", "Women's Shoes"],
  },
  {
    name: "Accessories",
    items: ["Caps", "Sticks", "Hats", "Fans", "Belts"],
  },
  {
    name: "UNISEX SHORTS",
    items: ["Men's Shoes", "Women's Shoes"],
  },
  {
    name: "HIS & HERS",
    items: ["Men's Shoes", "Women's Shoes"],
  },
];

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { user } = useSelector((state) => state.user);
  const {items} = useSelector((state) => state.cart)
  console.log("loggedin user:", user);

  return (
    <header className="border-b pt-4 sticky top-0 z-50 w-full bg-white">
      <div className="container lg:mx-auto lg:px-4 max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16">
          <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                className="m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 lg:hidden"
                // onClick={toggleMenu}
                // aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
              >
                <Menu className="h-18 w-12" />
                <span className="sr-only">Toggle navigation menu</span>
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px] p-0">
              <div className="h-full overflow-y-auto py-4 px-2">
                <nav className="mt-18 flex flex-col space-y-2">
                  <div className="flex justify-center mt-4">
                    <a href="/" className="flex-shrink-0">
                      <img
                        src="https://scontent.flos5-3.fna.fbcdn.net/v/t39.30808-6/369696228_2053136978364665_5390676064914487004_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHqn7-2da7hlbPK4_Z7oiJYkYh0yVdKtGmRiHTJV0q0aTLV27I7tn8hQL2VJ9dMxsxqXi1jgKNkQOTOG67rhvHT&_nc_ohc=1z6KvXMxS90Q7kNvgH-vyjX&_nc_zt=23&_nc_ht=scontent.flos5-3.fna&_nc_gid=AFWMdGNmo_xQ28TcJ6QEY33&oh=00_AYB4CLPxl_JlZOEet5fr1psNueXrwbkWKNkTxuiAAB2aEQ&oe=67413503"
                        alt="Logo"
                        width={100}
                        height={100}
                      />
                    </a>
                  </div>
                  {categories.map((category) => (
                    <Collapsible key={category.name}>
                      <CollapsibleTrigger className="mt-6 flex items-center justify-between w-full p-2 text-left font-medium hover:bg-accent hover:text-accent-foreground rounded-md">
                        {category.name}
                        <ChevronDown className="h-4 w-4" />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="pl-4">
                        <ul className="space-y-2 py-2">
                          {category.items.map((item) => (
                            <li key={item}>
                              <a
                                href={`/${category.name.toLowerCase()}/${item
                                  .toLowerCase()
                                  .replace(" ", "-")}`}
                                className="block py-1 px-2 rounded hover:bg-accent hover:text-accent-foreground"
                                onClick={() => setIsSidebarOpen(false)}
                              >
                                {item}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </CollapsibleContent>
                    </Collapsible>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>

          <a href="/" className="flex-shrink-0">
            <img src={logo} alt="Logo" width={50} height={50} />
          </a>

          <div className="hidden lg:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Input
                type="search"
                placeholder="Search for products..."
                className="w-full pl-10"
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

      <nav className="border-t">
        <div className="container mx-auto px-4 max-w-7xl mx-auto lg:px-6">
          <NavigationMenu className="hidden lg:flex justify-center">
            <NavigationMenuList className="ml-36 mt-4 flex justify-center space-x-2 py-2 text-sm">
              {categories.map((category) => (
                <NavigationMenuItem key={category.name}>
                  <NavigationMenuTrigger className="text-xs uppercase">
                    {category.name}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                            href="/"
                          >
                            <div className="mb-2 mt-4 text-lg font-medium">
                              Featured Collection
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              Discover our latest styles for {category.name}
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      {category.items.map((item) => (
                        <li key={item}>
                          <NavigationMenuLink asChild>
                            <a
                              href={`/${category.name.toLowerCase()}/${item
                                .toLowerCase()
                                .replace(" ", "-")}`}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="text-sm font-medium leading-none">
                                {item}
                              </div>
                            </a>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </nav>
    </header>
  );
}
