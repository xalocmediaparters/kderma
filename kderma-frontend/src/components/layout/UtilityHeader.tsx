import React, { useState } from 'react';
import { Smartphone, MapPin, Gift, HelpCircle, ChevronDown } from 'lucide-react';

export const UtilityHeader: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const links = [
    { label: 'Get App', icon: Smartphone, href: '#' },
    { label: 'Store & Events', icon: MapPin, href: '#' },
    { label: 'Gift Card', icon: Gift, href: '#' },
    { label: 'Help', icon: HelpCircle, href: '#' },
  ];

  return (
    <div className="bg-[#DCAEE6] text-white py-2 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left side text */}
        <div className="text-sm font-medium">
          Exclusive Offers Available Now!
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center space-x-6">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                className="flex items-center space-x-1 text-sm font-medium hover:text-[#662483] hover:bg-white/20 px-2 py-1 rounded transition-colors"
              >
                <Icon className="h-4 w-4" />
                <span>{link.label}</span>
              </a>
            );
          })}
        </div>

        {/* Mobile dropdown */}
        <div className="md:hidden relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-1 text-sm font-medium hover:text-[#662483] hover:bg-white/20 px-2 py-1 rounded transition-colors"
          >
            <span>More</span>
            <ChevronDown className="h-4 w-4" />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
              {links.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-900 hover:bg-[#DCAEE6] hover:text-white transition-colors"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{link.label}</span>
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
