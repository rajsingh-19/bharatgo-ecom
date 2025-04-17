import React, { createContext, useState, useContext } from "react";
import CartModal from "../components/modals/cartModal/CartModal";
import DetailModal from "../components/modals/detailModal/DetailModal";

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openCartModal = (id) => {
    setIsCartModalOpen(true);

    if (!id) return;
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { id, quantity: 1 }];
      }
    });
  };

  const closeCartModal = () => {
    setIsCartModalOpen(false);
  };

  const openDetailModal = (product) => {
    setSelectedProduct(product);
    setIsDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    setSelectedProduct(null);
    setIsDetailModalOpen(false);
  };

  const updateQuantity = (id, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <ModalContext.Provider value={{ openCartModal, closeCartModal, cartItems, updateQuantity, removeFromCart, openDetailModal, closeDetailModal }}>
      {children}
      {isCartModalOpen && <CartModal closeModal={closeCartModal} />}
      {isDetailModalOpen && selectedProduct && (
        <DetailModal product={selectedProduct} closeModal={closeDetailModal} />
      )}
    </ModalContext.Provider>
  );
};
