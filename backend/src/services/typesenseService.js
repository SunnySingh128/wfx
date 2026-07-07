import { env } from '../config/env.js';
import * as mockDb from '../database/mockDb.js';

// Typesense connection state tracking
let isTypesenseConnected = false;

console.log('[Typesense] Initializing connection parameters...');
console.log(`[Typesense] Config: ${env.typesenseProtocol}://${env.typesenseHost}:${env.typesensePort}`);

export const typesenseService = {
  /**
   * Performs full-text or vector search on finished goods.
   * Gracefully falls back to local database filters if Typesense server is offline.
   */
  async searchFinishedGoods(queryText, filters = {}) {
    if (!isTypesenseConnected) {
      // Graceful fallback to mock query filtering (simulating index hits)
      return this._fallbackDbSearch(queryText, filters);
    }

    try {
      // In production:
      // const searchResults = await typesenseClient.collections('finished_goods').documents().search({
      //   q: queryText,
      //   query_by: 'styleName,styleNumber,fabric,supplier',
      //   filter_by: this._buildFilterString(filters)
      // });
      // return searchResults.hits.map(h => h.document);
      return [];
    } catch (err) {
      console.warn('[Typesense] Search error, using DB fallback:', err.message);
      return this._fallbackDbSearch(queryText, filters);
    }
  },

  /**
   * Performs image similarity search using mock vector comparisons or actual Typesense vector queries.
   */
  async searchByVector(embeddingVector, threshold = 50) {
    if (!isTypesenseConnected) {
      // Fallback: Return mock products with similarity scores
      return this._fallbackVectorSearch(embeddingVector, threshold);
    }

    try {
      // In production:
      // const searchResults = await typesenseClient.collections('finished_goods').documents().search({
      //   q: '*',
      //   vector_query: `embeddings:([${embeddingVector.join(',')}], k:10)`,
      //   filter_by: `similarityScore >= ${threshold}`
      // });
      // return searchResults.hits;
      return [];
    } catch (err) {
      return this._fallbackVectorSearch(embeddingVector, threshold);
    }
  },

  _fallbackDbSearch(q, filters) {
    let results = [...mockDb.products];
    if (q) {
      const term = q.toLowerCase();
      results = results.filter(p =>
        p.styleName.toLowerCase().includes(term) ||
        p.styleNumber.toLowerCase().includes(term) ||
        p.fabric.toLowerCase().includes(term) ||
        p.supplier.toLowerCase().includes(term)
      );
    }
    if (filters.category && filters.category !== 'All') {
      results = results.filter(p => p.category === filters.category);
    }
    if (filters.color) {
      results = results.filter(p => p.color === filters.color);
    }
    if (filters.fabric) {
      results = results.filter(p => p.fabric.toLowerCase().includes(filters.fabric.toLowerCase()));
    }
    return results;
  },

  _fallbackVectorSearch(vector, threshold) {
    // Generate simulated similarity scores centered around mock data
    const scored = mockDb.products.map(p => {
      // Adjust score slightly to make the search dynamic
      const randomVariance = Math.random() * 6 - 3;
      const score = Math.min(99.5, Math.max(30, p.similarityScore + randomVariance));
      return { ...p, similarityScore: parseFloat(score.toFixed(1)) };
    });

    return scored
      .filter(p => p.similarityScore >= threshold)
      .sort((a, b) => b.similarityScore - a.similarityScore);
  }
};

export default typesenseService;
