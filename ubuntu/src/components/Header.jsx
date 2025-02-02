// import { useEffect, useState } from "react";
// import { Heart, User, ShoppingCart, LayoutDashboard } from "lucide-react";
// import { useSelector } from "react-redux";

// import { Link, useNavigate } from "react-router-dom";
// import { Button } from "./ui/button";
// import SearchInput from "./ui/searchInput";

// export default function Header() {
//   const { user } = useSelector((state) => state.user);
//   const { products } = useSelector((state) => state.products);
//   const { items } = useSelector((state) => state.cart);
//   const [searchValue, setSearchValue] = useState("");
//   const [searchedProducts, setSearchedProducts] = useState([]);
//   const [showResults, setShowResults] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const debounce = setTimeout(() => {
//       if (searchValue) {
//         const search = products.filter((product) =>
//           product.name.toLowerCase().includes(searchValue.toLowerCase())
//         );
//         setSearchedProducts(search);
//         setShowResults(true);
//       } else {
//         setSearchedProducts([]);
//         setShowResults(false);
//       }
//     }, 300);

//     return () => clearTimeout(debounce);
//   }, [searchValue, products]);

//   const handleProductClick = (productId) => {
//     setShowResults(false);
//     setSearchValue("");
//     navigate(`/product/${productId}`);
//   };

//   return (
//     <header className="border-b pt-4 sticky top-0 z-50 w-full bg-white">
//       <div className="lg:mx-auto lg:px-4 max-w-7xl mx-auto">
//         <div className="flex items-center justify-between h-16 mx-4">
//           <Link to="/" className="flex-shrink-0">
//             <img src={logo} alt="Logo" width={50} height={50} />
//           </Link>

//           <div className="hidden flex justify-center mt-4 px-4 pb-4 md:block lg:block">
//             <SearchInput
//               searchValue={searchValue}
//               onSearchChange={(e) => setSearchValue(e.target.value)}
//               showResults={showResults}
//               searchedProducts={searchedProducts}
//               onProductClick={handleProductClick}
//             />
//           </div>

//           <div className="flex items-center pr-1 space-x-6">
//             <Link to="/my-wishlist">
//               <button size="icon">
//                 <Heart className="h-8 w-8" />
//                 <span className="sr-only">Wishlist</span>
//               </button>
//             </Link>
//             {user ? (
//               <Link to={`/cart/${user.uid}`}>
//                 <button size="icon" className="relative">
//                   <ShoppingCart className="h-8 w-8" />
//                   <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                     {items.length}
//                   </span>
//                   <span className="sr-only">Cart</span>
//                 </button>
//               </Link>
//             ) : (
//               <Link to="/cart">
//                 <button size="icon" className="relative">
//                   <ShoppingCart className="h-8 w-8" />
//                   <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                     {items.length}
//                   </span>
//                   <span className="sr-only">Cart</span>
//                 </button>
//               </Link>
//             )}

//             {user ? (
//               <>
//                 <Link to={`/profile/${user?.uid}`}>
//                   <button size="icon" className="lg:inline-flex">
//                     <User className="h-5 w-5" />
//                     <span className="sr-only">Account</span>
//                   </button>
//                 </Link>
//                 {user.role?.includes("admin") && (
//                   <Link to="/admin">
//                     <Button
//                       size="sm"
//                       className="bg-gray-900 text-white p-4 rounded-lg shadow-lg hover:bg-gray-800 hover:text-gray-100"
//                     >
//                       <LayoutDashboard className="h-5 w-5" />
//                       Admin
//                     </Button>
//                   </Link>
//                 )}
//               </>
//             ) : (
//               <Link to="/login">
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   className="bg-gray-900 text-white p-4 rounded-lg shadow-lg hover:bg-gray-800 hover:text-gray-100"
//                 >
//                   Sign In
//                 </Button>
//                 <span className="sr-only">Create Account</span>
//               </Link>
//             )}
//           </div>
//         </div>

//         {/* Mobile search input */}
//         <div className="flex justify-center mt-4 lg:hidden sm:hidden md:block px-4 pb-4">
//           <SearchInput
//             searchValue={searchValue}
//             onSearchChange={(e) => setSearchValue(e.target.value)}
//             showResults={showResults}
//             searchedProducts={searchedProducts}
//             onProductClick={handleProductClick}
//           />
//         </div>
//       </div>
//     </header>
//   );
// }

// import { useEffect, useState } from "react";
// import { Heart, User, ShoppingCart, Menu, AlignLeft, ChevronDown, Search } from "lucide-react";
// import { useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { Button } from "./ui/button";
// import SearchInput from "./ui/searchInput";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "@/components/ui/collapsible";
// import {
//   NavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   NavigationMenuTrigger,
// } from "@/components/ui/navigation-menu";

// const categories = [
//   {
//     name: "MEN",
//     items: ["Shirts", "Pants", "Accessories", "Undies"],
//     link: "/men",
//   },
//   {
//     name: "KIDS",
//     items: ["Boys", "Girls"],
//     link: "/kids",
//   },
//   {
//     name: "FOOTINGS",
//     items: ["Men's Shoes", "Women's Shoes"],
//     link: "/footings",
//   },
//   {
//     name: "ACCESSORIES",
//     items: ["Caps", "Sticks", "Hats", "Fans", "Belts"],
//     link: "/accessories",
//   },
//   {
//     name: "UNISEX SHORTS",
//     items: ["Men's Shoes", "Women's Shoes"],
//     link: "/unisex-shorts",
//   },
//   {
//     name: "HIS & HERS",
//     items: ["Men's Shoes", "Women's Shoes"],
//     link: "/his-hers",
//   },
// ];
// function Header() {
//   const { user } = useSelector((state) => state.user);
//   const { products } = useSelector((state) => state.products);
//   const { items } = useSelector((state) => state.cart);
//   const [searchValue, setSearchValue] = useState("");
//   const [searchedProducts, setSearchedProducts] = useState([]);
//   const [showResults, setShowResults] = useState(false);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const debounce = setTimeout(() => {
//       if (searchValue) {
//         const search = products.filter((product) =>
//           product.name.toLowerCase().includes(searchValue.toLowerCase())
//         );
//         setSearchedProducts(search);
//         setShowResults(true);
//       } else {
//         setSearchedProducts([]);
//         setShowResults(false);
//       }
//     }, 300);

//     return () => clearTimeout(debounce);
//   }, [searchValue, products]);

//   const handleProductClick = (productId) => {
//     setShowResults(false);
//     setSearchValue("");
//     navigate(`/product/${productId}`);
//   };

//   return (
//     <header className="border-b pt-4 sticky top-0 z-50 w-full bg-white">
//       <div className="container mx-auto px-4">
//         <div className="flex items-center justify-between h-16">
//           <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
//             <SheetTrigger asChild>
//               <Button variant="ghost" size="icon" className="lg:hidden">
//                 <AlignLeft className="h-6 w-6" />
//                 <span className="sr-only">Toggle navigation menu</span>
//               </Button>
//             </SheetTrigger>
//             <SheetContent side="left" className="w-[300px] sm:w-[400px] p-0">
//               <div className="h-full overflow-y-auto py-4 px-2">
//                 <div className="">
//                   {user ? (
//                     <>
//                       <Link to={`/profile/${user?.uid}`}>
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           className="lg:inline-flex"
//                         >
//                           <User className="h-5 w-5" />
//                           <span>Profile</span>
//                           <span className="sr-only">Account</span>
//                         </Button>
//                       </Link>
//                       <Link to="/my-wishlist">
//                         <Button variant="ghost" size="icon">
//                           <Heart className="h-5 w-5" />
//                           <span>Wishlist</span>
//                           <span className="sr-only">Wishlist</span>
//                         </Button>
//                       </Link>
//                       {user.role?.includes("admin") && (
//                         <Link to="/admin">
//                           <Button
//                             size="sm"
//                             className="bg-gray-900 text-white rounded-lg shadow-lg hover:bg-gray-800 hover:text-gray-100"
//                           >
//                             Admin
//                           </Button>
//                         </Link>
//                       )}
//                     </>
//                   ) : (
//                     <>
//                       <Link to="/my-wishlist">
//                         <Button variant="ghost" size="icon">
//                           <Heart className="h-5 w-5" />
//                           <span>Wishlist</span>
//                           <span className="sr-only">Wishlist</span>
//                         </Button>
//                       </Link>
//                       <Link to="/login">
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           className="bg-gray-900 text-white rounded-lg shadow-lg hover:bg-gray-800 hover:text-gray-100"
//                         >
//                           Sign In
//                         </Button>
//                       </Link>
//                     </>
//                   )}
//                 </div>
//                 <nav className="flex flex-col space-y-2">
//                   {categories.map((category) => (
//                     <Collapsible key={category.name}>
//                       <CollapsibleTrigger className="flex items-center justify-between w-full p-2 text-left font-medium hover:bg-accent hover:text-accent-foreground rounded-md">
//                         {category.name}
//                         <ChevronDown className="h-4 w-4" />
//                       </CollapsibleTrigger>
//                       <CollapsibleContent className="pl-4">
//                         <ul className="space-y-2 py-2">
//                           {category.items.map((item) => (
//                             <li key={item}>
//                               <Link
//                                 to={`/${category.name.toLowerCase()}/${item
//                                   .toLowerCase()
//                                   .replace(" ", "-")}`}
//                                 className="block py-1 px-2 rounded hover:bg-accent hover:text-accent-foreground"
//                                 onClick={() => setIsSidebarOpen(false)}
//                               >
//                                 {item}
//                               </Link>
//                             </li>
//                           ))}
//                         </ul>
//                       </CollapsibleContent>
//                     </Collapsible>
//                   ))}
//                 </nav>
//               </div>
//             </SheetContent>
//           </Sheet>

//           <Link to="/" className="flex flex-shrink-0">
//             <img src={logo} alt="Logo" width={50} height={50} />
//           </Link>

//           <div className="hidden lg:flex flex-1 max-w-xl mx-8">
//             <SearchInput
//               searchValue={searchValue}
//               onSearchChange={(e) => setSearchValue(e.target.value)}
//               showResults={showResults}
//               searchedProducts={searchedProducts}
//               onProductClick={handleProductClick}
//             />
//           </div>

//           <div className="flex items-center space-x-4">
//             {user ? (
//               <>
//                 {/* <Link to={`/profile/${user?.uid}`}>
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     className="lg:inline-flex"
//                   >
//                     <User className="h-5 w-5" />
//                     <span className="sr-only">Account</span>
//                   </Button>
//                 </Link> */}
//                 {/* <Link to="/my-wishlist">
//                   <Button variant="ghost" size="icon">
//                     <Heart className="h-5 w-5" />
//                     <span className="sr-only">Wishlist</span>
//                   </Button>
//                 </Link> */}
//                 <Search/>
//                 <Link to={`/cart/${user.uid}`}>
//                   <Button variant="ghost" size="icon" className="relative">
//                     <ShoppingCart className="h-5 w-5" />
//                     <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                       {items.length}
//                     </span>
//                     <span className="sr-only">Cart</span>
//                   </Button>
//                 </Link>
//                 {/* {user.role?.includes("admin") && (
//                   <Link to="/admin">
//                     <Button
//                       size="sm"
//                       className="bg-gray-900 text-white rounded-lg shadow-lg hover:bg-gray-800 hover:text-gray-100"
//                     >
//                       Admin
//                     </Button>
//                   </Link>
//                 )} */}
//               </>
//             ) : (
//               <>
//                 {/* <Link to="/login">
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     className="bg-gray-900 text-white rounded-lg shadow-lg hover:bg-gray-800 hover:text-gray-100"
//                   >
//                     Sign In
//                   </Button>
//                 </Link> */}
//                 <Search/>
//                 {/* <Link to="/my-wishlist">
//                   <Button variant="ghost" size="icon">
//                     <Heart className="h-5 w-5" />
//                     <span className="sr-only">Wishlist</span>
//                   </Button>
//                 </Link> */}
//                 <Link to="/cart">
//                   <Button variant="ghost" size="icon" className="relative">
//                     <ShoppingCart className="h-5 w-5" />
//                     <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                       {items.length}
//                     </span>
//                     <span className="sr-only">Cart</span>
//                   </Button>
//                 </Link>
//               </>
//             )}
//           </div>
//         </div>

//         {/* <div className="lg:hidden px-4 pb-4">
//           <SearchInput
//             searchValue={searchValue}
//             onSearchChange={(e) => setSearchValue(e.target.value)}
//             showResults={showResults}
//             searchedProducts={searchedProducts}
//             onProductClick={handleProductClick}
//           />
//         </div> */}
//       </div>

//       <nav className="border-t">
//         <div className="container mx-auto px-4">
//           <NavigationMenu className="hidden lg:flex justify-center">
//             <NavigationMenuList>
//               {categories.map((category) => (
//                 <NavigationMenuItem key={category.name}>
//                   <NavigationMenuTrigger className="text-sm uppercase">
//                     {category.name}
//                   </NavigationMenuTrigger>
//                   <NavigationMenuContent>
//                     <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
//                       <li className="row-span-3">
//                         <NavigationMenuLink asChild>
//                           <Link
//                             to={category.link}
//                             className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
//                           >
//                             <div className="mb-2 mt-4 text-lg font-medium">
//                               {category.name} Collection
//                             </div>
//                             <p className="text-sm leading-tight text-muted-foreground">
//                               Discover our latest styles
//                             </p>
//                           </Link>
//                         </NavigationMenuLink>
//                       </li>
//                       {category.items.map((item) => (
//                         <li key={item}>
//                           <NavigationMenuLink asChild>
//                             <Link
//                               to={`${category.link}/${item
//                                 .toLowerCase()
//                                 .replace(" ", "-")}`}
//                               className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
//                             >
//                               <div className="text-sm font-medium leading-none">
//                                 {item}
//                               </div>
//                             </Link>
//                           </NavigationMenuLink>
//                         </li>
//                       ))}
//                     </ul>
//                   </NavigationMenuContent>
//                 </NavigationMenuItem>
//               ))}
//             </NavigationMenuList>
//           </NavigationMenu>
//         </div>
//       </nav>
//     </header>
//   );
// }

// export default Header;

import { useState } from "react";
import logo from "../assets/logo.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ShoppingCart, User, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/MobileNav";
import { DesktopNav } from "@/components/DesktopNav";
import SearchDialog from "@/components/ui/searchDiaglog";

export default function Header() {
  const { user } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.products);
  const { items } = useSelector((state) => state.cart);
  const [searchValue, setSearchValue] = useState("");
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (value) => {
    setSearchValue(value);
    if (value) {
      const results = products.filter((product) =>
        product.name.toLowerCase().includes(value.toLowerCase())
      );
      setSearchedProducts(results);
      setShowResults(true);
    } else {
      setSearchedProducts([]);
      setShowResults(false);
    }
  };

  const handleProductClick = (productId) => {
    setShowResults(false);
    setSearchValue("");
    navigate(`/product/${productId}`);
  };

  return (
    <header className=" sticky top-0 z-50 w-full bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:mx-1">
        <div className="flex h-16 items-center justify-between">
          <div className="lg:hidden flex items-center gap-4">
            <MobileNav
              user={user}
              isOpen={isSidebarOpen}
              onOpenChange={setIsSidebarOpen}
            />
          </div>
          {/* <Link to="/" className="flex-1 lg:flex-none text-center lg:text-left text-2xl font-bold tracking-widest">
          <h1>
            UBUNTU 
          </h1>
          </Link> */}
          <Link to="/" className="flex-1 lg:flex-none text-center">
            <img src={logo} alt="Logo" className="h-12 w-auto mx-auto" />
          </Link>

          {/* <div className="hidden lg:flex flex-1 justify-center">
            <DesktopNav />
          </div> */}

          <div className="flex items-center gap-5 lg:gap-8">
            <SearchDialog
              searchValue={searchValue}
              onSearchChange={(e) => handleSearch(e.target.value)}
              showResults={showResults}
              searchedProducts={searchedProducts}
              onProductClick={handleProductClick}
            />

            <Link
              to={user ? `/profile/${user.uid}` : "/login"}
              className="flex items-center space-x-2 px-2"
            >
              <User className="h-5 w-5" />
              <span className="sr-only">My Account</span>
            </Link>

            <Link to={user ? `/cart/${user.uid}` : "/cart"}>
              <button variant="ghost" size="icon" className="relative mt-2">
                <ShoppingCart className="h-10 w-6" />
                {items.length > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 min-w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center px-1">
                    {items.length}
                  </span>
                )}
                <span className="sr-only">Cart</span>
              </button>
            </Link>
            <div className="hidden lg:flex items-center gap-4">
              {user && user.role?.includes("admin") && (
                <Link to="/admin">
                  <Button
                    size="lg"
                    className="bg-gray-900 text-white p-4 rounded-lg shadow-lg hover:bg-gray-800 hover:text-gray-100"
                  >
                    <LayoutDashboard className="h-5 w-5" />
                    Admin Dashboard
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
