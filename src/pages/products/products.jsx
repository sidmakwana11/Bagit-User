import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductCard from "../../components/product-card/product-card";
import "./product.css";

const Products = () => {
  const { subSubCategory } = useParams();
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [priceFilter, setPriceFilter] = useState("all");

  useEffect(() => {
    fetch(`https://bagit-category-service.onrender.com/api/categories/byCategory?category=${subSubCategory}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
          const initialQuantities = {};
          data.forEach(product => {
            initialQuantities[product._id] = 1;
          });
          setQuantities(initialQuantities);
        } else {
          setProducts([]);
        }
      });
  }, [subSubCategory]);

  const increment = (id) => {
    setQuantities(prev => ({ ...prev, [id]: prev[id] + 1 }));
  };

  const decrement = (id) => {
    setQuantities(prev => ({ ...prev, [id]: Math.max(1, prev[id] - 1) }));
  };

  // Filter logic
  const filteredProducts = products.filter(product => {
    if (priceFilter === "low") return product.price <= 500;
    if (priceFilter === "mid") return product.price > 500 && product.price <= 1000;
    if (priceFilter === "high") return product.price > 1000;
    return true; // "all"
  });

  return (
    <div className="products-page">
      <aside className="filters">
        <h3>Filter By</h3>
        <div className="filter-group">
          <label>Price Range:</label>
          <select
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="low">Below ₹500</option>
            <option value="mid">₹501 - ₹1000</option>
            <option value="high">Above ₹1000</option>
          </select>
        </div>
      </aside>

      <section className="products-section">
        <h2 style={{ textAlign: "center" }}>
          Products in "{decodeURIComponent(subSubCategory)}"
        </h2>
        <div className="product-container">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              quantity={quantities[product._id]}
              onIncrement={increment}
              onDecrement={decrement}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Products;

