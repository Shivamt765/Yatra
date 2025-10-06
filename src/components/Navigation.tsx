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
  const [servicesOpen, setServicesOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
  return () => {
    // cleanup when Navbar unmounts or route changes
    document.body.style.overflow = "auto";
  };
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
    height: isDesktop ? "5.7rem" : "5.7rem",
    width: "auto",
    transition: "all 0.3s ease",
    cursor: "pointer",
  };
  const drawerLogoStyle = {
    height: isDesktop ? "3.8rem" : "3.15rem",
    width: "auto",
    transition: "all 0.3s ease",
    cursor: "pointer",
  };

  const categories = [
    {
      title: "Explore",
      items: [
        { name: "Home", path: "/", icon: <Home size={18} /> },
        { name: "Travel Stories", href: "#stories", icon: <Book size={18} /> },
      ],
      dropdown: false,
    },
    {
      title: "For You",
      items: [
        { name: "Packages", path: "/packages", icon: <Package size={18} /> },
        { name: "Why Choose Us", href: "#why-choose-us", icon: <Users size={18} /> },
      ],
      dropdown: false,
    },
    {
      title: "Upcoming Trips",
      items: [
        { name: "Domestic Tour", href: "#domestic", icon: <Map size={18} /> },
        { name: "International Tour", href: "#international", icon: <Map size={18} /> },
      ],
      dropdown: false,
    },
    {
      title: "About & Contact",
      items: [
        { name: "About", path: "/About", icon: <Info size={18} /> },
        { name: "Contact", path: "/Contact", icon: <Phone size={18} /> },
      ],
      dropdown: true,
    },
    {
      title: "Blog",
      items: [{ name: "Our Blog", path: "/Blog", icon: <Newspaper size={18} /> }],
      dropdown: false,
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
        <div className="flex-shrink-0">
          <Link to="/">
            <img src={logos} alt="Logo" style={logoStyle} />
          </Link>
        </div>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-16 font-montserrat text-[15px] font-medium">
          <Link to="/" className="text-gray-800 hover:text-black transition">
            Home
          </Link>
          <Link
            to="/packages"
            className="flex items-center gap-2 text-gray-800 hover:text-black transition"
          >
            Packages
          </Link>
          <Link to="/Blog" className="text-gray-800 hover:text-black transition">
            Blog
          </Link>
          <Link to="/About" className="text-gray-800 hover:text-black transition">
            About Us
          </Link>
          <Link to="/Contact" className="text-gray-800 hover:text-black transition">
            Contact
          </Link>

          <Link
            to="/packages#upcoming"
            className="px-6 py-2 rounded-full bg-black text-white font-semibold hover:bg-gray-900 transition duration-300"
          >
            Upcoming Trips
          </Link>
        </div>

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
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity duration-500 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsOpen(false)}
        />

        <div
          className={`absolute right-0 top-0 h-full w-72 transform transition-transform duration-500 ease-in-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ backgroundColor: "#fff" }}
        >
          {/* Logo header */}
          <div
            style={{ backdropFilter: "blur(10px)", backgroundColor: "rgba(255,255,255,0.15)" }}
            className="flex items-center justify-between p-5 border-b"
          >
            <Link to="/" onClick={() => setIsOpen(false)}>
              <img src={logos} alt="Logo" style={drawerLogoStyle} />
            </Link>
            <button
              className="text-gray-800 hover:text-red-500"
              onClick={() => setIsOpen(false)}
            >
              <X size={28} />
            </button>
          </div>

          {/* Categories */}
          <div className="flex flex-col mt-4 px-6 space-y-4 font-montserrat text-gray-500">
            {categories.map((cat, i) => (
              <div key={i}>
                <div
                  className={`font-semibold text-lg py-2 flex justify-between items-center ${
                    cat.dropdown ? "cursor-pointer" : ""
                  }`}
                  onClick={() => {
                    if (cat.title === "Our Services") setServicesOpen(!servicesOpen);
                    if (cat.title === "About & Contact") setAboutOpen(!aboutOpen);
                  }}
                >
                  {cat.title}
                  {cat.dropdown && (
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-300 ${
                        cat.title === "Our Services" && servicesOpen
                          ? "rotate-180"
                          : ""
                      } ${
                        cat.title === "About & Contact" && aboutOpen
                          ? "rotate-180"
                          : ""
                      }`}
                    />
                  )}
                </div>
                <div
                  className={`flex flex-col pl-3 space-y-2 transition-all duration-300 ${
                    (cat.title === "Our Services" && servicesOpen) ||
                    (cat.title === "About & Contact" && aboutOpen) ||
                    !cat.dropdown
                      ? "max-h-96"
                      : "max-h-0 overflow-hidden"
                  }`}
                >
                  {cat.items.map((item, idx) =>
                    item.path ? (
                      <Link
                        key={idx}
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 hover:text-gray-800 transition"
                      >
                        {item.icon}
                        <span>{item.name}</span>
                      </Link>
                    ) : (
                      <a
                        key={idx}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 hover:text-gray-800 transition"
                      >
                        {item.icon}
                        <span>{item.name}</span>
                      </a>
                    )
                  )}
                </div>
              </div>
            ))}

            <Link
              to="/packages#upcoming"
              onClick={() => setIsOpen(false)}
              className="mt-4 px-6 py-3 rounded-full bg-black text-white text-center font-semibold hover:bg-gray-900 transition"
            >
              Upcoming Trips
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
