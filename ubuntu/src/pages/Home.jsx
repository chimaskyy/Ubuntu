import {
  Hero,
  AboutSection,
  FeaturedCategories,
  Trending,
  NewArrivals,
  InstagramFeatures,
  CatgoryNav,
  GetFeatured,
} from "../components";
import { DesktopNav } from "@/components/DesktopNav";
import WhatsAppButton from "@/components/ui/whatsAppButton";
export default function HomePage() {
  return (
    <>
      {/* <body className="bg-red-500 sm:bg-indigo-400 md:bg-orange-500 lg:bg-yellow-500 xl:bg-sky-500"> */}
      <main>
        <div className="hidden lg:flex flex-1 justify-center m-6">
          <DesktopNav />
        </div>
        <Hero />
        <AboutSection />
        <WhatsAppButton />
        <FeaturedCategories />
        <Trending />
        {/* <Category2/> */}
        <NewArrivals />
        <GetFeatured />
        <InstagramFeatures />
      </main>
      {/* </body> */}
    </>
  );
}
