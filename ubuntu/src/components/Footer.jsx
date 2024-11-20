import { MapPin, Phone, Mail} from "lucide-react";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center text-2xl font-bold text-white mb-4">
              <a href="/" className="flex items-center space-x-2">
                <img
                  src="https://scontent.flos5-3.fna.fbcdn.net/v/t39.30808-6/369696228_2053136978364665_5390676064914487004_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHqn7-2da7hlbPK4_Z7oiJYkYh0yVdKtGmRiHTJV0q0aTLV27I7tn8hQL2VJ9dMxsxqXi1jgKNkQOTOG67rhvHT&_nc_ohc=1z6KvXMxS90Q7kNvgH-vyjX&_nc_zt=23&_nc_ht=scontent.flos5-3.fna&_nc_gid=AFWMdGNmo_xQ28TcJ6QEY33&oh=00_AYB4CLPxl_JlZOEet5fr1psNueXrwbkWKNkTxuiAAB2aEQ&oe=67413503"
                  alt="Logo"
                  width={80}
                  height={80}
                />
              </a>
              <span className="ml-4 font-mono">UbuntuElite</span>
            </div>
            <p className="text-white font-mono text-xl">
              TRADITIONALLY ROOTED FOREVER ELITE
            </p>
            <p className="text-sm">
              Bringing authentic African fashion to the world with modern style
              and traditional beauty.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="">
                  Shipping Info
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
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
                <FaFacebook className="h-6 w-6" />
              </a>
              <a href="#" className="">
                <FaTwitter className="h-6 w-6" />
              </a>
              <a href="#" className="">
                <FaInstagram className="h-6 w-6" />
              </a>
              <a href="#" className="">
                <FaYoutube className="h-6 w-6" />
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
