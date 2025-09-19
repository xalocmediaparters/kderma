import React from 'react';
import { Heart, Award, Users, Sparkles } from 'lucide-react';

const AboutPage: React.FC = () => {
  const values = [
    {
      icon: Heart,
      title: 'Authentic K-Beauty',
      description: 'We source directly from trusted Korean manufacturers to bring you genuine, high-quality beauty products.'
    },
    {
      icon: Award,
      title: 'Expert Curation',
      description: 'Our beauty experts carefully select each product based on efficacy, safety, and customer satisfaction.'
    },
    {
      icon: Users,
      title: 'Community First',
      description: 'We build lasting relationships with our customers through exceptional service and personalized recommendations.'
    },
    {
      icon: Sparkles,
      title: 'Innovation',
      description: 'We stay ahead of beauty trends to offer you the latest and most effective Korean skincare innovations.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FFFFFF] pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-[#662483] mb-6 font-serif">
            About KDerma
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Your trusted destination for authentic Korean beauty products. We bridge the gap between
            Korean skincare excellence and beauty enthusiasts worldwide.
          </p>
        </div>

        {/* Story Section */}
        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#662483] mb-6 font-serif">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Founded with a passion for Korean beauty, KDerma was born from the desire to make
                  premium K-beauty accessible to everyone. We recognized the transformative power of
                  Korean skincare routines and made it our mission to share these secrets globally.
                </p>
                <p>
                  What started as a small online store has grown into a trusted community of beauty
                  enthusiasts who swear by the efficacy of Korean skincare. Every product in our
                  collection is carefully selected for its quality, innovation, and results.
                </p>
                <p>
                  Today, we continue to curate the finest Korean beauty products, ensuring that our
                  customers have access to the same high-quality items that have made K-beauty a
                  global phenomenon.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="/src/assets/images/kderma.png"
                alt="KDerma Story"
                className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#662483] mb-4 font-serif">
              Our Values
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do at KDerma
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map(({ icon: Icon, title, description }, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-[#DCAEE6] rounded-full mb-4">
                  <Icon className="w-6 h-6 text-[#662483]" />
                </div>
                <h3 className="text-xl font-semibold text-[#662483] mb-3">
                  {title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-[#662483] to-[#92278F] rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-8 font-serif">
            KDerma by Numbers
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-bold mb-2">1000+</div>
              <div className="text-purple-200">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">50+</div>
              <div className="text-purple-200">Premium Brands</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">4.8★</div>
              <div className="text-purple-200">Average Rating</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">100%</div>
              <div className="text-purple-200">Authentic Products</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
