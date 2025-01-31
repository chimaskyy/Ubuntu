/* eslint-disable react/prop-types */
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Search } from "lucide-react";
import { Button } from "./button";
import { Input } from "./input";

function SearchDialog({
  searchValue,
  onSearchChange,
  showResults,
  searchedProducts,
  onProductClick,
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Search className="h-5 w-5" />
          <span className="sr-only">Search products</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-0">
        <div className="p-4 pb-0">
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
          </div>
        </div>
        {showResults && searchedProducts.length > 0 && (
          <div className="border-t mt-4 max-h-[60vh] overflow-auto">
            {searchedProducts.map((product) => (
              <button
                key={product.id}
                className="w-full text-left px-4 py-3 hover:bg-accent flex items-center space-x-3"
                onClick={() => onProductClick(product.id)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-12 h-12 object-cover rounded"
                />
                <div>
                  <p className="font-medium line-clamp-1">{product.name}</p>
                  <p className="text-sm text-muted-foreground">
                    ${product.price}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default SearchDialog;
