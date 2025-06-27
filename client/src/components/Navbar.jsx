import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaArrowRight } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pulse, setPulse] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Gallery", path: "/gallery" },
    { name: "Success Stories", path: "/success-stories" },
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

    // Trigger pulse animation every 30 seconds
    const pulseInterval = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), 2000);
    }, 2000);

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(pulseInterval);
    };
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

          {/* Register Button - Desktop */}
          <div className="hidden lg:flex items-center ml-6">
            <NavLink
              to="/register"
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-300 flex items-center 
                bg-gradient-to-r from-[#FF6000] to-[#FF8C00] text-white shadow-lg 
                ${pulse ? "animate-pulse" : ""} hover:shadow-xl hover:scale-105`}
            >
              Register
              <FaArrowRight className="ml-2 text-xs transition-all group-hover:translate-x-1" />
            </NavLink>
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
          {/* Register Button - Mobile */}
          <NavLink
            to="/register"
            className={`block px-4 py-3 rounded-md text-base font-medium transition-colors duration-300 flex items-center 
              bg-gradient-to-r from-[#FF6000] to-[#FF8C00] text-white shadow-lg 
              ${pulse ? "animate-pulse" : ""}`}
          >
            Register
            <FaArrowRight className="ml-2 text-xs transition-all group-hover:translate-x-1" />
          </NavLink>
        </div>
      </div>
    </header>
  );
}