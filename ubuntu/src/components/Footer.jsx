import { MapPin, Phone, Mail } from "lucide-react";
import { FaFacebook, FaInstagram, FaTiktok, } from "react-icons/fa";
function Footer() {
  return (
    <footer className="bg-black text-gray-300 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:mx-1 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 capitalize">
              <li>
                <a href="#" className="">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="">
                  Terms of service
                </a>
              </li>
              <li>
                <a href="#" className="">
                  Shippng policy
                </a>
              </li>
              <li>
                <a href="#" className="">
                  Return policy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Get In touch</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                123 Fashion Street, Enugu
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                +234 123 456 7890
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                info@ubuntu.com
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="">
                <FaFacebook className="h-5 w-5" />
              </a>
              <a href="#" className="">
                <FaTiktok className="h-5 w-5" />
              </a>
              <a href="#" className="">
                <FaInstagram className="h-5 w-5" />
              </a>
              
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} UbuntuElite. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

