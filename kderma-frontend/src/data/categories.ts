export interface Category {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
}

export const categories: Category[] = [
  {
    id: 'makeup',
    name: 'Makeup',
    description: 'Enhance your natural beauty with our makeup collection.',
    imageUrl: '/assets/images/pexels-shiny-diamond-3373746.jpg',
  },
  {
    id: 'skin',
    name: 'Skin',
    description: 'Products for healthy and glowing skin.',
    imageUrl: '/assets/images/pexels-polina-tankilevitch-3735620.jpg',
  },
  {
    id: 'hair',
    name: 'Hair',
    description: 'Nourish and style your hair with our premium products.',
    imageUrl: '/assets/images/pexels-craytive-2720447.jpg',
  },
  {
    id: 'appliances',
    name: 'Appliances',
    description: 'Professional-grade beauty tools and appliances.',
  },
  {
    id: 'bath-body',
    name: 'Bath & Body',
    description: 'Indulge in luxurious bath and body care products.',
  },
  {
    id: 'natural',
    name: 'Natural',
    description: 'Pure, natural ingredients for wholesome beauty.',
  },
  {
    id: 'mom-baby',
    name: 'Mom & Baby',
    description: 'Gentle care products for mothers and babies.',
  },
  {
    id: 'health-wellness',
    name: 'Health & Wellness',
    description: 'Holistic products for overall health and wellness.',
  },
  {
    id: 'men',
    name: 'Men',
    description: 'Tailored grooming products for men.',
  },
  {
    id: 'fragrance',
    name: 'Fragrance',
    description: 'Captivating scents to express your personality.',
  },
  {
    id: 'lingerie-accessories',
    name: 'Lingerie & Accessories',
    description: 'Elegant lingerie and beauty accessories.',
  },
  {
    id: 'offers',
    name: 'Offers',
    description: 'Exclusive deals and special offers on our products.',
  },
];
