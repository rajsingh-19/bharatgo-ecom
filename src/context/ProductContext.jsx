import React, { createContext, useContext, useState, useEffect } from "react";
import { getProducts } from "../services/index";

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        if (response.status === 200) {
          setProducts(response.data);
        } else {
          console.error(response.data?.message || "Error fetching products");
        }
      } catch (error) {
        console.error("Fetch failed:", error?.response?.data?.message || "Unexpected error");
      }
    };

    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
};
