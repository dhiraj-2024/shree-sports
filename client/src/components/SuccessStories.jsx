// client/src/components/SuccessStories.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

export default function SuccessStories() {
  const stories = [
    {
      id: 1,
      name: "Rahul Sharma",
      achievement: "State Level Gold Medalist",
      quote:
        "Shree Sports Academy transformed me from a beginner to a champion",
      before: "/images/before1.jpg",
      after: "/images/after1.jpg",
    },
    // More stories...
  ];

  return (
    <section className="py-16 bg-dark-blue text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Our <span className="text-gold">Success Stories</span>
        </h2>

        <Swiper
          modules={[Pagination, Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          navigation
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {stories.map((story) => (
            <SwiperSlide key={story.id}>
              <div className="bg-navy-blue p-6 rounded-lg h-full">
                <div className="flex mb-4">
                  <img src={story.before} alt="Before" className="w-1/2 pr-2" />
                  <img src={story.after} alt="After" className="w-1/2 pl-2" />
                </div>
                <h3 className="text-xl font-bold mb-2">{story.name}</h3>
                <p className="text-gold font-medium mb-3">
                  {story.achievement}
                </p>
                <p className="italic">"{story.quote}"</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
