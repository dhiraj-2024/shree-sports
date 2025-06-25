import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="relative bg-[#090040] overflow-hidden">
      {/* Background Gradient & Decorative Elements */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#FF6000] to-[#090040] mix-blend-overlay"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Animated Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#FFFFFF] mb-6"
          >
            <span className="block">Unlock Your</span>
            <span className="bg-gradient-to-r from-[#FF6000] to-[#FFA559]  bg-clip-text text-transparent">
              Athletic Potential
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-[#FFE6C7] max-w-2xl mx-auto mb-10"
          >
            Join{" "}
            <span className="font-semibold text-[#FFA559]">
              Shree Sports Academy
            </span>{" "}
            and train with the best coaches to achieve excellence in your sport.
          </motion.p>

          {/* Register Now Button (With Animation) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link to="/register">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-[#FF6000] to-[#FFA559] text-[#FFFFFF] font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Register Now{" "}
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-[#FFA559] to-[#FF6000] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </button>
            </Link>
          </motion.div>

          {/* Stats Section (Optional) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 grid grid-cols-3 gap-4 text-center"
          >
            <div className="p-4 bg-[#090040]/50 backdrop-blur-sm border border-[#FF6000]/20 rounded-lg">
              <h3 className="text-3xl font-bold text-[#FF6000]">50+</h3>
              <p className="text-[#FFE6C7] text-sm">Trained Athletes</p>
            </div>
            <div className="p-4 bg-[#090040]/50 backdrop-blur-sm border border-[#FF6000]/20 rounded-lg">
              <h3 className="text-3xl font-bold text-[#FF6000]">10+</h3>
              <p className="text-[#FFE6C7] text-sm">Sports Disciplines</p>
            </div>
            <div className="p-4 bg-[#090040]/50 backdrop-blur-sm border border-[#FF6000]/20 rounded-lg">
              <h3 className="text-3xl font-bold text-[#FF6000]">5+</h3>
              <p className="text-[#FFE6C7] text-sm">Years of Excellence</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Sports Elements (Optional) */}
      <div className="absolute bottom-10 left-10 w-16 h-16 bg-[#FF6000]/20 rounded-full blur-xl"></div>
      <div className="absolute top-20 right-20 w-24 h-24 bg-[#FFA559]/20 rounded-full blur-xl"></div>
    </section>
  );
}
