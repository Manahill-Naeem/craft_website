// frontend/src/components/SaleBanner.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getActiveSale } from '@/lib/api'; // Import the new API function
import { Sale } from '@/types'; // Import Sale type

const SaleBanner: React.FC = () => {
  const [activeSale, setActiveSale] = useState<Sale | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSale = async () => {
      try {
        setLoading(true);
        setError(null);
        const sale = await getActiveSale();
        setActiveSale(sale);
      } catch (err: any) {
        console.error('Failed to fetch active sale:', err);
        setError('Failed to load sale information.');
      } finally {
        setLoading(false);
      }
    };

    fetchSale();
    // You might want to refetch periodically if sales change frequently
    // const interval = setInterval(fetchSale, 60 * 60 * 1000); // Refetch every hour
    // return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="w-full bg-gray-200 text-gray-700 py-3 px-4 text-center text-sm md:text-base font-semibold animate-pulse">
        Loading sale information...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full bg-red-100 text-red-700 py-3 px-4 text-center text-sm md:text-base font-semibold">
        {error}
      </div>
    );
  }

  if (!activeSale) {
    return null; // No active sale, so don't render the banner
  }

  return (
    <div className={`w-full ${activeSale.bannerBgColor} ${activeSale.bannerTextColor} py-3 px-4 text-center text-sm md:text-base font-semibold shadow-md flex flex-col sm:flex-row items-center justify-center gap-2`}>
      <span>{activeSale.bannerText}</span>
      <Link href="/shop" className={`${activeSale.bannerTextColor} underline hover:no-underline transition-all duration-200`}>
        Shop Now!
      </Link>
    </div>
  );
};

export default SaleBanner;
