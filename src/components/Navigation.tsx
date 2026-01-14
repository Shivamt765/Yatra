import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  X,
  Home,
  Book,
  Package,
  Users,
  Map,
  Info,
  Phone,
  ChevronDown,
  Newspaper,
} from "lucide-react";
import logos from "@/assets/logos.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [packagesOpen, setPackagesOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  const logoStyle = {
    height: "5.7rem",
    width: "auto",
    cursor: "pointer",
  };

  const drawerLogoStyle = {
    height: isDesktop ? "3.8rem" : "3.15rem",
    width: "auto",
    cursor: "pointer",
  };

  const categories = [
    {
      title: "Explore",
      dropdown: false,
      items: [
        { name: "Home", path: "/", icon: <Home size={18} /> },
        { name: "Travel Stories", href: "#stories", icon: <Book size={18} /> },
      ],
    },
    {
      title: "Packages",
      dropdown: true,
      items: [
        { name: "International Tour", path: "/packages?category=international", icon: <Map size={18} /> },
        { name: "Domestic Tour", path: "/packages?category=domestic", icon: <Map size={18} /> },
        { name: "Family & Group Tour", path: "/packages?category=family", icon: <Users size={18} /> },
        { name: "Honeymoon", path: "/packages?category=honeymoon", icon: <Package size={18} /> },
        { name: "Adventure", path: "/packages?category=adventure", icon: <Map size={18} /> },
      ],
    },
    {
      title: "About & Contact",
      dropdown: true,
      items: [
        { name: "About", path: "/About", icon: <Info size={18} /> },
        { name: "Contact", path: "/Contact", icon: <Phone size={18} /> },
      ],
    },
    {
      title: "Blog",
      dropdown: false,
      items: [{ name: "Our Blog", path: "/Blog", icon: <Newspaper size={18} /> }],
    },
  ];

  return (
    <nav
      className="fixed w-full top-0 z-50"
      style={{
        backgroundColor: scrolled ? "#fff" : "transparent",
        transition: "all 0.3s ease",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center h-24 md:h-28">
        <Link to="/">
          <img src={logos} alt="Logo" style={logoStyle} />
        </Link>

        {/* DESKTOP */}
        <div className="hidden md:flex items-center gap-16 font-montserrat text-[15px] font-medium">
          <Link to="/" className="text-gray-800 hover:text-black transition">
            Home
          </Link>

          <div className="relative group">
            <div className="flex items-center gap-1 cursor-pointer text-gray-800 hover:text-black transition">
              Packages <ChevronDown size={16} />
            </div>

            <div className="absolute top-full left-0 mt-3 w-60 bg-white rounded-xl shadow-lg
              opacity-0 invisible group-hover:opacity-100 group-hover:visible
              transition-all duration-300 z-50">
              <Link to="/packages?category=international" className="block px-5 py-3 hover:bg-gray-100 rounded-t-xl">
                International Tour
              </Link>
              <Link to="/packages?category=domestic" className="block px-5 py-3 hover:bg-gray-100">
                Domestic Tour
              </Link>
              <Link to="/packages?category=family" className="block px-5 py-3 hover:bg-gray-100">
                Family & Group Tour
              </Link>
              <Link to="/packages?category=honeymoon" className="block px-5 py-3 hover:bg-gray-100">
                Honeymoon
              </Link>
              <Link to="/packages?category=adventure" className="block px-5 py-3 hover:bg-gray-100 rounded-b-xl">
                Adventure
              </Link>
            </div>
          </div>

          <Link to="/Blog">Blog</Link>
          <Link to="/About">About Us</Link>
          <Link to="/Contact">Contact</Link>
        </div>

        <button className="md:hidden text-gray-800" onClick={() => setIsOpen(true)}>
          <Menu size={28} />
        </button>
      </div>

      {/* MOBILE */}
      <div className={`fixed inset-0 z-40 ${isOpen ? "visible" : "invisible"}`}>
        <div className={`absolute inset-0 bg-black/40`} onClick={() => setIsOpen(false)} />
        <div className={`absolute right-0 top-0 h-full w-72 bg-white transform transition-transform duration-500 ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="flex items-center justify-between p-5 border-b">
            <Link to="/" onClick={() => setIsOpen(false)}>
              <img src={logos} alt="Logo" style={drawerLogoStyle} />
            </Link>
            <X size={28} onClick={() => setIsOpen(false)} />
          </div>

          <div className="flex flex-col mt-4 px-6 space-y-4">
            {categories.map((cat, i) => (
              <div key={i}>
                <div
                  className="font-semibold text-lg py-2 flex justify-between"
                  onClick={() => {
                    if (cat.title === "Packages") setPackagesOpen(!packagesOpen);
                    if (cat.title === "About & Contact") setAboutOpen(!aboutOpen);
                  }}
                >
                  {cat.title}
                  {cat.dropdown && <ChevronDown size={16} />}
                </div>

                <div className={`${cat.dropdown ? (packagesOpen || aboutOpen ? "block" : "hidden") : "block"} pl-3 space-y-2`}>
                  {cat.items.map((item, idx) => (
                    <Link
                      key={idx}
                      to={item.path || "#"}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3"
                    >
                      {item.icon}
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
