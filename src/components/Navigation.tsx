// src/components/Navbar.jsx
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png"; // Replace with your logo path

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll for background change
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = ["Home", "Packages", "Destinations", "About", "Contact"];

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center h-16">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="Yatra Holiday" className="h-40 w-auto" />
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, index) => (
            <a
              key={index}
              href={`#${link.toLowerCase()}`}
              className="relative font-medium text-gray-700 hover:text-[#0076BE] transition duration-300 group"
            >
              {link}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-[#F58220] to-[#0076BE] transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
          <a
            href="#book"
            className="px-5 py-2 rounded-full bg-gradient-to-r from-[#F58220] to-[#0076BE] text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Book Now
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(true)}
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Menu (Side Drawer) */}
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
          className={`absolute right-0 top-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-500 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-4 border-b">
            <img src={logo} alt="Yatra Holiday" className="h-10 w-auto" />
            <button
              className="text-gray-700 hover:text-red-500"
              onClick={() => setIsOpen(false)}
            >
              <X size={28} />
            </button>
          </div>
          <div className="flex flex-col mt-6 space-y-6 px-6">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={`#${link.toLowerCase()}`}
                onClick={() => setIsOpen(false)}
                className="text-gray-800 font-medium hover:text-[#0076BE] transition duration-300"
              >
                {link}
              </a>
            ))}
            <a
              href="#book"
              onClick={() => setIsOpen(false)}
              className="mt-4 px-6 py-3 rounded-full bg-gradient-to-r from-[#F58220] to-[#0076BE] text-white text-center font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
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
