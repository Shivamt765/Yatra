import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import logos from "../assets/logos.png";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12"> {/* Reduced vertical padding */}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"> {/* Reduced gap */}
          
          {/* Company Info */}
          <div className="col-span-1 lg:col-span-2">
            {/* Logo */}
            <div className="flex items-center space-x-2 mb-4 sm:mb-6"> {/* Reduced margin */}
              <img
                src={logos}
                alt="Company Logo"
                className="h-10 sm:h-12 md:h-16 lg:h-20 w-auto object-contain transition-all duration-300"
              />
            </div>

            {/* Tagline */}
            <p className="text-sm sm:text-base mb-4 sm:mb-6 text-gray-400 leading-relaxed italic">
              Helping you find peace in the mountains — and lose your Wi-Fi connection.
            </p>

            {/* Social Icons */}
            <div className="flex space-x-3 sm:space-x-4">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="bg-gray-800 p-2 sm:p-3 rounded-full hover:bg-gray-700 transition-colors duration-300 group"
                >
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-hover:text-white transition-transform group-hover:scale-110" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Quick Links</h3>
            <ul className="space-y-2 sm:space-y-3">
              {['Home', 'Nepal Packages', 'Uttarakhand Tours', 'About Us', 'Contact', 'Blog'].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-gray-200 text-sm sm:text-base transition-colors duration-300"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Contact Us</h3>
            <div className="space-y-3 sm:space-y-4 text-sm sm:text-base">
              <div className="flex items-start space-x-2 sm:space-x-3">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 mt-1 text-gray-400 flex-shrink-0" />
                <div>
                  <p className="text-gray-400">Nandanagar Infront of Gorakhpur Airport</p>
                  <p className="text-gray-400">Gorakhpur, Uttar Pradesh</p>
                  <p className="text-gray-400">India - 273008</p>
                </div>
              </div>

              <div className="flex items-center space-x-2 sm:space-x-3">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                <p className="text-gray-400">+91 9151491889</p>
              </div>

              <div className="flex items-center space-x-2 sm:space-x-3">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                <p className="text-gray-400">yatraholidayinfo@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-4 sm:pt-8 flex flex-col md:flex-row justify-between items-center text-sm sm:text-base">
          <p className="text-gray-500 mb-2 sm:mb-4 md:mb-0">
            Designed & Developed by{" "}
            <a
              href="https://www.nextgenscale.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 font-semibold hover:text-white transition-colors"
            >
              NextGenScale 2025
            </a>
          </p>
          <div className="flex space-x-4 sm:space-x-6">
            <a href="#" className="text-gray-500 hover:text-gray-300 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-300 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-300 transition-colors">
              Cancellation Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
