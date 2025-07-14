import React from "react";
import {
  FaChild,
  FaUsers,
  FaAward,
  FaStar,
  FaLightbulb,
  FaHeartbeat,
  FaBalanceScale,
} from "react-icons/fa";

const AboutUs = () => {
  return (
    <section className="bg-[#090040] text-white py-20 px-6 sm:px-10 lg:px-20 mt-10">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold leading-tight">
          About <span className="text-orange-500">Shree Sports Academy</span>
        </h2>
        <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
          Empowering young gymnasts to reach their fullest potential —
          physically, mentally, and emotionally.
        </p>
      </div>

      {/* Main Content Block */}
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        {/* Left Side */}
        <div className="space-y-6">
          <p className="text-lg text-gray-200">
            🏢 <strong>Established in 2020</strong>, Shree Sports Academy
            Gymnastics Center is a dedicated facility committed to nurturing
            young talent in the sport of gymnastics. Founded with the vision
            that every child deserves the opportunity to explore their physical
            potential, we’ve grown into a center known for excellence and care.
          </p>

          <p className="text-lg text-gray-200">
            Our journey began with a small group of passionate athletes and
            coaches. Today, we are a vibrant community united by passion,
            progress, and purpose.
          </p>

          <p className="text-lg text-gray-200">
            From toddlers to competitive athletes, our programs are tailored to
            all levels. We don't just build skills — we build confidence, focus,
            and lifelong values.
          </p>

          <p className="text-lg text-gray-200">
            Whether you're here for fun, fitness, or future championships —{" "}
            <span className="text-orange-400 font-semibold">
              Shree Sports Academy is your perfect start
            </span>
            .
          </p>
        </div>

        {/* Right Side Highlights */}
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="bg-white text-black p-6 rounded-xl shadow-md hover:shadow-xl transition">
            <FaChild className="text-orange-500 text-3xl mb-2" />
            <h4 className="text-xl font-bold">Age-Specific Training</h4>
            <p className="text-sm text-gray-700 mt-1">
              Programs for toddlers, beginners, intermediates, and competitive
              gymnasts.
            </p>
          </div>
          <div className="bg-white text-black p-6 rounded-xl shadow-md hover:shadow-xl transition">
            <FaUsers className="text-orange-500 text-3xl mb-2" />
            <h4 className="text-xl font-bold">Expert Coaches</h4>
            <p className="text-sm text-gray-700 mt-1">
              Professionally trained coaches provide personalized attention.
            </p>
          </div>
          <div className="bg-white text-black p-6 rounded-xl shadow-md hover:shadow-xl transition">
            <FaAward className="text-orange-500 text-3xl mb-2" />
            <h4 className="text-xl font-bold">Competitions & Events</h4>
            <p className="text-sm text-gray-700 mt-1">
              Students showcase talents through events, competitions, and
              performances.
            </p>
          </div>
          <div className="bg-white text-black p-6 rounded-xl shadow-md hover:shadow-xl transition">
            <FaStar className="text-orange-500 text-3xl mb-2" />
            <h4 className="text-xl font-bold">Holistic Growth</h4>
            <p className="text-sm text-gray-700 mt-1">
              Boosts confidence, discipline, and focus — both inside and outside
              the gym.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      {/* <div className="mt-20 text-center">
        <h3 className="text-3xl font-bold text-white">
          Ready to Begin Your Gymnastics Journey?
        </h3>
        <p className="mt-3 text-lg text-gray-300">
          Join a supportive, inspiring, and dynamic gymnastics family today.
        </p>
        <a
          href="/register"
          className="mt-6 inline-block bg-orange-500 hover:bg-orange-600 text-white text-lg font-semibold px-8 py-4 rounded-lg transition"
        >
          Register Now
        </a>
      </div> */}

      {/* Our Vision Section */}
      <div className="mt-24">
        <h3 className="text-4xl font-bold mb-6 text-center text-orange-500">
          🌟 Our Vision
        </h3>
        <p className="text-lg text-gray-200 text-center max-w-5xl mx-auto mb-12">
          At Shree Sports Academy, our vision is to transform lives through the
          power of gymnastics and fitness. We aim to build not just skilled
          athletes, but confident, disciplined, and resilient individuals.
          Through inclusive training, personal growth, and community support —
          we’re creating a future filled with energy, excellence, and endless
          potential.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white text-black p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
            <FaLightbulb className="text-orange-500 text-3xl mb-3" />
            <h4 className="text-xl font-semibold mb-2">Inspiring Minds</h4>
            <p className="text-sm text-gray-700">
              Building emotional intelligence, discipline, and resilience
              through sport.
            </p>
          </div>

          <div className="bg-white text-black p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
            <FaHeartbeat className="text-orange-500 text-3xl mb-3" />
            <h4 className="text-xl font-semibold mb-2">Fitness for All</h4>
            <p className="text-sm text-gray-700">
              Encouraging healthy lifestyles for children of all backgrounds and
              abilities.
            </p>
          </div>

          <div className="bg-white text-black p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
            <FaBalanceScale className="text-orange-500 text-3xl mb-3" />
            <h4 className="text-xl font-semibold mb-2">
              Life Skills Through Sport
            </h4>
            <p className="text-sm text-gray-700">
              Teaching values like teamwork, focus, and goal-setting that go
              beyond the gym.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
