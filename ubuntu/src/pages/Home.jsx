import {
  Hero,
  AboutSection,
  FeaturedCategories,
  Trending,
  NewArrivals,
  InstagramFeatures,
} from "../components";
export default function HomePage() {
  return (
    <>
      {/* <body className="bg-red-500 sm:bg-indigo-400 md:bg-orange-500 lg:bg-yellow-500 xl:bg-sky-500"> */}
      <main>
        <Hero />
        <AboutSection />
        <FeaturedCategories />
        <Trending />
        {/* <Category2/> */}
        <NewArrivals />
        <InstagramFeatures />
      </main>
      {/* </body> */}
    </>
  );
}
