// // frontend/src/lib/api.ts
// import { Product, Category, Order, Sale } from '@/types';

// const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// if (!BACKEND_URL) {
//   console.error('NEXT_PUBLIC_BACKEND_URL is not defined.');
//   // Fallback or throw error if URL is critical
// }

// // Helper function for API calls
// async function fetchApi<T>(path: string, options?: RequestInit): Promise<T> {
//   const url = `${BACKEND_URL}${path}`;
//   try {
//     const response = await fetch(url, options);
//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.message || `API call failed with status ${response.status}`);
//     }
//     return response.json();
//   } catch (error: any) {
//     console.error(`Error fetching from ${url}:`, error.message);
//     throw error;
//   }
// }

// // Products API
// export const getProducts = async (
//   categorySlug?: string,
//   searchTerm?: string,
//   sortBy?: string,
//   page: number = 1,
//   limit: number = 12,
//   minPrice?: number,
//   maxPrice?: number
// ): Promise<{ products: Product[]; currentPage: number; totalPages: number; totalProducts: number }> => {
//   let query = `/api/products?page=${page}&limit=${limit}`;
//   if (categorySlug) query += `&category=${categorySlug}`;
//   if (searchTerm) query += `&search=${searchTerm}`;
//   if (sortBy) query += `&sortBy=${sortBy}`;
//   if (minPrice !== undefined) query += `&minPrice=${minPrice}`;
//   if (maxPrice !== undefined) query += `&maxPrice=${maxPrice}`;

//   return fetchApi<any>(query);
// };

// export const getProductBySlug = async (slug: string): Promise<Product> => {
//   return fetchApi<Product>(`/api/products/${slug}`);
// };

// // Categories API
// export const getCategories = async (): Promise<Category[]> => {
//   return fetchApi<Category[]>('/api/categories');
// };

// // Orders API
// export const submitOrder = async (orderData: Omit<Order, '_id' | 'createdAt' | 'updatedAt' | 'status'>): Promise<Order> => {
//   return fetchApi<Order>('/api/orders', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(orderData),
//   });
// };

// // Sale API (NEW)
// export const getActiveSale = async (): Promise<Sale | null> => {
//   return fetchApi<Sale | null>('/api/sales/active');
// };



    // frontend/src/lib/api.ts
    import { Product, Category, Sale } from '@/types'; // Import Sale type here

    // Use environment variable for backend URL
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';

    /**
     * Helper function to handle API responses and errors
     */
    async function handleResponse<T>(response: Response): Promise<T> {
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: response.statusText }));
        throw new Error(errorData.message || response.statusText || 'An unknown error occurred');
      }
      return response.json();
    }

    /**
     * Fetches a list of products with optional filtering, searching, sorting, and pagination.
     * @param categorySlug - Optional. Filter products by category slug.
     * @param searchTerm - Optional. Search products by name or description.
     * @param sortBy - Optional. Sort products ('default', 'price-asc', 'price-desc', 'name-asc', 'name-desc').
     * @param page - Optional. The current page number for pagination (1-indexed).
     * @param limit - Optional. The number of items per page.
     * @param minPrice - Optional. Minimum price for filtering.
     * @param maxPrice - Optional. Maximum price for filtering.
     * @returns A promise that resolves to an object containing products, pagination info.
     */
    export async function getProducts(
      categorySlug?: string,
      searchTerm?: string,
      sortBy?: string,
      page: number = 1,
      limit: number = 12,
      minPrice?: number,
      maxPrice?: number
    ): Promise<{ products: Product[]; currentPage: number; totalPages: number; totalProducts: number }> {
      try {
        const params = new URLSearchParams();
        if (categorySlug) params.append('category', categorySlug);
        if (searchTerm) params.append('search', searchTerm);
        if (sortBy && sortBy !== 'default') params.append('sortBy', sortBy);
        params.append('page', page.toString());
        params.append('limit', limit.toString());
        if (minPrice !== undefined && minPrice !== null) params.append('minPrice', minPrice.toString());
        if (maxPrice !== undefined && maxPrice !== null) params.append('maxPrice', maxPrice.toString());

        const queryString = params.toString();
        const url = `${BACKEND_URL}/api/products${queryString ? `?${queryString}` : ''}`;
        console.log("Fetching products from:", url);

        const res = await fetch(url, { cache: 'no-store' }); // Disable cache for dynamic content
        return handleResponse(res); // Expects { products: [], currentPage: N, totalPages: N, totalProducts: N }
      } catch (error: any) {
        console.error("Error in getProducts:", error.message);
        throw error;
      }
    }

    /**
     * Fetches a list of categories.
     * @returns A promise that resolves to an array of Category objects.
     */
    export async function getCategories(): Promise<Category[]> {
      try {
        const url = `${BACKEND_URL}/api/categories`;
        console.log("Fetching categories from:", url);
        const res = await fetch(url, { cache: 'no-store' });
        return handleResponse(res);
      } catch (error: any) {
        console.error("Error in getCategories:", error.message);
        throw error;
      }
    }

    /**
     * Fetches a single product by its slug.
     * @param slug - The slug of the product to fetch.
     * @returns A promise that resolves to a Product object.
     */
    export async function getProductBySlug(slug: string): Promise<Product> {
      try {
        const url = `${BACKEND_URL}/api/products/${slug}`;
        console.log("Fetching product by slug from:", url);
        const res = await fetch(url, { cache: 'no-store' });
        return handleResponse(res);
      } catch (error: any) {
        console.error(`Error in getProductBySlug for slug ${slug}:`, error.message);
        throw error;
      }
    }

    /**
     * Fetches the currently active sale.
     * @returns A promise that resolves to a Sale object or null if no active sale.
     */
    export async function getActiveSale(): Promise<Sale | null> {
      try {
        const url = `${BACKEND_URL}/api/sales/active`;
        console.log("Fetching active sale from:", url);
        const res = await fetch(url, { cache: 'no-store' });
        if (res.status === 204) { // No Content status for no active sale
          return null;
        }
        return handleResponse(res);
      } catch (error: any) {
        console.error("Error in getActiveSale:", error.message);
        return null; // Return null on error or no active sale
      }
    }

    /**
     * Submits an order to the backend.
     * @param orderData - The order details.
     * @returns A promise that resolves to the created Order object.
     */
    export async function submitOrder(orderData: any): Promise<any> {
      try {
        const url = `${BACKEND_URL}/api/orders`; // Assuming an /api/orders endpoint
        console.log("Submitting order to:", url);
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderData),
        });
        return handleResponse(res);
      } catch (error: any) {
        console.error("Error submitting order:", error.message);
        throw error;
      }
    }
    