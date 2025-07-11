import React, { useEffect, useState } from 'react';
import { FaAngleDown, FaAngleRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  const [menuData, setMenuData] = useState([]);

  useEffect(() => {
    const fetchHierarchy = async () => {
      try {
        const res = await fetch("https://bagit-category-service.onrender.com/api/categories/hierarchy");
        const data = await res.json();
        if (!res.ok) {
          console.error("Hierarchy endpoint failed:", data);
          setMenuData([]);
          return;
        }
        setMenuData(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch category hierarchy:", err);
      }
    };

    fetchHierarchy();
  }, []);

  return (
    <nav className="navbar">
      <ul className="nav-links">
        {menuData.map((cat, catIndex) => (
          <li key={catIndex} className="dropdown">
            {cat.category} <FaAngleDown className="down-arrow" />
            <ul className="dropdown-menu">
              {cat.subCategories.map((sub, subIndex) => (
                <li key={subIndex} className="dropdown-sub">
                  {sub.subCategory} <FaAngleRight className="right-arrow" />
                  {sub.subSubCategories.length > 0 && (
                    <ul className="dropdown-submenu">
                      {sub.subSubCategories.map((ssc, sscIndex) => (
                        <li key={sscIndex}>
                          {/* 👇 Full route with all 3 params */}
                          <Link
                            to={`/products/${encodeURIComponent(cat.category)}/${encodeURIComponent(sub.subCategory)}/${encodeURIComponent(ssc)}`}
                          >
                            {ssc}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
