// FIX: Create missing ProductGallery.tsx file.
import React, { useState } from 'react';
import VideoPopup from './VideoPopup';
import { ChevronLeftIcon, ChevronRightIcon } from './Icons';

interface ProductGalleryProps {
  images: string[];
  videoUrl: string | null;
  mainImageIndex: number;
  setMainImageIndex: (index: number) => void;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images, videoUrl, mainImageIndex, setMainImageIndex }) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const handleNext = () => {
    // FIX: Pass the calculated new index directly instead of a functional update to match prop type.
    setMainImageIndex((mainImageIndex + 1) % images.length);
  };

  const handlePrev = () => {
    // FIX: Pass the calculated new index directly instead of a functional update to match prop type.
    setMainImageIndex((mainImageIndex - 1 + images.length) % images.length);
  };
  
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    // Swipe left (next image)
    if (diff > 50) {
      handleNext();
    }

    // Swipe right (previous image)
    if (diff < -50) {
      handlePrev();
    }
    
    setTouchStart(null);
  };

  if (!images || images.length === 0) {
    return <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">No Image</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <div
        className="aspect-square relative overflow-hidden shadow-lg bg-gray-100"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
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

       {images.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto p-1">
            {images.map((image, index) => (
                <button
                    key={index}
                    onClick={() => setMainImageIndex(index)}
                    className={`w-20 h-20 flex-shrink-0 rounded-md overflow-hidden border-2 transition-all duration-200 ${mainImageIndex === index ? 'border-[#16a085] scale-105' : 'border-transparent opacity-70 hover:opacity-100'}`}
                >
                    <img src={`${image}?width=100&height=100&resize=cover`} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                </button>
            ))}
        </div>
      )}

       {videoUrl && <VideoPopup isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} videoUrl={videoUrl} />}
    </div>
  );
};

export default ProductGallery;