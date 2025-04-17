import React, { createContext, useState, useContext } from "react";
const CheckoutContext = createContext();
export const useCheckout = () => useContext(CheckoutContext);

export const CheckoutProvider = ({ children }) => {
    const [orderItems, setOrderItems] = useState([]);
    const [totalOrder, setTotalOrder] = useState([]);

    const addCheckout = (value) => {
        setOrderItems((prevItems) => {
            return [...prevItems, ...value.map(item => ({
                id: item.id,
                quantity: item.quantity
            }))];
        });
    }

    const addOrder = (value) => {
        setTotalOrder((prevItems) => {
            return [...prevItems, value];
        });
    }

    const resetOrderItems = () => {
        setOrderItems([]);
    }

    return (
        <CheckoutContext.Provider value={{ orderItems, addCheckout, totalOrder, addOrder, resetOrderItems, setOrderItems }}>
            {children}
        </CheckoutContext.Provider>
    );
}