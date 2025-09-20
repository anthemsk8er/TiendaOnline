import React from 'react';
// FIX: Changed import path to be relative to the root `types.ts`
import type { Review } from '../../types';
import StarRating from './StarRating';
import { CheckBadgeIcon } from './Icons';

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <div className="flex items-start gap-3">
        {/* User image or placeholder */}
        <div className="w-10 h-10 rounded-full bg-gray-100 text-[#1a2b63] flex items-center justify-center font-bold text-lg flex-shrink-0">
          {review.author_name.charAt(0)}
        </div>
        <div className="flex-grow">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
            <div>
              <h4 className="font-bold text-sm text-[#1a2b63]">{review.author_name}</h4>
              <p className="text-xs text-gray-500">{review.author_province}</p>
            </div>
            <div className="mt-1 sm:mt-0">
              <StarRating rating={review.rating} />
            </div>
          </div>
          <p className="flex items-center gap-1 text-xs text-green-600 font-semibold mt-1">
            <CheckBadgeIcon className="w-4 h-4"/>
            Compra Verificada
          </p>
        </div>
      </div>
      <p className="text-sm text-gray-700 mt-3 leading-normal">{review.comment}</p>
      {review.image_url && (
        <div className="mt-3">
          <img 
            src={`${review.image_url}?width=320&quality=80`} 
            alt={`Comentario de ${review.author_name}`} 
            className="max-w-[120px] h-auto rounded-lg object-cover cursor-pointer hover:opacity-90 transition-opacity"
            loading="lazy"
            width="120"
            height="120"
          />
        </div>
      )}
    </div>
  );
};

export default ReviewCard;