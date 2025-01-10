import { Hero } from "@/components/Hero";
import  FeaturedCategories from "../components/FeaturedCategory";
import TrendingProducts from "../components/Trending";
import NewArrivals from "../components/NewArival";
import AboutSection from "../components/About";
import InstagramFeatures from "@/components/InstaView";
export default function RotatingHero() {
  return (
    <>
      {/* <body className="bg-red-500 sm:bg-indigo-400 md:bg-orange-500 lg:bg-yellow-500 xl:bg-sky-500"> */}
        <main>
          <Hero />
          <AboutSection />
          <FeaturedCategories />
          <TrendingProducts />
          {/* <Category2/> */}
          <NewArrivals />
          <InstagramFeatures />
        </main>
      {/* </body> */}
    </>
  );

};
