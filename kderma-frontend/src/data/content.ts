// Placeholder content for KDerma skincare brand

export interface ProductDescription {
  id: string;
  name: string;
  description: string;
}

export const productDescriptions: ProductDescription[] = [
  {
    id: '1',
    name: 'Hydrating Moisturizer',
    description: 'This luxurious moisturizer deeply hydrates the skin, leaving it soft and supple. Enriched with natural ingredients like aloe vera and hyaluronic acid, it provides long-lasting moisture without clogging pores. Perfect for all skin types, especially dry or sensitive skin.'
  },
  {
    id: '2',
    name: 'Anti-Aging Serum',
    description: 'Our advanced anti-aging serum targets fine lines and wrinkles with powerful peptides and vitamin C. This lightweight formula absorbs quickly, promoting collagen production and brightening the complexion for a youthful glow.'
  },
  {
    id: '3',
    name: 'Gentle Cleanser',
    description: 'A gentle yet effective cleanser that removes impurities and makeup without stripping the skin\'s natural oils. Formulated with soothing chamomile and green tea extracts, it leaves the skin clean, balanced, and refreshed.'
  }
];

export const returnPolicy: string = `
At KDerma, we want you to be completely satisfied with your purchase. If you're not happy with your product for any reason, you can return it within 30 days of receipt for a full refund or exchange.

To initiate a return:
1. Contact our customer service team at returns@kderma.com
2. Include your order number and reason for return
3. Ship the item back in its original packaging
4. Refunds will be processed within 5-7 business days after receipt

Please note: Items must be unused and in original condition. Shipping costs for returns are the responsibility of the customer unless the item is defective.
`;

export const shippingPolicy: string = `
We offer fast and reliable shipping on all orders. Standard shipping typically takes 3-5 business days within the continental US. Express shipping options are available for faster delivery.

Shipping Rates:
- Standard Shipping: $5.99 (free on orders over $50)
- Express Shipping: $12.99
- Overnight Shipping: $24.99

International shipping is available with rates calculated at checkout. All orders are shipped with tracking information provided via email.

Please allow additional time for processing during peak seasons. If your order is delayed, we'll notify you promptly.
`;

export interface ContactDetails {
  email: string;
  phone: string;
  address: string;
  hours: string;
}

export const contactDetails: ContactDetails = {
  email: 'support@kderma.com',
  phone: '(555) 123-4567',
  address: '123 Skincare Lane, Beauty City, BC 12345',
  hours: 'Monday - Friday: 9 AM - 6 PM EST\nSaturday: 10 AM - 4 PM EST\nSunday: Closed'
};

// New interfaces for Product, CartItem, Collection, and UserAddress

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  stockQuantity: number;
  isFeatured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  totalPrice: number;
}

export interface Collection {
  id: string;
  name: string;
  description?: string;
  products: Product[];
}

export interface UserAddress {
  id: string;
  userId: string;
  fullName: string;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phoneNumber?: string;
}
