import Agbala from "../assets/agbala.jpg";

function FeaturedCategories() {
  const categories = [
    {
      title: "UBUNTU MEN",
      image: Agbala
    },
    {
      title: "UBUNTU WOMEN",
      image: Agbala
    },
    {
      title: "UBUNTU ACESSORIES",
      image: Agbala
    },
  ];

  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-2xl font-bold mb-8">Shop by Category</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map((category) => (
          <div
            key={category.title}
            className="relative group overflow-hidden"
          >
            <img
              src={category.image}
              alt={category.title}
              className="w-full h-[400px] object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <h3 className="text-white text-2xl font-bold">
                {category.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeaturedCategories;
