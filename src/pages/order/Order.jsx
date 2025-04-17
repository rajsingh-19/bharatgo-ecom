import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import styles from "./order.module.css";
import { TfiDropboxAlt } from "react-icons/tfi";
import CartModal from "../../components/modals/cartModal/CartModal";
import { useModal } from "../../context/ModalContext";
import { useCheckout } from '../../context/CheckoutContext';
import { useProducts } from '../../context/ProductContext';
import { useNavigate } from "react-router-dom";
import { FiCalendar, FiShoppingBag, FiArrowRight } from 'react-icons/fi';

const Order = () => {
  const [isOrderPresent, setIsOrderPresent] = useState(false);
  const { isModalOpen, closeModal, modalProductId } = useModal();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { totalOrder } = useCheckout();
  const [orderPrices, setOrderPrices] = useState([]);
  const [orderCounts, setOrderCounts] = useState([]);
  const formatDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0
    const yy = String(today.getFullYear()).slice(-2);
    return `${dd}.${mm}.${yy}`;
  };

  const getProduct = (id) => products.find(p => p.id === id);

  useEffect(() => {
    if (totalOrder.length > 0) {
      setIsOrderPresent(true);
    }
  }), [totalOrder];

  useEffect(() => {
    if (!totalOrder) return;

    const prices = [];
    const counts = [];

    totalOrder.forEach((orderItems) => {
      let total = 0;

      orderItems.forEach(({ id, quantity }) => {
        const product = getProduct(id);
        if (product) {
          total += product.price * quantity;
        }
      });

      prices.push(total);
      counts.push(orderItems.length);
    });

    setOrderPrices(prices);
    setOrderCounts(counts);
  }, [totalOrder, products]);

  const handleNavigate = (orderItems) => {
    navigate('/my-orders/last', { state: { orderItems } });
  };

  return (
    <>
      <Navbar />
      <div className={styles.ordersContainer}>
        <p>My Orders</p>
        {isOrderPresent ?
          (
            <div>
              {orderPrices.map((price, index) => (
                <div key={index} className={styles.card} onClick={() => handleNavigate(totalOrder[index])}>
                  <div className={styles.dFlex}>
                    <div className={styles.dFlexInternal}>
                      <div className={styles.dFlexSmall}>
                        <FiCalendar className={styles.icon} />
                        <div>{formatDate()}</div>
                      </div>
                      <div className={styles.dFlexSmall}>
                        <FiShoppingBag className={styles.icon} />
                        <div>{orderCounts[index]}</div>
                      </div>
                    </div>
                    <div className={styles.dFlexSmall}>
                      <div className={styles.price}>
                        ${price}
                      </div>
                      <FiArrowRight className={styles.iconLarge} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) :
          (
            <div className={styles.dropBoxContainer}>
              <TfiDropboxAlt size={100} />
              <p>{`Nothing yet, add some produicts and check them out :)`}</p>
            </div>
          )
        }
        {isModalOpen && (
          <div className={styles.modalViewContainer}>
            <CartModal id={modalProductId} closeModal={closeModal} />
          </div>
        )}
      </div>
    </>
  )
}

export default Order;
