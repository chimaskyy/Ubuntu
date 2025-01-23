/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";

export default function ImageCard2({ image, title, link }) {
  return (
    <div className="relative group overflow-hidden">
      <Link to={link}>
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Overlay is now always visible */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-xs font-bold lg:text-lg">
          {title}
        </div>
      </Link>
    </div>
  );
}
