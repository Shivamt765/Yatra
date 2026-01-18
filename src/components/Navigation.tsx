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
import logos from "@/assets/pashuptinath.webp";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [packagesOpen, setPackagesOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  /* ================= SAFE MENU CLOSE ================= */
  const closeMenu = () => {
    setIsOpen(false);
    setPackagesOpen(false);
    setAboutOpen(false);
    document.body.style.overflow = "auto";
  };

  /* ================= SCROLL EFFECT ================= */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ================= RESIZE EFFECT ================= */
  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 768;
      setIsDesktop(desktop);
      if (desktop) closeMenu();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ================= BODY SCROLL LOCK ================= */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
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
        <Link to="/" onClick={closeMenu}>
          <img src={logos} alt="Logo" style={logoStyle} />
        </Link>

        {/* ================= DESKTOP ================= */}
        <div className="hidden md:flex items-center gap-16 font-montserrat text-[15px] font-medium">
          <Link to="/">Home</Link>

          <div className="relative group">
            <div className="flex items-center gap-1 cursor-pointer">
              Packages <ChevronDown size={16} />
            </div>

            <div className="absolute top-full left-0 mt-3 w-60 bg-white rounded-xl shadow-lg
              opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
              {categories[1].items.map((item, i) => (
                <Link
                  key={i}
                  to={item.path!}
                  className="block px-5 py-3 hover:bg-gray-100"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <Link to="/Blog">Blog</Link>
          <Link to="/About">About Us</Link>
          <Link to="/Contact">Contact</Link>
        </div>

        {/* ================= MOBILE BUTTON ================= */}
        <button className="md:hidden" onClick={() => setIsOpen(true)}>
          <Menu size={28} />
        </button>
      </div>

      {/* ================= MOBILE DRAWER ================= */}
      <div className={`fixed inset-0 z-40 ${isOpen ? "visible" : "invisible"}`}>
        {/* BACKDROP */}
        <div className="absolute inset-0 bg-black/40" onClick={closeMenu} />

        {/* DRAWER PANEL */}
        <div
          className={`absolute right-0 top-0 h-full w-72 bg-white transition-transform duration-500 flex flex-col
            ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          {/* HEADER */}
          <div className="flex justify-between items-center p-5 border-b">
            <Link to="/" onClick={closeMenu}>
              <img src={logos} alt="Logo" style={drawerLogoStyle} />
            </Link>
            <X size={28} onClick={closeMenu} className="cursor-pointer" />
          </div>

          {/* LINKS */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {categories.map((cat, i) => (
              <div key={i}>
                {/* CATEGORY TITLE */}
                <div
                  className="font-semibold text-lg flex justify-between items-center cursor-pointer"
                  onClick={() => {
                    if (cat.title === "Packages") setPackagesOpen(!packagesOpen);
                    if (cat.title === "About & Contact") setAboutOpen(!aboutOpen);
                  }}
                >
                  {cat.title}
                  {cat.dropdown && <ChevronDown size={16} />}
                </div>

                {/* CATEGORY ITEMS */}
                <div
                  className={`pl-3 mt-2 flex flex-col space-y-2 ${
                    !cat.dropdown ||
                    (cat.title === "Packages" && packagesOpen) ||
                    (cat.title === "About & Contact" && aboutOpen)
                      ? "block"
                      : "hidden"
                  }`}
                >
                  {cat.items.map((item, idx) =>
                    item.path ? (
                      <Link
                        key={idx}
                        to={item.path}
                        onClick={closeMenu}
                        className="block py-2 text-gray-700 hover:text-orange-500 hover:pl-2 transition-all"
                      >
                        {item.name}
                      </Link>
                    ) : (
                      <a
                        key={idx}
                        href={item.href}
                        onClick={closeMenu}
                        className="block py-2 text-gray-700 hover:text-orange-500 hover:pl-2 transition-all"
                      >
                        {item.name}
                      </a>
                    )
                  )}
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