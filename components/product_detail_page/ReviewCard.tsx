
import React from 'react';
import type { Review } from '../../types';
import StarRating from './StarRating';
import { CheckBadgeIcon } from './Icons';

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
      <div className="flex items-start gap-4">
        {/* User image or placeholder */}
        <div className="w-12 h-12 rounded-full bg-gray-100 text-[#1a2b63] flex items-center justify-center font-bold text-xl flex-shrink-0">
          {review.author_name.charAt(0)}
        </div>
        <div className="flex-grow">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
            <div>
              <h4 className="font-bold text-[#1a2b63]">{review.author_name}</h4>
              <p className="text-sm text-gray-500">{review.author_province}</p>
            </div>
            <div className="mt-2 sm:mt-0">
              <StarRating rating={review.rating} />
            </div>
          </div>
          <p className="flex items-center gap-1 text-sm text-green-600 font-semibold mt-2">
            <CheckBadgeIcon className="w-5 h-5"/>
            Compra Verificada
          </p>
        </div>
      </div>
      <p className="text-gray-700 mt-4 leading-relaxed">{review.comment}</p>
      {review.image_url && (
        <div className="mt-4">
          <img 
            src={`${review.image_url}?width=320&quality=80`} 
            alt={`Comentario de ${review.author_name}`} 
            className="max-w-full sm:max-w-xs h-auto rounded-lg object-cover cursor-pointer hover:opacity-90 transition-opacity"
            loading="lazy"
            width="320"
            height="320"
          />
        </div>
      )}
    </div>
  );
};

export default ReviewCard;