import axios from "axios";
const apiURL = import.meta.env.VITE_PRODUCT_API_URL;

// get the products
export const getProducts = () => {
  return axios.get(`${apiURL}/products`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
