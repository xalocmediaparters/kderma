import React, { useState } from 'react';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { BRAND_CONFIG, NAVIGATION_ITEMS } from '../../utils/constants';
import { Button } from '../ui/Button';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubscribing(true);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Newsletter subscription:', email);
      setEmail('');
      // You would typically show a success message here
    } catch (error) {
      console.error('Newsletter subscription failed:', error);
    } finally {
      setIsSubscribing(false);
    }
  };

  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'About Us', href: '#' },
    { name: 'Contact', href: '#' },
    { name: 'Shipping Info', href: '#' },
    { name: 'Returns & Exchanges', href: '#' },
    { name: 'Size Guide', href: '#' },
    { name: 'Track Order', href: '#' }
  ];

  const supportLinks = [
    { name: 'Customer Service', href: '#' },
    { name: 'FAQ', href: '#' },
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Refund Policy', href: '#' },
    { name: 'Beauty Consultation', href: '#' }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Youtube, href: '#', label: 'YouTube' }
  ];

  return (
    <footer className="bg-[#1E1E1E] text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold text-[#DCAEE6] mb-4 font-serif">
              {BRAND_CONFIG.name}
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              {BRAND_CONFIG.description}
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-gray-300">
                <Phone className="w-4 h-4 mr-3 text-[#DCAEE6]" />
                <span className="text-sm">+91 1234567890</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Mail className="w-4 h-4 mr-3 text-[#DCAEE6]" />
                <span className="text-sm">support@kderma.com</span>
              </div>
              <div className="flex items-start text-gray-300">
                <MapPin className="w-4 h-4 mr-3 text-[#DCAEE6] mt-0.5" />
                <span className="text-sm">
                  123 Beauty Street, <br />
                  Mumbai, Maharashtra 400001
                </span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex space-x-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="p-2 bg-[#662483] hover:bg-[#DCAEE6] rounded-full transition-colors duration-200 group"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4 text-white group-hover:text-[#662483]" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-[#DCAEE6] mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-[#DCAEE6] transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold text-[#DCAEE6] mb-4">Shop Categories</h4>
            <ul className="space-y-3">
              {NAVIGATION_ITEMS.categories.slice(0, 6).map((category) => (
                <li key={category}>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-[#DCAEE6] transition-colors duration-200 text-sm"
                  >
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-[#DCAEE6] mb-4">Stay Updated</h4>
            <p className="text-gray-300 mb-4 text-sm leading-relaxed">
              Subscribe to get beauty tips, exclusive offers, and new product alerts directly to your inbox.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-[#662483] border border-[#92278F] rounded-lg focus:outline-none focus:border-[#DCAEE6] text-white placeholder-gray-300 text-sm"
                required
              />
              <Button
                type="submit"
                variant="secondary"
                className="w-full text-sm"
                loading={isSubscribing}
                disabled={!email.trim()}
              >
                {isSubscribing ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </form>

            <p className="text-xs text-gray-400 mt-3">
              By subscribing, you agree to our Privacy Policy and Terms of Service.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                &copy; {currentYear} {BRAND_CONFIG.name}. All rights reserved.
              </p>
            </div>

            <div className="flex flex-wrap justify-center md:justify-end gap-6">
              {supportLinks.slice(2, 4).map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-400 hover:text-[#DCAEE6] text-sm transition-colors duration-200"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Payment Methods */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-400 mb-3">Accepted Payment Methods</p>
            <div className="flex justify-center space-x-4">
              <div className="px-3 py-1 bg-[#662483] rounded text-xs font-medium">VISA</div>
              <div className="px-3 py-1 bg-[#662483] rounded text-xs font-medium">MASTERCARD</div>
              <div className="px-3 py-1 bg-[#662483] rounded text-xs font-medium">PAYTM</div>
              <div className="px-3 py-1 bg-[#662483] rounded text-xs font-medium">UPI</div>
              <div className="px-3 py-1 bg-[#662483] rounded text-xs font-medium">COD</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
