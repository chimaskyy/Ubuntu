/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

function ImageCard({
  image,
  title,
  link,
  overlay = false,
  children,
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
      {children}
    </div>
  );
}
export default ImageCard;

