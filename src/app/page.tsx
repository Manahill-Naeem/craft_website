// // frontend/src/app/page.tsx
// 'use client'; // This directive is already there, good!

// import { useState, useEffect } from 'react'; // Import useEffect for data fetching
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import Image from 'next/image';
// import { getActiveSale } from '@/lib/api'; // Import getActiveSale
// import { Sale } from '@/types'; // Import Sale type

// // Note: The categories array below is hardcoded for demonstration.
// // In a real app, you might fetch these from the backend as well.
// const categories = [
//   {
//     name: "Wedding Essentials",
//     description: "Everything you need for your special day: Nikkah pens, trays, Rasam glass, and more.",
//     image: "http://localhost:3001/images/categories/wedding-essentials.jpg", // Ensure this path is correct
//     link: "/shop?category=wedding-essentials", // Link to shop with category filter
//   },
//   {
//     name: "Pearl Collection",
//     description: "Handmade luxury items adorned with premium pearls.",
//     image: "http://localhost:3001/images/categories/pearl-collection.jpg",
//     link: "/shop?category=pearl-collection",
//   },
//   {
//     name: "Crystals",
//     description: "Elegant creations featuring sparkling crystals.",
//     image: "http://localhost:3001/images/categories/crystals.jpg",
//     link: "/shop?category=crystal-collection", // Note: slug is 'crystal-collection'
//   },
//   {
//     name: "Bouquet Collection",
//     description: "Handcrafted bouquets for every occasion, made with love and creativity.",
//     image: "http://localhost:3001/images/categories/bouquet-collection.jpg",
//     link: "/shop?category=bouquet-collection",
//   },
// ];

// export default function Home() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const router = useRouter();

//   // State for dynamic banner (now using Sale type)
//   const [activeSale, setActiveSale] = useState<Sale | null>(null);
//   const [loadingBanner, setLoadingBanner] = useState(true);

//   // Fetch active sale data on component mount
//   useEffect(() => {
//     async function fetchActiveSaleData() {
//       try {
//         setLoadingBanner(true);
//         const saleData = await getActiveSale();
//         setActiveSale(saleData);
//       } catch (error) {
//         console.error('Error fetching active sale:', error);
//         setActiveSale(null); // Set to null on error
//       } finally {
//         setLoadingBanner(false);
//       }
//     }

//     fetchActiveSaleData();
//   }, []); // Empty dependency array means this runs once on mount

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (searchTerm.trim()) {
//       router.push(`/shop?search=${encodeURIComponent(searchTerm.trim())}`); // Link to shop with search filter
//     }
//   };

//   return (
//     <div className="bg-background min-h-screen flex flex-col">
//       {/* Dynamic Hero Banner Section */}
//       {loadingBanner ? (
//         // Optional: Show a loading state while banner data is being fetched
//         <section className="relative h-[500px] md:h-[600px] lg:h-[700px] w-full bg-gray-200 flex items-center justify-center text-center">
//           <p className="text-primary-800 text-xl animate-pulse">Loading banner...</p>
//         </section>
//       ) : (
//         // Render banner only if it exists and is active
//         activeSale && activeSale.isActive ? (
//           <section className={`relative h-[500px] md:h-[600px] lg:h-[700px] w-full overflow-hidden flex items-center justify-center text-center ${activeSale.bannerBgColor}`}>
//             {/* Background Image (if available) */}
//             {activeSale.bannerImageUrl && (
//               <Image
//                 src={activeSale.bannerImageUrl}
//                 alt={activeSale.bannerText}
//                 fill
//                 style={{ objectFit: 'cover' }}
//                 quality={90}
//                 className="absolute inset-0 z-0 opacity-70"
//                 priority // Load with high priority
//               />
//             )}

//             {/* Overlay Content */}
//             <div className="relative z-10 p-4 md:p-8 text-white max-w-4xl mx-auto">
//               <h1 className={`text-4xl md:text-6xl font-extrabold leading-tight mb-4 drop-shadow-lg ${activeSale.bannerTextColor}`}>
//                 {activeSale.bannerText}
//               </h1>
//               {/* You can add a subtitle here if your Sale model has one, or a generic one */}
//               <p className={`text-lg md:text-xl mb-8 drop-shadow-md ${activeSale.bannerTextColor}`}>
//                 Discover amazing deals on our handcrafted collection!
//               </p>
//               <Link href="/shop" className="bg-gold text-[#4B2B4F] font-bold py-3 px-8 rounded-full text-lg shadow-xl hover:bg-yellow-500 transition duration-300 transform hover:scale-105">
//                 Shop Now
//               </Link>
//             </div>
//           </section>
//         ) : (
//           // Fallback if no active banner or banner is inactive
//           <section className="flex flex-col items-center justify-center text-center py-16 px-4 bg-primary-50 mt-16">
//             <h1 className="text-5xl md:text-6xl font-extrabold text-[#4B2B4F] drop-shadow-lg mb-4 tracking-widest" style={{ fontFamily: 'cursive' }}>Crafted Whispers</h1>
//             <p className="text-xl md:text-2xl text-gray-700 mb-6 font-medium">Handmade Luxury | Pearls, Crystals & Custom Elegance</p>
//             <Link href="/shop" className="inline-block px-8 py-3 rounded-full bg-gold text-[#4B2B4F] font-bold text-lg shadow-lg hover:bg-yellow-500 transition">Shop Now</Link>
//           </section>
//         )
//       )}

//       {/* Main Categories Section */}
//       <section className="max-w-6xl mx-auto py-16 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
//         {categories.map((cat) => (
//           <Link
//             key={cat.name}
//             href={cat.link}
//             className={`rounded-3xl shadow-lg p-8 flex flex-col items-center justify-center hover:scale-105 transition-transform cursor-pointer bg-white text-[#4B2B4F] hover:bg-[#f9f9f9]`}
//             style={{ minHeight: '220px' }}
//           >
//             <div className="w-20 h-20 mb-4 flex items-center justify-center overflow-hidden rounded-full bg-[#7A4E7A] shadow">
//               <Image
//                 src={cat.image}
//                 alt={cat.name}
//                 width={80}
//                 height={80}
//                 className="object-cover w-full h-full"
//                 priority={true}
//               />
//             </div>
//             <h2 className="text-2xl font-bold mb-2 text-center" style={{ fontFamily: 'cursive' }}>{cat.name}</h2>
//             <p className="text-center text-gray-700 text-base">{cat.description}</p>
//           </Link>
//         ))}
//       </section>

//       {/* Custom Orders Section */}
//       <section className="bg-primary-100 py-16 px-4 flex flex-col items-center">
//         <h2 className="text-3xl md:text-4xl font-extrabold text-[#4B2B4F] mb-4">Custom Orders</h2>
//         <p className="text-lg text-gray-700 mb-6 max-w-2xl text-center">Want something unique? We offer fully customizable handmade items—choose your colors, materials, and design. Perfect for gifts, events, and personal style.</p>
//         <Link href="/custom-orders" className="inline-block px-8 py-3 rounded-full bg-gold text-[#4B2B4F] font-bold text-lg shadow-lg hover:bg-yellow-500 transition">Request Custom Order</Link>
//       </section>

//       {/* Call to Action Section */}
//       <section className="py-12 px-4 flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto gap-8">
//         <div className="flex-1 text-center md:text-left">
//           <h3 className="text-2xl font-bold text-[#4B2B4F] mb-2">Ready to Shop?</h3>
//           <p className="text-gray-700 mb-4">Discover our full range of handmade luxury items and find your next treasure.</p>
//           <Link href="/shop" className="inline-block px-6 py-2 rounded-full bg-gold text-[#4B3B4F] font-semibold shadow hover:bg-yellow-500 transition">Browse All Products</Link>
//         </div>
//         <div className="flex-1 text-center md:text-left">
//           <h3 className="text-2xl font-bold text-[#4B2B4F] mb-2">Have Questions?</h3>
//           <p className="text-gray-700 mb-4">Contact us for custom requests, bulk orders, or any queries. We're here to help!</p>
//           <Link href="/contact" className="inline-block px-6 py-2 rounded-full bg-gold text-[#4B3B4F] font-semibold shadow hover:bg-yellow-500 transition">Contact Us</Link>
//         </div>
//       </section>
//     </div>
//   );
// }


// frontend/src/app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image'; // Keep Image for potential future use or other images
import { getActiveSale } from '@/lib/api';
import { Sale } from '@/types';
import MessageBox from '@/components/MessageBox';

// Note: The categories array below is hardcoded for demonstration.
// In a real app, you might fetch these from the backend as well.
const categories = [
  {
    name: "Wedding Essentials",
    description: "Everything you need for your special day: Nikkah pens, trays, Rasam glass, and more.",
    // Removed or commented out: image: "http://localhost:3001/images/categories/wedding-essentials.jpg",
    link: "/shop?category=wedding-essentials",
  },
  {
    name: "Pearl Collection",
    description: "Handmade luxury items adorned with premium pearls.",
    // Removed or commented out: image: "http://localhost:3001/images/categories/pearl-collection.jpg",
    link: "/shop?category=pearl-collection",
  },
  {
    name: "Crystals",
    description: "Elegant creations featuring sparkling crystals.",
    // Removed or commented out: image: "http://localhost:3001/images/categories/crystals.jpg",
    link: "/shop?category=crystal-collection",
  },
  {
    name: "Bouquet Collection",
    description: "Handcrafted bouquets for every occasion, made with love and creativity.",
    // Removed or commented out: image: "http://localhost:3001/images/categories/bouquet-collection.jpg",
    link: "/shop?category=bouquet-collection",
  },
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const [activeSale, setActiveSale] = useState<Sale | null>(null);
  const [loadingBanner, setLoadingBanner] = useState(true);
  const [messageBox, setMessageBox] = useState<{ message: string; type: 'success' | 'error' | 'info' | 'warning' } | null>(null);


  useEffect(() => {
    async function fetchActiveSaleData() {
      try {
        setLoadingBanner(true);
        const saleData = await getActiveSale();
        setActiveSale(saleData);
      } catch (error: any) {
        console.error('Error fetching active sale:', error);
        setMessageBox({ message: `Failed to load sale banner: ${error.message}`, type: 'error' });
        setActiveSale(null);
      } finally {
        setLoadingBanner(false);
      }
    }

    fetchActiveSaleData();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <div className="bg-background min-h-screen flex flex-col">
      {messageBox && (
        <MessageBox
          message={messageBox.message}
          type={messageBox.type}
          onClose={() => setMessageBox(null)}
        />
      )}

      {/* Dynamic Hero Banner Section */}
      {loadingBanner ? (
        <section className="relative h-[500px] md:h-[600px] lg:h-[700px] w-full bg-gray-200 flex items-center justify-center text-center">
          <p className="text-primary-800 text-xl animate-pulse">Loading banner...</p>
        </section>
      ) : (
        activeSale && activeSale.isActive ? (
          <section className={`relative h-[500px] md:h-[600px] lg:h-[700px] w-full overflow-hidden flex items-center justify-center text-center ${activeSale.bannerBgColor} animate-pulse-subtle`}>
            {/* Overlay Content */}
            <div className="relative z-10 p-4 md:p-8 text-white max-w-4xl mx-auto">
              <h1 className={`text-4xl md:text-6xl font-extrabold leading-tight mb-4 drop-shadow-lg ${activeSale.bannerTextColor}`}>
                {activeSale.bannerText}
              </h1>
              <p className={`text-lg md:text-xl mb-8 drop-shadow-md ${activeSale.bannerTextColor}`}>
                Discover amazing deals on our handcrafted collection!
              </p>
              <Link href="/shop" className="bg-gold text-primary-800 font-bold py-3 px-8 rounded-full text-lg shadow-xl hover:bg-yellow-500 transition duration-300 transform hover:scale-105">
                Shop Now
              </Link>
            </div>
          </section>
        ) : (
          <section className="flex flex-col items-center justify-center text-center py-16 px-4 bg-primary-50 mt-16">
            <h1 className="text-5xl md:text-6xl font-extrabold text-primary-800 drop-shadow-lg mb-4 tracking-widest" style={{ fontFamily: 'cursive' }}>Crafted Whispers</h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-6 font-medium">Handmade Luxury | Pearls, Crystals & Custom Elegance</p>
            <Link href="/shop" className="inline-block px-8 py-3 rounded-full bg-gold text-primary-800 font-bold text-lg shadow-lg hover:bg-yellow-500 transition">Shop Now</Link>
          </section>
        )
      )}

      {/* Main Categories Section */}
      <section className="max-w-6xl mx-auto py-16 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            href={cat.link}
            className={`rounded-3xl shadow-lg p-8 flex flex-col items-center justify-center hover:scale-105 transition-transform cursor-pointer bg-white text-primary-800 hover:bg-gray-50`}
            style={{ minHeight: '220px' }}
          >
            {/* Removed the Image component for category cards */}
            {/* <div className="w-20 h-20 mb-4 flex items-center justify-center overflow-hidden rounded-full bg-primary-200 shadow">
              <Image
                src={cat.image}
                alt={cat.name}
                width={80}
                height={80}
                className="object-cover w-full h-full"
                priority={true}
              />
            </div> */}
            <h2 className="text-2xl font-bold mb-2 text-center" style={{ fontFamily: 'cursive' }}>{cat.name}</h2>
            <p className="text-center text-gray-700 text-base">{cat.description}</p>
          </Link>
        ))}
      </section>

      {/* Custom Orders Section */}
      <section className="bg-primary-100 py-16 px-4 flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-primary-800 mb-4">Custom Orders</h2>
        <p className="text-lg text-gray-700 mb-6 max-w-2xl text-center">Want something unique? We offer fully customizable handmade items—choose your colors, materials, and design. Perfect for gifts, events, and personal style.</p>
        <Link href="/custom-orders" className="inline-block px-8 py-3 rounded-full bg-gold text-primary-800 font-bold text-lg shadow-lg hover:bg-yellow-500 transition">Request Custom Order</Link>
      </section>

      {/* Call to Action Section */}
      <section className="py-12 px-4 flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto gap-8">
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-2xl font-bold text-primary-800 mb-2">Ready to Shop?</h3>
          <p className="text-gray-700 mb-4">Discover our full range of handmade luxury items and find your next treasure.</p>
          <Link href="/shop" className="inline-block px-6 py-2 rounded-full bg-gold text-primary-800 font-semibold shadow hover:bg-yellow-500 transition">Browse All Products</Link>
        </div>
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-2xl font-bold text-primary-800 mb-2">Have Questions?</h3>
          <p className="text-gray-700 mb-4">Contact us for custom requests, bulk orders, or any queries. We're here to help!</p>
          <Link href="/contact" className="inline-block px-6 py-2 rounded-full bg-gold text-primary-800 font-semibold shadow hover:bg-yellow-500 transition">Contact Us</Link>
        </div>
      </section>
    </div>
  );
}

// CategoryCard component ab unused ho jayega agar Images remove kar di hain,
// lekin agar aap inko sirf CSS ke saath dikhana chahte hain toh isko update kar sakte hain.
/*
interface CategoryCardProps {
  name: string;
  slug: string;
  imageUrl: string;
}

function CategoryCard({ name, slug, imageUrl }: CategoryCardProps) {
  return (
    <Link href={`/shop?category=${slug}`} className="group block rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative w-full h-60">
        <Image
          src={imageUrl}
          alt={name}
          fill
          style={{ objectFit: 'cover' }}
          className="rounded-t-lg group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
          priority={true} // Priority for above-the-fold images
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-white text-2xl font-bold text-center p-4">
            {name}
          </span>
        </div>
      </div>
      <div className="p-4 bg-white">
        <h3 className="text-xl font-semibold text-primary-700">{name}</h3>
      </div>
    </Link>
  );
}
*/
