import { Apple as WhatsApp } from "lucide-react";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Button } from "./button";
export default function WhatsAppButton() {
  const phoneNumber = "+2348166753751"; // Replace with your actual WhatsApp number
  const message = "Hello! I'm interested in your products.";

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  return (
    <Button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 bg-gray-900 text-white p-4 rounded-lg shadow-lg hover:bg-green-600 transition-colors z-50"
      aria-label="Contact on WhatsApp"
    >
      <WhatsAppIcon className="h-10 w-10" />
      Contact us
    </Button>
  );
}
