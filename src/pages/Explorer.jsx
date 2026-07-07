import React, { useState, useEffect, useCallback } from 'react';
import { IoSearchOutline, IoSwapVerticalOutline } from 'react-icons/io5';
import ProductCard from '../components/features/ProductCard';
import Pagination from '../components/ui/Pagination';
import EmptyState from '../components/ui/EmptyState';
import { SkeletonProductCard } from '../components/ui/Skeleton';
import { erpService } from '../services/apiClient';
import { useDebounce } from '../hooks/useDebounce';
import { categories } from '../constants/filterOptions';

const ITEMS_PER_PAGE = 12;

const SORT_OPTIONS = [
  { label: 'Name (A–Z)',    field: 'styleName',    order: 'asc' },
  { label: 'Name (Z–A)',    field: 'styleName',    order: 'desc' },
  { label: 'Price: Low',    field: 'sellingPrice', order: 'asc' },
  { label: 'Price: High',   field: 'sellingPrice', order: 'desc' },
  { label: 'GSM: Low',      field: 'gsm',          order: 'asc' },
  { label: 'GSM: High',     field: 'gsm',          order: 'desc' },
  { label: 'Stock: High',   field: 'stockQuantity', order: 'desc' },
];

function Explorer() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sortIdx, setSortIdx] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search, 300);

  const fetchData = useCallback(async (signal) => {
    setLoading(true);
    try {
      const sort = SORT_OPTIONS[sortIdx];
      const data = await erpService.getExplorerProducts(
        { search: debouncedSearch, category, sortField: sort.field, sortOrder: sort.order },
        signal
      );
      setProducts(data);
      setPage(1);
    } catch (err) {
      if (err.name !== 'AbortError') setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, category, sortIdx]);

  useEffect(() => {
    const controller = new AbortController();
    fetchData(controller.signal);
    return () => controller.abort();
  }, [fetchData]);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const paginatedProducts = products.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div>
      {/* Controls Row */}
      <div className="explorer-controls">
        {/* Category Tabs */}
        <div className="explorer-tabs" role="tablist" aria-label="Product category filter">
          {['All', ...categories].map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={category === cat}
              className={`explorer-tab ${category === cat ? 'active' : ''}`}
              onClick={() => { setCategory(cat); setPage(1); }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="explorer-actions">
          {/* Search */}
          <div className="wfx-input-field-container" style={{ width: 260 }}>
            <span className="wfx-input-icon"><IoSearchOutline size={16} /></span>
            <input
              id="explorer-search"
              type="search"
              className="wfx-input"
              placeholder="Search styles…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search finished goods"
            />
          </div>

          {/* Sort */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <IoSwapVerticalOutline style={{ color: 'var(--text-muted)' }} />
            <select
              id="explorer-sort"
              className="wfx-select"
              style={{ width: 160 }}
              value={sortIdx}
              onChange={(e) => setSortIdx(Number(e.target.value))}
              aria-label="Sort products"
            >
              {SORT_OPTIONS.map((opt, i) => (
                <option key={opt.label} value={i}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results count */}
      <p style={{ marginBottom: '1.25rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }} aria-live="polite">
        {loading ? 'Loading…' : `Showing ${paginatedProducts.length} of ${products.length} styles`}
      </p>

      {/* Product Grid */}
      {loading ? (
        <div className="product-grid">
          {Array.from({ length: 12 }).map((_, i) => <SkeletonProductCard key={i} />)}
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
          title="No products match"
          description="Try a different search term or category filter."
          action={
            <button className="wfx-btn wfx-btn-secondary" onClick={() => { setSearch(''); setCategory('All'); }}>
              Reset
            </button>
          }
        />
      )}
    </div>
  );
}

export default Explorer;
