import React, { useState } from 'react';
import { FaTrophy, FaMedal, FaGlobeAsia, FaUsers, FaChevronLeft, FaChevronRight, FaExpand } from 'react-icons/fa';

// Import your images - replace these with your actual image imports
import samrat1 from '../assets/images/success-story/samrat1.jpg';
import samrat2 from '../assets/images/success-story/samrat2.jpg';
import samrat3 from '../assets/images/success-story/samrat3.jpg';
import nakul1 from '../assets/images/success-story/nakul1.jpg';
import nakul2 from '../assets/images/success-story/nakul2.jpg';
import nakul3 from '../assets/images/success-story/nakul3.jpg';
import event1 from '../assets/images/success-story/event1.jpg';
import event2 from '../assets/images/success-story/event2.jpg';
import event3 from '../assets/images/success-story/event3.jpg';

const SuccessStories = () => {
  const [activeStory, setActiveStory] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fullscreenImage, setFullscreenImage] = useState(null);

  const stories = [
    {
      id: 1,
      title: "Samrat Soni at State Championship",
      highlight: "3rd Place in Floor Exercise",
      location: "Balewadi, Pune",
      icon: <FaMedal className="text-3xl text-yellow-500" />,
      content: [
        "We are delighted to share a proud and inspiring moment in the journey of Shree Sports Academy Gymnastics Center. Our talented gymnast, Samrat Soni, delivered an outstanding performance at the 1st Level Wise State Gymnastics Championship.",
        "Samrat showcased remarkable skill and determination in his routines, especially during the Floor Exercise event, where he secured 3rd place, proudly representing the academy and making his parents, coaches, and the entire Shree Sports Academy team proud.",
        "Samrat's success is the result of consistent practice, dedication, and passion for gymnastics. From mastering the basics to performing with confidence on the competition floor, his journey is a shining example of perseverance.",
        "This success story is not just about one gymnast — we are equally proud of all three gymnasts from Shree Sports Academy who participated in the championship. Each of them represented the academy with great spirit, discipline, and sportsmanship."
      ],
      images: [
        { src: samrat1, alt: "Samrat performing floor exercise" },
        { src: samrat2, alt: "Team at competition" },
        { src: samrat3, alt: "Award ceremony" }
      ],
      stats: [
        { label: "Position", value: "3rd Place" },
        { label: "Event", value: "Floor Exercise" },
        { label: "Participants", value: "3 Gymnasts" }
      ]
    },
    {
      id: 2,
      title: "Nakul Karekar at Asian Championship",
      highlight: "Represented India Internationally",
      location: "Hong Kong, China",
      icon: <FaGlobeAsia className="text-3xl text-blue-500" />,
      content: [
        "We are immensely proud to share a monumental achievement in the journey of Shree Sports Academy Gymnastics Center — our talented gymnast, Nakul Karekar, represented India at the prestigious 6th Asian Trampoline Gymnastics Championship 2024–25.",
        "This incredible opportunity was not just a personal milestone for Nakul but a proud moment for the entire Shree Sports Academy family. His participation marks a significant step forward in our mission to promote world-class gymnastics training.",
        "Nakul's selection and performance at this championship were the result of years of disciplined training, countless hours of practice, and unwavering commitment. From basic trampoline drills to mastering high-level routines, Nakul displayed focus, consistency, and a passion for excellence.",
        "Behind this success is also the tireless effort of our coaching team, support staff, and mentors at Shree Sports Academy. Our dedicated coaches worked closely with Nakul through every step of his preparation."
      ],
      images: [
        { src: nakul1, alt: "Nakul performing trampoline routine" },
        { src: nakul2, alt: "Team India representation" },
        { src: nakul3, alt: "Training session" }
      ],
      stats: [
        { label: "Competition", value: "Asian Championship" },
        { label: "Discipline", value: "Trampoline" },
        { label: "Years Training", value: "5+" }
      ]
    },
    {
      id: 3,
      title: "1st Invitational Competition",
      highlight: "400+ Participants",
      location: "Shree Sports Academy",
      icon: <FaUsers className="text-3xl text-green-500" />,
      content: [
        "We are thrilled to share a proud and memorable achievement for Shree Sports Academy Gymnastics Center — the successful organization of the 1st Invitational Gymnastics Competition 2024–25.",
        "With 400+ registrations from budding gymnasts across the region, the competition turned out to be a grand celebration of talent, sportsmanship, and the spirit of gymnastics. It was truly an honor for Shree Sports Academy to host this prestigious event.",
        "Organizing this large-scale event was a rewarding and enriching experience for our entire team. From planning and coordination to execution and hosting — every moment was filled with excitement, learning, and joy.",
        "The presence of enthusiastic participants, encouraging parents, and passionate coaches added immense energy to the atmosphere. Each performance was a reflection of hard work, training, and love for the sport."
      ],
      images: [
        { src: event1, alt: "Competition venue" },
        { src: event2, alt: "Participants and audience" },
        { src: event3, alt: "Award distribution" }
      ],
      stats: [
        { label: "Participants", value: "400+" },
        { label: "Events", value: "12 Categories" },
        { label: "Duration", value: "2 Days" }
      ]
    }
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === stories[activeStory].images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? stories[activeStory].images.length - 1 : prev - 1
    );
  };

  const openFullscreen = (imgSrc) => {
    setFullscreenImage(imgSrc);
  };

  const closeFullscreen = () => {
    setFullscreenImage(null);
  };

  return (
    <section className="bg-[#090040] text-white py-20 px-6 sm:px-10 lg:px-20 mt-10">
      {/* Fullscreen Image Modal */}
      {fullscreenImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <button 
            onClick={closeFullscreen}
            className="absolute top-4 right-4 text-white text-2xl"
          >
            &times;
          </button>
          <img 
            src={fullscreenImage} 
            alt="Fullscreen view" 
            className="max-h-full max-w-full object-contain"
          />
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 flex items-center justify-center">
            <FaTrophy className="mr-4 text-orange-500" />
            Our <span className="text-orange-500">Success</span> Stories
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Celebrating the achievements and milestones of our athletes and academy
          </p>
        </div>

        {/* Story Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {stories.map((story, index) => (
            <button
              key={story.id}
              onClick={() => {
                setActiveStory(index);
                setCurrentImageIndex(0);
              }}
              className={`px-6 py-3 rounded-full font-semibold transition-all flex items-center ${
                activeStory === index
                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
                  : 'bg-white text-gray-800 hover:bg-gray-100 shadow-md'
              }`}
            >
              {story.icon}
              <span className="ml-2">{story.title.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        {/* Active Story Display */}
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden mb-16 text-gray-800">
          <div className="md:flex">
            {/* Image Gallery Column */}
            <div className="md:w-1/2 relative">
              {/* Main Image */}
              <div className="h-64 md:h-96 bg-gray-200 relative overflow-hidden">
                <img 
                  src={stories[activeStory].images[currentImageIndex].src}
                  alt={stories[activeStory].images[currentImageIndex].alt}
                  className="w-full h-full object-cover"
                />
                <button 
                  onClick={() => openFullscreen(stories[activeStory].images[currentImageIndex].src)}
                  className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                >
                  <FaExpand />
                </button>
                
                {/* Navigation Arrows */}
                <button 
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                >
                  <FaChevronLeft />
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                >
                  <FaChevronRight />
                </button>
              </div>
              
              {/* Thumbnail Strip */}
              <div className="flex p-2 bg-gray-100 overflow-x-auto">
                {stories[activeStory].images.map((img, idx) => (
                  <div 
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`flex-shrink-0 w-16 h-16 mx-1 bg-gray-300 cursor-pointer border-2 rounded overflow-hidden ${
                      currentImageIndex === idx ? 'border-orange-500' : 'border-transparent'
                    }`}
                  >
                    <img 
                      src={img.src} 
                      alt={img.alt} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Story Content Column */}
            <div className="md:w-1/2 p-6 md:p-8">
              <div className="mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {stories[activeStory].title}
                </h2>
                <div className="flex items-center text-orange-500 font-medium mb-4">
                  {stories[activeStory].icon}
                  <span className="ml-2">{stories[activeStory].highlight}</span>
                </div>
                <div className="text-gray-500 mb-4">
                  <span className="font-medium">Location:</span> {stories[activeStory].location}
                </div>
              </div>

              {/* Story Content */}
              <div className="space-y-4 mb-8">
                {stories[activeStory].content.map((paragraph, idx) => (
                  <p key={idx} className="text-gray-700">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {stories[activeStory].stats.map((stat, idx) => (
                  <div key={idx} className="bg-gray-100 rounded-lg p-3 text-center">
                    <div className="text-xl font-bold text-orange-500">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Quote */}
              <div className="bg-blue-50 border-l-4 border-orange-500 p-4 italic text-gray-700">
                "This is just the beginning — the best is yet to come!"
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20">
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to Begin Your Success Story?
          </h3>
          <p className="text-lg text-gray-300 mb-6">
            Join a supportive, inspiring, and dynamic gymnastics family today.
          </p>
           <a
          href="/register"
          className="mt-6 inline-block bg-orange-500 hover:bg-orange-600 text-white text-lg font-semibold px-8 py-4 rounded-lg transition"
        >
          Register Now
        </a>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;