import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaArrowRight } from "react-icons/fa";
import logo from "../assets/shree-logo-transperent.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pulse, setPulse] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Success Stories", path: "/success-stories" },
    { name: "Gallery", path: "/gallery" },
    { name: "Our Staff", path: "/staff" },
    { name: "About", path: "/about" },
    { name: "News", path: "/news" },
    { name: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    const pulseInterval = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), 2000);
    }, 30000); // pulse every 30s

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
        scrolled ? "shadow-lg" : ""
      }`}
    >
      {/* Gradient Background */}
      <div
        className={`w-full transition-all duration-300 ${
          scrolled
            ? "bg-gradient-to-r from-white via-[#1a113a] to-[#090040]/90"
            : "bg-gradient-to-r from-gray-300 via-[#1a113a] to-[#090040]/90 backdrop-blur-md"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-18 py-3">
            {/* Logo */}
            <Link to="/" className="flex items-center group">
              <img
                src={logo}
                alt="Shree Logo"
                className="h-10 sm:h-12 md:h-20 w-auto object-contain transition-all duration-200"
              />
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
                        ? "bg-[#FF6000] text-white shadow-md"
                        : "text-[#FFE6C7] hover:text-white hover:bg-[#454545]"
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

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-[#FFE6C7] hover:text-[#FF6000] p-2 rounded-full hover:bg-[#454545] focus:outline-none"
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
                    ? "bg-[#FF6000] text-white shadow-md"
                    : "text-[#FFE6C7] hover:text-white hover:bg-[#454545]"
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
