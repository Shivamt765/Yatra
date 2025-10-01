// src/components/Navbar.jsx
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpenMobile, setServicesOpenMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Packages", href: "#packages" },
    { name: "Destinations", href: "#destinations" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  const services = [
    { name: "Customised Tour Packages", href: "/customised-tours" },
    { name: "Flight & Hotel Bookings", href: "/flight-hotel" },
    { name: "Transport Services", href: "/transport" },
    { name: "Corporate & Group Tours", href: "/corporate-tours" },
  ];

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 shadow backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center h-20">
        {/* Logo (25% bigger) */}
        <div className="flex-shrink-0">
          <img src={logo} alt="Logo" className="h-16 w-auto md:h-16 sm:h-14" />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10 font-montserrat text-[15px] font-medium">
          {navLinks.map((link, i) => (
            <a
              key={i}
              href={link.href}
              className="relative text-gray-800 hover:text-black transition group"
            >
              {link.name}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}

          {/* Our Services (hover dropdown for desktop) */}
          <div className="relative group">
            <button className="flex items-center gap-1 text-gray-800 hover:text-black transition">
              Our Services <ChevronDown size={16} />
            </button>

            {/* Dropdown - shows on hover */}
            <div className="absolute top-full left-0 mt-3 w-72 bg-white shadow-lg rounded-md overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-1 transition-all duration-300">
              {services.map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  className="block px-5 py-3 text-gray-700 hover:bg-gray-100 transition"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
          <a
            href="#book"
            className="px-6 py-2 rounded-full bg-black text-white font-semibold hover:bg-gray-900 transition duration-300"
          >
            Book Now
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-800"
          onClick={() => setIsOpen(true)}
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-500 ${
          isOpen ? "visible" : "invisible"
        }`}
      >
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity duration-500 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsOpen(false)}
        ></div>

        {/* Drawer */}
        <div
          className={`absolute right-0 top-0 h-full w-72 bg-white shadow-lg transform transition-transform duration-500 ease-in-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-5 border-b">
            <img src={logo} alt="Logo" className="h-12 w-auto" />
            <button
              className="text-gray-800 hover:text-red-500"
              onClick={() => setIsOpen(false)}
            >
              <X size={28} />
            </button>
          </div>

          <div className="flex flex-col mt-6 space-y-6 px-6 font-montserrat">
            {navLinks.map((link, i) => (
              <a
                key={i}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-gray-800 font-medium hover:text-black transition duration-300"
              >
                {link.name}
              </a>
            ))}

            {/* Services Mobile Expand (clickable) */}
            <div className="border-t pt-4">
              <button
                onClick={() => setServicesOpenMobile(!servicesOpenMobile)}
                className="w-full flex justify-between items-center text-gray-800 font-semibold"
              >
                Our Services{" "}
                <ChevronDown
                  size={18}
                  className={`transition-transform ${
                    servicesOpenMobile ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  servicesOpenMobile ? "max-h-64 mt-2" : "max-h-0"
                }`}
              >
                {services.map((item, i) => (
                  <a
                    key={i}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block pl-3 py-2 text-gray-600 hover:text-black transition"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>

            {/* CTA */}
            <a
              href="#book"
              onClick={() => setIsOpen(false)}
              className="mt-4 px-6 py-3 rounded-full bg-black text-white text-center font-semibold hover:bg-gray-900 transition"
            >
              Book Now
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
