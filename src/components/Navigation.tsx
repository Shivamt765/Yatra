import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logos from "@/assets/logos.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const logoStyle = { height: isDesktop ? "5.7rem" : "5.7rem", width: "auto", transition: "all 0.3s ease", cursor: "pointer" };

  return (
    <nav className={`fixed w-full top-0 z-50 bg-white shadow-md transition-all duration-300`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center h-24 md:h-28">
        <div className="flex-shrink-0">
          <Link to="/">
            <img src={logos} alt="Logo" style={logoStyle} />
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10 font-montserrat text-[15px] font-medium">
          <Link to="/" className="text-gray-800 hover:text-black transition">Home</Link>
          <Link to="/packages" className="text-gray-800 hover:text-black transition">Packages</Link>
          <a href="#destinations" className="text-gray-800 hover:text-black transition">Destinations</a>
          <a href="#about" className="text-gray-800 hover:text-black transition">About</a>
          <a href="#contact" className="text-gray-800 hover:text-black transition">Contact</a>
          <a href="#services" className="text-gray-800 hover:text-black transition">Our Services</a>
        </div>

        <div className="hidden md:block">
          <Link to="/packages" className="px-6 py-2 rounded-full bg-black text-white font-semibold hover:bg-gray-900 transition duration-300">
            Upcoming Trips
          </Link>
        </div>

        {/* Mobile */}
        <button className="md:hidden text-gray-800" onClick={() => setIsOpen(true)}>
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-40 flex">
          <div className="absolute inset-0 bg-black/40" onClick={() => setIsOpen(false)}></div>
          <div className="relative ml-auto w-72 bg-white p-6">
            <button className="absolute top-6 right-6" onClick={() => setIsOpen(false)}>
              <X size={28} />
            </button>
            <nav className="flex flex-col mt-12 space-y-4">
              <Link to="/" onClick={() => setIsOpen(false)} className="hover:text-black transition">Home</Link>
              <Link to="/packages" onClick={() => setIsOpen(false)} className="hover:text-black transition">Packages</Link>
              <a href="#destinations" onClick={() => setIsOpen(false)} className="hover:text-black transition">Destinations</a>
              <a href="#about" onClick={() => setIsOpen(false)} className="hover:text-black transition">About</a>
              <a href="#contact" onClick={() => setIsOpen(false)} className="hover:text-black transition">Contact</a>
              <a href="#services" onClick={() => setIsOpen(false)} className="hover:text-black transition">Our Services</a>
            </nav>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
