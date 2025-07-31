// frontend/src/app/shop/page.tsx
'use client'; // <-- Ensure this is the very first line

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Product, Category, Sale } from '@/types';
import { getProducts, getCategories, getActiveSale } from '@/lib/api';
import ProductCard from '@/components/ProductCard';
import MessageBox from '@/components/MessageBox';

// This is now the default exported component for the page
export default function ShopPage() { // Renamed from _ShopContent
  const router = useRouter();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [messageBox, setMessageBox] = useState<{ message: string; type: 'success' | 'error' | 'info' | 'warning' } | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const PRODUCTS_PER_PAGE = 12;

  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategoryName, setSelectedCategoryName] = useState('All');
  const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || 'default');
  const [minPrice, setMinPrice] = useState<number | ''>(
    searchParams.get('minPrice') ? parseFloat(searchParams.get('minPrice') as string) : ''
  );
  const [maxPrice, setMaxPrice] = useState<number | ''>(
    searchParams.get('maxPrice') ? parseFloat(searchParams.get('maxPrice') as string) : ''
  );
  const [availableCategories, setAvailableCategories] = useState<Category[]>([]);
  const [activeSale, setActiveSale] = useState<Sale | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedCategories: Category[] = await getCategories();
        const allCategory: Category = {
          _id: 'all',
          name: 'All',
          slug: 'all',
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        const allAvailableCategories = [allCategory, ...fetchedCategories.filter(cat => cat.isActive)];
        setAvailableCategories(allAvailableCategories);

        const urlCategorySlug = searchParams.get('category');
        const initialCategory = allAvailableCategories.find(cat => cat.slug === urlCategorySlug) || allCategory;
        setSelectedCategoryName(initialCategory.name);

        const urlPage = parseInt(searchParams.get('page') || '1');
        setCurrentPage(urlPage > 0 ? urlPage : 1);

        const sale = await getActiveSale();
        setActiveSale(sale);

      } catch (err: any) {
        console.error("Failed to fetch initial data:", err.message);
        setError("Failed to load shop data. Please try again later.");
        setMessageBox({ message: "Failed to load shop data. Please try again later.", type: "error" });
      }
    };
    fetchData();
  }, [searchParams]);

  const fetchProductsData = useCallback(async () => {
    setLoading(true);
    setError(null);

    const currentCategory = availableCategories.find(cat => cat.name === selectedCategoryName);
    const categorySlugToFetch = currentCategory?.slug === 'all' ? undefined : currentCategory?.slug;

    try {
      const { products: fetchedProducts, currentPage: apiCurrentPage, totalPages: apiTotalPages } = await getProducts(
        categorySlugToFetch,
        searchTerm,
        sortBy,
        currentPage,
        PRODUCTS_PER_PAGE,
        minPrice === '' ? undefined : minPrice,
        maxPrice === '' ? undefined : maxPrice
      );

      const productsWithSaleProps = fetchedProducts.map(product => {
        if (activeSale && activeSale.discountPercentage !== undefined) {
          const discountFactor = (100 - activeSale.discountPercentage) / 100;
          const discountedPrice = product.price * discountFactor;
          return {
            ...product,
            isOnSale: true,
            saleTagText: activeSale.tagText,
            saleTagColor: activeSale.tagBgColor,
            saleTextColor: activeSale.tagTextColor,
            discountedPrice: parseFloat(discountedPrice.toFixed(2)),
          };
        }
        return product;
      });

      setProducts(productsWithSaleProps);
      setCurrentPage(apiCurrentPage);
      setTotalPages(apiTotalPages);

    } catch (err: any) {
      console.error("Failed to fetch filtered products:", err.message);
      setError(err.message || "Failed to load products.");
      setMessageBox({ message: err.message || "Failed to load products.", type: "error" });
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, selectedCategoryName, sortBy, currentPage, PRODUCTS_PER_PAGE, minPrice, maxPrice, availableCategories, activeSale]);


  useEffect(() => {
    if (availableCategories.length > 0) {
      const timeoutId = setTimeout(() => {
        fetchProductsData();
      }, (searchTerm || minPrice !== '' || maxPrice !== '') ? 500 : 0);

      return () => clearTimeout(timeoutId);
    }
  }, [fetchProductsData, searchTerm, minPrice, maxPrice, availableCategories]);


  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (selectedCategoryName && selectedCategoryName !== 'All') {
      const categorySlug = availableCategories.find(cat => cat.name === selectedCategoryName)?.slug;
      if (categorySlug) params.set('category', categorySlug);
    }
    if (sortBy && sortBy !== 'default') params.set('sortBy', sortBy);
    if (currentPage > 1) params.set('page', currentPage.toString());
    if (minPrice !== '') params.set('minPrice', minPrice.toString());
    if (maxPrice !== '') params.set('maxPrice', maxPrice.toString());

    router.push(`?${params.toString()}`, { scroll: false });
  }, [searchTerm, selectedCategoryName, sortBy, currentPage, minPrice, maxPrice, availableCategories, router]);


  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategoryName('All');
    setSortBy('default');
    setMinPrice('');
    setMaxPrice('');
    setCurrentPage(1);
    setMessageBox(null);
  };

  return (
    // Directly wrap the content with Suspense
    <Suspense fallback={<div>Loading shop...</div>}>
      {messageBox && (
        <MessageBox
          message={messageBox.message}
          type={messageBox.type}
          onClose={() => setMessageBox(null)}
        />
      )}

      <div className="bg-gray-50 py-16 sm:py-24 lg:py-32 min-h-[calc(100vh-16rem)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-primary-700 leading-tight mb-4">
              Explore Our Handcrafted Collections
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover unique **handcrafted gifts** for every special moment. From **wedding essentials** to shimmering **pearl and crystal collections**, find your perfect piece.
            </p>
          </div>

          {/* Search, Filter, and Sort Controls */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
            {/* Search Bar */}
            <div className="w-full md:w-1/2 relative">
              <input
                type="text"
                placeholder="Search products by name, description, or category..."
                className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              />
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>

            {/* Filters and Sort */}
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              {/* Category Filter */}
              <select
                className="p-3 border border-gray-300 rounded-md bg-white text-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                value={selectedCategoryName}
                onChange={(e) => { setSelectedCategoryName(e.target.value); setCurrentPage(1); }}
              >
                {availableCategories.map(category => (
                  <option key={category._id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>

              {/* Price Range Filters */}
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min Price"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                  value={minPrice}
                  onChange={(e) => { setMinPrice(e.target.value === '' ? '' : parseFloat(e.target.value)); setCurrentPage(1); }}
                />
                <input
                  type="number"
                  placeholder="Max Price"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                  value={maxPrice}
                  onChange={(e) => { setMaxPrice(e.target.value === '' ? '' : parseFloat(e.target.value)); setCurrentPage(1); }}
                />
              </div>

              {/* Sort By */}
              <select
                className="p-3 border border-gray-300 rounded-md bg-white text-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                value={sortBy}
                onChange={(e) => { setSortBy(e.target.value); setCurrentPage(1); }}
              >
                <option value="default">Sort By</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A-Z</option>
                <option value="name-desc">Name: Z-A</option>
              </select>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <strong className="font-bold">Error:</strong>
              <span className="block sm:inline ml-2">{error}</span>
            </div>
          )}

          {/* Product Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {Array.from({ length: PRODUCTS_PER_PAGE }).map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full animate-pulse">
                  <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-72 bg-gray-200"></div>
                  <div className="p-4 flex-grow flex flex-col">
                    <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                    <div className="h-6 bg-gray-200 rounded w-2/3 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
                    <div className="mt-auto flex justify-between items-center pt-2">
                      <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                      <div className="h-10 bg-gray-200 rounded w-1/3"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-700 text-xl py-10">
              No products found matching your criteria.
              <div className="mt-4">
                <button
                  onClick={clearFilters}
                  className="inline-block bg-primary-500 text-white font-semibold py-2 px-6 rounded-full shadow hover:bg-primary-700 transition"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-12">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1 || loading}
                className="px-4 py-2 bg-primary-600 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-700 transition"
              >
                Previous
              </button>
              <span className="text-lg font-medium text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages || loading}
                className="px-4 py-2 bg-primary-600 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-700 transition"
              >
                Next
              </button>
            </div>
          )}


          {/* Call to Action for Custom Orders (Optional) */}
          <div className="text-center mt-20">
            <h3 className="text-3xl font-bold text-primary-700 mb-6">
              Didn't find what you're looking for?
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
              Let us create something truly unique and **custom-made** just for you. Share your vision with us!
            </p>
            <Link
              href="/custom-orders"
              className="inline-block bg-gold text-primary-700 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-yellow-600 transition duration-300 transform hover:scale-105"
            >
              Request a Custom Order
            </Link>
          </div>
        </div>
      </div>
    </Suspense>
  );
}