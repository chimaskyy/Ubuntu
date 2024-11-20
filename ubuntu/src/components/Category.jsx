// import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const categories = [
  {
    name: "New In",
    items: ["Latest Arrivals", "Trending Now", "Bestsellers"],
  },
  {
    name: "Men",
    items: ["Shirts", "Pants", "Accessories", "Undies"],
  },
  {
    name: "Women",
    items: ["Dresses", "Tops", "Pants", "Accessories"],
  },
  //   {
  //     name: "Kids",
  //     items: ["Boys", "Girls", "Babies", "School Uniforms"],
  //   },
  {
    name: "Accessories",
    items: ["Caps", "Sticks", "Hats", "Fans", "Belts"],
  },
  {
    name: "Shoes",
    items: ["Men's Shoes", "Women's Shoes"],
  },
];

export function CategoryNav() {
  return (
    <nav className="mt-8 sticky top-[74px] z-40 w-full bg-white border-b">
      <div className="container mx-auto px-4 flex justify-center mt-6">
        <NavigationMenu>
          <NavigationMenuList className="-ml-24 flex justify-center space-x-2 py-2 text-sm">
            {categories.map((category) => (
              <NavigationMenuItem key={category.name}>
                <NavigationMenuTrigger className="text-sm font-medium">
                  {category.name}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[300px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-4 col-span-2">
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
  );
}
