/* eslint-disable react/prop-types */
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

function ImageCard({
  image,
  title,
  link,
  overlay = false,
  product,
  isInWishlist = false,
  onWishlistToggle,
  className = "",
}) {
  return (
    <div className={`relative group overflow-hidden ${className}`}>
      <Link to={link}>
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {overlay && (
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <h3 className="text-white text-sm lg:text-2xl font-bold whitespace-nowrap">
              {title}
            </h3>
          </div>
        )}
      </Link>

      {/* Wishlist Button */}
      <button
        onClick={onWishlistToggle}
        className={`absolute top-4 right-4 p-2 rounded-full bg-white ${
          isInWishlist ? "text-red-500" : "text-gray-700"
        } hover:text-red-500 transition-colors duration-200`}
        aria-label={`${isInWishlist ? "Remove from" : "Add to"} ${
          product?.name || "item"
        } wishlist`}
      >
        <Heart className={`h-5 w-5 ${isInWishlist ? "fill-red-500" : ""}`} />
        <span className="sr-only">
          {isInWishlist ? "Remove from" : "Add to"} wishlist
        </span>
      </button>
    </div>
  );
}

export default ImageCard;
