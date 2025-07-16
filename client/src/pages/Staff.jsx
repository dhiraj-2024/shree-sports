import React from "react";
import { FaMedal, FaUserTie, FaChalkboardTeacher, FaAward } from "react-icons/fa";

// Import staff images (replace with actual imports)
import shreekant from "../assets/images/staff/shreekant.jpeg";
// import SandeshBhosle from "../assets/images/staff/sandesh.jpg";

const Staff = () => {
  const staffMembers = [
    {
      id: 1,
      name: "Shrikant Devidas Rathod",
      role: "Founder & International Coach",
      bio: "Founder of Shree Sports Academy Gymnastics Center, Mr. Rathod is a dedicated gymnastics coach with a passion for developing young athletes. Since starting the academy in 2020, he has worked tirelessly to promote fitness, discipline, and skill-based training among children. His vision and leadership continue to drive the academy's success.",
      image: shreekant,
      achievements: [
        "Founded Shree Sports Academy in 2020",
        "International coaching certification",
        "Specializes in athlete development"
      ]
    },
    {
      id: 2,
      name: "Sandesh Sunil Bhosle",
      role: "Head Coach",
      bio: "Sandesh Bhosle is the Head Coach at Shree Sports Academy Gymnastics Center. With a strong background in gymnastics training and coaching, he is known for his structured approach, motivational teaching style, and commitment to athlete development. He plays a key role in mentoring students and preparing them for both recreational and competitive levels.",
      // image: SandeshBhosle,
      achievements: [
        "Head Coach since 2020",
        "Specializes in competitive training",
        "Expert in skill progression"
      ]
    }
  ];

  return (
    <section className="bg-[#090040] text-white py-16 px-6 mt-10 sm:px-10 lg:px-20">
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold leading-tight">
          Meet Our <span className="text-orange-500">Expert Coaches</span>
        </h2>
        <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
          Passionate professionals dedicated to nurturing young gymnasts and helping them achieve their full potential.
        </p>
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
        {staffMembers.map((member) => (
          <div 
            key={member.id} 
            className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            <div className="flex flex-col lg:flex-row">
              {/* Staff Image */}
              <div className="lg:w-2/5 relative group overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-64 lg:h-auto object-cover object-top transform group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white">{member.name}</h3>
                    <p className="text-orange-400 font-medium">{member.role}</p>
                  </div>
                </div>
              </div>
              
              {/* Staff Info */}
              <div className="lg:w-3/5 p-6 lg:p-8">
                <div className="mb-4 lg:mb-6">
                  <h3 className="text-2xl font-bold text-orange-500">{member.name}</h3>
                  <p className="text-lg text-gray-300 font-medium">{member.role}</p>
                </div>
                
                <p className="text-gray-200 mb-6">{member.bio}</p>
                
                <div className="border-t border-gray-700 pt-4">
                  <h4 className="flex items-center text-lg font-semibold mb-3 text-orange-400">
                    <FaMedal className="mr-2" /> Key Achievements
                  </h4>
                  <ul className="space-y-2">
                    {member.achievements.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-orange-500 mr-2 mt-1">•</span>
                        <span className="text-gray-200">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Future Staff Note */}
      {/* <div className="mt-20 text-center bg-white/10 backdrop-blur-sm rounded-xl p-8 max-w-4xl mx-auto">
        <h3 className="text-2xl md:text-3xl font-bold mb-4">
          <span className="text-orange-500">Growing Team</span> of Experts
        </h3>
        <p className="text-lg text-gray-300">
          We're continuously expanding our team of qualified coaches and staff members to provide the best training experience. 
          Stay tuned for more announcements as we welcome new talent to our academy!
        </p>
      </div> */}

      {/* CTA Section */}
      {/* <div className="mt-20 text-center">
        <h3 className="text-3xl font-bold text-white">
          Want to Join Our Coaching Team?
        </h3>
        <p className="mt-3 text-lg text-gray-300">
          We're always looking for passionate professionals to join our growing family.
        </p>
        <a
          href="/careers"
          className="mt-6 inline-block bg-orange-500 hover:bg-orange-600 text-white text-lg font-semibold px-8 py-3 rounded-lg transition"
        >
          Career Opportunities
        </a>
      </div> */}
    </section>
  );
};

export default Staff;