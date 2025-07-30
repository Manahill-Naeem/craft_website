import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Our Story - Crafted Whispers: The Journey of Handmade Gifts',
  description: 'Discover the story of Crafted Whispers. Our passion, craftsmanship, and the journey of creating everything with love. Handmade gifts and wedding essentials in Pakistan.',
  keywords: 'Crafted Whispers story, our journey, handmade gifts Pakistan, artisan crafts, wedding essentials history, passion for handmade, Pakistani handmade brand',
  openGraph: {
    title: 'Our Story - Crafted Whispers',
    description: 'The Journey of Handmade Gifts',
    url: 'https://www.yourwebsite.com/our-story', 
    siteName: 'Crafted Whispers',
    images: [
      {
        url: '/about-1.jpeg', 
        width: 1200,
        height: 630,
        alt: 'Crafted Whispers Our Story',
      },
    ],
    locale: 'en_US', // Changed to English locale
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Story - Crafted Whispers',
    description: 'The Journey of Handmade Gifts',
    images: ['https://www.yourwebsite.com/twitter-our-story.jpg'], 
  },
  alternates: {
    canonical: 'https://www.yourwebsite.com/our-story', 
  },
};

export default function OurStoryPage() {
  return (
    <div className="min-h-[calc(100vh-16rem)] bg-gradient-to-br from-primary-50 to-primary-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8 md:p-10 lg:p-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#7A4E7A] text-center mb-6">
          Our Story: Crafted Whispers
        </h1>
        <p className="text-lg text-gray-700 text-center mb-10">
          Every handcrafted item holds a story. The journey of Crafted Whispers is an example of passion, love, and exquisite artistry.
        </p>

        <div className="mb-10 text-center">
          <Image
            src="/about-1.jpeg" 
            alt="The story of Crafted Whispers"
            width={700}
            height={400}
            className="rounded-lg shadow-md mx-auto"
            priority 
          />
        </div>

        <section className="mb-10">
          <h2 className="text-3xl font-bold text-[#7A4E7A] mb-4">
            A Start Fueled by Passion
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-4">
            Crafted Whispers was founded on a dream - the dream of making every special occasion even more memorable. We observed a lack of items in the market that were not only beautiful but also infused with the love and effort of their creators. With this thought, we stepped into the world of handmade goods.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            Our goal is not just to sell products, but to include a "whisper" in every item - a feeling, an emotion that is special for you or your loved ones.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-bold text-[#7A4E7A] mb-4">
            A Mark of Craftsmanship and Quality
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-4">
            We create every product with great care and love. Our team consists of skilled artisans from Pakistan who are masters of their craft. We use only the finest raw materials (like real pearls, sparkling crystals, and fresh flowers) to ensure you receive the best combination of quality and beauty.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            Every pearl, every crystal, and every flower is assembled in such a way that it becomes a piece of art. Our quality is our identity.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-bold text-[#7A4E7A] mb-4">
            Your Desire, Our Reality
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-4">
            Our biggest goal is to make you happy. That's why we also take custom orders. Whatever your special design, color, or idea may be, we strive to turn it into a reality. Your desire is our inspiration.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            Crafted Whispers is not just a brand; it's a feeling that makes the special moments of your life even more radiant. Join us on this journey!
          </p>
        </section>

        <section className="text-center mt-10">
          <Link
            href="/shop"
            className="inline-block bg-gold text-[#7A4E7A] font-bold py-3 px-8 rounded-full shadow-lg hover:bg-yellow-600 transition duration-300 transform hover:scale-105 text-lg md:text-xl"
          >
            Explore Our Collection
          </Link>
        </section>
      </div>
    </div>
  );
}
