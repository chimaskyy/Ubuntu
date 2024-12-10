import { FaInstagram } from "react-icons/fa";

import pink from "../assets/pinkkyyy.jpg";
import { Box, Headphones, CreditCard, BadgeDollarSign } from "lucide-react";

function InstagramFeatures() {
  const instagramPosts = [
    {
      id: 1,
      url: "https://www.instagram.com/p/CTQ1J9vJ9Zz/",
      image: pink,
      alt: "Woman in white suit with red accent",
    },
    {
      id: 2,
      url: "https://www.instagram.com/p/CTQ1J9vJ9Zz/",

      image: pink,
      alt: "Woman in red oversized dress",
    },
    {
      id: 3,
      url: "https://www.instagram.com/p/CTQ1J9vJ9Zz/",
      image: pink,
      alt: "Woman in casual wear with red bag",
    },
    {
      id: 4,
      url: "https://www.instagram.com/p/CTQ1J9vJ9Zz/",

      image: "/placeholder.svg?height=300&width=300",
      alt: "Woman in brown blazer sitting",
    },
    {
      id: 5,
      url: "https://www.instagram.com/p/CTQ1J9vJ9Zz/",

      image: pink,
      alt: "Woman in brown blazer sitting",
    },
    {
      id: 6,
      url: "https://www.instagram.com/p/CTQ1J9vJ9Zz/",

      image: pink,
      alt: "Woman in brown blazer sitting",
    },
  ];
  

  const features = [
    {
      icon: Box,
      title: "Free Shipping",
      description: "Free shipping for order above $150",
    },
    {
      icon: BadgeDollarSign,
      title: "Money Guarantee",
      description: "Within 30 days for exchange",
    },
    {
      icon: Headphones,
      title: "Online Support",
      description: "24 hours a day, 7 days a week",
    },
    {
      icon: CreditCard,
      title: "Flexible Payment",
      description: "Pay with multiple credit cards",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Instagram Stories Section */}
      <div className="mb-16">
        <h2 className="text-center text-2xl font-medium mb-8">
          Our Instagram Stories
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 ">
          {instagramPosts.map((post) => (
            <div
              key={post.id}
              className="aspect-square overflow-hidden relative group"
            >
              <a href={post.url}>
                <img
                  src={post.image}
                  alt={post.alt}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <FaInstagram className="w-6 h-6 text-gray-300" />
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <div key={feature.title} className="text-center">
              <div className="flex justify-center mb-4">
                <Icon className="w-8 h-8 text-gray-700" />
              </div>
              <h3 className="font-medium mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default InstagramFeatures;
