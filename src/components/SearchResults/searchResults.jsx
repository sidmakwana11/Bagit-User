import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../product-card/product-card'; 

const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (query) {
      fetch(`http://localhost:5000/api/products/search?query=${query}`)
        .then((res) => res.json())
        .then((data) => setProducts(data))
        .catch((err) => console.error('Search error:', err));
    }
  }, [query]);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Results for "{query}"</h2>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
