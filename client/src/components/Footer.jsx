import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/shree-logo-transperent.png";
import LoginModal from "./LoginModal";


export default function Footer() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  return (
    <footer className="bg-[#1f193e] text-[#FFE6C7] pt-12 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo + About */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-white/80 to-white/40 p-1 rounded-md">
                <img
                  src={logo}
                  alt="Shree Logo"
                  className="h-12 w-auto object-contain"
                />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white tracking-wide">
                  SHREE SPORTS ACADEMY
                </h2>
                <p className="text-xs text-[#FFE6C7]">SINCE 2020</p>
              </div>
            </Link>
            <p className="text-sm text-[#FFE6C7]">
              Empowering athletes through professional training and mentorship
              to achieve their highest potential in sports.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white border-b border-[#FF6000] pb-2">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-[#FF6000] transition">Home</Link></li>
              <li><Link to="/about" className="hover:text-[#FF6000] transition">About Us</Link></li>
              {/* <li><Link to="/gallery" className="hover:text-[#FF6000] transition">Gallery</Link></li> */}
              <li><Link to="/success-stories" className="hover:text-[#FF6000] transition">Success Stories</Link></li>
              {/* <li><Link to="/staff" className="hover:text-[#FF6000] transition">Our Staff</Link></li> */}
              <li><Link to="/news" className="hover:text-[#FF6000] transition">News</Link></li>
              <li><Link to="/contact" className="hover:text-[#FF6000] transition">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white border-b border-[#FF6000] pb-2">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-[#FF6000] mt-1" />
                <span className="text-sm">
                  infront new TCS Maan, Shree Sports Academy, Phase 3, Hinjawadi Rajiv Gandhi Infotech Park, Hinjawadi, Pimpri-Chinchwad, Pune, Maharashtra 411057
India
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <FaPhone className="text-[#FF6000]" />
                <span className="text-sm">84850 29797 || 94207 03934</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaEnvelope className="text-[#FF6000]" />
                <span className="text-sm">shreesportsa@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white border-b border-[#FF6000] pb-2">
              Follow Us
            </h3>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/shree_sports__academy?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="w-10 h-10 bg-[#2e2e2e] rounded-full flex items-center justify-center hover:bg-[#FF6000] transition">
                <FaInstagram className="text-[#FFE6C7]" />
              </a>
              <a href="https://youtube.com/@shrifsportsacademy?si=LkmOJbBg2k3BOBMe" className="w-10 h-10 bg-[#2e2e2e] rounded-full flex items-center justify-center hover:bg-[#FF6000] transition">
                <FaYoutube className="text-[#FFE6C7]" />
              </a>
              <button 
              onClick={() => setIsLoginModalOpen(true)}
              className="flex items-center hover:text-blue-300 transition"
              aria-label="Admin Login"
            >
              <FaUser className="mr-2" />
            </button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
       {/* Bottom Footer */}
<div className="border-t border-[#2e2e2e] mt-12 pt-6 text-sm flex flex-col lg:flex-row justify-between items-center text-center gap-2">
  <p className="text-[#FFE6C7]">
    © {new Date().getFullYear()} Shree Sports Academy. All rights reserved.
  </p>
  
  <a
    href="mailto:code.dhiraj18@gmail.com"
    className=" text-[#979797] hover:text-orange-300 opacity-50 font-medium transition"
  >
    Contact us for design & development:---- code.dhiraj18@gmail.com
  </a>
</div>

      </div>
       {/* Login Modal */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)}
      />
    </footer>
  );
}
