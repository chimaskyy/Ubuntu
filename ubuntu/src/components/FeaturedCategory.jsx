import { Link } from "react-router-dom";
import foto from "../assets/pinkkyyy.jpg";
import CategoryCard from "./ui/CategoryCard";

function FeaturedCategories() {
  const categories = [
    {
      title: "UBUNTU MEN",
      image: foto,
      page: "/men",
    },
    {
      title: "UBUNTU UNISEX",
      image: foto,
      page: "/unisex-shorts",
    },
    {
      title: "UBUNTU ACESSORIES",
      image: foto,
      page: "/acessories",
    },
    {
      title: "UBUNTU FOOTINGS",
      image: foto,
      page: "/footings",
    },
  ];

  return (
    <section className="container mx-auto px-2 py-16">
      <div className="max-w-7xl mx-auto lg:px-6">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Featured Category
        </h2>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 lg:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard key={category.title} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedCategories;
