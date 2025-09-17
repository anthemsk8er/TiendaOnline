// FIX: Create missing ProductGallery.tsx file.
import React, { useState } from 'react';
import VideoPopup from './VideoPopup';
import { ChevronLeftIcon, ChevronRightIcon } from './Icons';

interface ProductGalleryProps {
  images: string[];
  videoUrl: string | null;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images, videoUrl }) => {
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const handleNext = () => {
    setMainImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setMainImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };
  
  if (!images || images.length === 0) {
    return <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">No Image</div>;
  }

  return (
    <div className="relative">
      <div className="aspect-square relative overflow-hidden shadow-lg bg-gray-100">
        {images.map((image, index) => (
          <img
            key={index}
            src={`${image}?width=800&height=800&resize=cover`}
            alt={`Product image ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${index === mainImageIndex ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
         {images.length > 1 && (
            <>
              <button onClick={handlePrev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 p-2 rounded-full shadow-md hover:bg-white transition" aria-label="Previous image">
                  <ChevronLeftIcon className="w-6 h-6 text-gray-800" />
              </button>
              <button onClick={handleNext} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 p-2 rounded-full shadow-md hover:bg-white transition" aria-label="Next image">
                  <ChevronRightIcon className="w-6 h-6 text-gray-800" />
              </button>
            </>
        )}
      </div>
      <div className="flex space-x-2 mt-3 overflow-x-auto p-1">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setMainImageIndex(index)}
            className={`w-20 h-20 flex-shrink-0 rounded-md overflow-hidden border-2 transition-colors ${mainImageIndex === index ? 'border-[#16a085]' : 'border-transparent'}`}
          >
            <img src={`${image}?width=100&height=100&resize=cover`} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
        {videoUrl && (
          <button
            onClick={() => setIsVideoOpen(true)}
            className="w-20 h-20 flex-shrink-0 rounded-md overflow-hidden border-2 border-transparent flex items-center justify-center bg-gray-800 text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>
       {videoUrl && <VideoPopup isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} videoUrl={videoUrl} />}
    </div>
  );
};

export default ProductGallery;
