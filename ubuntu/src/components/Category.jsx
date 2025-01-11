// import Link from "next/link";
import { Link } from "react-router-dom";

const categories = [
  {
    name: "MEN",
    items: ["Shirts", "Pants", "Accessories", "Undies"],
  },
  {
    name: "KIDS",
    items: ["Boys", "Girls"],
  },
  {
    name: "FOOTINGS",
    items: ["Men's Shoes", "Women's Shoes"],
  },
  {
    name: "ACCESSORIES",
    items: ["Caps", "Sticks", "Hats", "Fans", "Belts"],
  },
  {
    name: "UNISEX SHORTS",
    items: ["Men's Shoes", "Women's Shoes"],
  },
  {
    name: "HIS & HERS",
    items: ["Men's Shoes", "Women's Shoes"],
  },
];
function CategoryNav() {
  return (
    <nav className="mt-8 sticky top-[74px] z-40 w-full bg-white border-b">
      <div className="lg:hidden overflow-x-auto pb-4 px-4 no-scrollbar md:px-16 lg:px-8">
        <div className="flex space-x-4 w-max">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={`/category/${category.name.toLowerCase()}`}
              className="flex-shrink-0 px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200 text-sm whitespace-nowrap"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>

      <nav className="idden lg:block bg-white shadow-sm ">
        <div className="container mx-auto px-4 max-w-7xl mx-auto lg:px-6">
          <Link className="hidden lg:flex justify-center">
            <ul className="flex justify-center space-x-16 py-4 -ml-16 mt-4 text-xs ">
              {categories.map((category) => (
                <li
                  className="hover:text-gray-900 hover:scale-105"
                  key={category.name}
                >
                  {category.name}
                </li>
              ))}
            </ul>
          </Link>
        </div>
      </nav>
    </nav>
  );
  // -ml-24 flex justify-center space-x-2 py-2 text-sm
}

export default CategoryNav;
