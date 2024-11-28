"use client";

import { useRef } from "react";
// import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Agbala from "../assets/agbala.jpg";
const products = [
  {
    id: 1,
    name: "LIYA WOMEN'S AFRICAN PRINT MAXI DRESS (MIDNIGHT TEAL ABSTRACT)",
    price: "186,700.00",
    image: Agbala,
  },
  {
    id: 2,
    name: "AADAN MEN'S AFRICAN PRINT BLAZER (MIDNIGHT TEAL ABSTRACT)",
    price: "289,400.00",
    image: Agbala,
  },
  {
    id: 3,
    name: "ODION MEN'S AFRICAN PRINT TROUSERS (MIDNIGHT TEAL ABSTRACT)",
    price: "118,200.00",
    image: Agbala,
  },
  {
    id: 4,
    name: "HASSIA WOMEN'S AFRICAN PRINT STRETCH DRESS WITH TULLE",
    price: "186,700.00",
    image: Agbala,
  },
  {
    id: 5,
    name: "AFRICAN PRINT HEADWRAP/SCARF (MIDNIGHT TEAL ABSTRACT)",
    price: "42,900.00",
    image: Agbala,
  },
];

export default function Component() {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-full py-12 bg-white relative">
      <h2 className="text-2xl font-bold mb-8 ml-12">SHOP BEST SELLERS</h2>
      <div className="container px-4 md:px-6">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="icon"
            className="hidden absolute left-4 top-1/2 transform -translate-y-1/2 z-10 lg:block"
            onClick={() => scroll("left")}
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
          </Button>
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto space-x-2 pb-4 scrollbar-hide"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {products.map((product) => (
              <Card
                key={product.id}
                className="flex-none w-[250px] group overflow-hidden border-0"
                style={{ scrollSnapAlign: "start" }}
              >
                <CardHeader className="border-b p-0">
                  <a
                    href={`/products/${product.id}`}
                    className="block overflow-hidden"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="aspect-[3/4] object-cover transition-transform duration-300 group-hover:scale-105"
                      width={250}
                      height={333}
                    />
                  </a>
                </CardHeader>
                <CardContent className="p-4">
                  <a href={`/products/${product.id}`}>
                    <h3 className="capitalize text-sm font-medium leading-tight tracking-tight text-gray-900 line-clamp-2 hover:underline">
                      {product.name}
                    </h3>
                  </a>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <div className="flex items-center justify-between w-full">
                    <p className="text-base font-semibold text-gray-900">
                      ₦{product.price}
                    </p>
                    <Button variant="outline" size="sm">
                      Add to Cart
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
          <Button
            variant="outline"
            size="icon"
            className="hidden absolute right-6 top-1/2 transform -translate-y-1/2 z-10 lg:block"
            onClick={() => scroll("right")}
            aria-label="Scroll right"
          >
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
        <div className="mt-12 text-center">
          <Button size="lg" className="bg-black text-white hover:bg-gray-900">
            SHOP THE COLLECTION
          </Button>
        </div>
      </div>
    </section>
  );
}
