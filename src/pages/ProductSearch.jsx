import React, { useState, useEffect, useCallback } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import FilterPanel from '../components/features/FilterPanel';
import ProductCard from '../components/features/ProductCard';
import Pagination from '../components/ui/Pagination';
import EmptyState from '../components/ui/EmptyState';
import { SkeletonProductCard } from '../components/ui/Skeleton';
import { erpService } from '../services/apiClient';
import { useDebounce } from '../hooks/useDebounce';

const ITEMS_PER_PAGE = 9;
const EMPTY_FILTERS = { category: '', fabric: '', gsmRange: '', supplier: '', buyer: '', print: '', color: '', season: '' };

function ProductSearch() {
  const [searchText, setSearchText] = useState('');
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(searchText, 350);

  const fetchProducts = useCallback(async (signal) => {
    setLoading(true);
    try {
      const params = { q: debouncedSearch, ...filters };
      const results = await erpService.searchProducts(params, signal);
      setProducts(results);
      setPage(1);
    } catch (err) {
      if (err.name !== 'AbortError') setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, filters]);

  useEffect(() => {
    const controller = new AbortController();
    fetchProducts(controller.signal);
    return () => controller.abort();
  }, [fetchProducts]);

  const handleFilterChange = useCallback((key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleResetFilters = useCallback(() => {
    setFilters(EMPTY_FILTERS);
    setSearchText('');
  }, []);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const paginatedProducts = products.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div className="search-page-layout">
      <FilterPanel filters={filters} onChange={handleFilterChange} onReset={handleResetFilters} />

      <div className="search-main">
        {/* Search Bar */}
        <div className="search-bar-wrapper">
          <div className="wfx-input-field-container" style={{ flex: 1 }}>
            <span className="wfx-input-icon"><IoSearchOutline size={18} /></span>
            <input
              id="product-search-input"
              type="search"
              className="wfx-input"
              placeholder="Search by name, style number, fabric, supplier…"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              aria-label="Product search"
            />
          </div>
          <span className="search-results-count" aria-live="polite">
            {loading ? 'Searching…' : `${products.length} result${products.length !== 1 ? 's' : ''}`}
          </span>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="product-grid">
            {Array.from({ length: 9 }).map((_, i) => <SkeletonProductCard key={i} />)}
          </div>
        ) : paginatedProducts.length > 0 ? (
          <>
            <div className="product-grid">
              {paginatedProducts.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
          </>
        ) : (
          <EmptyState
            icon={<IoSearchOutline />}
            title="No products found"
            description="Try adjusting your search or filters to find what you're looking for."
            action={
              <button className="wfx-btn wfx-btn-secondary" onClick={handleResetFilters}>
                Clear all filters
              </button>
            }
          />
        )}
      </div>
    </div>
  );
}

export default ProductSearch;
