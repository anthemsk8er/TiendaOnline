import React, { useState, useEffect } from 'react';

interface ProductGalleryProps {
  images: string[];
  videoUrl?: string;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images, videoUrl }) => {
  // Use a state object to manage the main display content for robustness
  const [mainDisplay, setMainDisplay] = useState<{ type: 'image' | 'video', src: string }>({
    type: 'image',
    src: images[0] || '' // Safely default to empty string if images is empty
  });

  // Reset state when props change to handle navigation between products
  useEffect(() => {
    setMainDisplay({ type: 'image', src: images[0] || '' });
  }, [images, videoUrl]);

  const handleImageThumbnailClick = (image: string) => {
    setMainDisplay({ type: 'image', src: image });
  };
  
  const handleVideoThumbnailClick = () => {
    if (videoId) {
        setMainDisplay({ type: 'video', src: embedUrl });
    }
  }

  const extractVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = videoUrl ? extractVideoId(videoUrl) : null;
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0` : '';

  const maxThumbnails = 5;
  const hasVideo = !!videoId;
  
  // Take up to `maxThumbnails` images. If there's a video, take one less to make room for the video thumb.
  const imageThumbs = images.slice(0, hasVideo ? maxThumbnails - 1 : maxThumbnails);
  
  return (
    <div className="flex flex-col gap-4">
      <div className="aspect-square w-full rounded-lg overflow-hidden border relative bg-gray-100">
        {mainDisplay.type === 'video' && videoId ? (
          <div className="w-full h-full">
            <iframe
              src={mainDisplay.src}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Product Video"
            />
          </div>
        ) : (
          <img
            src={mainDisplay.src}
            alt="Product"
            className="w-full h-full object-cover"
            width="800"
            height="800"
          />
        )}
      </div>
      <div className="grid grid-cols-5 gap-2 sm:gap-4">
        {hasVideo && (
            <button
                onClick={handleVideoThumbnailClick}
                className={`relative aspect-square rounded-md overflow-hidden border-2 transition-all ${
                    mainDisplay.type === 'video' ? 'border-pink-500' : 'border-transparent hover:border-gray-300'
                }`}
                aria-label="Reproducir video"
            >
                <img
                    src={images[0]?.replace('/800/800', '/100/100')} // Use first image for thumbnail bg and optional chaining for safety
                    alt="Video thumbnail"
                    className="w-full h-full object-cover brightness-75"
                    width="100"
                    height="100"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 group">
                    <div className="bg-white bg-opacity-90 rounded-full p-2 group-hover:bg-opacity-100 transition-all scale-90 group-hover:scale-100">
                        <svg className="w-8 h-8 text-pink-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </div>
                </div>
            </button>
        )}
        {imageThumbs.map((image, index) => (
          <button
            key={index}
            onClick={() => handleImageThumbnailClick(image)}
            className={`aspect-square rounded-md overflow-hidden border-2 transition-all ${
              mainDisplay.type === 'image' && mainDisplay.src === image ? 'border-pink-500' : 'border-transparent hover:border-gray-300'
            }`}
          >
            <img
              src={image.replace('/800/800', '/100/100')} // Use smaller images for thumbnails
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
              width="100"
              height="100"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;