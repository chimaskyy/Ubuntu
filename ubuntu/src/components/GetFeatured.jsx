// import { Share2 } from "lucide-react";
// import { Button } from "@/components/ui/button";
import kk from "../assets/kk.jpg"
import { Card, CardContent } from "./ui/card";

export default function GetFeatured() {
  // const handleShare = () => {
  //   if (navigator.share) {
  //     navigator.share({
  //       title: "Get Featured on Ubuntu Store",
  //       text: "Check out Ubuntu Store! #garmisland",
  //       url: window.location.href,
  //     });
  //   }
  // };

  return (
    <section className="relative w-full lg:h-[600px]">
      <h2 className="text-3xl mb-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        Featured Elite Customers
      </h2>
      {/* Image Grid */}
      <div className=" relative text-white h-full w-full">
        <div className="relative w-full h-full">
          <div className="grid grid-cols-2 md:grid-cols-4">
            <img
              src={kk}
              alt="Featured Style 1"
              className="w-full h-full object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1544441893-675973e31985"
              alt="Featured Style 2"
              className="w-full h-full object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1507680434567-5739c80be1ac"
              alt="Featured Style 3"
              className="w-full h-full object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1509631179647-0177331693ae"
              alt="Featured Style 4"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="container mx-auto h-full relative px-4 md:hidden lg:hidden xl:hidden">
          <div className="flex md:justify-end md:items-center items-end">
            <Card className="max-w-lg w-full md:mt-8 mb-8 md:mb-0">
              <CardContent className="p-6 space-y-4">
                <h2 className="text-3xl font-bold text-center">GET FEATURED</h2>
                <p className="text-base">
                  Looking to make a Statement in our pieces? Don&lsquo;t worry
                  we see you, get featured on our site with the hashtag{" "}
                  <span className="font-bold">#ubuntuelite</span> on any of your
                  social media platforms when you post.
                </p>
                {/* <div className="flex justify-center pt-4">
                  <Button onClick={handleShare} className="w-full sm:w-auto">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share Your Style
                  </Button>
                </div> */}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
