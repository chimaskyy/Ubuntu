// import Link from "next/link";

import { Link } from "react-router-dom";

const categories = [
  {
    name: "UBUNTU MEN",
    image:
      "https://scontent.flos5-2.fna.fbcdn.net/v/t39.30808-6/440413890_18105314056391732_2609696324607001985_n.jpg?stp=c0.116.1440.1440a_dst-jpg_s206x206&_nc_cat=106&ccb=1-7&_nc_sid=714c7a&_nc_eui2=AeEnhfq4zzYBk77X41x7rBxNS9pdHf2FcgpL2l0d_YVyCnN17zl-HCUo6RpYQxfIVwvubdt8OPLzje8ozDmX3PeP&_nc_ohc=_7eLXuaQBuUQ7kNvgEymOta&_nc_zt=23&_nc_ht=scontent.flos5-2.fna&_nc_gid=AqLs7jVbboS_0TLukvfgho1&oh=00_AYD3drJ9H-wOeyD5orZviIPlXZAncQx1tCOr2srgiuJXpQ&oe=67435ECB",
    link: "/women",
    className: "col-span-2 row-span-2",
  },
  {
    name: "UBUNTU WOMEN",
    image:
      "https://scontent.flos5-1.fna.fbcdn.net/v/t39.30808-6/370012207_803222054832111_5938613982030439386_n.jpg?stp=c0.119.1440.1440a_dst-jpg_s206x206&_nc_cat=105&ccb=1-7&_nc_sid=714c7a&_nc_eui2=AeGvAHgpbbvx1jHMQZKjmkG7VDF3sHastN9UMXewdqy034i7ZLMZokPTV8aakimoe4-nSB--td-HS2blGE_mXW7P&_nc_ohc=gq012ZnuKMQQ7kNvgHzkvOW&_nc_zt=23&_nc_ht=scontent.flos5-1.fna&_nc_gid=AhG9Yf4fUix0nIpCwr_qHXe&oh=00_AYC5RD5V_lmYiu5xK1EksMIxSKkPcB8jDUAyo3lr6DUJQg&oe=67436396",
    link: "/men",
    className: "col-span-1",
  },
  {
    name: "HIS & HERS",
    image:
      "https://scontent.flos5-3.fna.fbcdn.net/v/t39.30808-6/380812107_18081128260391732_7163398747105612151_n.jpg?stp=c0.119.1440.1440a_dst-jpg_s206x206&_nc_cat=108&ccb=1-7&_nc_sid=714c7a&_nc_eui2=AeEkexaV-EBIFMDwK6FY91BokOPvYai5M6SQ4-9hqLkzpOl9pWukRA8WvKn_o0A1vyNZrn6nDccFrYZMiX6me5xz&_nc_ohc=jrrqW9EEc_wQ7kNvgGdf5Mi&_nc_zt=23&_nc_ht=scontent.flos5-3.fna&_nc_gid=ArSbg3-AzNPDabD1mrhAkFs&oh=00_AYBvgI5qmouLfnW5yIBBlrDm-p05x9UvHEaLluYwld9gAg&oe=67436700",
    link: "/his-and-hers",
    className: "col-span-1",
  },
];

export default function Component() {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="flex justify-center grid grid-cols-1 md:grid-cols-3 gap-4 h-[600px]">
        {categories.map((category) => (
          <Link
            key={category.name}
            to={category.link}
            className={`group relative overflow-hidden rounded-lg ${category.className}`}
          >
            <div className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/40" />
            <img
              src={category.image}
              alt={`Shop ${category.name}`}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white text-2xl md:text-3xl font-bold tracking-wider ">
                {category.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
