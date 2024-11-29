import { Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import foto from "../assets/pinkkyyy.jpg"

const products = [
  {
    id: 1,
    name: "Ankara Maxi Dress",
    price: "129.99",
    image: foto,
    quantity: 10,
  },
  {
    id: 2,
    name: "African Print Blazer",
    price: "149.99",
    image: foto,
    quantity: 10,
  },
  {
    id: 3,
    name: "Kente Cloth Bag",
    price: "79.99",
    image: foto,
    quantity: 10,
  },
  {
    id: 4,
    name: "Tribal Pattern Scarf",
    price: "39.99",
    image: foto,
    quantity: 10,
  },
  {
    id: 5,
    name: "Tribal Pattern Scarf",
    price: "39.99",
    image: foto,
    quantity: 10,
  },
];

export function NewArrivals() {
  return (
    <section className="py-16">
      <div className="container max-w-7xl mx-auto lg:px-6  px-4 md:px-6">
        <h2 className="text-3xl font-bold text-left mb-12">New Arrivals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group">
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover"
                  width={400}
                  height={600}
                />
                <button
                  className="absolute top-4 right-4 p-2 rounded-full bg-white text-gray-700 hover:text-red-500 transition-colors duration-200"
                  aria-label={`Add ${product.name} to wishlist`}
                >
                  <Heart className="h-5 w-5" />
                </button>
              </div>
              <div className="pt-4">
                <Link to={`/product-page`} className="block">
                  <h3 className="text-sm font-medium leading-tight tracking-tight text-gray-900 line-clamp-2 group-hover:underline">
                    {product.name}
                  </h3>
                </Link>
              </div>
              <div className="flex items-center justify-between w-full mt-2">
                <p className="text-base font-semibold text-gray-900">
                  ₦{product.price}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button
            asChild
            size="lg"
            className="bg-black text-white hover:bg-gray-900"
          >
            <Link href="/new-arrivals">SHOP NEW ARRIVALS</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default NewArrivals;
