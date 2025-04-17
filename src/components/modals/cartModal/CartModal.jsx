import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./cartModal.module.css";
import { IoMdClose } from "react-icons/io";
import { useProducts } from "../../../context/ProductContext";
import { useModal } from "../../../context/ModalContext";
import { useCheckout } from "../../../context/CheckoutContext";

const CartModal = ({ closeModal }) => {
  const navigate = useNavigate();
  const { products } = useProducts();
  const { cartItems, updateQuantity, removeFromCart } = useModal();
  const { addCheckout, addOrder, resetOrderItems } = useCheckout();

  const getProduct = (id) => products.find(p => p.id === id);

  const handleIncrease = (id, quantity) => updateQuantity(id, quantity + 1);
  const handleDecrease = (id, quantity) => updateQuantity(id, quantity > 1 ? quantity - 1 : 1);

  const total = cartItems.reduce((sum, item) => {
    const product = getProduct(item.id);
    return product ? sum + product.price * item.quantity : sum;
  }, 0).toFixed(2);

  const handleCheckOut = () => {
    closeModal();
    resetOrderItems();
    addCheckout(cartItems);
    addOrder(cartItems);
    cartItems.forEach(item => removeFromCart(item.id));
    navigate('/my-orders/last');
  };

  return (
    <div className={styles.cartModalContainer}>
      <div className={styles.cartHeading}>
        <p>My Order</p>
        <button onClick={closeModal}><IoMdClose size={22} /></button>
      </div>
      <div className={styles.cartProductContainer}>
        {cartItems.map(({ id, quantity }) => {
          const product = getProduct(id);
          if (!product) return null;
          return (
            <div key={id} className={styles.cartProduct}>
              <div className={styles.productImgContainer}>
                <img src={product.images[0]} alt={product.title} />
              </div>
              <div className={styles.productDetailsContainer}>
                <p>{product.title}</p>
                <span>$ {product.price}</span>
                <div>
                  <button onClick={() => handleDecrease(id, quantity)}>-</button>
                  <button>{quantity}</button>
                  <button onClick={() => handleIncrease(id, quantity)}>+</button>
                </div>
              </div>
              <div className={styles.closeIconContainer}>
                <button onClick={() => removeFromCart(id)}>
                  <IoMdClose size={20} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.checkoutContainer}>
        <div className={styles.totalCostContainer}>
          <span>Total:</span>
          <span>{`$ ${total}`}</span>
        </div>
        <div className={styles.checkoutBox}>
          <button onClick={handleCheckOut}>Checkout</button>
        </div>
      </div>
    </div>
  )
}

export default CartModal;
