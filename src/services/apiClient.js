import axios from 'axios';
import * as mockDb from './mockData';
import { gsmRanges } from '../constants/filterOptions';

// Initialize Axios instance
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 10000, // 10s timeout
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

// Request Interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add Authorization header here if needed in production
    // const token = localStorage.getItem('wfx-token');
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Standardize error message formats
    let message = 'An unexpected server error occurred.';
    if (error.response) {
      message = error.response.data?.message || `Server Error: ${error.response.status}`;
    } else if (error.request) {
      message = 'Network error: No response received from server.';
    } else {
      message = error.message;
    }
    error.customMessage = message;
    return Promise.reject(error);
  }
);

// Helper function to simulate network latency for mocks
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Centralized ERP Service
export const erpService = {
  // 1. Dashboard metrics
  async getDashboardData(signal) {
    try {
      // In production: const res = await apiClient.get('/dashboard', { signal }); return res.data;
      await wait(600);
      if (signal?.aborted) throw new DOMException('Request aborted', 'AbortError');
      return {
        kpis: mockDb.kpiData,
        revenueTrend: mockDb.revenueTrend,
        supplierPerformance: mockDb.supplierPerformance,
        productCategories: mockDb.productCategories,
        recentActivity: mockDb.recentActivity
      };
    } catch (err) {
      if (err.name === 'AbortError') throw err;
      console.warn('Axios failed/fallback to mock:', err.customMessage || err.message);
      return {
        kpis: mockDb.kpiData,
        revenueTrend: mockDb.revenueTrend,
        supplierPerformance: mockDb.supplierPerformance,
        productCategories: mockDb.productCategories,
        recentActivity: mockDb.recentActivity
      };
    }
  },

  // 2. Natural Language Query
  async submitNLQuery(queryText, signal) {
    try {
      // In production: const res = await apiClient.post('/query', { query: queryText }, { signal }); return res.data;
      await wait(1200); // Simulate model thinking
      if (signal?.aborted) throw new DOMException('Request aborted', 'AbortError');
      
      const queryLower = queryText.toLowerCase();
      // Search for matches in mock NL queries
      const match = mockDb.nlQueries.find(q => 
        queryLower.includes(q.query.toLowerCase()) || 
        q.query.toLowerCase().includes(queryLower)
      );

      if (match) {
        return match;
      }

      // Default fallback if query is customized
      return {
        query: queryText,
        sql: `SELECT style_number, style_name, fabric, selling_price, stock_quantity \nFROM products \nWHERE style_name LIKE '%${queryText}%' OR fabric LIKE '%${queryText}%';`,
        headers: ['Style No', 'Style Name', 'Fabric', 'Price', 'Stock'],
        rows: mockDb.products
          .slice(0, 3)
          .map(p => [p.styleNumber, p.styleName, p.fabric, `$${p.sellingPrice.toFixed(2)}`, p.stockQuantity.toLocaleString()]),
        aiResponse: `Based on your request, I generated a query to look for garments matching "${queryText}". Found ${Math.min(3, mockDb.products.length)} matching samples in current inventory.`
      };
    } catch (err) {
      if (err.name === 'AbortError') throw err;
      throw new Error(err.customMessage || 'Query service unavailable');
    }
  },

  // 3. Product Search
  async searchProducts(params, signal) {
    try {
      // In production: const res = await apiClient.get('/products/search', { params, signal }); return res.data;
      await wait(700);
      if (signal?.aborted) throw new DOMException('Request aborted', 'AbortError');

      const { q = '', category, fabric, gsmRange, supplier, buyer, print, color, season } = params;
      let filtered = [...mockDb.products];

      // Text search (NL style or basic keywords)
      if (q.trim() !== '') {
        const query = q.toLowerCase();
        filtered = filtered.filter(p => 
          p.styleName.toLowerCase().includes(query) ||
          p.styleNumber.toLowerCase().includes(query) ||
          p.fabric.toLowerCase().includes(query) ||
          p.supplier.toLowerCase().includes(query) ||
          p.buyer.toLowerCase().includes(query)
        );
      }

      // Dropdown filters
      if (category) filtered = filtered.filter(p => p.category === category);
      if (fabric) filtered = filtered.filter(p => p.fabric.toLowerCase().includes(fabric.toLowerCase()));
      if (supplier) filtered = filtered.filter(p => p.supplier === supplier);
      if (buyer) filtered = filtered.filter(p => p.buyer === buyer);
      if (print) filtered = filtered.filter(p => p.print === print);
      if (color) filtered = filtered.filter(p => p.color === color);
      if (season) filtered = filtered.filter(p => p.season === season);
      
      // GSM Range filters
      if (gsmRange) {
        const range = gsmRanges.find(r => r.label === gsmRange);
        if (range) {
          filtered = filtered.filter(p => p.gsm >= range.min && p.gsm <= range.max);
        }
      }

      return filtered;
    } catch (err) {
      if (err.name === 'AbortError') throw err;
      return mockDb.products;
    }
  },

  // 4. Image search (garment similarity)
  async searchByImage(imageFile, textQuery, similarityThreshold = 70, signal) {
    try {
      // In production: multipart form-data upload with Axios
      // const formData = new FormData();
      // if (imageFile) formData.append('image', imageFile);
      // formData.append('text', textQuery);
      // formData.append('threshold', similarityThreshold);
      // const res = await apiClient.post('/image-search', formData, { signal }); return res.data;
      
      await wait(1000);
      if (signal?.aborted) throw new DOMException('Request aborted', 'AbortError');

      // Return products with simulated similarity scores
      let results = mockDb.products.map(p => {
        // Adjust similarity based on query if present
        let score = p.similarityScore;
        if (textQuery) {
          const matched = p.styleName.toLowerCase().includes(textQuery.toLowerCase()) || 
                          p.category.toLowerCase().includes(textQuery.toLowerCase());
          score = matched ? Math.min(99.5, score + 10) : Math.max(30.0, score - 25);
        }
        // Add minor random variance to make it look active
        score = Math.min(100, Math.max(0, score + (Math.random() * 4 - 2)));
        return { ...p, similarityScore: parseFloat(score.toFixed(1)) };
      });

      // Filter by similarity threshold
      results = results.filter(p => p.similarityScore >= similarityThreshold);

      // Sort by similarity score descending
      results.sort((a, b) => b.similarityScore - a.similarityScore);

      return results;
    } catch (err) {
      if (err.name === 'AbortError') throw err;
      return mockDb.products;
    }
  },

  // 5. Explorer with sorting/pagination
  async getExplorerProducts(params = {}, signal) {
    try {
      await wait(600);
      if (signal?.aborted) throw new DOMException('Request aborted', 'AbortError');

      const { search = '', sortField = 'styleName', sortOrder = 'asc', category = 'All' } = params;
      let filtered = [...mockDb.products];

      if (category !== 'All') {
        filtered = filtered.filter(p => p.category === category);
      }

      if (search.trim()) {
        const query = search.toLowerCase();
        filtered = filtered.filter(p => 
          p.styleName.toLowerCase().includes(query) ||
          p.styleNumber.toLowerCase().includes(query) ||
          p.fabric.toLowerCase().includes(query) ||
          p.supplier.toLowerCase().includes(query)
        );
      }

      // Sort
      filtered.sort((a, b) => {
        let fieldA = a[sortField];
        let fieldB = b[sortField];

        if (typeof fieldA === 'string') {
          fieldA = fieldA.toLowerCase();
          fieldB = fieldB.toLowerCase();
        }

        if (fieldA < fieldB) return sortOrder === 'asc' ? -1 : 1;
        if (fieldA > fieldB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });

      return filtered;
    } catch (err) {
      if (err.name === 'AbortError') throw err;
      return mockDb.products;
    }
  }
};
export default apiClient;
