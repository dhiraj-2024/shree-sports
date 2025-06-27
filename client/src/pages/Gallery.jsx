import { useState, useRef, useEffect } from 'react';
import { FaSearch, FaTimes, FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Gallery = () => {
  // Sample image data - in real app, you might fetch this from an API or JSON file
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const galleryRef = useRef(null);

  // Categories for filtering
  const categories = [
    'All',
    'Competitions',
    'Training',
    'Events',
    'Students',
    'Facility'
  ];
  const [activeCategory, setActiveCategory] = useState('All');

  // Load images - in a real app, you would fetch these
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      const sampleImages = Array.from({ length: 60 }, (_, i) => ({
        id: i + 1,
        src: `/images/gallery/image-${(i % 10) + 1}.jpg`, // Assuming you have 10 sample images named image-1.jpg to image-10.jpg
        alt: `Gymnastics activity ${i + 1}`,
        category: categories[(i % 5) + 1], // Distribute across categories
        caption: `Amazing moment from our academy #${i + 1}`
      }));
      
      setImages(sampleImages);
      setFilteredImages(sampleImages);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Filter images based on search and category
  useEffect(() => {
    let result = images;
    
    if (activeCategory !== 'All') {
      result = result.filter(img => img.category === activeCategory);
    }
    
    if (searchTerm) {
      result = result.filter(img => 
        img.caption.toLowerCase().includes(searchTerm.toLowerCase()) ||
        img.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredImages(result);
  }, [searchTerm, activeCategory, images]);

  // Infinite scroll implementation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Load more images when reaching bottom
          // In a real app, you would fetch more data here
        }
      },
      { threshold: 0.1 }
    );

    if (galleryRef.current) {
      observer.observe(galleryRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedImage) {
        if (e.key === 'Escape') {
          setSelectedImage(null);
        } else if (e.key === 'ArrowRight') {
          const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
          const nextIndex = (currentIndex + 1) % filteredImages.length;
          setSelectedImage(filteredImages[nextIndex]);
        } else if (e.key === 'ArrowLeft') {
          const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
          const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
          setSelectedImage(filteredImages[prevIndex]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, filteredImages]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#090040] to-[#1a1a2e] text-white py-20 px-4 sm:px-6 lg:px-8">
      {/* Gallery Header */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold mb-6"
        >
          Our <span className="text-orange-500">Gallery</span>
        </motion.h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Capturing the energy, dedication, and achievements of our athletes
        </p>
      </div>

      {/* Search and Filter */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Search Bar */}
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search photos..."
              className="w-full bg-[#ffffff10] border border-[#ffffff20] rounded-full py-3 px-6 pl-12 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <FaTimes />
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 w-full md:w-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category
                    ? 'bg-orange-500 text-white shadow-md'
                    : 'bg-[#ffffff10] text-gray-300 hover:bg-[#ffffff20]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      {isLoading ? (
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {Array.from({ length: 12 }).map((_, index) => (
            <div
              key={index}
              className="aspect-square bg-[#ffffff10] rounded-lg animate-pulse"
            />
          ))}
        </div>
      ) : filteredImages.length > 0 ? (
        <>
          <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filteredImages.map((image) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="aspect-square relative group overflow-hidden rounded-lg cursor-pointer shadow-lg"
                onClick={() => setSelectedImage(image)}
              >
                {/* Blur placeholder */}
                <div className="absolute inset-0 bg-gray-800 blur-lg scale-110 transform transition duration-300 group-hover:opacity-0" />
                
                {/* Actual image */}
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-4">
                  <h3 className="text-white font-medium truncate">{image.caption}</h3>
                  <span className="text-xs text-orange-300">{image.category}</span>
                </div>
              </motion.div>
            ))}
          </div>
          <div ref={galleryRef} className="h-10"></div>
        </>
      ) : (
        <div className="max-w-7xl mx-auto text-center py-20">
          <h3 className="text-2xl font-medium text-gray-400">
            No images found matching your criteria
          </h3>
          <button
            onClick={() => {
              setSearchTerm('');
              setActiveCategory('All');
            }}
            className="mt-4 text-orange-500 hover:text-orange-400 font-medium"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-6xl w-full max-h-[90vh]">
              {/* Close button */}
              <button
                className="absolute -top-12 right-0 text-white text-2xl z-10 hover:text-orange-500 transition"
                onClick={() => setSelectedImage(null)}
              >
                <FaTimes />
              </button>
              
              {/* Main image */}
              <motion.img
                key={selectedImage.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="max-w-full max-h-[80vh] mx-auto object-contain"
                onClick={(e) => e.stopPropagation()}
              />
              
              {/* Navigation arrows */}
              <button
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-4 rounded-full hover:bg-orange-500 transition z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
                  const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
                  setSelectedImage(filteredImages[prevIndex]);
                }}
              >
                <FaArrowLeft />
              </button>
              <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-4 rounded-full hover:bg-orange-500 transition z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
                  const nextIndex = (currentIndex + 1) % filteredImages.length;
                  setSelectedImage(filteredImages[nextIndex]);
                }}
              >
                <FaArrowRight />
              </button>
              
              {/* Caption */}
              <div className="absolute bottom-4 left-0 right-0 text-center text-white bg-black/50 p-2 rounded">
                <p>{selectedImage.caption}</p>
                <span className="text-sm text-orange-300">{selectedImage.category}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;