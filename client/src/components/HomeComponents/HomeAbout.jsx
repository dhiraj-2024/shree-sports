import React from "react";
import {
  FaChild,
  FaUsers,
  FaAward,
  FaStar,
} from "react-icons/fa";

const features = [
  {
    icon: <FaChild className="text-orange-500 text-3xl mb-3" />,
    title: "Age-Specific Training",
    desc: "Programs for toddlers, beginners, intermediates, and competitive gymnasts.",
  },
  {
    icon: <FaUsers className="text-orange-500 text-3xl mb-3" />,
    title: "Expert Coaches",
    desc: "Professionally trained coaches provide personalized attention.",
  },
  {
    icon: <FaAward className="text-orange-500 text-3xl mb-3" />,
    title: "Competitions & Events",
    desc: "Students showcase talents through events, competitions, and performances.",
  },
  {
    icon: <FaStar className="text-orange-500 text-3xl mb-3" />,
    title: "Holistic Growth",
    desc: "Boosts confidence, discipline, and focus — both inside and outside the gym.",
  },
];

const HomeAbout = () => {
  return (
    <section className="bg-[#090040] text-white py-16 px-6 sm:px-10 lg:px-24">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl sm:text-5xl font-bold">
          About <span className="text-orange-500">Shree Sports Academy</span>
        </h2>
        <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
          Empowering young gymnasts to reach their fullest potential — physically, mentally, and emotionally.
        </p>
      </div>

      {/* Two Column Layout */}
      <div className="grid md:grid-cols-2 gap-10 items-start">
        {/* Left Content */}
        <div className="space-y-5 text-gray-200 text-base sm:text-lg">
          <p>
            🏢 <strong>Established in 2020</strong>, Shree Sports Academy Gymnastics Center is a dedicated facility committed to nurturing young talent in the sport of gymnastics. 
          </p>
          <p>
            Our journey began with a small group of passionate athletes and coaches. Today, we are a vibrant community united by passion, progress, and purpose.
          </p>
          <p>
            From toddlers to competitive athletes, our programs are tailored to all levels. We don't just build skills — we build confidence, focus, and lifelong values.
          </p>
          <p>
            Whether you're here for fun, fitness, or future championships —{" "}
            <span className="text-orange-400 font-semibold">
              Shree Sports Academy is your perfect start
            </span>.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 gap-6">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="bg-white text-black rounded-xl p-5 shadow-md hover:shadow-lg transition-all"
            >
              {item.icon}
              <h4 className="text-xl font-semibold mb-1">{item.title}</h4>
              <p className="text-sm text-gray-700">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeAbout;
