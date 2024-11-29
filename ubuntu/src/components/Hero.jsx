import { Link } from "react-router-dom";
import cover from "../assets/cover.jpg"

export function Hero() {
  return (
    <div
      className="relative h-[80vh] bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: `url(${cover})`,
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center py-16">
        <div className="text-white">
          <div className="mt-8 text-center">
            <h1 className="font-sans text-5xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white whitespace-nowrap">
              UBUNTU ELITE
            </h1>
            <p className="mt-2 text-sm text-white/80">
              TRADITIONALLY ROOTED, FOREVER ELITE
            </p>
          </div>
          <div className=" mt-12  w-full flex flex-col lg:flex-row justify-between items-start space-y-8 lg:space-y-0 lg:mt-24">
            <div className="lg:block max-w-xs sm:max-w-xs">
              <p className="text-lg sm:text-sm leading-relaxed text-white/80">
                Discover our collection of authentic African designs. Bringing
                authentic African fashion to the world with modern style and
                traditional beauty.
              </p>
            </div>
            <div></div>
            <div className="flex lg:ml-6">
              <Link
                to="/new-arival"
                a
                className="group inline-flex items-center gap-2 bg-transparent text-white px-6 py-2 rounded-full border-2 font-bold transition-transform hover:scale-105"
              >
                Start Shopping
                <svg
                  className="h-3 w-3 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
            </div>
            <div className="ml-4">
              <Link
                to="/head-wear"
                className="text-2xl font-sans md:text-xl lg:text-2xl font-extrabold text-white/90"
              >
                HEAD WEAR
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
