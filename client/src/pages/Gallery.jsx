import { useState, useEffect, useCallback, useMemo } from 'react';
import { FaTimes, FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

// Preload images for better performance
const preloadImages = (images) => {
  images.forEach((image) => {
    const img = new Image();
    img.src = image.src;
  });
};

const Gallery = () => {
  // Memoize image imports to prevent re-importing on every render
  const [images, setImages] = useState({
    training: [],
    equipment: []
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load images only once on component mount
  useEffect(() => {
    const loadImages = async () => {
      try {
        const trainingModules = import.meta.glob('../assets/gallery-images/image-*.jpg', { eager: true });
        const equipmentModules = import.meta.glob('../assets/gallery-images/equipment-img/image-*.jpg', { eager: true });

        const trainingList = Object.entries(trainingModules).map(([path, module], index) => ({
          id: `random-${index + 1}`,
          src: module.default,
          alt: `Training image ${index + 1}`,
          category: 'training'
        }));

        const equipmentList = Object.entries(equipmentModules).map(([path, module], index) => ({
          id: `equipment-${index + 1}`,
          src: module.default,
          alt: `Equipment image ${index + 1}`,
          category: 'equipment'
        }));

        setImages({
          training: trainingList,
          equipment: equipmentList
        });

        // Preload images for smoother user experience
        preloadImages([...trainingList, ...equipmentList]);
        
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading images:", error);
        setIsLoading(false);
      }
    };

    loadImages();
  }, []);

  // Memoize random image selection to prevent unnecessary re-renders
  const getRandomSelection = useCallback((images, count) => {
    const shuffled = [...images].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }, []);

  const displayedTrainingImages = useMemo(
    () => getRandomSelection(images.training, 8),
    [images.training, getRandomSelection]
  );

  const displayedEquipmentImages = useMemo(
    () => getRandomSelection(images.equipment, 8),
    [images.equipment, getRandomSelection]
  );

  // Keyboard navigation handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;

      const { category, id } = selectedImage;
      const currentImages = images[category];
      const currentIndex = currentImages.findIndex(img => img.id === id);

      switch (e.key) {
        case 'Escape':
          setSelectedImage(null);
          break;
        case 'ArrowRight':
          setSelectedImage(currentImages[(currentIndex + 1) % currentImages.length]);
          break;
        case 'ArrowLeft':
          setSelectedImage(currentImages[(currentIndex - 1 + currentImages.length) % currentImages.length]);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, images]);

  // Image click handler
  const handleImageClick = useCallback((image) => {
    setSelectedImage(image);
  }, []);

  // Navigation handlers
  const handleNext = useCallback((e) => {
    e.stopPropagation();
    if (!selectedImage) return;
    
    const { category, id } = selectedImage;
    const currentImages = images[category];
    const currentIndex = currentImages.findIndex(img => img.id === id);
    setSelectedImage(currentImages[(currentIndex + 1) % currentImages.length]);
  }, [selectedImage, images]);

  const handlePrev = useCallback((e) => {
    e.stopPropagation();
    if (!selectedImage) return;
    
    const { category, id } = selectedImage;
    const currentImages = images[category];
    const currentIndex = currentImages.findIndex(img => img.id === id);
    setSelectedImage(currentImages[(currentIndex - 1 + currentImages.length) % currentImages.length]);
  }, [selectedImage, images]);

  // Render individual image
  const renderImage = (image) => (
    <motion.div
      key={image.id}
      className="aspect-square group relative overflow-hidden rounded-xl cursor-pointer border border-white/10 shadow-md hover:shadow-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      onClick={() => handleImageClick(image)}
      layoutId={`image-${image.id}`}
    >
      <img
        src={image.src}
        alt={image.alt}
        loading="lazy"
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
    </motion.div>
  );

  // Loading skeleton
  const renderLoadingSkeleton = () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="aspect-square bg-gray-700/40 rounded-lg animate-pulse" />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#090040] text-white py-16 px-6 sm:px-10 lg:px-20 mt-10">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold">
          Our <span className="text-orange-500">Gallery</span>
        </h1>
        <p className="text-lg text-gray-300 mt-3 max-w-3xl mx-auto">
          Explore training moments and state-of-the-art equipment that fuel our athletes' growth.
        </p>
      </div>

      {/* Training Section */}
      <section className="mb-20">
        <h2 className="text-2xl font-semibold mb-6 text-orange-400 border-b border-orange-400 pb-2">
          🏋️ Training Moments
        </h2>
        {isLoading ? renderLoadingSkeleton() : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {displayedTrainingImages.map(renderImage)}
          </div>
        )}
      </section>

      {/* Equipment Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 text-orange-400 border-b border-orange-400 pb-2">
          � Our Equipment
        </h2>
        {isLoading ? renderLoadingSkeleton() : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {displayedEquipmentImages.map(renderImage)}
          </div>
        )}
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-6xl w-full max-h-[90vh]">
              <button
                className="absolute -top-12 right-0 text-white text-2xl hover:text-orange-500 transition"
                onClick={() => setSelectedImage(null)}
                aria-label="Close gallery"
              >
                <FaTimes />
              </button>

              <motion.img
                key={selectedImage.id}
                src={selectedImage.src}
                alt={selectedImage.alt}
                layoutId={`image-${selectedImage.id}`}
                className="max-w-full max-h-[80vh] mx-auto object-contain"
                onClick={(e) => e.stopPropagation()}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
              />

              <button
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/60 text-white p-3 rounded-full hover:bg-orange-500 transition"
                onClick={handlePrev}
                aria-label="Previous image"
              >
                <FaArrowLeft />
              </button>

              <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/60 text-white p-3 rounded-full hover:bg-orange-500 transition"
                onClick={handleNext}
                aria-label="Next image"
              >
                <FaArrowRight />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;