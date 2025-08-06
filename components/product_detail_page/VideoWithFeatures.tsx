
import React from 'react';
import type { VideoWithFeaturesData } from '../../types';
import DynamicIcon from '../shared/DynamicIcon';

interface VideoWithFeaturesProps {
  data?: VideoWithFeaturesData | null;
}

const VideoWithFeatures: React.FC<VideoWithFeaturesProps> = ({ data }) => {
  if (!data || !data.videoUrl || !data.features || data.features.length === 0) {
    return null;
  }

  const { title, videoUrl, features } = data;

  const extractVideoId = (url: string): string | null => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };
  
  const videoId = extractVideoId(videoUrl);
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}?rel=0&showinfo=0&autoplay=0` : '';

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {title && (
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-black text-gray-900 tracking-tight uppercase animate-fade-in-up">
              {title}
            </h2>
          </div>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Video Column */}
          <div className="aspect-w-16 aspect-h-16 rounded-xl overflow-hidden shadow-2xl bg-black animate-fade-in-up delay-100">
            {embedUrl ? (
              <iframe
                src={embedUrl}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={title || "Product Video"}
                className="w-full h-full"
              />
            ) : (
              <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                <p className="text-gray-400">Video no disponible o URL inválida.</p>
              </div>
            )}
          </div>

          {/* Features Column */}
          <div className="space-y-8 animate-fade-in-up delay-200">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-5">
                <div className="flex-shrink-0 mt-1 bg-sky-100 p-3 rounded-full">
                   <DynamicIcon name={feature.icon} className="w-7 h-7 text-sky-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{feature.title}</h3>
                  <p className="mt-1 text-gray-600">{feature.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoWithFeatures;
