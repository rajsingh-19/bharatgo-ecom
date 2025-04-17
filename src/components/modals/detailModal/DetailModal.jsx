import React from "react";
import styles from "./detailmodal.module.css";
import { IoMdClose } from "react-icons/io";

const DetailModal = ({ product, closeModal }) => {
  if (!product) return null;
  const { title, imageUrl, price, description } = product;

  return (
      <div className={styles.detailModalContainer}>
        <div className={styles.cartHeading}>
          <p>Detail</p>
          <button onClick={closeModal}><IoMdClose size={22} /></button>
        </div>
        <div className={styles.modalImgContainer}>
          <img src={imageUrl} alt={title} className={styles.modalImage} />
        </div>
        <p className={styles.price}>$ {price}</p>
        <p className={styles.title}>{title}</p>
        <div className={styles.description}>
          {description}
        </div>
      </div>
  )
}

export default DetailModal;
