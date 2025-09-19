import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  'Makeup',
  'Skin',
  'Hair',
  'Appliances',
  'Bath & Body',
  'Natural',
  'Mom & Baby',
  'Health & Wellness',
  'Men',
  'Fragrance',
  'Lingerie & Accessories',
  'Offers',
];

export const SecondaryNavigation: React.FC = () => {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="flex space-x-6 overflow-x-auto no-scrollbar whitespace-nowrap py-3"
        >
          {categories.map((category) => {
            const isOffers = category === 'Offers';
            return (
              <Link
                key={category}
                to={`/${category.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-')}`}
                className={`text-sm font-medium text-gray-700 hover:text-[#662483] ${
                  isOffers
                    ? 'bg-[#662483] text-white rounded-full px-3 py-1 inline-block'
                    : 'inline-block'
                }`}
              >
                {category}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
