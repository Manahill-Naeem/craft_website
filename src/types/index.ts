// frontend/src/types/index.ts

// Product Interface
export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  imageUrl?: string;
  category?: {
    _id: string;
    name: string;
    slug: string;
  };
  stock: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  // New properties for sale (will be applied on frontend based on active sale)
  isOnSale?: boolean;
  saleTagText?: string;
  saleTagColor?: string;
  saleTextColor?: string;
  discountedPrice?: number; // Optional: to store calculated discounted price
}

// Category Interface
export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Sale Interface (UPDATED: bannerImageUrl removed)
export interface Sale {
  _id: string;
  name: string;
  startDate: string; // ISO Date string
  endDate: string;   // ISO Date string
  bannerText: string;
  // bannerImageUrl?: string; // REMOVED: Image URL for the banner
  tagText: string;
  bannerBgColor: string; // Tailwind class
  bannerTextColor: string; // Tailwind class
  tagBgColor: string; // Tailwind class
  tagTextColor: string; // Tailwind class
  isActive: boolean;
  discountPercentage?: number; // Discount percentage for the sale
  createdAt: string;
  updatedAt: string;
}

// Cart Item Interface (usually same as Product but with quantity)
export interface CartItem extends Product {
  quantity: number;
}

// Order Item Interface (for backend order submission)
export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

// Order Interface (for backend order model)
export interface Order {
  _id?: string;
  items: OrderItem[];
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  totalAmount: number;
  paymentMethod: string;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  createdAt?: string;
  updatedAt?: string;
}
