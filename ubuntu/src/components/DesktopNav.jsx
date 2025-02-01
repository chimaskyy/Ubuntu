import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { categories } from "@/Data/Categories";

export function DesktopNav() {
  return (
    <NavigationMenu className="hidden lg:flex">
      <NavigationMenuList>
        {categories.map((category) => (
          <NavigationMenuItem key={category.name}>
            <NavigationMenuTrigger className="text-xs h-9 px-4 text-gray-600 ">
              {category.name}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="w-[500px] p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Link
                      to={`/collection/${category.link}`}
                      className="block p-4 rounded-lg bg-gradient-to-br from-muted/50 to-muted hover:from-muted/60 hover:to-muted/60"
                    >
                      <h3 className="font-medium mb-1">{category.name}</h3>
                      <p className="text-sm text-muted-foreground">Shop All</p>
                    </Link>
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    {category.subcategory.map((item) => (
                      <Link
                        key={item}
                        to={`collection/${category.link}/${item
                          .toLowerCase()
                          .replace(" ", "-")}`}
                        className="block p-2 text-sm rounded-md hover:bg-accent"
                      >
                        {item}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
