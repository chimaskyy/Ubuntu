import { Heart } from "lucide-react";
import cloth from "../../assets/cloth1.jpg";
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

const products = [
  {
    id: 1,
    name: "Bell Sleeve Dress",
    image: cloth,
    price: "199.99",
  },
  {
    id: 2,
    name: "Head Wrap",
    image: cloth,
    price: "49.99",
  },
  {
    id: 3,
    name: "African Print Jacket",
    image: cloth,
    price: "249.99",
  },
  {
    id: 4,
    name: "Evening Dress",
    image: cloth,
    price: "$299.99",
  },
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold uppercase text-gray-900 sm:text-3xl mb-4">
            shop ubuntu Accessories
          </h1>
          <p className="text-gray-600 text-xs max-w-3xl mx-auto">
            Ubuntu accessories are the perfect addition to your wardrobe!
            Add bold African print accessories to all your outfits with our selection of
            bags and wallets, print head wears,
           and more!. Our collection features unique
            African print accessories that add a touch of cultural flair to any
            ensemble. Shop our full selection below.
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

            <Select>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low-high">Low to High</SelectItem>
                <SelectItem value="high-low">High to Low</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Product type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dresses">Dresses</SelectItem>
                <SelectItem value="tops">Tops</SelectItem>
                <SelectItem value="bottoms">Bottoms</SelectItem>
                <SelectItem value="accessories">Accessories</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Sort By</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Newest</DropdownMenuItem>
              <DropdownMenuItem>Price: Low to High</DropdownMenuItem>
              <DropdownMenuItem>Price: High to Low</DropdownMenuItem>
              <DropdownMenuItem>Most Popular</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-200">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full pbject-cover"
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
              </div>
              <div className="mt-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    <a href={`/products/${product.id}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
                  </h3>
                </div>
                <div className="flex items-center justify-between w-full">
                  <p className="text-base font-semibold text-gray-900">
                    ₦{product.price}
                  </p>
                  <Button variant="outline" size="sm">
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
