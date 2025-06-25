import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#222222] text-[#FFE6C7] pt-12 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-[#FF6000] rounded-full flex items-center justify-center shadow-md">
                <span className="text-[#FFFFFF] font-bold text-2xl">SSA</span>
              </div>
              <div>
                <h2 className="text-xl font-bold font-oswald tracking-wide text-[#FFFFFF]">
                  SHREE SPORTS ACADEMY
                </h2>
                <p className="text-[#FFE6C7] text-xs">SINCE 2020</p>
              </div>
            </div>
            <p className="text-[#FFE6C7] text-sm">
              Empowering athletes through professional training and mentorship
              to achieve their highest potential in sports.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[#FFFFFF] border-b border-[#FF6000] pb-2">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-[#FFE6C7] hover:text-[#FF6000] transition-colors duration-300"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#FFE6C7] hover:text-[#FF6000] transition-colors duration-300"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#FFE6C7] hover:text-[#FF6000] transition-colors duration-300"
                >
                  Programs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#FFE6C7] hover:text-[#FF6000] transition-colors duration-300"
                >
                  Success Stories
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#FFE6C7] hover:text-[#FF6000] transition-colors duration-300"
                >
                  Gallery
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#FFE6C7] hover:text-[#FF6000] transition-colors duration-300"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[#FFFFFF] border-b border-[#FF6000] pb-2">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-[#FF6000] mt-1" />
                <span className="text-[#FFE6C7] text-sm">
                  123 Sports Avenue, City, State 12345
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <FaPhone className="text-[#FF6000]" />
                <span className="text-[#FFE6C7] text-sm">
                  +1 (123) 456-7890
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <FaEnvelope className="text-[#FF6000]" />
                <span className="text-[#FFE6C7] text-sm">
                  info@shreesportsacademy.com
                </span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[#FFFFFF] border-b border-[#FF6000] pb-2">
              Follow Us
            </h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-[#454545] rounded-full flex items-center justify-center hover:bg-[#FF6000] transition-colors duration-300"
              >
                <FaFacebookF className="text-[#FFE6C7]" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-[#454545] rounded-full flex items-center justify-center hover:bg-[#FF6000] transition-colors duration-300"
              >
                <FaInstagram className="text-[#FFE6C7]" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-[#454545] rounded-full flex items-center justify-center hover:bg-[#FF6000] transition-colors duration-300"
              >
                <FaTwitter className="text-[#FFE6C7]" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-[#454545] rounded-full flex items-center justify-center hover:bg-[#FF6000] transition-colors duration-300"
              >
                <FaYoutube className="text-[#FFE6C7]" />
              </a>
            </div>

            <div className="pt-4">
              <h4 className="text-[#FFFFFF] font-medium mb-2">Newsletter</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-3 py-2 bg-[#454545] text-[#FFFFFF] placeholder-[#FFE6C7]/70 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#FF6000] w-full"
                />
                <button className="bg-[#FF6000] hover:bg-[#FFA559] text-[#FFFFFF] px-4 py-2 rounded-r-md transition-colors duration-300">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[#454545] mt-12 pt-6 text-center text-[#FFE6C7] text-sm">
          <p>
            © {new Date().getFullYear()} Shree Sports Academy. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
