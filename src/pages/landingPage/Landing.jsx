import React, { useEffect, useState } from "react";
import styles from "./landing.module.css";
import Navbar from "../../components/navbar/Navbar";
import ProductCard from "../../components/productCard/ProductCard";
import { getProducts } from "../../services";
import { HiEmojiSad } from "react-icons/hi";

const Landing = () => {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  
  useEffect(() => {
    handleProducts();
  }, []);

  const handleProducts = async () => {
    try {
      const response = await getProducts();

      if (response.status === 200) {
        const resData = response.data;
        setProducts(resData);
      } else {
        const errorMessage = response.data?.message || "An error occurred";
        console.error(errorMessage);
      }
    } catch (error) {
      console.log(error);
      const errorMessage = error.response?.data?.message || "An unexpected error occurred";
      console.error(errorMessage);
    }
  };

  const filteredProducts = products.filter(product =>
    (activeCategory === "All" || product.category.name === activeCategory) &&
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Navbar activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
      <div className={styles.container}>
        <div className={styles.home}>
          Home
        </div>
        <input type="text" className={styles.searchBar} placeholder="Search a product" value={searchTerm}
           onChange={(e) => setSearchTerm(e.target.value)} />
        {filteredProducts.length > 0 ? (
          <div className={styles.gridContainer}>
            {filteredProducts.map((product) => (
              <ProductCard
                 key={product.id}
                 id={product.id}
                 title={product.title}
                 price={product.price}
                 description={product.description}
                 imageUrl={product.images[0]}
                 category={product.category.name}
              />
            ))}
          </div>
         ) : (
          <div className={styles.noResults}>
            <div>
              <HiEmojiSad size={40} />
            </div>
            <p>{`Nothing related :(`}</p>
          </div>
         )}
      </div>
    </div>
  )
}

export default Landing;
