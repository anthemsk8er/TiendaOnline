import React from 'react';
import type { ProductHighlightsData } from '../../types';
import { CheckBoxIcon } from './Icons';

interface ProductHighlightsProps {
  data?: ProductHighlightsData | null;
}

const ProductHighlights: React.FC<ProductHighlightsProps> = ({ data }) => {
  if (!data || (!data.stats?.length && !data.info_points?.length && !data.guarantees?.length)) {
    return null;
  }

  const { stats, info_points, guarantees } = data;
  const hasStats = stats && stats.some(s => s.value);
  const hasInfoPoints = info_points && info_points.length > 0;
  const hasGuarantees = guarantees && guarantees.length > 0;

  return (
    <div className="flex flex-col gap-4">
      {/* Stats Section */}
      {hasStats && (
        <div className="grid grid-cols-3 gap-3 text-center">
          {stats.map((stat, index) => {
            if (!stat.value) return null;
            // Pad single-digit numbers with a leading zero
            const formattedValue = !isNaN(Number(stat.value)) && stat.value.length < 2 
              ? String(stat.value).padStart(2, '0') 
              : stat.value;

            return (
              <div key={index} className="border border-gray-200 rounded-xl p-3 bg-white shadow-sm flex flex-col items-center justify-center h-full">
                <p className="text-3xl lg:text-4xl font-extrabold text-[#1a2b63] leading-none">{formattedValue}</p>
                <p className="text-xs text-gray-600 uppercase font-semibold tracking-wide mt-1 leading-tight">{stat.label}</p>
                {stat.sublabel && <p className="text-[11px] text-gray-500 bg-gray-100 rounded-full mt-1.5 px-2 py-0.5 font-medium whitespace-nowrap">{stat.sublabel}</p>}
              </div>
            );
          })}
        </div>
      )}

      {/* Info Points Section */}
      {hasInfoPoints && (
        <div className="space-y-3">
          {info_points.map((point, index) => (
            <div key={index} className="flex items-start gap-4 border border-gray-200 rounded-xl p-4 bg-white shadow-sm">
              {point.icon_url && <img src={point.icon_url} alt={point.title} className="w-12 h-12 object-contain flex-shrink-0" />}
              <div>
                <p className="font-bold text-gray-800 text-base leading-tight">{point.title}</p>
                <p className="text-sm text-gray-600">{point.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Guarantees Section */}
      {hasGuarantees && (
        <div className="grid grid-cols-1 gap-3 border border-gray-200 rounded-xl p-4 bg-white shadow-sm">
            {guarantees.map((guarantee, index) => (
                <div key={index} className="flex items-center gap-2">
                    <CheckBoxIcon className="w-5 h-5 text-teal-600 flex-shrink-0" />
                    <span className="text-sm font-medium text-gray-700">{guarantee.text}</span>
                </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default ProductHighlights;