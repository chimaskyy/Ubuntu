/* eslint-disable react/prop-types */
import { useRef } from "react";
import { Search } from "lucide-react";

export default function SearchInput({
  searchValue,
  onSearchChange,
  showResults,
  searchedProducts,
  onProductClick,
}) {
  const searchRef = useRef(null);

  return (
    <div className="relative" ref={searchRef}>
      <input
        type="text"
        className="w-full border border-gray-300 rounded-full pl-10 pr-6 py-2 focus:outline-none"
        placeholder="Search products"
        value={searchValue}
        onChange={onSearchChange}
        onFocus={() => onSearchChange({ target: { value: searchValue } })} // Ensure results appear when focused
      />
      <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />

      {showResults && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
          {searchedProducts.length > 0 ? (
            searchedProducts.map((product) => (
              <div
                key={product.id}
                className="p-3 hover:bg-gray-50 cursor-pointer flex items-center gap-3"
                onClick={() => onProductClick(product.id)}
              >
                <p className="text-sm font-medium">{product.name}</p>
              </div>
            ))
          ) : (
            <div className="p-3 text-center text-gray-500">
              No products found
            </div>
          )}
        </div>
      )}
    </div>
  );
}
