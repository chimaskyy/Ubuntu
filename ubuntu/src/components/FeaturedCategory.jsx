import { Link } from "react-router-dom";
import foto from "../assets/pinkkyyy.jpg";

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
    <section className="container mx-auto px-4 py-16">
      <div className="max-w-7xl mx-auto lg:px-6">
        <h2 className="text-2xl font-bold mb-8">Featured Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:grid-cols-4">
          {categories.map((category) => (
            <div
              key={category.title}
              className="relative group overflow-hidden"
            >
              <Link to={category.page}>
                <img
                  src={category.image}
                  alt={category.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h3 className="text-white text-sm lg:text-2xl font-bold whitespace-nowrap">
                    {category.title}
                  </h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedCategories;
