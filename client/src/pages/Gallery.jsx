// client/src/pages/Gallery.jsx
import { useState } from "react";
// import GalleryGrid from "../components/GalleryGrid";
// import GalleryModal from "../components/GalleryModal";

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="gallery-page py-16 bg-light-gray">
      gallery
      {/* <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-dark-blue">
          Our <span className="text-gold">Moments</span>
        </h2>
        <GalleryGrid onSelect={setSelectedImage} />
        {selectedImage && (
          <GalleryModal
            image={selectedImage}
            onClose={() => setSelectedImage(null)}
          />
        )}
      </div> */}
    </div>
  );
}
