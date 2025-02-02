/* eslint-disable react/prop-types */
import { Search } from "lucide-react";
import { Button } from "./button";
import { Input } from "./input";
import { useState } from "react";

function SearchInput({
  searchValue,
  onSearchChange,
  showResults,
  searchedProducts,
  onProductClick,
}) {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  return (
    <div className="relative">
      {isSearchVisible ? (
        <div className="fixed inset-0 bg-white z-50">
          <div className="max-w-7xl mx-auto px-4 py-2">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search for products..."
                className="w-full pl-10"
                value={searchValue}
                onChange={onSearchChange}
                autoFocus
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1.5"
                onClick={() => setIsSearchVisible(false)}
              >
                Cancel
              </Button>
            </div>
            {showResults && searchedProducts.length > 0 && (
              <div className="mt-2 max-h-[calc(100vh-120px)] overflow-y-auto">
                {searchedProducts.map((product) => (
                  <button
                    key={product.id}
                    className="w-full text-left px-4 py-3 hover:bg-accent flex items-center space-x-3"
                    onClick={() => {
                      onProductClick(product.id);
                      setIsSearchVisible(false);
                    }}
                  >
                    <img
                      src={product.imageUrls[0]}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium line-clamp-1 capitalize">{product.name}</p>
                      <p className="text-sm text-muted-foreground">
                        ₦{product.price.toLocaleString()}.00
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <button
          variant="ghost"
          size="icon"
          onClick={() => setIsSearchVisible(true)}
        >
          <Search className="h-7 w-7" />
          <span className="sr-only">Search products</span>
        </button>
      )}
    </div>
  );
}

export default SearchInput;
