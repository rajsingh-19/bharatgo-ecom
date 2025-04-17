import React, { useState, useEffect } from "react";
import styles from "./productCard.module.css";
import { useModal } from "../../context/ModalContext"; 
import { FaPlus } from "react-icons/fa6";
import { IoMdCheckmarkCircle } from "react-icons/io";

const ProductCard = ({ id, title, price, imageUrl, category, description }) => {
  const { openCartModal, cartItems, openDetailModal } = useModal();
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    const existsInCart = cartItems.some(item => item.id === id);
    setIsAdded(existsInCart);
  }, [cartItems, id]);
  
  const handleAddToCart = () => {
    if (isAdded) return; 
    openCartModal(id);
  };

  const handleImageClick = () => {
    openDetailModal({ id, title, price, imageUrl, description });
  };  

  return (
    <div className={styles.card}>
      <div className={styles.figure}>
        <span className={styles.categoryLabel}>{category}</span>
        <img
          className={styles.image}
          src={imageUrl}
          alt={title}
          onClick={handleImageClick}
        />
        <button className={styles.iconButton} onClick={handleAddToCart} >
          {isAdded ? (
            <IoMdCheckmarkCircle className={styles.icon} />
          ) : (
            <FaPlus className={styles.icon} />
          )}
        </button>
      </div>
      <p className={styles.productRow}>
        <span className={styles.productName}>{title}</span>
        <span className={styles.productPrice}>{price}$</span>
      </p>
    </div>
  )
}

export default ProductCard;
