// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
import { Hero } from "@/components/Hero";
import  FeaturedCategories from "../components/FeaturedCategory";
import TrendingProducts from "../components/Trending";
import NewArrivals from "../components/NewArival";
// import Category2 from "../components/Category2"
import AboutSection from "../components/About";
import InstagramFeatures from "@/components/InstaView";
export default function RotatingHero() {
  return (
    <>
      <Hero />
      <AboutSection />
      <FeaturedCategories />
      <TrendingProducts />
      {/* <Category2/> */}
      <NewArrivals />
      <InstagramFeatures />
    </>
  );

};

  // const heroContent = [
  //   {
  //     image:
  //       "https://scontent.flos5-2.fna.fbcdn.net/v/t39.30808-6/440413890_18105314056391732_2609696324607001985_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEnhfq4zzYBk77X41x7rBxNS9pdHf2FcgpL2l0d_YVyCnN17zl-HCUo6RpYQxfIVwvubdt8OPLzje8ozDmX3PeP&_nc_ohc=_7eLXuaQBuUQ7kNvgEymOta&_nc_zt=23&_nc_ht=scontent.flos5-2.fna&_nc_gid=AofasIRb7z0ZBOsx04U2K37&oh=00_AYDOc_cbpV7WIDddcH-7qvakgOxMO_aolXo-sX-Ee947_A&oe=67435ECB",
  //     title: "2024 HOLIDAY COLLECTION",
  //     subtitle: "15% OFF",
  //     description: "FOR A LIMITED TIME",
  //     code: "HOLIDAY24",
  //   },
  //   {
  //     image:
  //       "https://scontent.flos5-1.fna.fbcdn.net/v/t39.30808-6/440576329_18105212770391732_4763676200789185924_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEfNZl4aRTIYIlO9Eo_Tr1Wqm5DmEN2CcSqbkOYQ3YJxNdo4CHeK8DfGyo9_A7EkBtgft0f-AoA0bPDESwWGtQr&_nc_ohc=s23fftiBMkYQ7kNvgFOsvc7&_nc_zt=23&_nc_ht=scontent.flos5-1.fna&_nc_gid=AxRML0OnTJ6V1PXdqtD1Bpd&oh=00_AYB5QRRsOumHHGlHFgobeisxBnTf6_ysh376FQBwo4Fxmg&oe=674155E3",
  //     title: "AFRICAN PRINT FOR SUMMER",
  //     subtitle: "NEW ARRIVALS",
  //     description: "SHOP THE LATEST TRENDS",
  //     code: "SUMMER24",
  //   },
  //   {
  //     image:
  //       "https://scontent.flos5-2.fna.fbcdn.net/v/t51.75761-15/464222770_18123180022391732_1402278899059606208_n.jpg?stp=c0.118.1440.1440a_dst-jpg_s206x206&_nc_cat=104&ccb=1-7&_nc_sid=714c7a&_nc_eui2=AeHL5KIpUzxV2I5A7Pe1cV9CspvnvWjVdZyym-e9aNV1nLZEQHlKUzFHVX2njw-VXU0_N1DEt59jSQP_mc_jCc2W&_nc_ohc=8LRqQId2YdsQ7kNvgGArJ4V&_nc_zt=23&_nc_ht=scontent.flos5-2.fna&_nc_gid=AgGj1ISrBGmob3o_1atHZIM&oh=00_AYAREvjU1MJml8sn_qrKZi6g7HzF2RtAm-Gi615rAsPPiQ&oe=67435FBA",
  //     title: "AFRICAN PRINTS",
  //     subtitle: "EXCLUSIVE DESIGNS",
  //     description: "CELEBRATE YOUR HERITAGE",
  //     code: "HERITAGE24",
  //   },
  // ];
  // export default function RotatingHero() {
  //   const [currentIndex, setCurrentIndex] = useState(0);
  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       setCurrentIndex((prevIndex) => (prevIndex + 1) % heroContent.length);
  //     }, 5000); // Change image every 5 seconds
  //     return () => clearInterval(interval);
  //   }, []);
  //   const currentContent = heroContent[currentIndex];
  //   return (
  //     <section className="relative  overflow-hidden">
  //       {heroContent.map((content, index) => (
  //         <div
  //           key={index}
  //           className={`absolute inset-0 transition-opacity duration-1000 ${
  //             index === currentIndex ? "opacity-100" : "opacity-0"
  //           }`}
  //         >
  //           <div className="absolute inset-0 overflow-hidden">
  //             <img
  //               src={content.image}
  //               alt={content.title}
  //               className="object-cover w-full h-full"
  //               loading={index === 0 ? "eager" : "lazy"}
  //             />
  //           </div>
  //           <div className="absolute inset-0 bg-black bg-opacity-50" />
  //         </div>
  //       ))}
  //       <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
  //         <h1 className="text-4xl md:text-6xl font-bold mb-6">
  //           {currentContent.title}
  //         </h1>
  //         <div className="text-3xl md:text-5xl mb-4">
  //           {currentContent.subtitle}
  //         </div>
  //         <p className="text-xl mb-8">{currentContent.description}</p>
  //         <div className="mb-8">
  //           <p className="text-lg">USE CODE: {currentContent.code}</p>
  //         </div>
  //         <Button size="lg" variant="secondary" className="text-lg px-8">
  //           SHOP NOW
  //         </Button>
  //         <p className="text-sm mt-6 opacity-75">
  //           *Applies to selected items only.
  //           <br />
  //           Excludes markdowns.
  //         </p>
  //       </div>
  //       <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
  //         {heroContent.map((_, index) => (
  //           <button
  //             key={index}
  //             className={`w-3 h-3 rounded-full ${
  //               index === currentIndex ? "bg-white" : "bg-gray-400"
  //             }`}
  //             onClick={() => setCurrentIndex(index)}
  //             aria-label={`Go to slide ${index + 1}`}
  //           />
  //         ))}
  //       </div>
  //     </section>
  //   );
  // }
  /* <a href="/" className="flex items-center space-x-2">
  <img
    src="https://scontent.flos5-3.fna.fbcdn.net/v/t39.30808-6/369696228_2053136978364665_5390676064914487004_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHqn7-2da7hlbPK4_Z7oiJYkYh0yVdKtGmRiHTJV0q0aTLV27I7tn8hQL2VJ9dMxsxqXi1jgKNkQOTOG67rhvHT&_nc_ohc=1z6KvXMxS90Q7kNvgH-vyjX&_nc_zt=23&_nc_ht=scontent.flos5-3.fna&_nc_gid=AFWMdGNmo_xQ28TcJ6QEY33&oh=00_AYB4CLPxl_JlZOEet5fr1psNueXrwbkWKNkTxuiAAB2aEQ&oe=67413503"
    alt="Logo"
    width={50}
    height={50}
  />
</a>; */

