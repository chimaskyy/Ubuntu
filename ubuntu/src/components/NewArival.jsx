import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { fetchProducts } from "@/reducers/productSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./ui/productCard";

const NewArrivals = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts({ category: "all" }));
    }
  }, [dispatch, products.length]);

  return (
    <section className="container mx-auto px-2 py-16 lg:px-2">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          New Arrivals
        </h2>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button
            asChild
            size="lg"
            className="bg-black text-white hover:bg-gray-900 transform transition-transform hover:scale-105"
          >
            <Link to="/new-arrival">SHOP NEW ARRIVALS</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
