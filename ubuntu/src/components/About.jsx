"use client";

import { Link } from "react-router-dom";
import videoSrc from "../assets/story2.mp4";

export default function AboutSection() {
  return (
    <section className="flex justify-center items-center py-16 bg-gray-100">
      <div className="container mx-auto flex flex-col md:flex-row items-center max-w-4xl">
        <div className="w-full md:w-5/12 p-4">
          <div className="aspect-w-24 aspect-h-9 bg-gray-300">
            <video
              className="w-full h-full object-cover"
              autoPlay
              controls
              loop
              muted
              // src={videoSrc}
              src="https://cdn.pixabay.com/video/2021/07/14/81496-576306063_tiny.mp4"
              aria-label="Brand Story Video"
            />
          </div>
        </div>
        <div className="w-full md:w-5/12 p-4">
          <h2 className="text-xl font-bold mb-4">PROUDLY MADE IN NIGERIA</h2>
          <p className="mb-4 text-lg lg:text-sm">
            UbuntuElite is a Nigeria-owned, ready-to-wear African-inspired
            clothing brand offering quality, on-trend fashion at affordable
            prices.
          </p>
          <Link
            href="/our-story"
            className="text-blue-600 hover:underline text-sm"
          >
            OUR STORY
          </Link>
        </div>
      </div>
    </section>
  );
}
