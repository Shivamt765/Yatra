import { Mountain, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-earth-brown to-earth-brown-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <Mountain className="h-8 w-8 text-sky-blue" />
              <span className="text-2xl font-bold">Yatra Holiday</span>
            </div>
            <p className="text-lg mb-6 text-white/80 leading-relaxed">
              Your trusted partner for unforgettable adventures in Nepal and Uttarakhand. 
              We create memories that last a lifetime through carefully crafted journeys 
              in the heart of the Himalayas.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="bg-white/10 p-3 rounded-full hover:bg-sky-blue transition-colors duration-300 group"
                >
                  <Icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {['Home', 'Nepal Packages', 'Uttarakhand Tours', 'About Us', 'Contact', 'Blog'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-white/80 hover:text-sky-blue transition-colors duration-300">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 mt-1 text-sky-blue flex-shrink-0" />
                <div>
                  <p className="text-white/80">123 Adventure Street</p>
                  <p className="text-white/80">Rishikesh, Uttarakhand</p>
                  <p className="text-white/80">India - 249137</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-sky-blue" />
                <p className="text-white/80">+91 98765 43210</p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-sky-blue" />
                <p className="text-white/80">info@yatraholiday.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm mb-4 md:mb-0">
            © 2024 Yatra Holiday. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-white/60 hover:text-sky-blue transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-white/60 hover:text-sky-blue transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-white/60 hover:text-sky-blue transition-colors">
              Cancellation Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;