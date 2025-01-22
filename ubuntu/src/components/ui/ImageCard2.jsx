/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";

export default function ImageCard2({ image, title, link }) {
  return (
    <div className="relative group overflow-hidden">
      <Link href={link}>
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 lg:text-lg">
          {title}
        </div>
      </Link>
    </div>
  );
}
