import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Drivers.scss';

const Drivers = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [visibleProducts, setVisibleProducts] = useState(12);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_SERVER_API}/products`);
      const productsWithFiles = response.data.filter(product =>
        product.files && product.files.length > 0
      );

      setProducts(productsWithFiles);
      setFilteredProducts(productsWithFiles.slice(0, visibleProducts));

      const uniqueCategories = Array.from(
        new Set(productsWithFiles.map(p => p.category).filter(Boolean))
      );
      setCategories(uniqueCategories);

    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }, [visibleProducts]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight
      ) return;
      setVisibleProducts(prev => prev + 8);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!selectedCategory) {
      setFilteredProducts(products.slice(0, visibleProducts));
    } else {
      setFilteredProducts(
        products.filter(p => p.category === selectedCategory).slice(0, visibleProducts)
      );
    }
  }, [selectedCategory, products, visibleProducts]);

  const handleDownload = (fileUrl, originalFilename) => {
    const fullPath = `${import.meta.env.VITE_SERVER_API}/static${fileUrl}`;
    const link = document.createElement('a');
    link.href = fullPath;
    link.download = originalFilename || 'download';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setActiveDropdown(null);
  };

  const toggleDropdown = (productId) => {
    setActiveDropdown(activeDropdown === productId ? null : productId);
  };

  const filterByCategory = (category) => {
    setSelectedCategory(category);
    setActiveDropdown(null);
  };

  if (loading) {
    return <div className="drivers-loading">Loading...</div>;
  }

  if (products.length === 0) {
    return <div className="drivers-empty">No products with files available.</div>;
  }

  return (
    <div className="drivers">
      <header className="drivers-header">
        <button className="drivers-back-button" onClick={() => navigate('/')}>
          &larr; Back to Home
        </button>
        <h1 className="drivers-heading">Download Center</h1>
        <p className="drivers-description">Find drivers, manuals and documentation for your products</p>
      </header>

      <button
        className="drivers-filter-toggle"
        onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
      >
        {mobileFiltersOpen ? 'Hide Filters' : 'Show Filters'}
        <span className="drivers-filter-icon">{mobileFiltersOpen ? '×' : '☰'}</span>
      </button>

      <div className="drivers-content">
        <aside className={`drivers-sidebar ${mobileFiltersOpen ? 'is-open' : ''}`}>
          <h3 className="drivers-sidebar-title">Categories</h3>
          <ul className="drivers-categories">
            <li
              className={`drivers-category ${!selectedCategory ? 'is-active' : ''}`}
              onClick={() => filterByCategory(null)}
            >
              All Categories
            </li>
            {categories.map(category => (
              <li
                key={category}
                className={`drivers-category ${selectedCategory === category ? 'is-active' : ''}`}
                onClick={() => filterByCategory(category)}
              >
                {category}
              </li>
            ))}
          </ul>
          {mobileFiltersOpen && (
            <button
              className="drivers-apply-filters"
              onClick={() => setMobileFiltersOpen(false)}
            >
              Apply Filters
            </button>
          )}
        </aside>

        <main className="drivers-main">
          <div className="drivers-grid">
            {filteredProducts.map(product => (
              <article
                className={`drivers-card ${activeDropdown === product.product_id ? 'dropdown-open' : ''}`}
                key={product.product_id}
              >
                <div className="drivers-card-media">
                  {product.images.length > 0 ? (
                    <img
                      src={`${import.meta.env.VITE_SERVER_API}${product.images[0].image_url}`}
                      alt={product.name}
                      className="drivers-card-image"
                      loading="lazy"
                    />
                  ) : (
                    <div className="drivers-card-placeholder">
                      <svg className="drivers-card-icon" viewBox="0 0 24 24">
                        <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86l-3 3.87L9 13.14 6 17h12l-3.86-5.14z" />
                      </svg>
                    </div>
                  )}
                </div>

                <div className="drivers-card-content">
                  <h3 className="drivers-card-title">{product.name}</h3>
                  {product.category && <p className="drivers-card-category">{product.category}</p>}

                  <div className="drivers-card-actions">
                    {product.files.length === 1 ? (
                      <button
                        className="drivers-download-btn"
                        onClick={() => handleDownload(product.files[0].file_url, product.files[0].original_filename)}
                      >
                        {product.files[0].original_filename.replace(/\.[^/.]+$/, '')}
                      </button>
                    ) : (
                      <div className="drivers-dropdown">
                        <button
                          className={`drivers-dropdown-btn ${activeDropdown === product.product_id ? 'is-open' : ''}`}
                          onClick={() => toggleDropdown(product.product_id)}
                        >
                          <span>Download Drivers</span>
                        </button>
                        {activeDropdown === product.product_id && (
                          <div className="drivers-dropdown-menu">
                            {product.files.map(file => (
                              <button
                                key={file.file_id}
                                className="drivers-dropdown-item"
                                onClick={() => handleDownload(file.file_url, file.original_filename)}
                              >
                                {file.original_filename.replace(/\.[^/.]+$/, '')}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Drivers;