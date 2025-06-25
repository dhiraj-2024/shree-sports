import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Gallery", path: "/gallery" },
    { name: "Success Stories", path: "/success-stories" },
    { name: "Register", path: "/register" },
    { name: "Our Staff", path: "/staff" },
    { name: "News", path: "/news" },
    { name: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-[#222123] shadow-lg" : "bg-[#090040]/70 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <img src="" alt="" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-[#FF6000] text-[#FFFFFF] shadow-md"
                      : "text-[#FFE6C7] hover:text-[#FFFFFF] hover:bg-[#454545]"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Social Icons - Desktop */}
          <div className="hidden lg:flex items-center space-x-4 ml-6">
            <a
              href="#"
              className="text-[#FFE6C7] hover:text-[#FF6000] transition-colors duration-300 p-2 rounded-full hover:bg-[#454545]"
            >
              <FaFacebookF size={16} />
            </a>
            <a
              href="#"
              className="text-[#FFE6C7] hover:text-[#FF6000] transition-colors duration-300 p-2 rounded-full hover:bg-[#454545]"
            >
              <FaInstagram size={16} />
            </a>
            <a
              href="#"
              className="text-[#FFE6C7] hover:text-[#FF6000] transition-colors duration-300 p-2 rounded-full hover:bg-[#454545]"
            >
              <FaTwitter size={16} />
            </a>
            <a
              href="#"
              className="text-[#FFE6C7] hover:text-[#FF6000] transition-colors duration-300 p-2 rounded-full hover:bg-[#454545]"
            >
              <FaYoutube size={16} />
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#FFE6C7] hover:text-[#FF6000] focus:outline-none transition-colors duration-300 p-2 rounded-full hover:bg-[#454545]"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <FaTimes size={24} className="text-[#FF6000]" />
              ) : (
                <FaBars size={24} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-2 bg-[#090040] shadow-inner">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-md text-base font-medium transition-colors duration-300 ${
                  isActive
                    ? "bg-[#FF6000] text-[#FFFFFF] shadow-md"
                    : "text-[#FFE6C7] hover:text-[#FFFFFF] hover:bg-[#454545]"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          <div className="flex justify-center space-x-6 pt-4">
            <a
              href="#"
              className="text-[#FFE6C7] hover:text-[#FF6000] transition-colors duration-300 p-2 rounded-full hover:bg-[#454545]"
            >
              <FaFacebookF size={20} />
            </a>
            <a
              href="#"
              className="text-[#FFE6C7] hover:text-[#FF6000] transition-colors duration-300 p-2 rounded-full hover:bg-[#454545]"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="#"
              className="text-[#FFE6C7] hover:text-[#FF6000] transition-colors duration-300 p-2 rounded-full hover:bg-[#454545]"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="#"
              className="text-[#FFE6C7] hover:text-[#FF6000] transition-colors duration-300 p-2 rounded-full hover:bg-[#454545]"
            >
              <FaYoutube size={20} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
