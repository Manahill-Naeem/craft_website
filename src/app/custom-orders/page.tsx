// frontend/src/app/custom-orders/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Custom Orders - Crafted Whispers: Create Your Personalized Handmade Gifts',
  description: 'At Crafted Whispers, create your personalized wedding essentials, customized gifts, and bespoke bouquets. Share your vision, and we will bring it to life.',
  keywords: 'custom orders Pakistan, personalized gifts Karachi, bespoke wedding decor, handmade custom items, custom bouquets, customized essentials, order unique gifts, Crafted Whispers custom',
  openGraph: {
    title: 'Custom Orders - Crafted Whispers',
    description: 'Create Your Personalized Handmade Gifts',
    url: 'https://www.yourwebsite.com/custom-orders', // Replace with your actual domain
    siteName: 'Crafted Whispers',
    images: [
      {
        url: 'https://www.yourwebsite.com/og-custom-orders.jpg', // Replace with a relevant image
        width: 1200,
        height: 630,
        alt: 'Custom Orders at Crafted Whispers',
      },
    ],
    locale: 'en_US', // Changed to English locale
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Custom Orders - Crafted Whispers',
    description: 'Create Your Personalized Handmade Gifts',
    images: ['https://www.yourwebsite.com/twitter-custom-orders.jpg'], // Replace with a relevant image
  },
  alternates: {
    canonical: 'https://www.yourwebsite.com/custom-orders', // Replace with your actual domain
  },
};

export default function CustomOrdersPage() {
  return (
    <div className="min-h-[calc(100vh-16rem)] bg-gradient-to-br from-primary-50 to-primary-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8 md:p-10 lg:p-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#7A4E7A] text-center mb-6">
          Your Personalized Custom Orders
        </h1>
        <p className="text-lg text-gray-700 text-center mb-10">
          At Crafted Whispers, we transform your desires into reality. If you have a special item in mind that isn't in our current collection, we can customize it just for you.
        </p>

        <section className="mb-10">
          <h2 className="text-3xl font-bold text-[#7A4E7A] mb-4 text-center">
            What Can We Customize?
          </h2>
          <ul className="list-disc list-inside space-y-3 text-gray-600 text-lg">
            <li><span className="font-semibold #4B2B4F-600">Wedding Essentials:</span> Wedding decorations, bridal accessories, mehndi trays, and much more according to your theme.</li>
            <li><span className="font-semibold #4B2B4F-600">Personalized Gifts:</span> Customized gifts with names or messages for birthdays, anniversaries, or any special occasion.</li>
            <li><span className="font-semibold #4B2B4F-600">Bespoke Bouquets:</span> Special bouquets made with your choice of flowers and colors.</li>
            <li><span className="font-semibold #4B2B4F-600">Crystal & Pearl Items:</span> Unique designs or patterns in jewelry or decor items.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-bold text-[#7A4E7A] mb-4 text-center">
            What is the Custom Order Process?
          </h2>
          <ol className="list-decimal list-inside space-y-4 text-gray-600 text-lg">
            <li><span className="font-semibold #4B2B4F-600">Share Your Vision:</span> Fill out the form below or contact us via email/phone with your requirements. The more details you provide, the better we can craft it for you.</li>
            <li><span className="font-semibold #4B2B4F-600">Design and Quote:</span> We will prepare a design concept and a price quote for you.</li>
            <li><span className="font-semibold #4B2B4F-600">Confirmation:</span> Upon your approval, we will begin working on your order.</li>
            <li><span className="font-semibold #4B2B4F-600">Delivery:</span> Once your order is ready, we will deliver it to you.</li>
          </ol>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-bold text-[#7A4E7A] mb-6">
            Contact Us for Your Custom Order Today!
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Tell us what you want to create. We are ready to turn your dream into a reality.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-gold text-[#7A4E7A] font-bold py-3 px-8 rounded-full shadow-lg hover:bg-yellow-600 transition duration-300 transform hover:scale-105 text-lg md:text-xl"
          >
            Contact Us
          </Link>
        </section>
      </div>
    </div>
  );
}
