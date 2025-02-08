import { Link } from "react-router-dom";
import cover from "../assets/cover.jpg";

function Hero() {
  return (
    <div
      className="relative h-[40vh] bg-cover bg-center overflow-hidden sm:h-[60vh] md:h-[60vh] lg:h-[100vh] xl:h-[100vh]"
      style={{
        backgroundImage: `url(${cover})`,
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center py-16">
        <div className="text-white">
          <div className="mt-24 text-center sm:mt-16 md:mt-6">
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white whitespace-nowrap">
              UBUNTU ELITE
            </h1>
            <p className="mt-2 text-sm md:text-base text-white/80">
              TRADITIONALLY ROOTED, FOREVER ELITE
            </p>
          </div>
          <div className="mt-8 mb-4 md:mt-6 w-full flex flex-col md:flex-row justify-between items-start space-y-8 md:space-y-0 lg:mt-32">
            <div className="hidden  md:w-1/3 max-w-xs lg:block">
              <p className="text-sm md:text-base leading-relaxed text-white/80">
                Discover our collection of authentic African designs. Bringing
                authentic African fashion to the world with modern style and
                traditional beauty.
              </p>
            </div>
            <div className=" flex justify-center md:pt-8 md:pl-12">
              <Link
                to="/collection"
                className="group inline-flex items-center gap-2 bg-transparent text-white px-6 py-2 rounded-full border-2 font-bold transition-transform hover:scale-105 text-sm md:text-base"
              >
                Start Shopping
                <svg
                  className="h-3 md:text-xs w-3 md:h-4 md:w-4 transition-transform group-hover:translate-x-1"
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
            <div className=" md:w-1/3 md:pt-8 text-right">
              <Link
                to="collection/accessories/caps"
                className="text-sm ml-8 md:text-2xl lg:text-2xl font-sans font-extrabold text-white/90"
              >
                HEAD WEARS
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Hero;
