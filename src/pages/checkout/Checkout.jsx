import React, { useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from '../../components/navbar/Navbar';
import styles from "./Checkout.module.css";
import { IoMdArrowBack } from 'react-icons/io';
import { useCheckout } from '../../context/CheckoutContext';
import { useProducts } from '../../context/ProductContext';

const Checkout = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { products } = useProducts();
  const { orderItems, setOrderItems } = useCheckout();

  useEffect(() => {
    if (state?.orderItems) {
      setOrderItems(state.orderItems);
    }
  }, [state]);

  const handleBack = () => {
    navigate("/my-orders");
  }

  const getProduct = (id) => products.find(p => p.id === id);

  return (
    <div>
      <Navbar />
      <div className={styles.wrapper}>
        <div className={styles.headingContainer}>
          <IoMdArrowBack className={styles.back} onClick={handleBack} />
          <div className={styles.title}>My Orders</div>
        </div>
        <div className={styles.ordersContainer}>
          {orderItems.map(({ id, quantity }) => {
            const product = getProduct(id);
            if (!product) return null;

            return (
              <div key={id} className={styles.orderItem}>
                <div className={styles.imageWrapper}>
                  <img src={product.images[0]} alt={product.title} className={styles.productImage} />
                </div>
                <div className={styles.productDetails}>
                  <p className={styles.productTitle}>{product.title}</p>
                  <p className={styles.productPrice}>${product.price}</p>
                  <div className={styles.quantityBox}>
                    <p className="select-none">{quantity}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}

export default Checkout;
