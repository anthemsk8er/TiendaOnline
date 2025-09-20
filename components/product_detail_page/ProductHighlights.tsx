import React from 'react';
import type { ProductHighlightsData } from '../../types';
import { CheckBoxIcon } from './Icons';

interface ProductHighlightsProps {
  data?: ProductHighlightsData | null;
}

const ProductHighlights: React.FC<ProductHighlightsProps> = ({ data }) => {
  if (!data) {
    return null;
  }

  const { stats, info_points, guarantees } = data;

  const hasStats = stats?.some(s => s.value);
  const hasInfoPoints = (info_points?.length ?? 0) > 0;
  const hasGuarantees = (guarantees?.length ?? 0) > 0;

  if (!hasStats && !hasInfoPoints && !hasGuarantees) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4 mt-6 px-0">
      {/* Stats Section */}
      {hasStats && (
        <div className="grid grid-cols-3 gap-2 text-center">
          {stats.map((stat, index) => stat.value && (
            <div key={index} className="border border-gray-200 rounded-lg p-3 bg-white shadow-sm">
              <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
              <p className="text-xs text-gray-600 uppercase font-medium">{stat.label}</p>
              {stat.sublabel && <p className="text-xs text-gray-500 bg-gray-100 rounded-full mt-1 px-2 py-0.5 inline-block">{stat.sublabel}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Info Points Section */}
      {hasInfoPoints && info_points && (
        <div className="space-y-2">
          {info_points.map((point, index) => (
            <div key={index} className="flex items-center gap-4 border border-gray-200 rounded-lg py-2 p-2 bg-white shadow-sm">
              {point.icon_url && <img src={point.icon_url} alt={point.title} className="w-16 h-16 object-contain flex-shrink-0" />}
              <div>
                <p className="font-semibold text-gray-800">{point.title}</p>
                <p className="text-sm text-gray-600">{point.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Guarantees Section */}
      {hasGuarantees && guarantees && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-2 border border-gray-200 rounded-lg p-3 bg-white shadow-sm">
            {guarantees.map((guarantee, index) => (
                <div key={index} className="flex items-center gap-2">
                    <CheckBoxIcon className="w-5 h-5 text-teal-600 flex-shrink-0" />
                    <span className="text-xs font-medium text-gray-700">{guarantee.text}</span>
                </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default ProductHighlights;