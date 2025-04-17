import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./navbar.module.css";
import { FaShoppingCart } from "react-icons/fa";
import { useModal } from "../../context/ModalContext";
import { FaUserCircle } from "react-icons/fa";

const Navbar = ({ activeCategory, setActiveCategory }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { openCartModal, cartItems } = useModal();
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => setShowMenu(prev => !prev);

  let categoryArray = [{name: "All"}, {name: "Clothes"}, {name: "Electronics"}, {name: "Furnitures"}, {name: "Toys"}];

  const handleHome = () => {
    navigate("/");
  };

  const handleMyOrders = () => {
    navigate("/my-orders");
  };

  const handleMyAccount = () => {
    navigate("/my-account");
  };

  const handleFilter = (value) => {
    navigate("/");
  };

  const handleCartClick = () => {
    openCartModal(null);
  };

  const totalItems = cartItems.length;

  return (
    <div className={styles.navContainer}>
        {/* left side box */}
        <div className={styles.leftSection}>
          <span onClick={handleHome}>Shopi</span>
          <ul>
            {categoryArray?.map((item) => (
              <li key={item.name} className={activeCategory === item.name ? styles.activeCategory : ""} onClick={() => handleFilter(item.name)}>{item.name}</li>
            ))}
          </ul>
        </div>
        
        {/* Hamburger for mobile */}
        <div className={styles.hamburgerMenu} onClick={toggleMenu}>
          <FaUserCircle />
        </div>

        {/* right side box forlarge screen */}
        <div className={styles.rightSection}>
          <button onClick={handleMyOrders} className={location.pathname.startsWith("/my-orders") ? styles.activeNav : ""}>My Orders</button>
          <button onClick={handleMyAccount} className={location.pathname === "/my-account" ? styles.activeNav : ""}>My Account</button>
          <button onClick={handleCartClick}><FaShoppingCart size={18} /></button>
          <span>{totalItems}</span>
        </div>

        {/* Dropdown menu for small screens */}
        {showMenu && (
          <div className={styles.mobileMenu}>
            <button onClick={handleMyOrders}>My Orders</button>
            <button onClick={handleMyAccount}>My Account</button>
            <button onClick={handleCartClick}>
              Cart ({totalItems})
            </button>
          </div>
        )}
    </div>
  )
}

export default Navbar;
